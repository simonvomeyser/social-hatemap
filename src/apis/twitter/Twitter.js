import React from 'react';
import config from './config.json';

export default {
  getTweets($hashtag) {
    return fetch("http://api.socialhatemap.com/index.php?hashtag=". $hashtag);
  }
};

