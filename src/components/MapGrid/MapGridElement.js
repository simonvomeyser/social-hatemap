import React from 'react';

import './MapGridElement.css';

/**
 * A single "Tile" of a grid, contains chernoffling
 */
class MapGridElement extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tileWidth            : props.tileWidth,
      left                 : props.tileWidth * props.col,
      top                  : props.tileWidth * props.row,
      containedSHMEntities : []
    } 
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.setState({
      containedSHMEntities : this.getContainedSHMEntities()
    })
  }

  render() {
    return (
      <div onClick={this.handleClick} className="MapGridElement" ref={(htmlElement) => { this.htmlElement = htmlElement; }} style={this.getStyleObject()}>
        <div className="MapGridElement__number">
          {this.state.containedSHMEntities.length} <br/>
        </div>
      </div>
    );
  }
  handleClick() {
    console.log (this.state);
    console.log (this.getActualWindowPosition());
  }
  /**
   * @return {object} Style object for the dynamic css styles
   */
  getStyleObject() {
    return {
      'width'      : this.state.tileWidth+'%',
      'left'       : this.state.left+'%',
      'marginTop'  : this.state.top+'%',       // simulates top/width ratio 1 : 1
      'paddingTop' : this.state.tileWidth+'%', // simulates height/width ratio 1 : 1
      'opacity'    : this.props.opacity
    };
  }
  /**
   * [getContainedSHMEntities description]
   * @return {Array} All SHMEntities inside of this MapGridElement
   */
  getContainedSHMEntities() {
    return this.props.SHMEntities.filter((element) => {
      const entityLeft = element.location.x.replace('%', '');
      const entityTop = element.location.y.replace('%', '');

      const {actualTop, actualLeft, actualWidth, actualHeight} = {...this.getActualWindowPosition()};

      
      if ((entityLeft >= actualLeft && entityLeft < actualLeft+actualWidth) &&
          (entityTop >= actualTop && entityTop < actualTop+actualHeight)) {
        return true;
      }
      return false;


    });
  }

  /**
   * Returns the actual window position of the GridElement in percent
   * Needed because the GridElements are positioned using their own width as height via padding
   * @return {object} {top, left, bottom, right}
   */
  getActualWindowPosition() {

    return {
      actualLeft   : this.props.tileWidth * this.props.col,
      actualWidth  : this.props.tileWidth,
      actualTop    : this.htmlElement.offsetTop / this.props.mapGridHeight * 100,
      actualHeight : this.htmlElement.offsetHeight / this.props.mapGridHeight * 100,
    };
  }

}

export default MapGridElement;