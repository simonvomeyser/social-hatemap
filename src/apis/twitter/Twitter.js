import React from 'react';
import config from './config.json';

const apiUrl = 'http://api.socialhatemap.com/index.php';

/**
 * Object to manage communication with twitter api
 * @type {Object}
 */
const Twitter = {

  /**
   * Only real "public" method returning a promise that contains Object 
   *
   * @todo Should return object with information usable by map, by now only retunrs list of tweets when resolved
   * @param  String $hashtag [description]
   * @return Promise 
   */
  getPosts($hashtag) {
    return fetch(apiUrl + '?hashtag=' + $hashtag)
    .then((response) => { return response.json(); });
  }
};

export default Twitter;

