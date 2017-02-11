import React from 'react';

import map from '../../img/svgMapFull.svg';
import * as d3 from 'd3'; 

import SVGInline from "react-svg-inline";


import './Map.css';

/**
 * The Map on which the tweets are shown
 */
class Map extends React.Component {
  render() {
    return (
      <div className="Map">
        
        <div className="Map__svg-wrapper" ref={(mapSvgWrapper) => this.mapSvgWrapper = mapSvgWrapper }>
          <SVGInline svg={map} className="Map__svg" />
        </div>

      </div>
    );

  }
  componentDidUpdate() {
    if (this.props.drawPosts) {
      // Start Drawing circles for posts here

      const posts = this.props.drawPosts;
      const d3Map = d3.select('#map'); 

      const width = d3Map.attr('width');
      const height = d3Map.attr('height');
      posts.forEach( (elem, index) =>  {
        let lat  = elem.location.lat;
        let long = elem.location.long;

        let {x, y} = this.convertGeoToPixel( lat, long, width, height);
        // statements
        setTimeout(function() {
          let t = d3.transition()
              .duration(2750)
              .ease(d3.easeLinear);
          d3Map
            .append('circle')
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 20)
            .transition(t)
            .attr("r", 2)
            .attr('fill', 'yellow');
        }, 25 * index);
      });
    }

  }

  /**
   * Transforms the given lat and long to x and y 
   * @param  {object} latLong [description]
   * @return {[type]}         [description]
   */
  convertGeoToPixel(latitude, longitude , mapWidth , mapHeight) {
    let {x, y} = 0;
    // get x value
    x = (longitude+180)*(mapWidth/360);

    // convert from degrees to radians
    const latRad = latitude*Math.PI/180;

    // get y value
    const mercN = Math.log(Math.tan((Math.PI/4)+(latRad/2)));
    y     = (mapHeight/2)-(mapWidth*mercN/(2*Math.PI));

    // Hotfixes since postioning was not exact
    // @todo fix 
    y = y + 0.098 * mapHeight;
    x = x - 0.005 * mapWidth;
    return {x,y};
  }
}

export default Map;

