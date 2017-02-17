import React from 'react';
import Chernoffling from '../Chernoffling/Chernoffling';
import './ChernofflingCreator.css';

/**
 * Creator to see the impact every var has on the chernoffling
 */
export default class ChernofflingCreator extends React.Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    this.setState({
      // Tweet properties
      'sentiment' : -1, // -1 = negative, 0 = neutral, +1 = positive
      'amplitude' : 0, // intensity: 0 = low, 1 = high
      'favourites' : 0, // percentage
      // User properties
      'gender': 0,  // 0 = male, 1 = female
      'age' : 0, // int, 1-10
      'followers' : 100, // float, percentage (1-100)
    });
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    return (
      <div className="ChernofflingCreator">
        <h1>chernoffling creator</h1>
        <div className="ChernofflingCreator__content">
          <div className="ChernofflingCreator__settings">
            <h2>Settings</h2>
            <div>
              <input type="range" min="-1" max="1" step=".01" onChange={this.handleInputChange} defaultValue={this.state.sentiment} id="sentiment"/> <span className="sentiment">{this.state.sentiment}</span> sentiment 
            </div>
            <div>
              <input type="range" min="0" max="1" step=".1" onChange={this.handleInputChange} defaultValue={this.state.amplitude} id="amplitude"/> <span className="amplitude">{this.state.amplitude}</span> amplitude 
            </div>
            <div>
              <input type="range" min="0" max="100" onChange={this.handleInputChange} defaultValue={this.state.favourites} id="favourites"/> <span className="favourites">{this.state.favourites}</span> favourites 
            </div>
            <br/>
            <div>
              <input type="range" min="0" max="1" step=".1" onChange={this.handleInputChange} defaultValue={this.state.gender} id="gender"/> <span className="gender">{this.state.gender}</span> gender  
            </div>
            <div>
              <input type="range" min="0" max="10" step="1" onChange={this.handleInputChange} defaultValue={this.state.age} id="age"/> <span className="age">{this.state.age}</span> account age  
            </div>
            <div>
              <input type="range" min="0" max="100" onChange={this.handleInputChange} defaultValue={this.state.followers} id="followers"/> <span className="followers">{this.state.followers}</span>% followers 
            </div>
          </div>
          <div className="ChernofflingCreator__chernoffling">
            <Chernoffling key="asdsad" id="asdsad"{...this.state}/>
          </div>
        </div>
      </div>
    );
  }
  handleInputChange(e) {
    e.preventDefault();
    this.setState({
     [e.target.getAttribute('id')] : e.target.value
    });
  }
}
