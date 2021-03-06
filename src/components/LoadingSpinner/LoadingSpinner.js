import React from 'react';

import './LoadingSpinner.css';

/**
 * Shows loading spinner
 * @todo should have props that can be changed for message to show
 */
export default class LoadingSpinner extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <div className="LoadingSpinner h3">
        {this.props.liveMode ? "Loading..." : <div><div>Showing only static results with #trump.</div><div>You can switch to live mode on startpage!</div></div>}
      </div>
    );
  }
}
