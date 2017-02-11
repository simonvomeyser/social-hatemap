const apiUrl = 'http://api.socialhatemap.com/index.php';

const Geocoder = {
  /**
   * Batch Transforms given Names of Locations in objects containing lat/long
   * 
   * @param {array} Strings of Location Names
   * @param {bool} If true, the api call is only "simulated"
   * 
   * @return {Promise} On resloving JSON with objects
   */
  batchGeocode(locationNames =[], IS_DEV_MODE) {
    if (IS_DEV_MODE) {
      return this.batchGeocodeStatic(locationNames);
    }
    
    throw new Error("Not yet implemented");
  },

  /**
   * "Fake" development function to not call api during development
   * @param  {Array}  locationNames Array of Strings representing locations
   * @return {Prommise}               [description]
   */
  batchGeocodeStatic(locationNames =[]) {

    // create static location array of objects having random lat/long
    const staticLocations = locationNames.map((locationName) => {
      return { locationName, ...this.getRandomGeoLoacation() };
    });

    // return Promise to make complete function switchable with this.batchGeocode()
    return new Promise((resolve)=> {

      setTimeout(function() {
        resolve(staticLocations);
      }, 500);

    });
  },

  /**
   * @return {Object} With random long and lat prop
   */
  getRandomGeoLoacation() {
    const long = Math.random() * 180 * this.randomNegative();
    const lat = Math.random() * 90 * this.randomNegative();
    return {long, lat};
  },

  /**
   * @return -1 or 1
   */
  randomNegative() {
    return Math.random() < 0.5 ? -1 : 1;
  }
};

export default Geocoder;