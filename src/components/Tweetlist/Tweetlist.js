import React from 'react';
import Tweet from '../Tweet/Tweet'

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
        {this.props.tweets.map((e, i) => <Tweet key={'tweet'+i} entity={e}/> )}
      </div>
    );
  }
}
