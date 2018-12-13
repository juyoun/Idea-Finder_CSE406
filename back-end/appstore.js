var store = require('app-store-scraper');
var count = 0;
var result = new Array;

var data = store.search({
  term: '혼밥',
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
