import React from 'react';

import Tweetlist from '../Tweetlist/Tweetlist';
import Chernoffling from '../Chernoffling/Chernoffling';

import './MapGridOverlay.css';

import $ from 'jquery';

/**
 * Main Component responsible for drawing the chernoffling
 */
export default class MapGridOverlay extends React.Component {

  render() {
    const chernofflingProps = this.props.chernofflingProps;
    return (
      <div className="AboutOverlay">
        <div className="wrapper">
          <div className="container-fluid">
            <div className="row topSpacing1 first">
              <div className="col-sm-11">
                <h2 className="pageTitle">About this grid element</h2>
              </div>
              <div className="col-sm-1 textRight">
                {this.props.close ? <div onClick={this.props.close} className="AboutOverlay__close">&times;</div> : null }
              </div>
            </div>
            <div className="row topSpacing2 bottomSpacing1">
              <div className="col-sm-1">
              </div>
              <div className="col-sm-5">
                <h3>Map &amp; Interface</h3>
                <div className="MapGridElement__overlayChernoffling">
                  <Chernoffling 
                    id={"overlaychernoffling-"+this.props.id}
                    {...chernofflingProps}/>
                    <ul>
                      <li>Average sentiment: {chernofflingProps.sentiment}</li>
                      <li>Average gender: {chernofflingProps.gender}</li>
                      <li>Average account age: {chernofflingProps.age}</li>
                      <li>Percent favs of all tweets on map: {chernofflingProps.favourites} %</li>
                      <li>Percent followers of all tweets on map: {chernofflingProps.followers} %</li>
                      
                    </ul>
                </div>
              </div>
              <div className="col-sm-5">
                <div className="MapGridElement__overlayTweetList">
                  <Tweetlist tweets={this.props.containedSHMEntities}/>
                </div>
              </div>
              <div className="col-sm-1">
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
