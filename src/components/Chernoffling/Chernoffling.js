import React from 'react';

import './Chernoffling.css';
import SVG from 'svg.js';

/**
 * Main Component responsible for drawing the chernoffling
 */
export default class Chernoffling extends React.Component {
  constructor(props) {
    super(props);
  
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }
  componentDidMount() {

    const chernoffling = {...this.draw(this.props)};
    this.setState({c: chernoffling}); 
  }
  componentWillReceiveProps(nextProps) {
    // Remove old chernoffling
    this.removeChernoffling();

    // Create a new one with new props
    const newChernoffling = {...this.draw(nextProps)};
    this.setState({c: newChernoffling}); 
  }
  removeChernoffling() {
    this.state.c.canvas.remove();
    this.setState({c : null});
  }
  componentWillUnmount() {
    this.removeChernoffling();
  }
  render() {
    return (
      <div className="Chernoffling">
        <div className="Chernoffling__svg" id="Chernoffling__svg1"></div>
      </div>
    );
  }
  /**
   * Main function used to draw the creature
   * 
   * Doc: https://svgdotjs.github.io/
   */
  draw(params) {

    let size;

    if (params.posts < 20) {
      size = 20;
    } else if(params.posts < 100) {
      size = params.posts;
    } else {
      size = 100;
    }

    const c = {};
    c.canvas = SVG('Chernoffling__svg1').size(size+'%', size+'%');
    c.rect = c.canvas.circle('100%', '100%').attr({ fill: 'grey' });
    c.eyeLeft = c.canvas.ellipse('15%', '15%').attr({ fill: '#343434', 'cx' : '25%', 'cy' : '35%' });
    c.rightLeft = c.canvas.ellipse('15%', '15%').attr({ fill: '#343434', 'cx' : '75%', 'cy' : '35%' });    

    // Mouth example:
    const normalMouthPosition = 75; // where mouth is like "meh" meaning 50% anger
    const defaultAngerLevel =  50; 
    const differnceFactorToAngerLevel =  normalMouthPosition / defaultAngerLevel; 
    const moveMouthBy = (params.anger * differnceFactorToAngerLevel - normalMouthPosition) / -7;
    const mouthPosition = (normalMouthPosition + moveMouthBy);
    c.rect.fill();
    // With 50%, mouth position should be 65%
    // With 75%

    c.mouthLeft = c.canvas.line('15%', normalMouthPosition+'%','50%',  mouthPosition+'%').stroke({ width: '5%' });
    c.mouthRight = c.canvas.line('50%', mouthPosition+'%','85%', normalMouthPosition+'%').stroke({ width: '5%' });

    return c;
  }
}
