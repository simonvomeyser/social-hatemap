import React from 'react';
import { Link } from 'react-router';

import './Nav.css';

/**
 * @todo doc
 */
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gridConfig : props.gridConfig};

    this.handleShowOnMapClick  = this.handleShowOnMapClick.bind(this);
    this.handleGridInputChange = this.handleGridInputChange.bind(this);
    this.handleGridYesNoChange = this.handleGridYesNoChange.bind(this);
    this.saveGridChange        = this.saveGridChange.bind(this);
  }

  handleShowOnMapClick(e) {
    e.preventDefault();
    this.props.processPosts();
  }
  handleGridInputChange(e) {
    e.preventDefault();
    const target = e.target;
    const inputName = target.getAttribute('name');
    const inputValue = target.value;
    const newGridConfig = {...this.state.gridConfig};

    newGridConfig[inputName] = inputValue;
    this.setState({
      gridConfig : newGridConfig
    });

  }
  saveGridChange() {
    this.props.changeGridConfig(this.state.gridConfig);
  }
  handleGridYesNoChange(e) {
    e.preventDefault();
    const newGridConfig = {...this.state.gridConfig};
    const value = e.target.dataset.value;

    newGridConfig['display'] = value === "true" ? true : false;
    this.setState({
      gridConfig : newGridConfig
    });
  }

  render() {
    return (
      <ul className="Nav">
        <li>
          <Link to="/">Enter new hashtag</Link>
        </li>
        <li> Grid
          <ul>
            <li>
              <input
                name="size"
                onMouseUp={this.saveGridChange}
                onKeyUp={this.saveGridChange}
                onChange={this.handleGridInputChange}
                value={this.state.gridConfig.size}
                type="range"
                min="3"
                max="20"
                step="1"
                />
                  Size: {this.state.gridConfig.size} Grid Elements per row
                </li>
            <li>
              <input
                name="opacity"
                onMouseUp={this.saveGridChange}
                onChange={this.handleGridInputChange}
                value={this.state.gridConfig.opacity}
                type="range"
                min="0"
                max="1"
                step="0.01"
                />
                Opacitiy: {this.state.gridConfig.opacity}%
            </li>
            <li className="Nav__showGrid">
              Show Grid: 
              <a href="#" onClick={this.handleGridYesNoChange} className={this.state.gridConfig.display ? "active" : ""} data-value="true">Yes</a>
              <a href="#" onClick={this.handleGridYesNoChange} className={this.state.gridConfig.display ? "" : "active"} data-value="false">No</a>
            </li>
          </ul>
          
        </li>
      </ul>
    );
  }

}
export default Nav;