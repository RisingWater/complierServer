var db_controller = require('./db/pathdb_controller.js')

exports.list = function(req, res) {
    var config = db_controller.get_path(req.params.name);

    if (config == null) {
        res.sendStatus(500);
    } else {
        res.send(config);
    }
}

exports.getsepconfig = function(req, res) {
    var config = null;
    config = db_controller.get_config();
    res.send(config);
}