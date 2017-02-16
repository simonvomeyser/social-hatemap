import React from 'react';

import './Tweetlist.css';

/**
 * Temp Component
 * Shows List of Tweets for demo purposes
 */
export default class Tweetlist extends React.Component {

  componentWillMount() {
    this.setState({
      tweets : this.props.tweets ? this.props.tweets : []
    });
  }

  render() {
    return (
      <div className="Tweetlist">
        <h1>Tweetlist</h1>
        <div>Found {this.props.tweets.length} Tweets</div>
        { this.renderTweets() }
      </div>
    );
  }

  renderTweets() {
    return this.props.tweets.map(function(elem, index) {
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
