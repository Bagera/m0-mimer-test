import React, { Component } from 'react';
import './Test.css';

import Problem from './Problem';
import Solution from './Solution';

class Test extends Component {
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
      <div className="Test">
        <section className="Test-problem">
          <Problem problem={problem} />
        </section>
        <section className="Test-solution">
          <Solution
            {...{ solution, step, testLength, checkSolution, setSolution }}
          />
        </section>
      </div>
    );
  }
}

export default Test;
