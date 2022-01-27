const request = require('request');

/**
 * Fetch location information from third-party API (MapBox)
 * @param {string} place A string describing the location to be geocoded.
 * @param {Function} callback Callback function invoked with two parameters: error, data.
 */
const geocode = (place, callback) => {
  const accessToken = 'pk.eyJ1IjoibXdhcm1hbjk5IiwiYSI6ImNreXVrYjI2NjFvZG0ycHQ4ajQ0dXg3YmkifQ.UuTfKeu-Ol976R8oD4Ywmg';
  const encodedPlace = encodeURIComponent(place);
  const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedPlace}.json?limit=1&access_token=${accessToken}`;

  request({ url: geocodingUrl, json: true }, (error, response) => {
    // console.log(`response:\n${JSON.stringify(response.body, null, 2)}`);
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (!response.body.features || response.body.features.length === 0) {
      callback('Unable to find location!', undefined);
    } else {
      const { center, place_name } = response.body.features[0];
      callback(undefined, {
        location: place_name,
        latitude: center[1],
        longitude: center[0],
      });
    }
  });
};

module.exports = geocode;
