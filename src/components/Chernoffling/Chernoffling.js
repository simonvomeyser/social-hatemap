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
  componentDidMount() {

    this.draw(this.props);
  }
  componentWillReceiveProps(nextProps) {

    this.draw(this.props);
  }
  render() {
    return (
      <div className="Chernoffling">
        <div className="Chernoffling__svg">
          <SVGInline svg={monster} />
          <SVGInline svg={star} />
        </div>
      </div>
    );
  }
  /**
   * Main function used to draw the creature
   */
  draw(params) {


    // Size controlles by number of posts
    let size;
    if (params.posts < 20) {
      size = 20;
    } else if(params.posts < 100) {
      size = params.posts;
    } else {
      size = 100;
    }
    $('#monster').css({
      width: size+"%",
      heigth: size+"%" 
    });

    // star size controlled by percentage of all posts
    const $star = $('#star').css({
          width: params.percentage+"px",
          heigth: params.percentage+"px" 
        });

    // Color controlled by anger
    if (params.anger > 50) {
      $('.cls-3').css({fill: "#fd6137"});
    }
    else if (params.anger < 50) {
      $('.cls-3').css({fill: "#18beff"});

    } else {
      $('.cls-3').css({fill: ""});
    }

  }
}
