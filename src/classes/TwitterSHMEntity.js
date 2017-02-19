import SHMEntity from './SHMEntity';

class TwittterSHMEntity extends SHMEntity {
  constructor(twitterPost, key) {
    super();
    this.key = key;

    // Remove special chars, 
    const cleanName = twitterPost.user.name.replace(/[^\w\s]/gi, '').trim();
    const locationName = twitterPost.place ? 
        twitterPost.place.full_name + " " + twitterPost.place.country :
        twitterPost.user.location; 
    const cleanLocationName = locationName.replace(/[^\w\s]/gi, '').trim();

    this.user = {
      name       : twitterPost.user.name,
      cleanName  : cleanName,
      firstName  : cleanName.split(" ")[0],
      screenName : twitterPost.user.screen_name,
      follower   : twitterPost.user.followers_count,
      accountAge : new Date().getFullYear() - new Date(twitterPost.user.created_at).getFullYear(), // @todo to age
      image      : twitterPost.user.profile_image_url_https,
      gender     : undefined
    };
    this.post = {
      text       : twitterPost.text,
      favourites : twitterPost.favorite_count,
      createdAt  : new Date(twitterPost.created_at)
    };
    this.location = {
      // Set the name to something that can be parsed later (can be empty)
      name            : locationName,
      cleanName       : cleanLocationName,
    };

    this.setNotReady();
  }
}

export default TwittterSHMEntity;
