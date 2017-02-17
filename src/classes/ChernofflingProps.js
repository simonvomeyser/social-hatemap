/**
 * Provides properites for a Chernoffling to be rendered
 */
class ChernofflingProps {

  /**
   * @param  {Array} SHMEntities    The Entities "belonging" to the chernoffling
   * @param  {Array} allSHMEntities All Entities on Map
   */
  constructor(SHMEntities, allSHMEntities) {
    this.sentiment  = Math.random() * 2 - 1;
    this.amplitude  = 0;
    this.favourites = 0;
    this.gender     = .0;
    this.age        = 0;
    this.followers  = 0;
  }
}

export default ChernofflingProps;
