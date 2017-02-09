import React from 'react';
import { Link } from 'react-router';

import './Nav.css';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  
    this.handleShowOnMapClick = this.handleShowOnMapClick.bind(this);
  }

  handleShowOnMapClick(e) {
    e.preventDefault();
    this.props.processPosts();
  }

  render() {
    return (
      <ul className="Nav">
        <li>
          <Link to="/">Enter new hashtag</Link>
        </li>
        {this.props.posts ? (
          <li>
            <a href="#" onClick={this.handleShowOnMapClick}>Show Posts on Map</a>
          </li>
        ): null}
      </ul>
    );
  }

}
export default Nav;