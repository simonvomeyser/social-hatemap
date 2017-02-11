const apiUrl = 'http://api.socialhatemap.com/index.php';

import sampleData from './sampleData.json';

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

  batchGeocodeStatic(locationNames = []) {

    // create location array of objects having static lat/long of a random city
    const locationObjects = locationNames.map((locationName) => {
      return { locationName, ...this.getRandomStaticLocation() };
    });

    return this.fakeDelayedApiResponse(locationObjects);
  },

  /**
   * Development function not call api during development
   * @param  {Array}  locationNames Array of Strings representing locations
   * @return {Prommise}               [description]
   */
  batchGeocodeRandom(locationNames =[]) {

    // create location array of objects having random lat/long
    const locationObjects = locationNames.map((locationName) => {
      return { locationName, ...this.getRandomGeoLoacation() };
    });

    return this.fakeDelayedApiResponse(locationObjects);
  },

  /**
   * Simulate api behavoiur
   * 
   * @param  {array} locations What to return after a short moment
   * @return {Promise} Will be resolved with a short delay
   */
  fakeDelayedApiResponse(locations) {
    return new Promise((resolve)=> {

      setTimeout(function() {
        resolve(locations);
      }, 500);

    });
  },

  /**
   * @return {Object} With random long and lat prop
   */
  getRandomLoacation() {
    const long = Math.random() * 180 * this.randomNegative();
    const lat = Math.random() * 90 * this.randomNegative();
    return {long, lat};
  },

  /**
   * @return {Object} With random long and lat from static source
   */
  getRandomStaticLocation() {
    return sampleData[Math.floor(Math.random()*sampleData.length)];
  },


  /**
   * @return -1 or 1
   */
  randomNegative() {
    return Math.random() < 0.5 ? -1 : 1;
  }
};

export default Geocoder;