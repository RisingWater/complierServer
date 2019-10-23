var db = require('./db.js');

exports.get_software = function (software) {
    config = null;
    var configlist = new Array();
    configlist = db.load_publish_db();
    configlist.some((value) => {
        if (value.software == software) {
            config = value;
            return true;
        }
    })

    return config;
}