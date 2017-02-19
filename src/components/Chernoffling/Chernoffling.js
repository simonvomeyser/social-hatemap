import React from 'react';

import './Chernoffling.css';
import monster from './chernoff.svg'; //original: monster.svg

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

    // body controlled by gender variable
    $monster.find('.body').css('display','none');
    if (params.gender < .3) {
      $monster.find('.body#body_male').show();
    } else if(params.gender < .5) {
      $monster.find('.body#body_malish').show();
    } else if(params.gender < .6) {
      $monster.find('.body#body_neutral').show();
    } else if(params.gender < .8) {
      $monster.find('.body#body_femalish').show();
    } else if(params.gender < 1.1) {
      $monster.find('.body#body_female').show();
    } else {
      $monster.find('.body#body_neutral').show();
    }

    // horns controlled by age variable

    $monster.find('.horns').hide();
    if (params.age < 3) { // sehr jung
      
    } else if(params.age < 5) { // jung
      $monster.find('.horns#horns_small').show();
    } else if(params.age < 6) { // mittelalt
      $monster.find('.horns#horns_average').show();
    } else if(params.age < 8) { // alt
      $monster.find('.horns#horns_big').show();
    } else { // sehr alt
      $monster.find('.horns#horns_enormous').show();
    }

    // mouth and eyes controlled by sentiment & amplitude variables
    $monster.find('.mouth').hide();
    $monster.find('.eyes').hide();

    var sentiment = params.sentiment,
        amplitude = params.amplitude;


    if(amplitude < .5) { // niedrige Intensität
      if(sentiment < -(.6)) { // negativ
        $monster.find('.mouth#mouth_negative_medium').show();
        $monster.find('.eyes#eyes_negative').show();
      } else if(sentiment < -(.2)) { // medium negativ
        $monster.find('.mouth#mouth_negative_low').show();
        $monster.find('.eyes#eyes_negative').show();
      } else if(sentiment < .2) { // neutral
        $monster.find('.mouth#mouth_neutral_low').show();
        $monster.find('.eyes#eyes_mixed_low').show();
      } else if(sentiment < .6) { // medium positiv
        $monster.find('.mouth#mouth_positive_low').show();
        $monster.find('.eyes#eyes_positive').show();
      } else { // positive
        $monster.find('.mouth#mouth_positive_medium').show();
        $monster.find('.eyes#eyes_positive').show();
      }
    } else  { // hohe Intensität
      if(sentiment < -.6) { // negativ
        $monster.find('.mouth#mouth_negative_high').show();
        $monster.find('.eyes#eyes_negative').show();
      } else if(sentiment < -(.2)) { // medium negativ
        $monster.find('.mouth#mouth_negative_low').show();
        $monster.find('.eyes#eyes_negative').show();
      } else if(sentiment < .2) { // neutral
        $monster.find('.mouth#mouth_neutral_high').show();
        $monster.find('.eyes#eyes_mixed_high').show();
      } else if(sentiment < .2) { // medium positiv
        $monster.find('.mouth#mouth_positive_low').show();
        $monster.find('.eyes#eyes_positive').show();
      } else { // positive
        $monster.find('.mouth#mouth_positive_high').show();
        $monster.find('.eyes#eyes_positive').show();
      }
    } 

    // eyes controlled by sentiment variable

    if(sentiment === 0) { // neutral
      $monster.find('.eyes#eyes_neutral').show();
    } else if(sentiment < -.3) { // böse
      $monster.find('.eyes#eyes_negative').show();
    } else if(sentiment < .3) { // mixed
      $monster.find('.eyes#eyes_mixed').show();
    } else if(sentiment < 1.1) { // gut
      $monster.find('.eyes#eyes_positive').show();
    } else { // neutral
      $monster.find('.eyes#eyes_neutral').show();
    }


    // badge controlled by favourites variable
    $monster.find('.badge').hide();
    var badge = $monster.find('.badge'),
        favourites = params.favourites,
        fav_scale_factor = 0.5 + 0.5*favourites/100;

    if (favourites > .4) {
      badge.show();
    }



    if (params.age < 3) { // sehr jung
      badge.css('transform','scale('+ favourites + '%');
    } else if(params.age < 5) { // jung
      $monster.find('.horns#horns_small').show();
    } else if(params.age < 6) { // mittelalt
      $monster.find('.horns#horns_average').show();
    } else if(params.age < 8) { // alt
      $monster.find('.horns#horns_big').show();
    } else { // sehr alt
      $monster.find('.horns#horns_enormous').show();
    }


    // Size controlled by percentage of followers
    var followers_factor = params.followers/100,
        scale_factor = 0.5 + 0.8*followers_factor;


    $monster.css({
      'transform': 'translate(-50%,-50%) scale(' + scale_factor + ')'
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
    /*
    $star.css({
      width: width,
      heigth: height
    });
    */

    // Color controlled by sentiment
    var orig_sentimentValue = ((parseFloat(params.sentiment)+0.5))*100,
        sentimentValue = orig_sentimentValue;


    if(sentiment < -(0.5)) { // negative
      $monster.find(".body_shape").css({
        fill: this.numberToColorHsl(0)
      });
    } else if(sentiment < 0.5 ) { // neutral
      $monster.find(".body_shape").css({
        fill: this.numberToColorHsl(sentimentValue)
      });
    } else { // positive
      $monster.find(".body_shape").css({
        fill: this.numberToColorHsl(100)
      });
    }

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


