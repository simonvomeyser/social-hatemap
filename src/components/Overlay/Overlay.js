import React from 'react';
import Chernoffling from '../Chernoffling/Chernoffling';

import './Overlay.css';

/**
 * Background on which children are rendered, closable 
 */
class MapGridElement extends React.Component {
  render(){
    return (
      <div className="Overlay">
        {this.props.close ? <div onClick={this.props.close} className="Overlay__close">&times;</div> : null }
        <div className="Overlay__children">
          {this.props.children}
        </div>
        
      </div>)
  }
}

export default MapGridElement;