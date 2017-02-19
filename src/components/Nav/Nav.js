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
    this.createNoUiSlider      = this.createNoUiSlider.bind(this);
  }
  componentDidMount() {
    this.createNoUiSlider();   
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
  createNoUiSlider() {
    const dateSlider = document.getElementById('dateSlider');
    const dateDisplay = document.getElementById('gridControlles__dateDisplay');

    const {dateMin, dateMax} = this.getSHMEntityDateRange(this.props.processedSHMEntites);
    const start = 0;
    const end = dateMax-dateMin;

    updateDateDisplay(dateMin, dateMax);

    noUiSlider.create(dateSlider, {
      start: [ 0, end ],
      behaviour: 'drag',
      connect: true,
      range: {
        'min':  0,
        'max':  end
      }
    });

    dateSlider.noUiSlider.on('update', ( values, handle ) =>{
      const from = Math.round(dateSlider.noUiSlider.get()[0]) +dateMin;
      const to = Math.round(dateSlider.noUiSlider.get()[1]) + dateMin;
      updateDateDisplay(from, to);
    });
    dateSlider.noUiSlider.on('change', () =>{
      const from = Math.round(dateSlider.noUiSlider.get()[0]) +dateMin;
      const to = Math.round(dateSlider.noUiSlider.get()[1]) + dateMin;

      this.props.filterByDate(from, to);
    });
    function updateDateDisplay(from, to) {
      document.getElementById('gridControlles__dateFrom').innerHTML = 
      dateFormat(from, "mm.d.yy h:MM:ss");
      document.getElementById('gridControlles__dateTo').innerHTML = 
      dateFormat(to, "mm.d.yy h:MM:ss");

    }
    function formatDate(date) {

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
  }

  getSHMEntityDateRange(processedSHMEntites) {
    const sortedSHMEntites =processedSHMEntites.sort((a,b) => {
      if (a.post.createdAt < b.post.createdAt) {
        return -1;
      }
      if (a.post.createdAt > b.post.createdAt) {
        return 1;
      }
      return 0;
    })

    const dateMin = sortedSHMEntites[0].post.createdAt.getTime();
    const dateMax = sortedSHMEntites[sortedSHMEntites.length-1].post.createdAt.getTime();
    return {dateMin, dateMax};
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
          <div className="gridControlles__opacity">
            <label>Grid&nbsp;Opacity</label>
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
          </div>
            
           <div className="gridControlles__showGrid">
            <label>Show&nbsp;Grid&nbsp;&amp;&nbsp;Monsters</label>
            <a href="#" onClick={this.handleGridYesNoChange} className={this.state.gridConfig.display ? "active" : ""} data-value="true">Yes</a>
            <a href="#" onClick={this.handleGridYesNoChange} className={this.state.gridConfig.display ? "" : "active"} data-value="false">No</a>
          </div>
          <div className="gridControlles__date">
            <div className="gridControlles__dateDisplay">
              <span id="gridControlles__dateFrom"></span>&nbsp;to&nbsp;
              <span id="gridControlles__dateTo"></span>
            </div>
            <label>Date</label>
            <span id="dateSlider"></span>
          </div>
        </div>
      </div>
    );

    /* Size: {this.state.gridConfig.size} Grid Elements per row */
  }
            /*  Opacitiy: {this.state.gridConfig.opacity}%*/

}
export default Nav;