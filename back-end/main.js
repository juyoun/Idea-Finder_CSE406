//main.js
var express = require('express');
//var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
//var fs = require('fs');
var db = require('./db.js'); //db 불러오기
var router= require('./route.js'); //router 불러오기
app.use(bodyParser.urlencoded({ extended: true }));
//app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'public')))
//app.set('view engine','html');
//app.use('/', express.static(__dirname + '/public'));
//app.set('view engine','pug');
//app.use(express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, 'public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile); 


//http.createServer(function(request,response){
//    var url = request.url;
//    if(request.url == '/'){
  //    url = '/main.html';
   // }
   // if(request.url == '/favicon.ico'){
     // response.writeHead(404);
       //   response.end();
         // return;
 //   }
   // response.writeHead(200);
  //  response.end(fs.readFileSync(__dirname + url));});
db(); //실행
app.use('/', router);
//에러 처리 부분
app.listen(3000, () => {
  console.log('IF WEB is  on port 3000!');
});
