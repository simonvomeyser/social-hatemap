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
      gridElements: [],
      config: props.config
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
    this.fillGridElements(this.state.config);
  }
  componentWillReceiveProps(nextProps) {

    this.setState({
      gridElements: [],
      config: nextProps.config
    })
    setTimeout(()=>{
      this.fillGridElements(nextProps.config);
    }, 100);
  }
  /**
   * Adds Grid elements to state so they can be rendered
   */
  fillGridElements(config) {
    const mapGridHeight = this.htmlElement.offsetHeight;
    const tileWidth = 100 / config.size;
    const gridElementsObjects = this.createGridElementArray(config);

    const gridElementsJSX = gridElementsObjects.map((e,i) => {
      return (
        <MapGridElement 
          key={`MapGridElement-${e.row}-${e.col}`} 
          id={`${e.row}-${e.col}`} 
          row={e.row}
          col={e.col}
          tileWidth={tileWidth}
          SHMEntities={this.props.SHMEntities}
          mapGridHeight={mapGridHeight}
          opacity={config.opacity} />);   
    });

    this.setState({gridElements : gridElementsJSX});
    // this.props.doneRenderingGrid();
  }

  /**
   * Creates an Array of Objects representing all elemnts in grid 
   * @return {Array} Of Objects with row/col number
   */
  createGridElementArray(config) {
    const rowCount = Math.ceil(this.htmlElement.offsetHeight / (window.innerWidth / config.size));
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

