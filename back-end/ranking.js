var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  keyword : String,
  count : Number
});

module.exports = mongoose.model('Search', userSchema);
