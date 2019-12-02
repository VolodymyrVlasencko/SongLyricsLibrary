const express = require('express');
const http = require('http');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const api = require('genius-api');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const WebSocket = require('ws');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const cheerio = require('cheerio');
require('dotenv').config();

const port = 5000;
const server = new WebSocket.Server({ port });

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));


app.set('trust proxy', 1)

app.use(cookieSession({
  name: 'VlasenkoSecret',
   keys: ['key1', 'key2']
}));

// app.use(function (req, res, next) {
//   console.log(req.session);
//   next()
// });
app.use(function (req, res, next) {
  var n = req.session.views || 0
  req.session.views = n++
  //console.log((n + ' views'));
  next();
})

// app.use(cookieParser());
//UNLOCK WHILE HOSTING ON HEROKU!!! app.use(express.static(path.join(__dirname)));
// app.set('trust proxy', 1)

/* mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });


app.use(session({
  secret: 'VlasenkoSecret',
  key: 'sid',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    path: "/",
    httpOnly: true,
    maxAge: null
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection})
}));
app.use(session({
  genid: function(req) {
    return genuuid()
  },
  secret: 'VlasenkoSecret',
  resave: true,
  saveUninitialized: true
}))

app.use(function(req, res, next) {
  console.log(req.session.views);
  next();
});
*/
app.set('view engine', 'ejs');

const genius = new api(process.env.GENIUS_ACCESS_TOKEN);

let geniusUrl = `https://genius.com/Sia-chandelier-lyrics`;

function getFull(id, callback) {
  request.get(geniusUrl, function(
    error,
    response,
    data
  ) {
    const $ = cheerio.load(data);
    let song = $('.lyrics')
        .text()
        .trim()
        //console.log(song);
  });
}
//getFull();

server.on("connection", ws => {
  console.log('user connected');
  // ws.send(__dirname + 'index_main.ejs');

});


app.get('/', (req, res) => {
  let songList = [];

  function createSongList (search) {
    genius.search(search).then(function(response) {
      for (let key of Object.keys(response.hits)) {
        let songListToPush = {
          songName: response.hits[key].result.title,
          singer: response.hits[key].result.primary_artist.name,
          id: response.hits[key].result.id
        }
        songList.push(songListToPush);
      }
      res.render('index_main', { songList: songList });
      return songList;
    });
  }
  createSongList(req.query.search);

  const ws = new WebSocket('ws://localhost:5000');
});

app.get('/song/:id', (req, res) => {
  let mediaData = {
    songName: String(),
    singer: String(),
    album: String(),
    image: String(),
    lyrics: String()
  }

  genius.song(req.params.id).then(function(response) {
    mediaData = {
      songName:response.song.title,
      singer: response.song.primary_artist.name,
      album: response.song.album.name,
      image: response.song.song_art_image_url,
    }

    function getFull(id, callback) {
      request.get(response.song.url, function(
        error,
        response,
        data
      ) {
        const $ = cheerio.load(data);
        let song = $('.lyrics')
        .text()
        .trim();
        mediaData.lyrics = song;
        res.render('index_song_page', {mediaData: mediaData})
      });
    }
    getFull();
  });
});


app.get('/library', (req, res) => {
  res.render('index_lib')
});

app.get('/login', (req, res) => {
  res.render('index_signup')
});

app.get('/about', (req, res) => {
  res.render('index_about')
});

app.listen((process.env.PORT || 3000), function(){
  console.log('3000');
});
