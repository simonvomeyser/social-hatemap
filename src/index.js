import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import HashtagModal from './components/HashtagModal/HashtagModal';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import './index.css';
import svgMap from './svgMap.svg';

// @todo Move styles to css
var style = {
  backgroundImage: 'url('+svgMap+')',
  backgroundColor: '#222',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center, center',
  height: '100vh'
};

ReactDOM.render((
  <div className="Index" style={style}>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={HashtagModal} />
        <Route path="show/:id" component={App} />
      </Route>
    </Router>
  </div>
  ), document.getElementById('root')
);
