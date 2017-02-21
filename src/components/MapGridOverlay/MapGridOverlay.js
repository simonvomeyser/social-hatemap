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
      <div className="AboutOverlay GridOverlay">
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
              <div className="col-sm-6">
                <h3>Combined Monster</h3>
                <div className="MapGridElement__overlayChernoffling">
                  <Chernoffling 
                    id={"overlaychernoffling-"+this.props.id}
                    {...chernofflingProps}/>
                    <ul>
                      <li><b>Average sentiment:</b> {chernofflingProps.sentiment}</li>
                      <li><b>Average gender:</b> {chernofflingProps.gender}</li>
                      <li><b>Average account age:</b> {chernofflingProps.age}</li>
                      <li><b>Percent favs of all tweets on map:</b> {chernofflingProps.favourites} %</li>
                      <li><b>Percent followers of all tweets on map:</b> {chernofflingProps.followers} %</li>
                    </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="MapGridElement__overlayTweetList">
                  <Tweetlist tweets={this.props.containedSHMEntities}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
