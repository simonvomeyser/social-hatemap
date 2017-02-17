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
    this.favourites = 0; // abs zahl
    this.gender     = this.calculateUserAverage('gender');
    this.age        = this.calculateUserAverage('accountAge');
    this.followers  = 0; // Prozent von gesamt

    console.log (this);
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


}

export default ChernofflingProps;
