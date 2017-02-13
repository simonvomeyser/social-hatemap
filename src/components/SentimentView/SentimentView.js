import React from 'react';

import './SentimentView.css';

// import './../../lib/Sentiment/sentiment'

import $ from 'jquery';

/**
 * Main Component responsible for drawing the chernoffling
 */
export default class SentimentView extends React.Component {
  componentDidMount() {

		this.setState({
      sentiment : this.props.tweets
    });
    this.draw(this.props);
  }
  componentWillReceiveProps(nextProps) {

    this.draw(this.props);
  }
  render() {
    return (
      <div className="Sentiment">
        <h1>Sentiment</h1>
        <input className="Sentiment__input" type="textarea"/>
      </div>
    );
  }

	renderSentimentText(){
		return this.props.sentiment
	}


}
