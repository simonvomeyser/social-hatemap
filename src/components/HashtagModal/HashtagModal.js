import React, { Component } from 'react';
import './HashtagModal.css';
import sanitizeHtml from 'sanitize-html';

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
    let hashtag = this.inputField.value;

    if (hashtag) {
      hashtag = sanitizeHtml(hashtag).replace('#', '');
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
