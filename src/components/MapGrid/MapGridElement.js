import React from 'react';
import Chernoffling from '../Chernoffling/Chernoffling';
import Overlay from '../Overlay/Overlay';
import Tweetlist from '../Tweetlist/Tweetlist';

import './MapGridElement.css';

// Time it takes to fade grid element in (seconds)
const animationDuration = 1.5

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
      containedSHMEntities : [],
      chernofflingData     : {},
      showOverlay          : false
    } 
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
  }
  /**
   * Add Elements only after mounting because own size must be clalculated
   */
  componentDidMount() {
    this.setState({
      containedSHMEntities : this.getContainedSHMEntities(),
      // @todo remove sample data
      chernofflingData : {'sentiment' : Math.random() * 2 - 1 , 'amplitude' : 0, 'favourites' : 0, 'gender': .0, 'age' : 0, 'followers' : 0,
    }
    });
  }
  render() {
    return (
      <div>
        {this.renderOverlay()}
        <div onClick={this.toggleOverlay} className="MapGridElement" ref={(htmlElement) => { this.htmlElement = htmlElement; }} style={this.getStyleObject()}>
          {this.state.containedSHMEntities.length > 0 ? 
            <Chernoffling
              id={"chernoffling-"+this.props.id}
              parentAnimationDuration={animationDuration}
              {...this.state.chernofflingData}/>
          : null}        
        </div>
      </div>
    );
  }
  toggleOverlay() {
    this.setState({showOverlay:!this.state.showOverlay});
  }
  renderOverlay() {
    if (this.state.showOverlay) {
      return (
        <Overlay close={this.toggleOverlay}>
          <div className="MapGridElement__overlayChernoffling">
            <Chernoffling 
              id={"overlaychernoffling-"+this.props.id}
              {...this.state.chernofflingData}/>
          </div>
          <div className="MapGridElement__overlayTweetList">
            <Tweetlist tweets={this.state.containedSHMEntities}/>
          </div>
        </Overlay>
      );
    }

    return null;
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
      'borderColor' : `rgba(255,255,255,${this.state.opacity}`,
      'animationDuration' : animationDuration+"s"
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