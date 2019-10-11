const adodb = require('node-adodb');
var fs=require('fs');

//const connection = adodb.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=D:\\web\\App_Data\\compliermission.mdb');
const connection = adodb.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=D:\\code\\complierServer\\db\\compliermission.mdb');

const tmp_path = "F:\\output\\tmp\\";
const log_path = "F:\\output\\log\\";
const bin_path = "F:\\output\\bin\\";

const readme_filename = "Readme.txt";
const define_filename = "serverdefine.iss";
const include_filename = "ComplierDefine.h";
const linuxbuild_filename = "linux_build.sh";

exports.list = function(req, res) {
    var sql = "SELECT * FROM 任务 ORDER BY 任务编号 DESC";
    var result = { result : 0, data : [] };
    connection.query(sql)
    .then(data => {
        result.result = 0;    
        result.data = data;
        res.send(result);
    })
    .catch(error => {
        console.log(error);
        result.result = -1;
        res.send(result);  
    })
}

function deleteFolder(path) {
    var files = [];
    console.log("删除目录：" + data.输出目录);
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index){
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function createFolder(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

exports.del = function(req, res) {
    var sql = "";
    var result = { result : 0 };
    sql = "SELECT * FROM 任务 WHERE 任务编号 = " + req.body.id;
    connection.query(sql)
    .then(data => {
        deleteFolder(tmp_path + data.输出目录);
        deleteFolder(bin_path + data.输出目录);
        deleteFolder(log_path + data.输出目录);

        var sql = "DELETE FROM 任务 WHERE 任务编号 = " + req.body.id;
        connection.execute(sql)
        .then(data => {
            result.result = 0;
            res.send(result);  
        })
        .catch(error => {
            console.log(error);
            result.result = -1;
            res.send(result);  
        })
    })
    .catch(error => {
        console.log(error);
        result.result = -1;
        res.send(result);  
    })
}

function getMissionSeq(version, date) {
    return version 
        + "_"
        + date.getFullYear()
        + (date.getMonth() >= 10 ? date.getMonth() : ("0" + date.getMonth()))
        + (date.getDay() >= 10 ? data.getDay() : ("0" + date.getDay()))
        + "_"
        + date.getHours()
        + date.getMinutes()
        + date.getSeconds();
}

exports.add = function(req, res) {
    var date = new Date();
    var mission_req =  + getMissionSeq(req.body.version, date);
    var sql = "INSERT INTO 任务(分支, 版本号, svn版本号, 编译时间, 任务状态, 输出目录, 备注, 编译选项, mailto, 目标生成, 代码路径) VALUES ('" +
        req.body.path + "', '" +
        req.body.version + "', '" +
        req.body.svn_version + "', '" +
        date.toLocaleString() + "', '" +
        "正在等待" + "', '" +
        mission_req + "', '" +
        req.body.desc + "', '" +
        req.body.buildMap + "','" +
        req.body.mailto + "','" +
        0 + "','" +
        req.body.codepath + "')";

    createFolder(tmp_path + mission_req);
    createFolder(bin_path + mission_req);
    createFolder(log_path + mission_req);

    fs.writeFileSync(tmp_path + readme_filename, req.body.filedata_readme);
    fs.writeFileSync(tmp_path + define_filename, req.body.filedata_define);
    fs.writeFileSync(tmp_path + include_filename, req.body.filedata_include);
    fs.writeFileSync(tmp_path + linuxbuild_filename, req.body.filedata_linuxbuild);
    
    console.log(sql);

    connection.execute(sql)
    .then(data => {
        result.result = 0;
        res.send(result);  
    })
    .catch(error => {
        console.log(error);
        result.result = -1;
        res.send(result);  
    })
}