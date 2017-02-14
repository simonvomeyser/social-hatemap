import React from 'react';

import './SentimentView.css';

import Sentiment from '../../helpers/Sentiment';

import $ from 'jquery';

/**
 * Main Component responsible for drawing the chernoffling
 */
export default class SentimentView extends React.Component {
  componentDidMount() {
    this.setState({
      sentiment : this.props.sentiment_data
    });
  }
  renderSentimentText(){
    console.log (Sentiment.getSentiment("Hallo fucking Welt"));
    return Sentiment.getSentiment("Hallo fucking Welt");
    // return sentiment
  }
  render() {
    return (
      <div className="Sentiment">
        <h1>Sentiment</h1>
        <input className="Sentiment__input" type="textarea"/>
        <button className="Sentiment__button" onClick={this.renderSentimentText}>Sentiment Me</button>
      </div>
    );
  }



}
