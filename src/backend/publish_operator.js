var db_controller = require('./db/publishdb_controller.js')

exports.list = function(req, res) {
    var config = db_controller.get_software(req.params.name);

    if (config == null) {
        res.sendStatus(500);
    } else {
        res.send(config);
    }
}