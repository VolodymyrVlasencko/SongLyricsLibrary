module.exports = function get_song_list(user) {
  const mongoose = require('mongoose');
  const user_schema = require('./user_schema.js');

  const Listener = mongoose.model('Listener', user_schema, 'Listeners');

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  Listener.findOne( {e_mail: email, username: username, password: password}, (err, res) => {
    if (err) throw err;
    if (res === null) {
      Listener.create( {e_mail: email, username: username, password: password}, (err, res) => {
        if (err) throw err;
      });
    }
  });
}
