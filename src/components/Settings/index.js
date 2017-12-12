import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faUndo,
  faTimesCircle,
  faExpand
} from '@fortawesome/fontawesome-pro-regular';
import './Settings.css';

import Button from '../Button';

const lengths = [1, 3, 5];

class Settings extends Component {
  render() {
    const {
      testLength,
      setLength,
      resetTest,
      toggleFullscreen,
      close
    } = this.props;

    return (
      <div className="Settings">
        <section>
          <p>Teststeg:</p>
          <div className="Settings-buttonGroup">
            {lengths.map(count => {
              return (
                <Button
                  key={'button-' + count}
                  inactive={count !== testLength}
                  onClick={setLength.bind(this, count)}
                >
                  {count}
                </Button>
              );
            })}
          </div>
          <p>Återställ test:</p>
          <Button type="button" onClick={resetTest.bind(this)}>
            <FontAwesomeIcon icon={faUndo} /> Börja om
          </Button>
        </section>
        <section>
          <p>Fullskärm:</p>
          <Button type="button" onClick={toggleFullscreen.bind(this)}>
            <FontAwesomeIcon icon={faExpand} /> Expandera
          </Button>
        </section>

        <section className="Settings-section-close">
          <Button type="button" onClick={close.bind(this)}>
            <FontAwesomeIcon icon={faTimesCircle} /> Stäng
          </Button>
        </section>
      </div>
    );
  }
}

export default Settings;
