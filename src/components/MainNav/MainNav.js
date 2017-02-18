import React from 'react';
import { Link } from 'react-router';

import './MainNav.css';

/**
 * @todo doc
 */
class MainNav extends React.Component {

  constructor(props) {
    super(props);
  }

  goBack()
  {
    window.history.back();
  }

  render() {
    return (
      <div className="MainNav">
        <a href="#/" on-click="{this.goBack}">Map</a>
        <a href="#/about">About</a>
      </div>
    );
  }

}
export default MainNav;
