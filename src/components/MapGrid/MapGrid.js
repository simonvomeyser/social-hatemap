import React from 'react';
import './MapGrid.css';
import MapGridElement from '../MapGrid/MapGridElement';

import './MapGrid.css';

/**
 * The Grid "over" the Map, contains Elements in which the chernofflings are shown
 */
class MapGrid extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      gridElements: []
    }
  }
  render() {
    return (
      <div className="MapGrid" ref={(htmlElement) => { this.htmlElement = htmlElement; }}>
        {this.state.gridElements.map((e) => e)}
      </div>
    );
  }
  /**
   * Adds the gridElements to state after Mounting so we can calculate the height
   * (Need for later calculation of SHMEntities position in Grid Elements)
   * @return {[type]} [description]
   */
  componentDidMount() {
    const mapGridHeight = this.htmlElement.offsetHeight;
    this.fillGridElements(mapGridHeight);
  }
  /**
   * Adds Grid elements to state so they can be rendered
   */
  fillGridElements(mapGridHeight) {
    const config = this.props.config;
    const tileWidth = 100 / config.size;
    const gridElementsObjects = this.createGridElementArray(config);

    const gridElementsJSX = gridElementsObjects.map((e,i) => {
      // Increases each cycle @todo
      const delay = 50*i; 
      return (
        <MapGridElement 
          key={"MapGridElement"+e.row+e.col} 
          row={e.row}
          col={e.col}
          tileWidth={tileWidth}
          SHMEntities={this.props.SHMEntities}
          mapGridHeight={mapGridHeight}
          opacity={config.opacity} />);          
    });

    this.setState({gridElements : gridElementsJSX});

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

