import React from 'react';
import Loading from '../Loading/Loading';
import Tweetlist from '../Tweetlist/Tweetlist';
import Nav from '../Nav/Nav';
import Map from '../Map/Map';

// Apis
import Twitter from '../../apis/twitter/Twitter.js';
import Geocoder from '../../apis/geocoding/Geocoder.js';

import './App.css';
/**
* Kommentar
*/

/**
 * Main Application wrapper, shows map and renders everything
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.processPosts = this.processPosts.bind(this);
  }
  componentWillMount() {
    this.setLoading('Getting Data from Twitter...');
    // @todo Change to getPosts() function to really work
    Twitter.getStaticPosts(this.props.params.id).then((json) => {
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
    this.setState({component: (<Loading text='Geocoding Tweets'/>)});

    Geocoder
      .batchGeocodeStatic(locations)
      .then((geoCodedLocations) => {
        // Add locations to all posts again
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
    return (
      <div className="App">
        <Map drawPosts={this.state.geoCodedPosts} />
        <Nav posts={this.state.posts} processPosts={this.processPosts} />
        <div className="App__content">
          {this.state.component}
        </div>
      </div>
    );
  }
}

export default App;
