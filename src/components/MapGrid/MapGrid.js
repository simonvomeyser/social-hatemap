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
    const gridElements = [];

    const tileWidth = 100 / this.props.tilesInRow;
    const rowCount = Math.ceil(window.innerHeight / (window.innerWidth / this.props.tilesInRow));
    
    console.log (rowCount);

    for (var row = 0; row < rowCount; row++) {
      for (var col = 0 ; col < this.props.tilesInRow ; col++) {
        gridElements.push({row, col});
      }
    }

    return gridElements.map((rowCol) => {
      return (<MapGridElement {...rowCol} tileWidth={tileWidth} />);
    });
  }
}

export default MapGrid;

