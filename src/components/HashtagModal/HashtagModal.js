import React, { Component } from 'react';
import './HashtagModal.css';

/**
 * Overlay and input field for a hashtag
 */
class HashtagModal extends Component {

  constructor(props) {
    super(props);
    this.inputField = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    console.log (props); //Debug
  }

  handleSubmit(e) {
    e.preventDefault();
    const hashtag = this.inputField.value;

    if (hashtag) {
      this.props.router.push('/show/'+hashtag); //Debug      
    }
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
