import React, { Component } from 'react';
import './Buttons.css';

import Sign from './Sign';

class Buttons extends Component {
  render() {
    const { solution, toggleBar } = this.props;
    return (
      <div className="Buttons">
        <Sign state={solution} barClick={toggleBar} />
      </div>
    );
  }
}

export default Buttons;
