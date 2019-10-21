var fs = require('fs');
var path = require('path');

exports.check = function(req, res) {
    var user = null;
    var file = path.join(__dirname, "../../db/userdb.js");
    var userlist = new Array();

    var result = {
        result : -1,
        userid : req.body.userid,
        username : "",
        isAdmin : false,
        subscribe: "",
    }
    userlist = JSON.parse(fs.readFileSync(file, 'utf-8'));
    userlist.some((value) => {
        if (value.userid == req.body.userid) {
            user = value;
            return true;
        }
    })

    if (user != null) {
        result.result = 0;
        result.username = user.username;
        result.isAdmin = user.isAdmin;
        result.subscribe = user.subscribe;
    }
    
    res.send(result);
}