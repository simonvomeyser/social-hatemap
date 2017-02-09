import React from 'react';
import Loading from '../Loading/Loading';
import Tweetlist from '../Tweetlist/Tweetlist';
import Nav from '../Nav/Nav';
import Map from '../Map/Map';

import Twitter from '../../apis/twitter/Twitter.js';

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
    this.state = {
      component: (<Loading text="Getting tweets from twitter"/>),
      posts: null
    };

    this.processPosts = this.processPosts.bind(this);
  }
  componentWillMount() {
    // @todo Change to getPosts() function to really work
    Twitter.getStaticPosts(this.props.params.id).then((json) => {
      this.setState({
        component: <Tweetlist tweets={json.statuses} />,
        posts: json.statuses
      });
    });

  }

  processPosts() {
    console.log ('procesing');  
  }

  render() {
    return (
      <div className="App">
        <Map />
        <Nav posts={this.state.posts} processPosts={this.processPosts} />
        <div className="App__content">
          {this.state.component}
        </div>
      </div>
    );
  }
}

export default App;
