import React from 'react';

import './MapGridElement.css';

/**
 * A single "Tile" of a grid, contains chernoffling
 */
class MapGridElement extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tileWidth : props.tileWidth,
      left      : props.tileWidth * props.col,
      top       : props.tileWidth * props.row,
    } 
  }

  render() {
    return (
      <div className="MapGridElement" style={this.createStyleObject()}>
      </div>
    );
  }
  createStyleObject() {
    return {
      'width'      : this.state.tileWidth+'%',
      'left'       : this.state.left+'%',
      'marginTop'  : this.state.top+'%',       // simulates top/width ratio 1             : 1
      'paddingTop' : this.state.tileWidth+'%', // simulates height/width ratio 1 : 1
      'opacity'    : this.props.opacity
    };
  }

}

export default MapGridElement;