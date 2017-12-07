import React, { Component } from 'react';
import './Problem.css';

import Sign from './Sign';

class Problem extends Component {
  constructor() {
    super();
    this.state = {
      problemHash: 'qwerty',
      signs: []
    };
  }
  makeSigns(problem) {
    let signs = [];
    problem.map((pair, index) => {
      for (let i = 0; i < pair.length; i++) {
        let sign = pair[i];
        signs.push(sign);
      }
      return true;
    });
    return signs;
  }
  getSolution(sign1, sign2) {
    return sign1.map((value, i) => {
      return Math.abs(value - sign2[i]);
    });
  }
  render() {
    const problem = this.props.problem;
    return (
      <div className="Problem">
        {problem.map((signs, i) => {
          return signs.map((state, index) => {
            if (index % 2) {
              let els = [<Sign key={index} state={state} />];
              if ((i + 1) / 3 === 1) {
                els.push(<div key="missing" className="Problem-missing" />);
              } else {
                const solution = this.getSolution(...signs);
                els.push(
                  <Sign
                    key={'solution' + Math.round(index / 3)}
                    state={solution}
                  />
                );
              }
              return els;
            } else {
              return <Sign key={index} state={state} />;
            }
          });
        })}
      </div>
    );
  }
}

export default Problem;
