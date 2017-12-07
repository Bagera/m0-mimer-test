import React, { Component } from 'react';
import SignBar from './SignBar';
import './Sign.css';

class Sign extends Component {
  handleBarClick(index) {
    if (this.props.barClick) {
      this.props.barClick(index);
    }
  }
  render() {
    return (
      <div className="Sign">
        <ul className="Sign-bars">
          {this.props.state.map((active, index) => {
            return (
              <SignBar
                key={index}
                active={active}
                index={index}
                onClick={this.handleBarClick.bind(this)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Sign;
