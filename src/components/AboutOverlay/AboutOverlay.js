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
        <div class="wrapper">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-12">
                <h1>About Social Map</h1>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
