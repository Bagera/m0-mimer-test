import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/fontawesome-pro-regular';
import Screenfull from 'screenfull';
import SignUtils from './lib/SignUtils';

import Settings from './components/Settings';
import Test from './components/Test';
import Result from './components/Result';
import './App.css';

import logo from './logo.svg';
const clickSound = new Audio(process.env.PUBLIC_URL + 'audio/toggle.mp3');

class App extends Component {
  constructor() {
    super();
    this.state = {
      testLength: 1,
      settingsOpen: false
    };
  }

  newState(oldState = {}) {
    const newState = {
      step: 1,
      points: 0,
      status: 'testing',
      solution: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      problem: SignUtils.problem()
    };
    return Object.assign({}, newState, oldState);
  }

  getState() {
    return JSON.parse(localStorage.getItem('data'));
  }

  saveState(state) {
    this.setState(state);
    const store = this.getState();
    const newStore = Object.assign({}, store, state);
    localStorage.setItem('data', JSON.stringify(newStore));
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
    this.saveState({ solution });
  }

  toggleSettings(mute) {
    const settingsOpen = !this.state.settingsOpen;
    if (!mute) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
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
    const newState = this.newState({ step, points, status });
    this.saveState(newState);
  }

  setLength(testLength) {
    const newState = this.newState({ testLength });
    this.saveState(newState);
  }

  reset() {
    const newState = this.newState({ settingsOpen: false });
    this.saveState(newState);
    return newState;
  }

  componentWillMount() {
    this.setState(this.newState(this.getState()));
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
          resetTest={this.reset.bind(this)}
          toggleFullscreen={this.toggleFullscreen.bind(this)}
          setLength={this.setLength.bind(this)}
          close={this.toggleSettings.bind(this, true)}
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
          />
          <span
            className="App-testName"
            onClick={this.toggleSettings.bind(this, false)}
          >
            MIT-4592 <FontAwesomeIcon icon={faCogs} />
          </span>
        </header>
        {component}
      </main>
    );
  }
}

export default App;
