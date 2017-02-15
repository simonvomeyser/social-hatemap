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

}

export default Map;

