import React from 'react';

import './MapGridElement.css';

/**
 * A single "Tile" of a grid, contains chernoffling
 */
class MapGridElement extends React.Component {

  render() {
    const {tileWidth, col, row} = {...this.props};
    
    // Calculate style of current element (pos depends on row/col)
    const style = {
      'width': tileWidth+'%',
      'marginTop': row*tileWidth+'%', // simulates top/width ratio 1:1
      'paddingTop': tileWidth+'%', // simulates height/width ratio 1:1
      'left' : tileWidth * col+'%'
    };
    return (
      <div className="MapGridElement" style={style}>
      </div>
    );
  }
}

export default MapGridElement;