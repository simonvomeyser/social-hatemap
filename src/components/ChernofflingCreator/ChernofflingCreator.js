import React from 'react';

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
      'anger' : 50,
      'men': 20,
      'women' : 30,
      'unknown' : 50,
      'twitter' : 50,
      'instagram' : 50,
      'posts' : 10,
      'percentage' : 10,
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
              <input type="number"  onChange={this.handleInputChange} defaultValue={this.state.posts} id="posts"/> <span className="instagram">{this.state.posts}</span> Posts
            </div>
            <div>
              <input type="range"  onChange={this.handleInputChange} defaultValue={this.state.percentage} id="percentage"/> <span className="percentage">{this.state.percentage}</span>% of all Posts 
            </div>
            <br/>
            <div>
              <input type="range"  onChange={this.handleInputChange} onChange={this.handleInputChange} defaultValue={this.state.anger} id="anger"/> <span className="anger">{this.state.anger}</span>% Anger 
            </div>
            <br/>
            <div>
              <input type="range"  onChange={this.handleInputChange} defaultValue={this.state.men} id="men"/> <span className="men">{this.state.men}</span>% Men 
            </div>
            <div>
              <input type="range"  onChange={this.handleInputChange} defaultValue={this.state.women} id="women"/> <span className="women">{this.state.women}</span>% Women 
            </div>
            <div>
              <input type="range"  onChange={this.handleInputChange} defaultValue={this.state.unknown} id="unknown"/> <span className="unknown">{this.state.unknown}</span>% Unknown 
            </div>
            <br/>
            <div>
              <input type="range"  onChange={this.handleInputChange} defaultValue={this.state.twitter} id="twitter"/> <span className="twitter">{this.state.twitter}</span>% Twitter 
            </div>
            <div>
              <input type="range"  onChange={this.handleInputChange} defaultValue={this.state.instagram} id="instagram"/> <span className="instagram">{this.state.instagram}</span>% Instagram 
            </div>
          </div>
          <div className="ChernofflingCreator__chernoffling">

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
