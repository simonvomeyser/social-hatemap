import React from 'react';
import Chernoffling from '../Chernoffling/Chernoffling';
import ChernofflingProps from '../../classes/ChernofflingProps';
import dateFormat from 'dateformat';

import './Tweet.css';

/**
 * A single Twitter Tweet
 */
class Tweet extends React.Component {
  render() {
    const props = new ChernofflingProps([this.props.entity], [this.props.entity])
    const entity = this.props.entity;
    console.log (entity.user);
    return (
      <div className="Tweet">
        <img src={entity.user.image} alt=""/>

        <div className="Tweet__Chernoffling">
          <Chernoffling 
          id={"tweetChernoffling-"+Math.round(Math.random()*1000)}
          {...props}
          />
        </div>
        <div className="Tweet__content">
          <a href={"https://twitter.com/"+entity.user.screenName} target="_blank">{entity.user.name}</a>
          <p>
            {entity.post.text}
          </p>
          <p>{entity.location.name}, {dateFormat(entity.post.createdAt, "mm.d.yy h:MM:ss")}</p>
        </div>
      </div>
    );
  }
}
export default Tweet;