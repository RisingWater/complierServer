var db = require('./db.js');

exports.list = function () {
    return db.load_oem_db();
}

exports.add_oem = function (oem) {
    var oems = db.load_oem_db();
    oems.push(oem);
    db.save_oem_db(oems);
}

exports.update_oem = function (oem) {
    var oems = db.load_oem_db();
    oems.some(element => {
        if (element.oemid == oem.oemid) {
            element.vendor = oem.vendor;
            element.product = oem.product;
            element.copyright = oem.copyright;
            element.icon = oem.icon;
            return true;
        }
    });
    db.save_oem_db(oems);
}

exports.del_oem = function (oem) {
    var oems = db.load_oem_db();
    oems = oems.filter(element => {
        return element.oemid != oem.oemid;
    });
    db.save_oem_db(oems);
}