/**
 * Provides properites for a Chernoffling to be rendered
 */
class ChernofflingProps {

  /**
   * @param  {Array} SHMEntities    The Entities "belonging" to the chernoffling
   * @param  {Array} allSHMEntities All Entities on Map
   */
  constructor(SHMEntities, allSHMEntities) {
    this.SHMEntities = SHMEntities;
    this.allSHMEntities = allSHMEntities;

    this.numberOfSHMEntities    = SHMEntities.length;
    this.numberOfallSHMEntities = allSHMEntities.length;
    this.percentageOfAll        = this.numberOfSHMEntities/this.numberOfallSHMEntities *100;


    this.sentiment  = this.calculateSentimentAverage('sentiment');
    this.amplitude  = this.calculateSentimentAverage('amplitude');
    this.gender     = this.calculateUserAverage('gender');
    this.age        = this.calculateUserAverage('accountAge');
    this.favourites = this.calculateFavourites(); // abs zahl
    this.followers  = this.calculateFollowers(); // Prozent von gesamt

  }

  calculateSentimentAverage(attribute) {
    return this.SHMEntities.reduce((prev, cur) => {
      return prev + cur.post.sentiment[attribute];
    }, 
    0) / this.numberOfSHMEntities;
  }

  calculatePostAverage(attribute) {
    return this.SHMEntities.reduce((prev, cur) => {
      return prev + cur.post[attribute];
    }, 
    0) / this.numberOfSHMEntities;
  }

  calculateUserAverage(attribute) {
    return this.SHMEntities.reduce((prev, cur) => {
      return prev + cur.user[attribute];
    }, 
    0) / this.numberOfSHMEntities;
  }

  calculateFavourites() {
    return this.SHMEntities.reduce((prev, cur) => prev + cur.post.favourites, 0);
  }

  calculateFollowers() {
    const numerOfFollowers = this.SHMEntities.reduce((prev, cur) => prev + cur.user.follower, 0);
    const numerOfAllFollowers = this.allSHMEntities.reduce((prev, cur) => prev + cur.user.follower, 0);

    return (numerOfFollowers / numerOfAllFollowers) * 100;
  }


}

export default ChernofflingProps;
