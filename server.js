var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(request, response){

	console.log('여기 실행됨');

	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " received.");

	if(pathname == "/"){
		pathname = "/main.html";
	}
	

	fs.readFile(pathname.substr(1), function(err, data){
		if(err){
			console.log(err);
			response.writeHead(404, {'Content-Type': 'text/html'});
		}
		else{
			response.writeHead(200, {'Content-Type' : 'text/html'});

			response.write(data, toString());
		}	
		response.end();
	});

}).listen(3000);


console.log('Server running at 52.78.29.207:3000');
