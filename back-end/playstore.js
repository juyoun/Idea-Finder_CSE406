var gplay = require('google-play-scraper');

var count = 0;
var result = new Array;

var data = gplay.search({
    term: "혼밥",
    num: 250, // max: 250
    lang: 'kr'
  }).then(data => {
 for(var attr in data){
    result.push(data[attr].title);
 //   console.log(data[attr].url);
    count += 1;
  }

  result.push(count);
  //console.log(count);
	// console.log(result);

});
