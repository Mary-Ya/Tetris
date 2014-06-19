var port        = 3000;
var express     = require("express");
var app         = express();
 var fs = require('fs');

/*fs.readdir('C:\\', function (err) {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});*/

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', function (req, res) {
	//res.redirect('./about.html');
	
});


app.listen(port);
console.log('Listening on port ' + port);