var express = require('express');
var router = express.Router();
var User = require('./ranking.js');
var path = require('path');

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views','main.html'));
});



//});
//router.get('/:name', (req, res) => {
  //User.find({ name: req.params.name }, (err, user) => {
    //res.render('/main', { user: user } );
  //});
//});
module.exports = router;
