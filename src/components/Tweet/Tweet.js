import React from 'react';

import './Tweet.css';

/**
 * A single Twitter Tweet
 */
class Tweet extends React.Component {
  render() {
    return (
      <div className="Tweet">
        <img src={this.props.entity.user.image} alt=""/>
        <div className="Tweet__content">
          <a href="http://twitter.de">{this.props.entity.user.name}</a>
          <p>
            {this.props.entity.post.text}
          </p>
          <p>{this.props.entity.location.name}</p>
        </div>
      </div>
    );
  }
}
export default Tweet;