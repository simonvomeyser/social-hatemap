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
    this.renderTiles(this.props.config);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({gridElements: []});
    this.renderTiles(nextProps.config);
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
  renderTiles(config) {
    const tileWidth = 100 / config.size;
    const gridElements = this.createGridElementArray(config);

    gridElements.forEach((e, i) => {
      // Increases each cycle
      const delay = (50/ config.size)*i; 

      // Add GirdElements to state piece by piece with delay
      setTimeout(() => {
        const newGridElements = [...this.state.gridElements];

        newGridElements.push(
          <MapGridElement 
            key={"MapGridElement"+e.row+e.col} 
            row={e.row}
            col={e.col}
            tileWidth={tileWidth}
            opacity={config.opacity} />
        );

        this.setState({gridElements: newGridElements});
      }, delay);
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

