var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  keyword: String,
  
});
module.exports = mongoose.model('User', userSchema);
