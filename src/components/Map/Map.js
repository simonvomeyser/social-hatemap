import React from 'react';

import map from '../../img/svgMapFull.svg';
import * as d3 from 'd3'; 

import LocationHelper from '../../helpers/LocationHelper';

import SVGInline from "react-svg-inline";

import MapGrid from '../MapGrid/MapGrid';
import SHMEntityCanvas from '../SHMEntityCanvas/SHMEntityCanvas';

import './Map.css';

/**
 * The Map on which the tweets are shown
 */
class Map extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {renderGrid:false};
    this.renderGrid = this.renderGrid.bind(this);
  }
  componentDidMount() {
    this.drawPosts();
  }
  render() {
    return (
      <div className="Map">

        <div className="Map__svg-wrapper" >
          <SVGInline svg={map} className="Map__svg" />
        </div>
        <div className="Map__shmentitiycanvas-wrapper">
          {this.renderSHMEntityCanvas()}
        </div>                
        <div className="Map__grid-wrapper">
          {this.renderGrid()}
        </div>

      </div>
    );

  }
  componentDidUpdate() {
    this.drawPosts();
  }

  renderGrid() {
    if (this.state.renderGrid && this.props.gridConfig) {
      return <MapGrid config={this.props.gridConfig} SHMEntities={this.props.entitiesToDraw}/>; 
    }
    return null;
  }
  renderSHMEntityCanvas() {
    if (this.props.entitiesToDraw) {
      return <SHMEntityCanvas entities={this.props.entitiesToDraw} />
    }
    return null;
  }
  /**
   * @todo remove, 
   */  
  drawPosts() {

    if (this.props.entitiesToDraw && !this.state.renderGrid) {
      // Start Drawing circles for posts here
      const posts = this.props.entitiesToDraw;
      const d3Map = d3.select('#map'); 

      const width = d3Map.attr('width');
      const height = d3Map.attr('height');
      posts.forEach( (elem, index) =>  {
        let x  = elem.location.x;
        let y = elem.location.y;

        // statements
        setTimeout(() => {
          let t = d3.transition()
              .duration(750)
              .ease(d3.easeLinear);
          d3Map
            .append('circle')
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 20)
            .transition(t)
            .attr("r", 2)
            .attr('fill', 'yellow'); 
            if  (index === posts.length - 1) {
              this.setState({
                renderGrid: true,
              });
            }
        }, 25 * index);
      });
    }    
  }

}

export default Map;

