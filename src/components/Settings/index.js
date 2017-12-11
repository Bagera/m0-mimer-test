import React, { Component } from 'react';
import './Settings.css';

import Button from '../Button';

const lengths = [1, 3, 5];

class Settings extends Component {
  render() {
    const { testLength, setLength, toggleFullscreen, close } = this.props;

    return (
      <div className="Settings">
        <section>
          <p>Teststeg:</p>
          <div className="Settings-buttonGroup">
            {lengths.map(count => {
              return (
                <Button
                  inactive={count !== testLength}
                  onClick={setLength.bind(this, count)}
                >
                  {count}
                </Button>
              );
            })}
          </div>
        </section>
        <section>
          <p>Fullskärm:</p>
          <Button type="button" onClick={toggleFullscreen.bind(this)}>
            Toggla
          </Button>
        </section>

        <section>
          <Button type="button" onClick={close.bind(this)}>
            Stäng
          </Button>
        </section>
      </div>
    );
  }
}

export default Settings;
