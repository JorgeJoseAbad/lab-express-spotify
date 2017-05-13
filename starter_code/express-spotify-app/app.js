/*jshint esversion: 6*/
const SpotifyWebApi   = require('spotify-web-api-node');
const express         = require('express');
const morgan          = require('morgan');
const bodyParser      = require('body-parser');
const expressLayouts  = require('express-ejs-layouts');

const spotify         = new SpotifyWebApi();
const app             = express();

app.use(express.static('public'));
app.use(expressLayouts);
app.use(morgan('dev'));

app.set('layout', 'layouts/main-layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  let data = {
    name: "Jorge",
  };

  res.render('home', data);
});

spotify.searchArtists("The Beatles", {}, (err, data) => {
  if (err) throw err;

  let artists = data.body.artists.items;
  console.log(artists);
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
