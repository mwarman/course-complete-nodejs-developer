const request = require('request');

/**
 * Fetch current weather information from third-party API (WeatherStack).
 * @param {number} latitude The latitude component of coordinates.
 * @param {number} longitude The longitude component of coordinates.
 * @param {Function} callback Callback function invoked with two parameters: `error`, `data`.
 */
const fetchForecast = (latitude, longitude, callback) => {
  const apiKey = 'c3252c34376346e48d7ce7c602084c9b';
  const query = `${latitude},${longitude}`;
  const units = 'f';

  const forecastUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${query}&units=${units}`;

  request({ url: forecastUrl, json: true }, (error, response) => {
    // console.log(`response:\n${JSON.stringify(response.body, null, 2)}`);
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location!', undefined);
    } else {
      const { feelslike, temperature, weather_descriptions = [] } = response.body.current;
      callback(undefined, {
        description: weather_descriptions[0],
        temperatureActual: temperature,
        temperatureApparent: feelslike,
      });
    }
  });
};

module.exports = fetchForecast;
