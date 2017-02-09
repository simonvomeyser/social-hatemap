const apiUrl = 'http://api.socialhatemap.com/index.php';

const Geocoder = {
  /**
   * Batch Transforms given Names of Locations in objects containing lat/long
   * 
   * @param array Strings of Location Names
   * @return Promise On resloving JSON with objects
   */
  batchGeocode(locationNames =[]) {
    return locationNames.map((locationName) => {
      return { locationName, ...getRandomGeoLoacation() };
    });
  },

  getRandomGeoLoacation() {
    const long = Math.random() * Math.PI * 2;
    const lat = Math.acos(Math.random() * 2 - 1);
    return [long, lat];
  }
};

export default Geocoder;