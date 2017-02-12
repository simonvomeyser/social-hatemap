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
  /**
   * @return {jsx} 
   */
  renderTiles() {
    const tileWidth = 100 / this.props.tilesInRow;
    const gridElements = this.createGridElementArray();

    return gridElements.map((e) => {
      return (<MapGridElement key={"MapGridElement"+e.row+e.col} {...e} tileWidth={tileWidth} />);
    });
  }

  /**
   * Creates an Array of Objects representing all elemnts in grid 
   * @return {Array} Of Objects with row/col number
   */
  createGridElementArray() {
    const rowCount = Math.ceil(window.innerHeight / (window.innerWidth / this.props.tilesInRow));
    const gridElements = [];

    for (var row = 0; row < rowCount; row++) {
      for (var col = 0 ; col < this.props.tilesInRow ; col++) {
        gridElements.push({row, col});
      }
    }
    return gridElements;
  }
}

export default MapGrid;

