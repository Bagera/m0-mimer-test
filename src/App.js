import React, { Component } from 'react';
import Screenfull from 'screenfull';
import SignUtils from './lib/SignUtils';

import Test from './components/Test';
import Result from './components/Result';
import './App.css';

import logo from './logo.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      testLength: 1,
      step: 1,
      points: 0,
      status: 'testing',
      solution: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      problem: SignUtils.problem()
    };
  }

  checkSolution(answer) {
    const problem = this.state.problem[2];
    return SignUtils.checkAnswer(...problem, answer);
  }

  toggleFullScreen() {
    if (Screenfull.enabled) {
      Screenfull.toggle();
    }
  }
  setSolution(solution) {
    this.setState({ solution });
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

  reset() {
    const newState = {
      step: 1,
      points: 0,
      status: 'testing',
      solution: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      problem: SignUtils.problem()
    };
    this.setState(newState);
  }

  render() {
    const { solution, problem, step, status, testLength } = this.state;
    const checkSolution = this.stepProblem.bind(this);
    const setSolution = this.setSolution.bind(this);
    let component;
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
            onClick={this.toggleFullScreen.bind(this)}
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
