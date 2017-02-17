import React from 'react';
import Map from '../Map/Map';
import LocationHelper from '../../helpers/LocationHelper';

const sampleData = [

  {
    location : {
      name: "iceland",
      lat: 64.8639007,
      long:-23.4949857
    }
  },
  {
    location : {
      name: "New York",
      lat: 40.7128,
      long: -74.0059
    }
  },
  {
    location : {
      name: "Berlin",
      lat: 52.52,
      long: 13.40
    }
  },
  {
    location : {
      name: "CapeTown",
      lat: -33.9249,
      long: 18.4241
    }
  },
  {
    location : {
      name: "Santiago de Chile",
      lat: -33.462972,
      long: -70.664171
    }
  },
  {
    location : {
      name: "Caracas",
      lat: 10.474776,
      long: -66.903421
    }
  },
  {
    location : {
      name: "Rom",
      lat: 41.896699,
      long: 12.497539
    }
  },
  {
    location : {
      name: "Iceland 2",
      lat: 64.241338,
      long: -18.791522
    }
  },
  {
    location : {
      name: "Namibia",
      lat: -21.623546,
      long: 15.134259
    }
  },
  {
    location : {
      name: "Sydney",
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
    const style = {
      textAlign: "center",
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflowX: "hidden"
    }
    return (
      <div style={style} className="MapTester">
        <Map entitiesToDraw={postsToDraw}/>
      </div>
    );
  }
}

export default MapTester;
