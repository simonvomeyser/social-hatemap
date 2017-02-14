import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import HashtagModal from './components/HashtagModal/HashtagModal';
import ChernofflingCreator from './components/ChernofflingCreator/ChernofflingCreator';
import SentimentView from './components/SentimentView/SentimentView';
import MapTester from './components/MapTester/MapTester';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import './index.css';

ReactDOM.render((
  <div className="Index">
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={HashtagModal} />
        <Route path="show/:id" component={App} />
        <Route path="creator" component={ChernofflingCreator} />
        <Route path="sentiment" component={SentimentView} />
        <Route path="maptester" component={MapTester} />
      </Route>
    </Router>
  </div>
  ), document.getElementById('root')
);
