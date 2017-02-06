import React from 'react';
import { Link } from 'react-router';

import './Nav.css';

class Nav extends React.Component {

  render() {
    return (
      <ul className="Nav">
        <li>
          <Link to="/">Enter new hashtag</Link>
        </li>
        {this.props.twitter ? (
          <li>
            <a href="#" onClick={this.props.showMap}>Show Posts on Map</a>
          </li>
        ): null}
      </ul>
    );
  }

}
export default Nav;