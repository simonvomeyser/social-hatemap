import React from 'react';

import './Tweetlist.css';

export default class Tweetlist extends React.Component {
  componentWillMount() {
    this.setState({
      tweets : this.props.tweets ? this.props.tweets : [] 
    });
  }
  render() {
    return (
      <div className="Tweetlist">
        { this.renderTweets() }
      </div>
    );
  }
  renderTweets() {

    return this.props.tweets.map(function(elem, index) {
      console.log (elem); //Debug
      return (
        <div className="Tweetlist__tweet" key={index}>
          <img src={elem.user.profile_image_url} alt=""/>
          <p>
            {elem.text}
          </p>
        </div>
      );
    });
  }
}