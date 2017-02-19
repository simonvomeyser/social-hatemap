const apiUrl = 'http://api.socialhatemap.com/index.php';

import sampleData from './sampleData.json';

const Geocoder = {

  addGeoLocation(geocodableSHMEntities, IS_DEV_MODE) {

    const locations = geocodableSHMEntities.map((post) => post.location.cleanName);

    return new Promise((resolve) => {

      this.batchGeocode(locations, IS_DEV_MODE)
      .then((geoCodedLocations) => {

        const geoCodedSHMEntities = geocodableSHMEntities
          .filter((e, i) => {
            return (geoCodedLocations[i] && geoCodedLocations[i].status === 'success');
          })
          .map((e, i) => {
            return {...e, location:geoCodedLocations[i]};
          });
        resolve(geoCodedSHMEntities);
      })
    })

  },

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
    var locationPromises = locationNames.map((locationName) => {
      return this.fetchJSONFromAPI(locationName);
    });

    return Promise.all(locationPromises);
  },

  /**
   * Get the geodata from google maps using a location string
   * @param  {string} locationName Name of location for geocoding
   * @return {Promise}
   */
  fetchJSONFromAPI(locationName) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        fetch('http://maps.google.com/maps/api/geocode/json?address=' + locationName)
        .then((response) => {
          return response.json();
        })
        .then((geocodeJSON) => {
          return resolve(this.formatJSON(geocodeJSON));
        });
      }, 20);
    });
  },

  /**
   * Formats the geocode result from google Maps for using
   * @param  {object} geocodeJSON geodata from google maps
   * @return {object} returnJSON
   */
  formatJSON(geocodeJSON) {
    if(!geocodeJSON || geocodeJSON['status'] !== 'OK') {
      return { 'status': 'error' };
    }
    else {
      var returnJSON = {
        'lat':geocodeJSON['results'][0]['geometry']['location']['lat'],
        'long':geocodeJSON['results'][0]['geometry']['location']['lng'],
        'status':'success'
      };
      for (var i = 0; i < geocodeJSON['results'][0]['address_components'].length; i++) {
        if(geocodeJSON['results'][0]['address_components'][i]['types'].includes('political')) {
          returnJSON.name = geocodeJSON['results'][0]['address_components'][i]['short_name'];
          break;
        }
      }
      return returnJSON

    }
  },

  /**
   * Development function not call api during development
   * @param  {Array}  locationNames Array of Strings representing locations
   * @return {[Prommise]}               [description]
   */
  batchGeocodeStatic(locationNames = []) {
    // create location array of objects having static lat/long of a random city
    const locationObjects = locationNames.map((locationName, i) => {
      return this.formatJSON(sampleData[i]);
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
  getRandomGeoLoacation() {
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
