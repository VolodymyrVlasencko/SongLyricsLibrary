module.exports = function addSong(userId, myLyrics) {
  const mongoose = require('mongoose');
  const user_schema = require('./user_schema.js');

  const Listener = mongoose.model('Listener', user_schema, 'Listeners');

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  Listener.findByIdAndUpdate(userId,
    { $push: { myLyrics } },
    { new: true }, (err, res) => {
    if (err) throw err;
    if (res) {
      lyrics = new Set(res.myLyrics);
      newLyrics = Array.from(lyrics.values());
      Listener.findByIdAndUpdate(userId, { myLyrics: newLyrics },
      { new: true }, (err, res) => {
        if (err) throw err;
      });
    }
  });
}
