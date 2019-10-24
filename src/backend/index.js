var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodeCmd = require('node-cmd');
var xmlreader = require("xmlreader");

var mission_operator = require('./mission_operator.js');
var path_operator = require('./path_operator.js');
var user_operator = require('./user_operator.js');
var publish_operator = require('./publish_operator.js');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/mission/list', mission_operator.list);
app.post('/mission/add', mission_operator.add);
app.post('/mission/addsolution', mission_operator.addsolution);
app.post('/mission/del', mission_operator.del);

app.post('/user/check', user_operator.check);
app.post('/user/login', user_operator.login);
app.post('/user/register', user_operator.register);
app.post('/user/changepassword', user_operator.changepassword)
app.post('/user/:userid/subscribe/:software', user_operator.subscribe_software)

app.get('/path/:name/list', path_operator.list);
app.get('/path/sep/getconfig', path_operator.getsepconfig)

app.get('/publish/:name/list', publish_operator.list);

app.get('/svn', function (req, res) {
    nodeCmd.get(
        'svn info --username weilc --password weilc http://192.168.12.127:8129/thinclient/developing --xml',
        function(err, data, stderr) {
            var result = { result : -1, version : 0 } 
            if (err != null) {
                res.send(result);
            } else {
                xmlreader.read(data, function(errors, response) {
                    if (errors == null) {
                        result.result = 0;
                        result.version = response.info.entry.commit.attributes().revision;
                        res.send(result);
                    } else {
                        res.send(result);
                    }
                })
            }
        }
    );
})

app.get('/', function (req, res) {
    res.redirect("complierServer.html");
})
 
var server = app.listen(80, function () {
    var port = server.address().port;
    console.log("Complier Server start listening at %s", port);
});