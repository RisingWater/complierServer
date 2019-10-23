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

exports.load_user_db = function load_user_db() {
    return load_db(db_dir + 'userdb.js');
}

exports.save_user_db = function save_user_db(data) {
    return save_db(db_dir + 'userdb.js', data);
}

    