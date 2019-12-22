module.exports = function getSongList(userId) {
  const mongoose = require('mongoose');
  const user_schema = require('./user_schema.js');

  const Listener = mongoose.model('Listener', user_schema, 'Listeners');

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  Listener.findById(userId, (err, res) => {
    if (err) throw err;
    if (res) {return songList = res.myLyrics}
  });
}
