import React, { Component } from 'react';
import Screenfull from 'screenfull';
import SignUtils from './lib/SignUtils';

import Settings from './components/Settings';
import Test from './components/Test';
import Result from './components/Result';
import './App.css';

import logo from './logo.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      testLength: 1
    };
  }

  checkSolution(answer) {
    const problem = this.state.problem[2];
    return SignUtils.checkAnswer(...problem, answer);
  }

  toggleFullscreen() {
    if (Screenfull.enabled) {
      Screenfull.toggle();
      this.forceUpdate();
    }
  }

  setSolution(solution) {
    this.setState({ solution });
  }

  toggleSettings() {
    const settingsOpen = !this.state.settingsOpen;
    this.setState({ settingsOpen });
  }

  stepProblem(answer) {
    let { step, testLength, problem, points, status } = this.state;
    const correct = SignUtils.checkAnswer(...problem[2], answer);

    if (correct) {
      points++;
    }
    if (step >= testLength) {
      if (points / testLength > 0.5) {
        status = 'solved';
      } else {
        status = 'failed';
      }
    }
    step++;
    problem = SignUtils.problem();
    const solution = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.setState({ step, problem, points, status, solution });
  }

  setLength(testLength) {
    this.setState({ testLength });
    this.storeData({ testLength });
  }

  reset() {
    const newState = {
      step: 1,
      points: 0,
      status: 'testing',
      settingsOpen: false,
      solution: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      problem: SignUtils.problem()
    };
    this.setState(newState);
    this.storeData(newState);
    return newState;
  }

  getStoredState() {
    return JSON.parse(localStorage.getItem('data'));
  }

  storeData(data) {
    const store = this.getStoredState();
    const newStore = Object.assign({}, store, data);
    localStorage.setItem('data', JSON.stringify(newStore));
  }

  componentWillMount() {
    const oldState = this.getStoredState();
    if (oldState) {
      this.setState(oldState);
    } else {
      const state = this.reset();
    }
  }

  render() {
    const {
      settingsOpen,
      solution,
      problem,
      step,
      status,
      testLength
    } = this.state;
    const checkSolution = this.stepProblem.bind(this);
    const setSolution = this.setSolution.bind(this);
    let component;

    if (settingsOpen) {
      component = (
        <Settings
          testLength={testLength}
          toggleFullscreen={this.toggleFullscreen.bind(this)}
          setLength={this.setLength.bind(this)}
          close={this.toggleSettings.bind(this)}
        />
      );
    } else {
      switch (status) {
        case 'testing':
          component = (
            <Test
              {...{
                solution,
                problem,
                step,
                checkSolution,
                setSolution,
                testLength
              }}
            />
          );
          break;
        case 'solved':
        case 'failed':
          component = <Result status={status} />;
          break;
        default:
          break;
      }
    }

    return (
      <main className="App">
        <header className="App-header">
          <img
            className="App-logo"
            src={logo}
            alt="Logo"
            onClick={this.reset.bind(this)}
          />
          <span
            className="App-testName"
            onClick={this.toggleSettings.bind(this)}
          >
            MIT-4592
          </span>
        </header>
        {component}
      </main>
    );
  }
}

export default App;
