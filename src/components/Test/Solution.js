import React, { Component } from 'react';
import './Solution.css';

import Counter from './Counter';
import Buttons from './Buttons';

class Solution extends Component {
  handleToggle(index) {
    let solution = this.props.solution;
    solution[index] = Math.abs(solution[index] - 1);
    this.props.setSolution(solution);
  }

  render() {
    const { step, testLength, solution, checkSolution } = this.props;

    let counter = null;

    if (testLength > 1) {
      counter = (
        <div className="Solution-counter">
          <Counter {...{ step, testLength }} />
        </div>
      );
    }
    return (
      <div className="Solution">
        <div className="Solution-buttons">
          <Buttons
            solution={solution}
            toggleBar={this.handleToggle.bind(this)}
          />
        </div>
        <aside className="Solution-aside">
          {counter}
          <div className="Solution-action">
            <button type="button" onClick={checkSolution.bind(this, solution)}>
              Svara
            </button>
          </div>
        </aside>
      </div>
    );
  }
}

export default Solution;
