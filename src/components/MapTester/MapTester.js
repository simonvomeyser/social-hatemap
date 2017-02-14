import React from 'react';
import Map from '../Map/Map';

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
  }
];
/**
 * The Map on which the tweets are shown
 */
class MapTester extends React.Component {
  render() {
    return (
      <div className="MapTester">
        <Map postToDraw={sampleData}/>
        <div className="MapTester__addLocation">
        Lat <input type="text"/>
        Long <input type="text"/>
        <button>Add</button>
        </div>
      </div>
    );
  }
}

export default MapTester;

