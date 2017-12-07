import React, { Component } from 'react';
import './LockScreen.css';

import Problem from './Problem';
import Solution from './Solution';

class LockScreen extends Component {
  render() {
    const {
      problem,
      solution,
      step,
      checkSolution,
      setSolution,
      testLength
    } = this.props;
    return (
      <div className="LockScreen">
        <section className="LockScreen-problem">
          <Problem problem={problem} />
        </section>
        <section className="LockScreen-solution">
          <Solution
            {...{ solution, step, testLength, checkSolution, setSolution }}
          />
        </section>
      </div>
    );
  }
}

export default LockScreen;
