import React, { Component } from 'react';
import './Buttons.css';

import Sign from './Sign';

class Buttons extends Component {
  render() {
    const { solution, toggleButton } = this.props;
    return (
      <div className="Buttons">
        <Sign state={solution} barClick={toggleButton} />
      </div>
    );
  }
}

export default Buttons;
