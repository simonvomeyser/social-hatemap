import React from 'react';

import './Chernoffling.css';
import monster from './monster.svg';
import star from './star.svg';

import $ from 'jquery';

import SVGInline from "react-svg-inline";
/**
 * Main Component responsible for drawing the chernoffling
 */
export default class Chernoffling extends React.Component {
  /**
   * Do actual drawing and displaying after mounting and recieving props
   */
  componentDidMount() {
    this.draw(this.props);
  }
  /**
   * Do actual drawing and displaying after mounting and recieving props
   */
  componentWillReceiveProps(nextProps) {
    this.draw(nextProps);
  }
  render() {
    return (
      <div id={this.props.id} style={this.getAnimationStyle()} className="Chernoffling">
        <div className="Chernoffling__svg">
          <SVGInline svg={monster} />
          <SVGInline svg={star} />
        </div>
      </div>
    );
  }

  /**
   * Returns style object for chernofflings animation
   * @return {object} [description]
   */
  getAnimationStyle(){
    const animationStyle = {};

    // Calculate duration, starts depending when the parent is "finshed"
    animationStyle.animationDuration = (+(Math.random().toFixed(2))+this.props.parentAnimationDuration)  + "s";

    // Unset complete anmiation when no duration given
    if (!this.props.parentAnimationDuration) { 
      animationStyle.animation = "";      
    }

    return animationStyle;

  }
  /**
   * Main function used to draw the creature
   */
  draw(params) {
    // Get svgs inside of this chernoffling only
    const id =  this.props.id;
    const $monster =  $('#'+id).find("svg#monster");
    const $star =  $('#'+id).find("svg#star");

    // Size controlles by number of posts
    let size;
    if (params.posts < 20) {
      size = 20;
    } else if(params.posts < 100) {
      size = params.posts;
    } else {
      size = 100;
    }
    $monster.css({
      width: size+"%",
      heigth: size+"%" 
    });

    var favouritesValue = parseInt(params.favourites);
    // star size controlled by percentage of all posts
    let width=0, height=0;
    if (favouritesValue > 1000) {
      width = "100px";
      height = "100px";
    } else if (favouritesValue > 100) {
      width = "50px";
      height = "50px";
    } else {
      width = 0;
      height = 0;
    }  
    $star.css({
      width: width,
      heigth: height
    });
    // Color controlled by sentiment
    var sentimentValue = (parseFloat(params.sentiment)+1)*50;
    $monster.find(".cls-3" ).css({
      fill: this.numberToColorHsl(sentimentValue)
    });
    // console.log(params.sentiment, sentimentValue, typeof sentimentValue);
  }

  numberToColorHsl(i) {
    // as the function expects a value between 0 and 1, and red = 0° and blue = 240°
    // we convert the input to the appropriate hue value
    var hue = i * 2.4 / 360;
    // we convert hsl to rgb (saturation 100%, lightness 50%)
    var rgb = this.hslToRgb(hue, 1, .5);
    // we format to css value and return
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')'; 
  }
  /**
   * Converts an HSL color value to RGB. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes h, s, and l are contained in the set [0, 1] and
   * returns r, g, and b in the set [0, 255].
   *
   * @param   {number}  h       The hue
   * @param   {number}  s       The saturation
   * @param   {number}  l       The lightness
   * @return  {Array}           The RGB representation
   */
  hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
}


