import React from 'react';
import Map from '../Map/Map';
import LocationHelper from '../../helpers/LocationHelper';

const sampleData = [
  {
    name: "New York",
    location : {
      lat: 40.7128,
      long: -74.0059
    }
  },
  {
    name: "Berlin",
    location : {
      lat: 52.52,
      long: 13.40
    }
  },
  {
    name: "CapeTown",
    location : {
      lat: -33.9249,
      long: 18.4241
    }
  },
  {
    name: "Sydney",
    location : {
      lat: -33.8688,
      long: 151.2093
    }
  }
];
/**
 * The Map on which the tweets are shown
 */
class MapTester extends React.Component {
  render() {
    const postsToDraw = sampleData.map(LocationHelper.addXYLocationsToSHMEntity);
    return (
      <div className="MapTester">
        <Map entitiesToDraw={postsToDraw}/>
      </div>
    );
  }
}

export default MapTester;

