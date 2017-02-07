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
      twitter: null
    };
  }
  componentWillMount() {
    // @todo Change to getPosts() function to really work
    Twitter.getStaticSamplePosts(this.props.params.id).then((json) => {
      this.setState({
        component: <Tweetlist tweets={json.statuses} />,
        twitter: json.statuses
      });
    });

  }

  render() {
    return (
      <div className="App">
        <Map />
        <Nav twitter={this.state.twitter} />
        <div className="App__content">
          {this.state.component}
        </div>
      </div>
    );
  }
}

export default App;
