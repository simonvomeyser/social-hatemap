import React from 'react';
import Loading from '../Loading/Loading';
import { Link } from 'react-router';

import './App.css';

class App extends React.Component {

  componentWillMount() {
    
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
          <Loading />
        </div>
      </div>
    );
  }
}

export default App;
