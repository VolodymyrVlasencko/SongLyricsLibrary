const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
  e_mail: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  myLyrics: [
    {
      songName: String,
      singer: String,
      lyrics: String
    }
  ]
});

module.exports = user_schema;
