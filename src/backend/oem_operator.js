var db_controller = require('./db/oemdb_controller.js');
var uuid = require('uuid');

exports.list = function(req, res) {
    var oems = db_controller.list();
    res.send(oems);
}

exports.add = function(req, res) {
    var result = {
        result : -1,
        oemid : "",
    }

    var new_oem = {
        "oemid" : uuid.v1(),
        "vendor" : req.body.vendor,
        "product" : req.body.product,
        "copyright" : req.body.copyright,
        "icon" : req.body.icon,
    }

    db_controller.add_oem(new_oem);

    result.result = 0;
    result.oemid = new_oem.oemid;

    res.send(result);
}

exports.update = function(req, res) {
    var result = {
        result : -1,
        oemid : "",
    }

    var new_oem = {
        "oemid" : req.body.oemid,
        "vendor" : req.body.vendor,
        "product" : req.body.product,
        "copyright" : req.body.copyright,
        "icon" : req.body.icon,
    }

    db_controller.update_oem(new_oem);

    result.result = 0;
    result.oemid = new_oem.oemid;

    res.send(result);
}

exports.del = function(req, res) {
    var result = {
        result : -1
    }

    var new_oem = {
        "oemid" : req.body.oemid,
    }

    db_controller.del_oem(new_oem);

    result.result = 0;

    res.send(result);
}