import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {
  render() {
    const { testLength, setLength, toggleFullscreen, close } = this.props;

    return (
      <div className="Settings">
        <section>
          <p>Teststeg:</p>
          <div className="Settings-buttonGroup">
            <button onClick={setLength.bind(this, 1)}>1</button>
            <button onClick={setLength.bind(this, 3)}>3</button>
            <button onClick={setLength.bind(this, 5)}>5</button>
          </div>
        </section>
        <section>
          <p>Fullskärm:</p>
          <button onClick={toggleFullscreen.bind(this)}>Toggla</button>
        </section>

        <section>
          <button onClick={close.bind(this)}>Stäng</button>
        </section>
      </div>
    );
  }
}

export default Settings;
