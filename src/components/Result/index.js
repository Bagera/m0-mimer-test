import React, { Component } from 'react';
import './Result.css';

class Result extends Component {
  constructor() {
    super();
    this.state = {
      calculated: false
    };
  }
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ calculated: true });
    }, 4250);
  }
  componentWillUnmount() {
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
