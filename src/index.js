import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import HashtagModal from './components/HashtagModal/HashtagModal';
import ChernofflingCreator from './components/ChernofflingCreator/ChernofflingCreator';
import MapTester from './components/MapTester/MapTester';
import SentimentTester from './components/SentimentTester/SentimentTester';
import MainNav from './components/MainNav/MainNav';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import './index.css';
/* test */
ReactDOM.render((
  <div className="Index">
    <h1>Social Hate Map</h1>
    <MainNav/>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={HashtagModal} />
        <Route path="show/:id" component={App} />
        <Route path="creator" component={ChernofflingCreator} />
        <Route path="maptester" component={MapTester} />
        <Route path="sentiment" component={SentimentTester} />
      </Route>
    </Router>
  </div>
  ), document.getElementById('root')
);
