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
      gridConfig: {opacity: 0.75, size: 7}
    };

    this.processPosts     = this.processPosts.bind(this);
    this.setLoading       = this.setLoading.bind(this);
    this.changeGridConfig = this.changeGridConfig.bind(this);
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
    const locations = SHMEntities.map((post) => post.user.location);

    Geocoder
      .batchGeocode(locations, IS_DEV_MODE)
      .then((geoCodedLocations) => {

        // Add locations to all posts
        const geoCodedEntities = SHMEntities.map((e, i) => {
          return {...e, location:geoCodedLocations[i]}; 
        }).map(LocationHelper.addXYLocationsToSHMEntity);

        // Calclulate Position on Map
        
        // Draw posts on map
        console.log (geoCodedEntities);
        this.setState({geoCodedEntities: geoCodedEntities});

      });
  }
  
  setLoading(text) {
    this.setState({component: (<Loading text={text}/>)});
  }


  render() {
    return (
      <div className="App">
        <Map entitiesToDraw={this.state.geoCodedEntities} gridConfig={this.state.gridConfig}/>
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
}

export default App;
