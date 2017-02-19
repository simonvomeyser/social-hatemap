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
            <div className="row topSpacing2">
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
              <div className="col-sm-6">

              </div>
              <div className="col-sm-5 col-sm-offset-1">
                <h3>Process</h3>
                <p>
                  The user enters a keyword, for example 'Trump'. A request is sent to the Twitter API, fetching Tweets that are hashtagged with this keyword. The returning sample is filtered for location data. Only those who can be located to a specific city or area are processed further. 
                </p>
                <p>
                  To convert the location tag (like 'New York') into geo data, the sample is sent to the Google API and equiped with longitudonal and latidunal information, which is then maped according by a 'mercator transformation'.
                </p>
                <p>
                  In order to visualize the properties, the Tweets are then processed in several ways: 
                </p>
                <ul>
                  <li>
                    1. The Tweet's respective sentiment is evaluated by a sentiment analysis algorithm. 
                  </li>
                  <li>
                    2. The gender of the author is calculated based on their username with aid of an external API, in case this information is not included in the Tweet#s info.
                  </li>
                  <li>
                    3. Further information such as the author's account's age, the number of favourites (=likes) and the share percentage of followers towards the complete amount of all followers is calculated. 
                  </li>
                </ul>
                <p>
                  Once the set of property information is complete, the monsters are rendered.
                </p>
              </div>
            </div>
            <div className="row topSpacing2">
              <div className="col-sm-5">
                <h3>Monster properties</h3>
              </div>
            </div>
            <div className="row topSpacing2">
              <div className="col-sm-5">
                <h3>Map &amp; Interface</h3>
                <p>
                  The map is modeled according to the mercator transformation, therefore the specific shape of continents. The map's area is devided by a grid. Tweets within one sector are summed up and their properties are merged. Therefore a monster within a grid area represents a number of Tweets and not individual ones.
                </p>
                <p>
                  If the user clicks on a grid sector, an overlay opens and exact property values are explained. An additional list visualizes the single tweets that are incorporated in this grid sector. 
                </p>  
                <p>
                  The user can modify the grid's size and opacity to enlage or reduce the areas and therefore reduce the number of tweets that are merged, in order to get a more specific image. 
                </p>
                <p>
                  It's also possible to remove the grid completely to make single tweets available and access them directly.
                </p>
                <p>
                  Eventually the user can modify a timeframe for the collected tweets in order to visualize a development over time. 
                </p>
              </div>
              <div className="col-sm-1">
              </div>
              <div className="col-sm-5">
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
