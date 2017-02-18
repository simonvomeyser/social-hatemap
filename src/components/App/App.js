import React from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Tweetlist from '../Tweetlist/Tweetlist';
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

// true means there is no real data fetched from the apis
const IS_DEV_MODE = true;

/**
 * Main Application wrapper, shows map and renders everything
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gridConfig: {opacity: 0.30, size: 7, display: true},
      doneRenderingMap: false
    };

    this.setLoading       = this.setLoading.bind(this);
    this.changeGridConfig = this.changeGridConfig.bind(this);
  }
  componentWillMount() {

    // Start the App "lifecycle"
    const hashtag = this.props.params.id;

    this.setLoading('Getting Data from Twitter...');

    Twitter.getPosts(hashtag, IS_DEV_MODE)
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
      
      // Save all of them in state, "processedSHMEntites" triggers map rendering
      this.setState({
        loading   : null,
        processedSHMEntites });
    });
      
  }

  setLoading(text) {
    this.setState({loading: (<LoadingSpinner/>)});
  }


  render() {
    return (
      <div className="App">
        <Map
          doneRenderingMap={this.doneRenderingMap}
          entitiesToDraw={this.state.processedSHMEntites}
          gridConfig={this.state.gridConfig}/>
        <Nav
          posts={this.state.posts}
          processPosts={this.processPosts}
          changeGridConfig={this.changeGridConfig}
          gridConfig={this.state.gridConfig}/>
        <div className="App__content">
          {this.state.loading}
        </div>
      </div>
    );
  }
  changeGridConfig(config) {
    this.setState({gridConfig: config});
  }
}

export default App;
