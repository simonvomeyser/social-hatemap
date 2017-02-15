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
  
    this.state = {
      doneRenderingEntities:false,
      doneRenderingGrid:false
    };
    this.doneRenderingEntities = this.doneRenderingEntities.bind(this);
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
  /**
   * Called by MapGrid when all SHMEntities are finished rendering
   */
  doneRenderingEntities() {
    this.setState({doneRenderingEntities: true});
    // @todo Pass to APP    
  }
  doneRenderingGrid() {
    this.setState({doneRenderingGrid: true});
    // @todo implement
  }
  renderGrid() {
    if (this.state.doneRenderingEntities && this.props.gridConfig) {
      return <MapGrid
                doneRenderingGrid={this.doneRenderingGrid}
                config={this.props.gridConfig}
                SHMEntities={this.props.entitiesToDraw}/>; 
    }
    return null;
  }
  renderSHMEntityCanvas() {
    if (this.props.entitiesToDraw) {
      return <SHMEntityCanvas
                doneRenderingEntities={this.doneRenderingEntities}
                SHMEntities={this.props.entitiesToDraw} />
    }
    return null;
  }
  /**
   * @todo remove, 
   */  
  drawPosts() {
    return;
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
        }, 25 * index);
      });
    }    
  }

}

export default Map;

