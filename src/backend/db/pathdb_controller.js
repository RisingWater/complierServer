var db = require('./db.js');

exports.get_path = function (software) {
    config = null;
    var configlist = new Array();
    configlist = db.load_path_db();
    configlist.some((value) => {
        if (value.name == software) {
            config = value;
            return true;
        }
    })

    return config;
}

exports.get_config = function() {
    return db.load_sepconfig_db();
}