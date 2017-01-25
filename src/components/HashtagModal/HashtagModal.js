import React, { Component } from 'react';
import './HashtagModal.css';
import { browserHistory } from 'react-router';

class HashtagModal extends Component {

  constructor(props) {
    super(props);
    this.inputField = null;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log (this.inputField); //Debug
    e.preventDefault();
    // browserHistory.push('/show/');
  }
  render() {
    return (
      <div className="HashtagModal">
        <div className="HashtagModal__overlay"></div>
        <div className="HashtagModal__content">
          <form onSubmit={this.handleSubmit}>
            <div>Please enter your Hashtag</div>
            <input type="text" ref={(input) => {this.inputField = input; }}/>
            <input type="submit"/>
          </form>   
        </div>
      </div>
    );
  }
}

export default HashtagModal;
