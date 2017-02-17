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
      <div className="LoadingSpinner">
        <div className="LoadingSpinner__spinner">
        </div>
      </div>
    );
  }
}
