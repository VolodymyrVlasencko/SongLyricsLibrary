// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
// const waterfall = require('async-waterfall');
const user_schema = new mongoose.Schema({
  e_mail: {
    type: String,
    unique: true
  },
  username: {
    type: String,
  },
  password: {
    type: String
  },
  myLyrics: [Object]
});

module.exports = user_schema;
