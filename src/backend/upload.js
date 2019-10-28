var fs = require('fs');
var express = require('express');
var multer  = require('multer');
var uuid = require('uuid');

var router = express.Router();
var upload = multer({dest: 'upload_tmp/'});

router.post('/', upload.any(), function(req, res, next) {
    var dst_name = uuid.v1() + ".png";
    var des_file = "./public/upload/" + dst_name;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            response = {
                statuse: "failed",
                filename: "",
                thumbUrl: "",
                url: ""
            };

            if (err != null){
                console.log( err );
            } else {
                response.statuse= "success",
                response.name = dst_name;
                response.thumbUrl = "./upload/" + dst_name;
                response.url = "./upload/" + dst_name;
            }

            res.send(response);
        });
    });
});

module.exports = router;