import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import HashtagModal from './components/HashtagModal/HashtagModal';
import ChernofflingCreator from './components/ChernofflingCreator/ChernofflingCreator';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import './index.css';
/* test */
ReactDOM.render((
  <div className="Index">
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={HashtagModal} />
        <Route path="show/:id" component={App} />
        <Route path="creator" component={ChernofflingCreator} />
      </Route>
    </Router>
  </div>
  ), document.getElementById('root')
);
