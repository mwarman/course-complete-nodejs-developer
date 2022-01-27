const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const fetchForecast = require('./utils/forecast');

const app = express();

// configure Express
// configure Handlebars view engine
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// configure static assets
app.use(express.static(path.join(__dirname, '../public')));

// configure API
// app.use('/api', express.json({ strict: false }));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Matt Warman',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Matt Warman',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Matt Warman',
  });
});

app.get('/api/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    res.status(400);
    res.send({
      error: "Parameter 'address' is required.",
    });
    return;
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      res.status(500);
      res.send({
        error,
      });
      return;
    }

    fetchForecast(latitude, longitude, (error, forecast = {}) => {
      if (error) {
        res.status(500);
        res.send({
          error,
        });
        return;
      }

      const summary = `${forecast.description}. It is currently ${forecast.temperatureActual} degrees. It feels like ${forecast.temperatureApparent} degrees.`;
      res.send({
        address,
        location,
        forecast,
        summary: summary,
      });
    });
  });
});

app.get('/api*', (req, res) => {
  res.status(404);
  res.end();
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    name: 'Matt Warman',
    message: 'The requested help article was not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Not Found',
    name: 'Matt Warman',
    message: 'The requested page was not found.',
  });
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000.');
});
