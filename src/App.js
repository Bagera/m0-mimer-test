import React, { Component } from 'react';
import Screenfull from 'screenfull';
import SignUtils from './lib/SignUtils';

import Test from './components/Test';
import Result from './components/Result';
import './App.css';

import logo from './logo.svg';

const maxTries = 4;

class App extends Component {
  constructor() {
    super();
    this.state = {
      tries: maxTries,
      status: 'testing',
      solution: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      problem: SignUtils.problem()
    };
  }

  setTries(newTries) {
    if (newTries < 0) {
      newTries = 0;
    } else if (newTries > maxTries) {
      newTries = maxTries;
    }
    this.setState({ tries: newTries });
  }

  checkSolution(answer) {
    const problem = this.state.problem[2];
    if (SignUtils.checkAnswer(...problem, answer)) {
      this.setState({ status: 'solved' });
    } else {
      this.setState({ status: 'failed' });
    }
  }

  toggleFullScreen() {
    if (Screenfull.enabled) {
      Screenfull.toggle();
    }
  }

  reset() {
    const newState = {
      tries: maxTries,
      status: 'testing',
      solution: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      problem: SignUtils.problem()
    };
    this.setState(newState);
  }

  render() {
    const { solution, problem, tries, status } = this.state;
    const checkSolution = this.checkSolution.bind(this);
    let component;
    switch (status) {
      case 'testing':
        component = (
          <Test
            {...{
              solution,
              problem,
              tries,
              maxTries,
              checkSolution
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
