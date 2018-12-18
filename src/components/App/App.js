import React from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import Tweetlist from '../Tweetlist/Tweetlist';
import { Link } from 'react-router';
import Nav from '../Nav/Nav';
import Map from '../Map/Map';

// Apis
import Twitter from '../../apis/twitter/Twitter.js';
import Geocoder from '../../apis/geocoding/Geocoder.js';
import Genderizer from '../../apis/genderizing/Genderizer.js';

// Helpers
import LocationHelper from '../../helpers/LocationHelper';
import SentimentHelper from '../../helpers/SentimentHelper';

import './App.css';
import './bootstrap.css';

/**
 * Main Application wrapper, shows map and renders everything
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gridConfig: {size: 7, display: true},
      loading: true,
      hashtag: this.props.params.id || 'demo',
      liveMode : props.location.query.liveMode ? true:false
    };

    this.changeGridConfig = this.changeGridConfig.bind(this);
  }
  componentWillMount() {

    // Start the App "lifecycle"
    const IS_DEV_MODE = !this.state.liveMode

    Twitter.getPosts(this.hashtag, IS_DEV_MODE)
    .then((twitterSHMEntities) => {

      // Remove loca
      const geocodableSHMEntities = LocationHelper.filterSHMEntities(twitterSHMEntities);
      
      // Get geolocated Entities (promise)
      return Geocoder.addGeoLocation(geocodableSHMEntities, IS_DEV_MODE)
    })
    .then((geoCodedEntities) => {

      // Calculate X and Y Position
      const xySHMEnties = LocationHelper.addXYLocation(geoCodedEntities);

      // Add Sentiment to Enities
      const sentimentSHMEntites = SentimentHelper.addSentiment(xySHMEnties);

      // Get genderized Entities (promise)
      return Genderizer.addGender(sentimentSHMEntites, IS_DEV_MODE)
    })
    .then((processedSHMEntites) => {

      if (processedSHMEntites.length > 0) {
        // Save all of them in state, "processedSHMEntites" triggers map rendering
        this.setState({
          processedSHMEntites,
          filteredSHMEntities : processedSHMEntites,
          loading: false });
      } else {
        this.setState({
          loading: false, 
          error: true 
        });
      }

    });

  }
  render() {
    return (
      <div className="App">
        <h1 className="App__title">
          Social Hate Map
        </h1>
        <Link to="/about" className="App__about">
          About
        </Link>
        {this.state.filteredSHMEntities ?
          <div>
            <h2 className="App__hashtag">#{this.state.hashtag}</h2>
            <p className="App__showing">Showing {this.state.filteredSHMEntities.length} Tweets</p>
          </div>
        : null
        }
        <Map
          entitiesToDraw={this.state.filteredSHMEntities}
          gridConfig={this.state.gridConfig}/>
        {this.state.processedSHMEntites ? 
        <Nav
          processedSHMEntites={this.state.processedSHMEntites}
          filterByDate={this.filterByDate}
          processPosts={this.processPosts}
          changeGridConfig={this.changeGridConfig}
          gridConfig={this.state.gridConfig}/>
        : null  
        }
        {this.state.loading ? <LoadingSpinner /> : null}
        {this.state.error ? <ErrorComponent/> : null}
      </div>
    );
  }
  changeGridConfig(config) {
    this.setState({gridConfig: config});
  }
}

export default App;
