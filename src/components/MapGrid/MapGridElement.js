import React from 'react';
import Chernoffling from '../Chernoffling/Chernoffling';

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
      opacity              : props.opacity,
      containedSHMEntities : []
    } 
    this.handleClick = this.handleClick.bind(this);
  }
  /**
   * Add Elements only after mounting because own size must be clalculated
   */
  componentDidMount() {
    this.setState({
      containedSHMEntities : this.getContainedSHMEntities()
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log (nextProps.opacity);
    this.setState({opacity: nextProps.opacity})
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log (`MapGridElement will update`);
  }

  render() {
    const chernofflingData = {
      // Tweet properties
      'sentiment' : Math.random() * 2 - 1 , // -1 = negative, 0 = neutral, +1 = positive
      'amplitude' : 0, // intensity: 0 = low, 1 = high
      'favourites' : 0, // 0 = low, ∞ = high
      // User properties
      'gender': .0,  // 0 = male, 1 = female
      'age' : 0,
      'followers' : 0,
    }
    console.log (chernofflingData);
    return (
      <div onClick={this.handleClick} className="MapGridElement" ref={(htmlElement) => { this.htmlElement = htmlElement; }} style={this.getStyleObject()}>
        {this.state.containedSHMEntities.length > 0 ? <Chernoffling {...chernofflingData}/>: null}        
      </div>
    );
  }
  handleClick() {
    // @todo debug, remove
    console.log (this.state);
    console.log (this.getActualWindowPosition());
  }

  /**
   * Get the style to position the grid element
   * @return {object} Style object for the dynamic css styles
   */
  getStyleObject() {
    return {
      'width'           : this.state.tileWidth+'%',
      'left'            : this.state.left+'%',
      'marginTop'       : this.state.top+'%',       // simulates top/width ratio 1    : 1
      'paddingTop'      : this.state.tileWidth+'%', // simulates height/width ratio 1 : 1
      'borderColor' : `rgba(255,255,255,${this.state.opacity}`
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
   * Returns the position and size of the GridElement in percent
   * Needed because the GridElements are positioned using their own width as height via padding
   * @return {object} {actualTop, actualLeft, actualHeight, actualWidth}
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