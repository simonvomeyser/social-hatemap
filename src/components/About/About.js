import React from 'react';

import MainNav from '../MainNav/MainNav';

import './About.css';

import $ from 'jquery';

/**
 * Main Component responsible for drawing the chernoffling
 */
export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }



  render() {
    return (
      <div className="About">
        <MainNav/>
        <div>
          <h1>About</h1>
        </div>
      </div>
    );
  }



}
