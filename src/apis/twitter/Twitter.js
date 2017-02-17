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

  /**
   * Converts the answer of the api to a SHMEntity usable by the App
   * @param  {[type]} twitterPost [description]
   * @return {[type]}             [description]
   */
  apiAnswerToSHMEntity(twitterPost) {

    const user = {
      name       : twitterPost.user.name,
      screenName : twitterPost.user.screenName,
      follower   : twitterPost.user.followers_count,
      accountAge : new Date().getFullYear() - new Date(twitterPost.user.created_at).getFullYear(), // @todo to age
      image      : twitterPost.user.profile_image_url_https
    };
    const post = {
      text       : twitterPost.text,
      favourites : twitterPost.favorite_count
    };
    const location = {
      // Set the name to something that can be parsed later (can be empty)
      name       : twitterPost.place ? 
        twitterPost.place.full_name + " " + twitterPost.place.country :
        twitterPost.user.location
    };
    return new SHMEntity(user, post, location);
  }
};

export default Twitter;

