var express = require("express")
  , spawn = require('child_process').spawn;


var app = express();

app.use(express.logger());

app.get('/', function(request, response) {
  response.send('This is Heroku Bench, read about me here: https://github.com/wcdolphin/heroku-benchserver');
});

app.get('/bench', function(req, res) {
  var command = spawn('/app/vendor/apache-2.4.4/bin/ab', ['-n', '1000','-c', '1000', 'http://nodejssimple.herokuapp.com/']);
  var output  = [];

  command.stdout.on('data', function(chunk) {
    output.push(chunk);
  }); 
  command.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
   });

  command.on('close', function(code) { 
    if (code === 0){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(Buffer.concat(output));
    }
    else{ res.send(500);}
  });
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});