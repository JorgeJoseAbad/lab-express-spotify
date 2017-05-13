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
app.use(bodyParser.urlencoded({extended:true}));

app.set('layout', 'layouts/main-layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  let data = {
    name: "Jorge",
  };

  res.render('home', {nombre:data.name});
});

app.post('/artists',(req,res,next)=>{
  let artistName=req.body.artist;
  let artist;
  spotify.searchArtists("The Beatles", {}, (err, data) => {
    if (err) throw err;

    artist = data.body.artists.items;
    imgObj = artist[0].images[0];
    console.log(imgObj);
    //console.log(artists);
    res.render('artist',{artistName:artistName,artistFound:artist});
  });

});

spotify.searchArtists("The Beatles", {}, (err, data) => {
  if (err) throw err;

  let artists = data.body.artists.items;
  //console.log(artists);
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
