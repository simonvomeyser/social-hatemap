import React from 'react';

import './Loading.css';

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
