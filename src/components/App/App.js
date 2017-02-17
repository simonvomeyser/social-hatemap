import React from 'react';
import Loading from '../Loading/Loading';
import Tweetlist from '../Tweetlist/Tweetlist';
import Nav from '../Nav/Nav';
import Map from '../Map/Map';

// Apis
import Twitter from '../../apis/twitter/Twitter.js';
import Geocoder from '../../apis/geocoding/Geocoder.js';

// Helpers
import LocationHelper from '../../helpers/LocationHelper';
import SentimentHelper from '../../helpers/SentimentHelper';


import './App.css';

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

    this.processPosts     = this.processPosts.bind(this);
    this.setLoading       = this.setLoading.bind(this);
    this.changeGridConfig = this.changeGridConfig.bind(this);
    this.doneRenderingMap = this.doneRenderingMap.bind(this);
  }
  componentWillMount() {
    this.setLoading('Getting Data from Twitter...');
    Twitter.getPosts(this.props.params.id, IS_DEV_MODE).then((SHMEntities) => {
      this.setState({
        component   : null,
        SHMEntities : SHMEntities
      });
      this.processPosts();
    });
  }

  processPosts() {
    const SHMEntities = this.state.SHMEntities;

    // Filter out not geocodeable Entities
    const geocodableSHMEntities = LocationHelper.filterSHMEntities(SHMEntities);

    // Start Ceocoding
    Geocoder.addGeoLocation(geocodableSHMEntities, IS_DEV_MODE)
    .then((geoCodedEntities) => {

      // Calculate X and Y Position
      const xySHMEnties = LocationHelper.addXYLocation(geoCodedEntities);

      // Add Sentiment to Enities
      const sentimentSHMEntites = SentimentHelper.addSentiment(xySHMEnties);

      // Genderize Entites @todo 
      const processedSHMEntites = sentimentSHMEntites;

      // Save all of them in state, "processPosts" triggers map rendering
      this.setState({
        geocodableSHMEntities,
        xySHMEnties,
        sentimentSHMEntites,        
        processedSHMEntites });
    });
  }
  
  setLoading(text) {
    this.setState({component: (<Loading text={text}/>)});
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
          {this.state.component}
        </div>
      </div>
    );
  }
  changeGridConfig(config) {
    this.setState({gridConfig: config});
  }
  doneRenderingMap() {
    console.log (`App knows about finished map`);
    this.setState({doneRenderingMap:true});
  }
}

export default App;
