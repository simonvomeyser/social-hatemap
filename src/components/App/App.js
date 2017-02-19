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
      loading: true
    };

    this.changeGridConfig = this.changeGridConfig.bind(this);
    this.filterByDate     = this.filterByDate.bind(this);
  }
  componentWillMount() {

    // Start the App "lifecycle"
    const hashtag = this.props.params.id;

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
        processedSHMEntites,
        filteredSHMEntities : processedSHMEntites,
        loading: false });

    });

  }
  render() {
    return (
      <div className="App">
        <h2 className="App__hashtag">#{this.props.params.id}</h2>
        {this.state.filteredSHMEntities ?
        <h3 className="App__showing">Showing {this.state.filteredSHMEntities.length} Tweets</h3>
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
        {this.state.loading ? <LoadingSpinner/> : null}
      </div>
    );
  }
  changeGridConfig(config) {
    this.setState({gridConfig: config});
  }
  filterByDate(from, to) {
    const filteredSHMEntities = this.state.processedSHMEntites.filter((e)=> {
      const createdAtMs = e.post.createdAt.getTime();
      if (createdAtMs >= from && createdAtMs <= to) {
        return true;
      }
      return false;
    });
    this.setState({filteredSHMEntities: filteredSHMEntities});

  }
}

export default App;
