import React from 'react';

import './AboutOverlay.css';

import $ from 'jquery';

/**
 * Main Component responsible for drawing the chernoffling
 */
export default class AboutOverlay extends React.Component {

  render() {
    return (
      <div className="AboutOverlay">
        <div className="wrapper">
          <div className="container-fluid">
            <div className="row topSpacing1 first">
              <div className="col-sm-11">
                <h2 className="pageTitle">About Social Hate Map</h2>
              </div>
              <div className="col-sm-1 textRight">
                {this.props.close ? <div onClick={this.props.close} className="AboutOverlay__close">&times;</div> : null }
              </div>
            </div>
            <div className="row topSpacing1">
              <div className="col-sm-7">
                <h3>Concept</h3>
                <p>
                  The Social Hate Map visualizes properties of social media messages and users. The data is pulled over APIs, evaluated and then mapped on a global map.
                </p>
                <p> 
                  Key visualization elements are small monsters, their respective colors and shapes representing different properties of the tweets. Special focus is set on the sentiment of the messages (sentiment analysis) which is displayed in the overall angrieness level of the monsters, in a way that sentiments regarding a topic can quickly be seized. 
                </p>
              </div>
            </div>
            <div className="row topSpacing2">
              <div className="col-sm-7">
                <h3>Team</h3>
                <p>
                  <a href="http://simonvomeyser.de/" title="Simon vom Eyser">Simon vom Eyser</a>, 582460<br/>
                  Felix Jordan, XXXXXX<br/>
                  Stefan "Boerdi" Weber, XXXXXX<br/>
                  <a href="http://marckloubert.com" title="Marc Kloubert">Marc Kloubert</a>, 567230
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
