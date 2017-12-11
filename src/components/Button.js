import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    const { className, inactive, children, onClick, type } = this.props;
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
        onClick={onClick.bind(this)}
        className={classes.join(' ')}
      >
        {children}
      </button>
    );
  }
}

export default Button;
