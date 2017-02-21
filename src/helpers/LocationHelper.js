import Mercator from 'mercator-projection'

/**
 * [LocationHelper description]
 */
const LocationHelper = {

  /**
   * Adds the x/y location to given Entites 
   * @param  {Array} SHMEntities (must have lat/long)
   * @return {Array}             
   */
  addXYLocation(SHMEntities) {
    return SHMEntities.map(this.addXYLocationsToSHMEntity);
  },

  /**
   * Returns only Entites that have a location (can be geocoded)
   * @param  {Array} SHMEntities 
   * @return {Array}             
   */
  filterSHMEntities(SHMEntities) {
    return SHMEntities.filter(function(element) {
      if (element.location.cleanName) {
        return true;
      }
      return false;
    });
  },

  addXYLocationsToSHMEntity(SHMEntity) {
    const {x,y} = LocationHelper.convertGeoToPixel(SHMEntity.location.lat, SHMEntity.location.long);

    SHMEntity.location.x = x;
    SHMEntity.location.y = y;
    return SHMEntity;
  },
  /**
   * Transforms the given lat and long to x and y
   * @param  {object} latLong [description]
   * @return {[type]}         [description]
   */
  convertGeoToPixel(latitude, longitude) {
    // map width and height
    const mapWidth  = 256;
    const mapHeight = 256;

    // do some mercator transformation shit - get world coordinates from LatLng
    var worldCoords = Mercator.fromLatLngToPoint({lat: latitude, lng: longitude});

    // save world coordinates
    var worldCoordsX = worldCoords.x;
    var worldCoordsY = worldCoords.y;

    // zoom level -> level 0 = 256x256
    var zoomLevel = 0;

    // wold coordinates to pixelcoordinates
    var pixelCoordsX = worldCoordsX * (Math.pow(2, zoomLevel));
    var pixelCoordsY = worldCoordsY * Math.pow(2, zoomLevel);

    // calculate width and height in percentage
    let {x, y} = 0;
    pixelCoordsX = ((pixelCoordsX*100)/mapWidth) + "%";
    pixelCoordsY = ((pixelCoordsY*100)/mapHeight) + "%";
    x = pixelCoordsX
    y = pixelCoordsY

    return {x,y};
  }
};

export default LocationHelper;
