import React from 'react';

import './Loading.css';

/**
 * Shows loading spinner
 * @todo should have props that can be changed for message to show
 */
export default class Loading extends React.Component {

  render() {
    return (
      <div>
        <div className="Loading__spinner">
        </div>
        Loading..
        
      </div>
    );
  }
}
