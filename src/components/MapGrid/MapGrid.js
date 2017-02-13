import React from 'react';
import './MapGrid.css';
import MapGridElement from '../MapGrid/MapGridElement';

import './MapGrid.css';

/**
 * The Map on which the tweets are shown
 */
class MapGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridElements : [],
      areAllElementsRendered: false
    };
  }
  render() {
    return (
      <div className="MapGrid">
        {this.renderGridElements(this.props.config)}
      </div>
    );
  }
  /**
   * @return {jsx} 
   */
  renderGridElements(config) {
    const tileWidth = 100 / config.size;
    const gridElements = this.createGridElementArray(config);

    return gridElements.map((e,i) => {
      // Increases each cycle @todo
      const delay = (50/ config.size)*i; 
      return (
        <MapGridElement 
          key={"MapGridElement"+e.row+e.col} 
          row={e.row}
          col={e.col}
          tileWidth={tileWidth}
          opacity={config.opacity} />);          
    });

  }

  /**
   * Creates an Array of Objects representing all elemnts in grid 
   * @return {Array} Of Objects with row/col number
   */
  createGridElementArray(config) {
    const rowCount = Math.ceil(window.innerHeight / (window.innerWidth / config.size));
    const gridElements = [];

    for (var col = 0 ; col < config.size ; col++) {
      for (var row = 0; row < rowCount; row++) {
        gridElements.push({row, col});
      }
    }
    return gridElements;
  }
}

export default MapGrid;

