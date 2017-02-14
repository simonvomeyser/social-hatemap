import sampleData from './sampleData.json';
import SHMEntity from '../../classes/SHMEntity';

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
    .then((response) => { return response.json().statuses.map(this.apiAnswerToSHMEntity); });
  },

  /**
   * Returns only static data to not query API during development
   * 
   * @return Promise 
   */
  getStaticPosts($hashtag) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(sampleData.map(this.apiAnswerToSHMEntity));
      }, 500);
    });    
  },

  apiAnswerToSHMEntity(twitterPost) {

    const user = {
      name       : twitterPost.user.name,
      screenName : twitterPost.user.screenName,
      follower   : twitterPost.user.followers_count,
      accountAge : twitterPost.user.created_at, // @todo to age
      image      : twitterPost.user.profile_image_url_https
    };
    const post = {
      text       : twitterPost.text,
      createdAt  : twitterPost.created_at,
      fav        : twitterPost.favourites_count
    };
    const location = {
      name       : twitterPost.user.location
    };
    return new SHMEntity(user, post, location);
  }
};

export default Twitter;

