var express = require('express');
var router = express.Router();
var Search = require('./ranking');
var path = require('path');

var store = require('app-store-scraper');
var myGoogleNews = require('my-google-news');
var gplay = require('google-play-scraper');
var search;

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views','main.html'));
  Search.find({}).sort({count : -1}).select('-_id keyword').limit(10)
	.exec(function(err, docs){
        	if (err)
			console.log("sorting error");
		else
			console.log(docs[0].keyword);
	//docs[0].keyword 가 랭킹1위 2위는 docs[1].keyword.  for문 돌리면될듯	
	
	});
});

router.post('/grading.html', function(req, res){
        search = req.body.search;
        //var Collect = new Search();
        Search.findOneAndUpdate({keyword : search},
                {$set : {keyword: search}, $inc : {count: 1}},
                {upsert : true},
                function(err, data){
                        if (err)
                                console.log(err);
                        else
                                console.log("DB insert OK");
                });
});
/*myGoogleNews.resultsPerPage = 100; // max 100

        var nextCounter = 0;
        var googleQuery= search; //search Query
        var count1 = 0;
        var result1 = new Array;


        myGoogleNews(googleQuery, function (err, res2){
        if (err) return console.error(err)
        res2.links.forEach(function(item){
        result1.push(item.title);
        //console.log(item.title + ' - ' + item.href)i
        //console.log(item.title + ' - ' + item.href)
        //console.log(item.description + "\n")
        count1 ++;
  });
//result.push(count);

  //number of pages if you want more than one page
  if (nextCounter < 4) {
    nextCounter += 1
    if (res2.next) return res2.next()
    else{
        
  }
}
        
});

		var count2 = 0;
                var result2 = new Array;

                var data = gplay.search({
                term: search,
                num: 250, // max: 250
                lang: 'kr'
                 }).then(data => {
                for(var attr in data){
                 result2.push(data[attr].title);
                 count2 += 1;
                }
              
  //console.log(count);
});
	var count3 = 0;
        var result3 = new Array;

        var data = store.search({
        term: search,
        num: 1000,
        // page: 1,
        language : 'ko-kr'
        }).then(data => {
        for(var attr in data){
        result3.push(data[attr].title);
        count3 += 1;
        }
        });

var count4= Number(count1)+ Number(count2) + Number(count3);
res.render('grading.html',{
                        title: search,
		        score: count4
        }); */


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
	res.render('app_detail.html',{
                        title: search,
                        nav: result,
                        total: count
        });
	console.log(count);
});
});

router.get('/news_detail.html', function(req, res){


        myGoogleNews.resultsPerPage = 100; // max 100

        var nextCounter = 0;
        var googleQuery= search; //search Query
        var count = 0;
        var result = new Array;


        myGoogleNews(googleQuery, function (err, res2){
        if (err) return console.error(err)
        res2.links.forEach(function(item){
        result.push(item.title);
        //console.log(item.title + ' - ' + item.href)i
        //console.log(item.title + ' - ' + item.href)
        //console.log(item.description + "\n")
        count++;
  });
//result.push(count);

  //number of pages if you want more than one page
  if (nextCounter < 4) {
    nextCounter += 1
    if (res2.next) return res2.next()
    else{
	 result.push(count);
  }
}
console.log(count);
res.render('news_detail.html',{
                        title: search,
                        nav: result,
                        total: count
});
});
});




router.get('/paper_detail.html', function(req, res){
		var count = 0;
		var result = new Array;

		var data = gplay.search({
    		term: search,
    		num: 250, // max: 250
    		lang: 'kr'
 		 }).then(data => {
 		for(var attr in data){
   		 result.push(data[attr].title);
 		 count += 1;
  		}
		result.push(count);
  //console.log(count);
        // console.log(result)
        res.render('paper_detail.html',{
                        title: search,
                        nav: result,
                        total: count
});
});
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
