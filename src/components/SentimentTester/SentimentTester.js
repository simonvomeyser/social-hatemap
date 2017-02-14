import React from 'react';

import './SentimentTester.css';

import Sentiment from '../../helpers/Sentiment';

import sampleData from '../../apis/twitter/sampleData.json';

import $ from 'jquery';

/**
 * Main Component responsible for drawing the chernoffling
 */
export default class SentimentView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sentimatedSentence: "",
      amplitude : 0,
      dirtiness : 0,
      label: "",
      negated: 0,
      politeness: 0,
      sentiment: 0
    };

    this.renderSentimentText     = this.renderSentimentText.bind(this);
    this.getTweet                = this.getTweet.bind(this);
  }

  componentWillMount() {
    this.getTweet();
  }

  getTweet() {
    var sentence = sampleData[[Math.floor(Math.random()*sampleData.length)]].text;
    var sentimentData = Sentiment.getSentiment(sentence);
    this.changeStates(sentence, sentimentData);
  }

  changeStates(sentence, sentimentData){
    this.setState({sentimatedSentence: sentence })
    this.setState({amplitude: sentimentData.amplitude });
    this.setState({dirtiness: sentimentData.dirtiness });
    this.setState({label: sentimentData.label });
    this.setState({negated: sentimentData.negated });
    this.setState({politeness: sentimentData.politeness });
    this.setState({sentiment: sentimentData.sentiment });
  }

  renderSentimentText(e){
    e.preventDefault();
    var sentimentData;
    var sentence = $('#sentence').val();
    if(sentence == "")
      sentimentData = Sentiment.getSentiment("Hello Fucking WORLD");
    else
      sentimentData = Sentiment.getSentiment(sentence);
    this.changeStates(sentence, sentimentData);
  }

  render() {
    return (
      <div className="Sentiment">
        <h1>Sentiment</h1>
        <input id="sentence" className="Sentiment__input" type="textarea" placeholder="Add your sentence"/>
        <button className="Sentiment__button" onClick={this.renderSentimentText}>Sentiment Me</button>
        <button className="Sentiment__button" onClick={this.getTweet}>Get new Tweet</button>
        <div className="Sentiment__sentence">{this.state.sentimatedSentence}</div>
        <table className="Sentiment__table">
          <tbody>
            <tr>
              <td>amplitude</td>
              <td>{this.state.amplitude}</td>
            </tr>
            <tr>
              <td>dirtiness</td>
              <td>{this.state.dirtiness}</td>
            </tr>
            <tr>
              <td>label</td>
              <td>{this.state.label}</td>
            </tr>
            <tr>
              <td>negated</td>
              <td>{this.state.negated}</td>
            </tr>
            <tr>
              <td>politeness</td>
              <td>{this.state.politeness}</td>
            </tr>
            <tr>
              <td>sentiment</td>
              <td>{this.state.sentiment}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }



}
