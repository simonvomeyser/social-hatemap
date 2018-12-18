import React, { Component } from 'react';
import './HashtagModal.css';
import sanitizeHtml from 'sanitize-html';

import Map from '../Map/Map';

/**
 * Overlay and input field for a hashtag, "landing page" of app
 */
class HashtagModal extends Component {

  constructor(props) {
    super(props);
    this.state                     = {liveMode: false}
    this.inputField                = null;
    this.handleSubmit              = this.handleSubmit.bind(this);
    this.handleLiveModeYesNoChange = this.handleLiveModeYesNoChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const hashtag = sanitizeHtml(this.inputField.value).replace('#', '');
    const query = this.state.liveMode ? {liveMode:true} : {};
    const pathname = this.state.liveMode ? hashtag : 'trump';

    if (hashtag) {
      this.props.router.push({
        pathname: '/show/'+ pathname,
        query: query
      }); 
    }
  }
  handleLiveModeYesNoChange(e) {
    e.preventDefault();
    if (!e.target.classList.contains('active')) {
      this.setState({liveMode: !this.state.liveMode});
    }
  }
  render() {
    return (
      <div className="HashtagModal">
        <Map/>
        <div className="HashtagModal__overlay"></div>
        <div className="HashtagModal__content">
          <form onSubmit={this.handleSubmit}>
            <h2>Please enter your Hashtag</h2>
            <input type="text" ref={(input) => {this.inputField = input; }}/>
            <input type="submit"/>
          </form>   
        </div>
      </div>
    );
  }
}

export default HashtagModal;
