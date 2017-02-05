import React from 'react';

import map from '../../img/svgMap.svg';

import SVGInline from "react-svg-inline";

import './Map.css';

/**
 * The Map on which the tweets are shown
 */
class Map extends React.Component {
  render() {
    return (
      <div className="Map">
        
        <SVGInline svg={map} className="Map__svg" />

      </div>
    );

  }
}

export default Map;

