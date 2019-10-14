var fs = require('fs');
var path = require('path');

exports.list = function(req, res) {
    var config = null;
    var file = path.join(__dirname, "../../db/codepath.js");
    var configlist = new Array();
    configlist = JSON.parse(fs.readFileSync(file, 'utf-8'));
    configlist.some((value) => {
        if (value.name == req.params.name) {
            config = value;
            return true;
        }
    })
    if (config == null) {
        res.sendStatus(500);
    } else {
        res.send(config);
    }
}