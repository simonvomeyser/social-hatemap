import React from 'react';
import { Link } from 'react-router';

import AboutOverlay from '../AboutOverlay/AboutOverlay';

import './MainNav.css';

/**
 * @todo doc
 */
class MainNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAboutOverlay : false
    }
    this.toggleAboutOverlay = this.toggleAboutOverlay.bind(this);
    this.renderAboutOverlay = this.renderAboutOverlay.bind(this);
  }

  toggleAboutOverlay()
  {
    this.setState({showAboutOverlay:!this.state.showAboutOverlay});
  }

  render() {
    return (
      <div>
        <div className="MainNav">
          <a onClick={this.toggleAboutOverlay}>About</a>
        </div>
        { this.renderAboutOverlay() }
      </div>
    );
  }

  renderAboutOverlay()
  {
    if (this.state.showAboutOverlay) {
      return ( <AboutOverlay close={this.toggleAboutOverlay}/> );
    }
    return null;
  }

}
export default MainNav;
