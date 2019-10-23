var db_controller = require('./db/userdb_controller.js')

exports.check = function(req, res) {
    var user = null;
    var result = {
        result : -1,
        userid : req.body.userid,
        username : "",
        isAdmin : false,
        subscribe: "",
    }    

    user = db_controller.finduser_byuserid(req.body.userid);

    if (user != null) {
        result.result = 0;
        result.username = user.username;
        result.isAdmin = user.isAdmin;
        result.subscribe = user.subscribe;
    }
    
    res.send(result);
}

exports.login = function (req, res) {
    var result = {
        result : -1,
        userid : "",
    }

    var user = db_controller.finduser_byusername(req.body.username, req.body.password);

    if (user != null) {
        result.result = 0;
        result.userid = user.userid;
    } 
    
    res.send(result);   
}