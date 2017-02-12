import React from 'react';

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

    const tileWidth = window.innerWidth / this.props.tilesInRow;
    const rowCount = Math.ceil(window.innerHeight / tileWidth);

    console.log (rowCount);
    for (var row = 0; row < rowCount; row++) {
      for (var col = 0 ; col < this.props.tilesInRow ; col++) {
        const style = {
          'top' : row * tileWidth+'px',
          'width': tileWidth+'px',
          'height': tileWidth+'px',
          'left' : tileWidth * col
        };
        tilesObjects.push({style});
      }
    }
    return tilesObjects.map((style) => {
      console.log (style);
      return (<div className="MapGridElement" style={style.style}></div>);
    });
  }
}

export default MapGrid;

