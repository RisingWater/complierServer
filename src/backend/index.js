var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mission_operator = require('./mission_operator.js');
var path_operator = require('./path_operatior.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/mission/list', mission_operator.list);
app.post('/mission/add', mission_operator.add);
app.post('/mission/del', mission_operator.del);

app.get('/path/:name/list', path_operator.list);

app.get('/', function (req, res) {
    res.redirect("complierServer.html");
})
 
var server = app.listen(80, function () {
    var port = server.address().port;
    console.log("Complier Server start listening at %s", port);
});