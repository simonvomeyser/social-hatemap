import React from 'react';
import { Link } from 'react-router';

import './Nav.css';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gridConfig : props.gridConfig};

    this.handleShowOnMapClick = this.handleShowOnMapClick.bind(this);
    this.handleGridChange     = this.handleGridChange.bind(this);
    this.saveGridChange       = this.saveGridChange.bind(this);
  }

  handleShowOnMapClick(e) {
    e.preventDefault();
    this.props.processPosts();
  }
  handleGridChange(e) {
    e.preventDefault();
    const inputName = e.target.getAttribute('name');
    const inputValue = e.target.value;
    const newGridConfig = {...this.state.gridConfig};

    newGridConfig[inputName] = inputValue;
    this.setState({
      gridConfig : newGridConfig
    });

  }
  saveGridChange() {
    console.log (this.state.gridConfig);
    this.props.changeGridConfig(this.state.gridConfig);
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
        {this.props.posts ? (
          <li> Grid
            <ul>
              <li>Size <input name="size" onMouseUp={this.saveGridChange} onKeyUp={this.saveGridChange} onChange={this.handleGridChange} value={this.state.gridConfig.size} type="range" min="3" max="20" step="1"/> </li>
              <li>Opacitiy <input name="opacity" onMouseUp={this.saveGridChange} onChange={this.handleGridChange} value={this.state.gridConfig.opacity} type="range" min="0" max="1" step="0.01"/> </li>
            </ul>
            
          </li>
        ): null}
      </ul>
    );
  }

}
export default Nav;