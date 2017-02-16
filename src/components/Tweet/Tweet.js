import React from 'react';

import './Tweet.css';

/**
 * A single Twitter Tweet
 */
class Tweet extends React.Component {
  render() {
    return (
      <div className="Tweetlist__tweet">
        <img src={this.props.entity.user.image} alt=""/>
        <p>
          {this.props.entity.post.text}
        </p>
      </div>
    );
  }
}
export default Tweet;