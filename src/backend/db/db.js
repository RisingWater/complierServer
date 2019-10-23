var path = require('path');
var fs = require('fs');

const db_dir = '../../../db/'

function load_db(filename) {
    var file = path.join(__dirname, filename);
    var data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return data;
}

function save_db(filename, data) {
    var file = path.join(__dirname, filename);
    fs.writeFileSync(file, JSON.stringify(data));
}

exports.load_user_db = function() {
    return load_db(db_dir + 'userdb.js');
}

exports.save_user_db = function(data) {
    return save_db(db_dir + 'userdb.js', data);
}

exports.load_path_db = function() {
    return load_db(db_dir + 'codepath.js');
}

exports.save_path_db = function(data) {
    return save_db(db_dir + 'codepath.js', data);
}

exports.load_publish_db = function() {
    return load_db(db_dir + 'publish_version.js');
}

exports.save_publish_db = function(data) {
    return save_db(db_dir + 'publish_version.js', data);
}

exports.load_sepconfig_db = function() {
    return load_db(db_dir + 'sepComplierConfig.js');
}

    