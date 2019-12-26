module.exports = function deleteSong(userId, songId) {
  const mongoose = require('mongoose');
  const user_schema = require('./user_schema.js');

  const Listener = mongoose.model('Listener', user_schema, 'Listeners');

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  Listener.findByIdAndUpdate(userId,
    { $pull: { myLirics: [ songId ] } }, 
    { multi: true }, (err, res) => {
    if (err) throw err;
  });
}
