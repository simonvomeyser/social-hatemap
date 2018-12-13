import React from 'react';
import { Link } from 'react-router';
import dateFormat from 'dateformat';
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
    const value = e.target.dataset.value === "true" ? true : false;

    if (this.state.gridConfig.display !== value) {
      newGridConfig['display'] = value 
      this.setState({
        gridConfig : newGridConfig
      });
      this.props.changeGridConfig(newGridConfig);
    }
  }

  render() {
    return (
      <div className="Nav">
        <div className="gridControls"> 
          <div className="gridControls__newHash">
            <Link to="/" className="btn gridControls__newHashBtn">Enter new hashtag</Link>
          </div>
          <div className="gridControls__gridSize">
            <label>Grid&nbsp;Size</label>
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
            
          </div>
            
           <div className="gridControlles__showGrid">
            <label>Show&nbsp;Grid&nbsp;&amp;&nbsp;Monsters</label>
            <a href="#" onClick={this.handleGridYesNoChange} className={this.state.gridConfig.display ? "active" : ""} data-value="true">Yes</a>
            <a href="#" onClick={this.handleGridYesNoChange} className={this.state.gridConfig.display ? "" : "active"} data-value="false">No</a>
          </div>
        </div>
      </div>
    );

    /* Size: {this.state.gridConfig.size} Grid Elements per row */
  }
            /*  Opacitiy: {this.state.gridConfig.opacity}%*/

}
export default Nav;