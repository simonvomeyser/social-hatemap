import React from 'react';

import './Chernoffling.css';
import SVG from 'svg.js';

/**
 * Main Component responsible for drawing the chernoffling
 */
export default class Chernoffling extends React.Component {
  componentDidMount() {
    const chernoffling = {...this.drawBasicChernoffling()};
    this.setState(chernoffling: chernoffling);
  }
  componentWillReceiveProps(nextProps) {
    console.log ("will recive props"); //Debug
    const chernoffling = this.state.chernoffling;
    console.log (chernoffling); //Debug
  }
  componentDidUpdate(prevProps, prevState) {
    console.log ("update"); //Debug

    // var mouthLeft = draw.line('15%', '65%','50%',  '85%').stroke({ width: '5%' });
    // var mouthRight = draw.line('50%', '85%','85%', '65%').stroke({ width: '5%' });
    // this.setState({draw:draw});
    // // Draw basic chernoffling
    // console.log ("mount"); //Debug
    // Mout depends on anger
    // var mouthAltering = 50 - this.props.anger;
  }
  componentWillUnmount() {

  }
  render() {
    return (
      <div className="Chernoffling">
        <div className="Chernoffling__svg" id="Chernoffling__svg1"></div>
      </div>
    );
  }
  drawBasicChernoffling() {
    const basicChernoffling = {};
    basicChernoffling.canvas = SVG('Chernoffling__svg1').size('100%', '100%');
    basicChernoffling.rect = basicChernoffling.canvas.circle('100%', '100%').attr({ fill: 'grey' });
    basicChernoffling.eyeLeft = basicChernoffling.canvas.ellipse('30%', '20%').attr({ fill: '#343434', 'cx' : '25%', 'cy' : '35%' });
    basicChernoffling.rightLeft = basicChernoffling.canvas.ellipse('30%', '20%').attr({ fill: '#343434', 'cx' : '75%', 'cy' : '35%' });    
    return basicChernoffling;
  }
}
