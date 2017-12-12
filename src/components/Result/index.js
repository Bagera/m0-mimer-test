import React, { Component } from 'react';
import './Result.css';

const audio = {
  calculate: new Audio(process.env.PUBLIC_URL + 'audio/calculate.mp3'),
  success: new Audio(process.env.PUBLIC_URL + 'audio/success.mp3'),
  failure: new Audio(process.env.PUBLIC_URL + 'audio/failure.mp3')
};

class Result extends Component {
  constructor() {
    super();
    this.state = {
      calculated: false
    };
  }
  componentDidMount() {
    const { status } = this.props;
    audio.calculate.currentTime = 0;
    audio.calculate.play();
    this.timeout = setTimeout(() => {
      this.setState({ calculated: true });
      audio.calculate.pause();
      if (status === 'solved') {
        audio.success.currentTime = 0;
        audio.success.play();
      } else {
        audio.failure.currentTime = 0;
        audio.failure.play();
      }
    }, 4250);
  }
  componentWillUnmount() {
    audio.calculate.pause();
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
  render() {
    const { status } = this.props;
    const { calculated } = this.state;
    let className = 'Result';
    let title = 'Utvärderar';
    let msg = 'Väntar på svar';
    if (calculated) {
      title = 'Utvärdering avslutad';
      className += ' Result-calculated';
      if (status === 'solved') {
        msg = 'Status 57: Tecken på mänsklig intelligens';
        className += ' Result-solved';
      } else {
        msg = 'Status 83: Intelligens kan ej fastslås';
        className += ' Result-failed';
      }
    }
    return (
      <div className={className}>
        <div className="Result-modal">
          <h2>{title}</h2>
          <div className="Result-progress">
            <div className="Result-bar" />
          </div>
          <p className="Result-msg">{msg}</p>
        </div>
      </div>
    );
  }
}

export default Result;
