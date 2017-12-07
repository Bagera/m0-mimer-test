import React, { Component } from 'react';
import './SignBar.css';

class SignBar extends Component {
  handleClick(index) {
    if (this.props.onClick) {
      this.props.onClick(index);
    }
  }
  render() {
    const { active, index } = this.props;
    let className = 'SignBar SignBar-' + (index + 1);
    if (active) {
      className += ' SignBar-active';
    }
    return (
      <li className={className} onClick={this.handleClick.bind(this, index)} />
    );
  }
}

export default SignBar;
