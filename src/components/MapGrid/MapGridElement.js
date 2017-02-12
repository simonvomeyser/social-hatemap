import React from 'react';

import './MapGridElement.css';

/**
 * The Map on which the tweets are shown
 */
class MapGrid extends React.Component {
  render() {
    return (
      <div className="MapGridElement" style={this.props.data.style}>
      </div>
    );
  }
}

export default MapGrid;

