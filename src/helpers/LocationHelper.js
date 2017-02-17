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
      if (element.location.name) {
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
    const mapWidth  = "1652.4702";
    const mapHeight = "1220.6384";

    let {x, y} = 0;
    // get x value
    x = (longitude+180)*(mapWidth/360);

    // convert from degrees to radians
    const latRad = latitude*Math.PI/180;

    // get y value
    const mercN = Math.log(Math.tan((Math.PI/4)+(latRad/2)));
    y     = (mapHeight/2)-(mapWidth*mercN/(2*Math.PI));

    // Hotfixes since postioning was not exact
    // @todo fix
    y = y + 0.098 * mapHeight;
    x = x - 0.005 * mapWidth;

    // change from px to %
    x = (x*100)/mapWidth + "%";
    y = (y*100)/mapHeight + "%";

    return {x,y};
  }
};

export default LocationHelper;
