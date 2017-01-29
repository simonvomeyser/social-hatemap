import React from 'react';
import Loading from '../Loading/Loading';
import Tweetlist from '../Tweetlist/Tweetlist';
import { Link } from 'react-router';

import Twitter from '../../apis/twitter/Twitter.js';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: (<Loading/>),
    };
  }
  componentWillMount() {
    fetch('http://api.socialhatemap.com/index.php?hashtag=' + this.props.params.id)
    .then((response) => { return response.json(); })
    .then((json) => {
      this.setState({
        component: <Tweetlist tweets={json.statuses} />
      });
    });

  }
  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <div>Getting Data from Twitter</div>
        <Link to="/">
          <div className="App__hashtag">#{this.props.params.id}</div>
        </Link>
        <div className="App__content">
          {this.state.component}
        </div>
      </div>
    );
  }
}

export default App;

