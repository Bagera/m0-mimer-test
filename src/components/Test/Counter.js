import React, { Component } from 'react';
import './Counter.css';

class Counter extends Component {
  render() {
    const { step, testLength } = this.props;
    const part = step / testLength;
    const radius = 100;
    const strWidth = 8;
    const circumference = 2 * (radius - strWidth) * Math.PI;

    const progressBgStyle = {
      strokeWidth: strWidth
    };
    const progressStyle = {
      strokeWidth: strWidth,
      strokeDasharray: ` ${part * circumference}, ${(1 - part) * circumference}`
    };
    const circleStyle = {
      filter: 'blur(strWidth * 3)'
    };

    return (
      <svg
        className="Counter"
        viewBox={'0 0 ' + radius * 2 + ' ' + radius * 2}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="svgBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={strWidth * 2} />
        </filter>
        <circle
          className="Counter-progressBg"
          cx={radius}
          cy={radius}
          r={radius - strWidth}
          style={progressBgStyle}
        />
        <circle
          className="Counter-progress"
          cx={radius}
          cy={radius}
          r={radius - strWidth}
          style={progressStyle}
        />
        <circle
          className="Counter-color"
          cx={radius}
          cy={radius}
          r={radius - strWidth * 4}
          style={circleStyle}
        />
        <circle
          className="Counter-bg"
          cx={radius}
          cy={radius}
          r={radius - strWidth * 8}
          filter="url(#svgBlur)"
        />
        <text x="50%" y="50%" dy="0.33em" className="Counter-text">
          {step}
        </text>
      </svg>
    );
  }
}

export default Counter;
