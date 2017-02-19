import React from 'react';
import { Link } from 'react-router';

import './ErrorComponent.css';

/**
 * Error
 */
export default class ErrorComponent extends React.Component {

  render() {
    return (
      <div className="ErrorComponent">
      <div className="h3">
        We found 0 tweets :( 
      </div>
      <div className="h4">
        ... try again or use demo mode maybe?
      </div>
      <Link to="/" className="ErrorComponent_btn">Enter new Hashtag</Link>
      </div>
    );
  }
}
