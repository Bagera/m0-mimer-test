import React, { Component } from 'react';
import './Button.css';

const clickSound = new Audio(process.env.PUBLIC_URL + 'audio/toggle.mp3');

class Button extends Component {
  handleClick() {
    clickSound.currentTime = 0;
    clickSound.play();
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    const { className, inactive, children, type } = this.props;
    let classes = ['Button'];
    if (className) {
      classes.push(className);
    }
    if (inactive) {
      classes.push('Button-inactive');
    }
    return (
      <button
        type={type}
        onClick={this.handleClick.bind(this)}
        className={classes.join(' ')}
      >
        {children}
      </button>
    );
  }
}

export default Button;
