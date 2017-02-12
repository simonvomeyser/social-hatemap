import React from 'react';
import './MapGrid.css';
import MapGridElement from '../MapGrid/MapGridElement';

import './MapGrid.css';

/**
 * The Map on which the tweets are shown
 */
class MapGrid extends React.Component {
  render() {
    return (
      <div className="MapGrid">
        {this.renderTiles()}    
      </div>
    );
  }
  renderTiles() {
    const tilesObjects = [];

    const tileWidth = 100 / this.props.tilesInRow;
    const rowCount = Math.ceil(window.innerHeight / tileWidth);

    for (var row = 0; row < rowCount; row++) {
      for (var col = 0 ; col < this.props.tilesInRow ; col++) {
        const style = {
          'width': tileWidth+'%',
          'marginTop': row*tileWidth+'%', // simulates top/width ratio 1:1
          'paddingTop': tileWidth+'%', // simulates height/width ratio 1:1
          'left' : tileWidth * col+'%'
        };
        tilesObjects.push({style});
      }
    }
    return tilesObjects.map((data) => {
      return (<MapGridElement data={data} />);
    });
  }
}

export default MapGrid;

