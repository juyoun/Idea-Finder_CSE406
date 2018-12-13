var express = require('express');
var router = express.Router();
var User = require('./ranking.js');
var path = require('path');
var search;
var store = require('app-store-scraper');

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views','main.html'));
});

router.post('/grading.html', function(req, res){
        search = req.body.search;
	var Collect = new Search();
	Collect.findOneAndUpdate({keyword : search},
		{$set : {keyword: search}, $inc : {count: 1}},
		{upsert : true},
		function(err, data){
			if (err)
				console.log(err);
			else
				console.log("DB insert OK");
		}
	
	);
        res.render('grading.html',{
			title: search
			});
});

router.get('/detail.html', function(req, res){
	res.sendFile(path.join(__dirname, 'views','detail.html'));
});

router.get('/app_detail.html', function(req, res){
        var count = 0;
        var result = new Array;

        var data = store.search({
        term: search,
        num: 1000,
        // page: 1,
        language : 'ko-kr'
        }).then(data => {
        for(var attr in data){
        result.push(data[attr].title);
        count += 1;
        }
        result.push(count);
});
        res.render('app_detail.html',{
			title: search,
			nav: result,
			total: count
	});
});

router.get('/news_detail.html', function(req, res){
        res.sendFile(path.join(__dirname, 'views','news_detail.html'));
});

router.get('/paper_detail.html', function(req, res){
        res.sendFile(path.join(__dirname, 'views','paper_detail.html'));
});

/*
router.get('/grading.html', function(req, res){
   var search = req.body.search;
   res.sendFile(path.join(__dirname, 'views', 'grading.html'));
});
*/

/*router.post('/grading.html', function(req, res){
  var search = req.body.search;
  res.sendFile(path.join(__dirname, 'views','grading.html'));
  var store = require('app-store-scraper');
  var count = 0;
  var data = store.search({
  term: search,
  num: 1000,
  // page: 1,
  language : 'ko-kr'
}).then(data => {
  for(var attr in data){
    res.send(data[attr].title);
    count += 1;
  }
  res.send(count);
});
});
*/


/*router.post('/grading.html'), function(req, res){
	var search = req.body.search;
	res.send(search);
});
*/


//});
//router.get('/:name', (req, res) => {
  //User.find({ name: req.params.name }, (err, user) => {
    //res.render('/main', { user: user } );
  //});
//});
module.exports = router;
