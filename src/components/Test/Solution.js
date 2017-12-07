import React, { Component } from 'react';
import './Solution.css';

import Counter from './Counter';
import Buttons from './Buttons';

class Solution extends Component {
  constructor() {
    super();
    this.state = {
      solution: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  }
  toggleButton(index) {
    let solution = this.state.solution;
    solution[index] = Math.abs(solution[index] - 1);
    this.setState(solution);
  }

  render() {
    const { tries, maxTries, checkSolution } = this.props;
    const { solution } = this.state;
    return (
      <div className="Solution">
        {/* <div className="Solution-counter">
          <Counter {...{ tries, maxTries }} />
        </div> */}
        <div className="Solution-buttons">
          <Buttons
            solution={solution}
            toggleButton={this.toggleButton.bind(this)}
          />
        </div>
        <div className="Solution-action">
          <button type="button" onClick={checkSolution.bind(this, solution)}>
            Svara
          </button>
        </div>
      </div>
    );
  }
}

export default Solution;
