import React from 'react';

import './Chernoffling.css';
import SVG from 'svg.js';

/**
 * Main Component responsible for drawing the chernoffling
 */
export default class Chernoffling extends React.Component {
  componentDidMount() {
    var draw = SVG('Chernoffling__svg1').size('100%', '100%');
    var rect = draw.circle('100%', '100%').attr({ fill: '#f06' });
  }
  render() {
    return (
      <div className="Chernoffling">
        <div className="Chernoffling__svg" id="Chernoffling__svg1"></div>
      </div>
    );
  }
}
