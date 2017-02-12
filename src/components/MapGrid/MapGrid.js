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
  componentDidMount() {
    this.renderTiles();
  }
  render() {
    return (
      <div className="MapGrid">
        {this.state.gridElements.map((e) => e)}   
      </div>
    );
  }
  /**
   * Complicated way to render tiles "one after another"
   * @return {jsx} 
   */
  renderTiles() {
    const tileWidth = 100 / this.props.tilesInRow;
    const gridElements = this.createGridElementArray();

    gridElements.forEach((e, i) => {
      // Increases each cycle
      const delay = (10+i/2)*i; 

      // Add GirdElements to state piece by piece with delay
      setTimeout(() => {
        const newGridElements = [...this.state.gridElements];

        newGridElements.push(
          <MapGridElement 
            key={"MapGridElement"+e.row+e.col} 
            row={e.row}
            col={e.col}
            tileWidth={tileWidth} />
        );

        this.setState({
          gridElements: newGridElements,
          areAllElementsRendered: i === gridElements.lenght-1
        });
      }, delay);
    });
  }

  /**
   * Creates an Array of Objects representing all elemnts in grid 
   * @return {Array} Of Objects with row/col number
   */
  createGridElementArray() {
    const rowCount = Math.floor(window.innerHeight / (window.innerWidth / this.props.tilesInRow));
    const gridElements = [];

    for (var col = 0 ; col < this.props.tilesInRow ; col++) {
      for (var row = 0; row < rowCount; row++) {
        gridElements.push({row, col});
      }
    }
    return gridElements;
  }
}

export default MapGrid;

