import React, { Component } from 'react';
import './Solution.css';

import Counter from './Counter';
import Buttons from './Buttons';
import Button from '../Button';

const toggle = new Audio(process.env.PUBLIC_URL + 'audio/toggle.mp3');

class Solution extends Component {
  handleToggle(index) {
    toggle.currentTime = 0;
    toggle.play();
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
            <Button type="button" onClick={checkSolution.bind(this, solution)}>
              Svara
            </Button>
          </div>
        </aside>
      </div>
    );
  }
}

export default Solution;
