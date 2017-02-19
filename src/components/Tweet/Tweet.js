import React from 'react';
import Chernoffling from '../Chernoffling/Chernoffling';
import ChernofflingProps from '../../classes/ChernofflingProps';

import './Tweet.css';

/**
 * A single Twitter Tweet
 */
class Tweet extends React.Component {
  render() {
    const props = new ChernofflingProps([this.props.entity], [this.props.entity])

    return (
      <div className="Tweet">
        <img src={this.props.entity.user.image} alt=""/>

        <div className="Tweet__Chernoffling">
          <Chernoffling 
          id={"tweetChernoffling-"+Math.round(Math.random()*1000)}
          {...props}
          />
        </div>
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