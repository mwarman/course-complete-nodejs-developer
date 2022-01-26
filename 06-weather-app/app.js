const geocode = require('./utils/geocode');
const fetchForecast = require('./utils/forecast');

const location = process.argv[2];
if (!location) {
  console.log('Location is required.');
  return;
}

geocode(location, (error, { latitude, longitude, location } = {}) => {
  if (error) {
    console.log(error);
    return;
  }

  fetchForecast(latitude, longitude, (error, forecast) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(
      `${location}\n${forecast.description}\nIt is currently ${forecast.temperatureActual} degrees outside.\nIt feels like ${forecast.temperatureApparent} degrees.`
    );
  });
});
