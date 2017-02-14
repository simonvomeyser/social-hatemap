import React from 'react';
import Loading from '../Loading/Loading';
import Tweetlist from '../Tweetlist/Tweetlist';
import Nav from '../Nav/Nav';
import Map from '../Map/Map';

// Apis
import Twitter from '../../apis/twitter/Twitter.js';
import Geocoder from '../../apis/geocoding/Geocoder.js';

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
    Twitter.getPosts(this.props.params.id, IS_DEV_MODE).then((json) => {
      this.setState({
        component: <Tweetlist tweets={json.statuses} />,
        posts: json.statuses
      });
    });

    // ===========================================
    // DEV MODE 
    // To not have to click something
    // ===========================================
    setTimeout(() => {
      this.processPosts();
    }, 750);
  }

  processPosts() {
    const posts = this.state.posts;
    const locations = posts.map((post) => post.user.location);
    this.setState({component: null});

    Geocoder
      .batchGeocode(locations, IS_DEV_MODE)
      .then((geoCodedLocations) => {
        // Add locations to all posts
        const geoCodedPosts = posts.map((e, i) => { 
          return {...e, location:geoCodedLocations[i]}; 
        });
        // Draw posts on map
        this.setState({geoCodedPosts});

      });
  }
  
  setLoading(text) {
    this.setState({component: (<Loading text={text}/>)});
  }


  render() {
    console.log(compendium);
    return (
      <div className="App">
        <Map geoCodedPosts={this.state.geoCodedPosts} gridConfig={this.state.gridConfig}/>
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
