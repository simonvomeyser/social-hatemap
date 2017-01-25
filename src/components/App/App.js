import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <span>Getting Data from Twitter with Hashtag {this.props.params.id}</span>

      </div>
    );
  }
}

export default App;
