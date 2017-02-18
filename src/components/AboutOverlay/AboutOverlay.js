import React from 'react';

import './AboutOverlay.css';

import $ from 'jquery';

/**
 * Main Component responsible for drawing the chernoffling
 */
export default class AboutOverlay extends React.Component {

  render() {
    return (
      <div className="AboutOverlay">
        {this.props.close ? <div onClick={this.props.close} className="AboutOverlay__close">&times;</div> : null }
        <div>
          <h1>About</h1>
        </div>
      </div>
    );
  }
}
