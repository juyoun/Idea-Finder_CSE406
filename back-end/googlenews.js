var myGoogleNews = require('my-google-news');

myGoogleNews.resultsPerPage = 100; // max 100

var nextCounter = 0;
var googleQuery="혼밥"; //search Query
var count = 0;
var result = new Array;


myGoogleNews(googleQuery, function (err, res){
  if (err) console.error(err)
  res.links.forEach(function(item){
	result.push(item.title);
//	 console.log(item.title + ' - ' + item.href)i
// console.log(item.title + ' - ' + item.href)
   // console.log(item.description + "\n")
    count++;
  });


  //number of pages if you want more than one page
  if (nextCounter < 4) {
    nextCounter += 1
    if (res.next) res.next()
    else result.push(count);
  }
console.log(result);
// console.log(count);
});
