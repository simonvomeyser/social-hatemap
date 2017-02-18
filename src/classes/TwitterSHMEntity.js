import SHMEntity from './SHMEntity';

class TwittterSHMEntity extends SHMEntity {
  constructor(twitterPost) {
    super();

    this.user = {
      name       : twitterPost.user.name,
      screenName : twitterPost.user.screenName,
      follower   : twitterPost.user.followers_count,
      accountAge : new Date().getFullYear() - new Date(twitterPost.user.created_at).getFullYear(), // @todo to age
      image      : twitterPost.user.profile_image_url_https
    };
    this.post = {
      text       : twitterPost.text,
      favourites : twitterPost.favorite_count
    };
    this.location = {
      // Set the name to something that can be parsed later (can be empty)
      name       : twitterPost.place ? 
        twitterPost.place.full_name + " " + twitterPost.place.country :
        twitterPost.user.location
    };

    this.setNotReady();
  }
}

export default TwittterSHMEntity;
