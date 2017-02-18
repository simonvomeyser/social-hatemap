import sampleData from './sampleData.json';
import TwitterSHMEntity from '../../classes/TwitterSHMEntity';

const apiUrl = 'http://api.socialhatemap.com/twitter.php';

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
   * @param {bool} If true, the api call is only "simulated"
   * @return Promise 
   */
  getPosts($hashtag, IS_DEV_MODE) {
    if (IS_DEV_MODE) {
      return this.getStaticPosts($hashtag);
    }

    return fetch(apiUrl + '?hashtag=' + $hashtag)
    .then((response) => { 
      return response.json().statuses.map((e) => new TwitterSHMEntity(e)); 
    });
  },

  /**
   * Returns only static data to not query API during development
   * 
   * @return Promise 
   */
  getStaticPosts($hashtag) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(sampleData.tweets.map((e) => {
          return new TwitterSHMEntity(e)
        }));
      }, 500);
    });    
  },
};

export default Twitter;

