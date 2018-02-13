var express = require("express");
var fileUpload = require("express-fileupload");
var app = express();
var path = require("path");
var fs = require("fs");
var bodyParser = require('body-parser');

app.use('/', express.static(__dirname));
app.use(fileUpload());

var server = app.listen(8080, function() {
  console.log('IndoorGML-Editor App listening on port 8080...');
})

app.post('/floorplan-upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  console.log(">> floorplan_upload success");

  var filename = "./assets/floorplan/";

  if (req.files.files.mimetype == 'image/jpeg') {

    filename += req.files.files.name + ".jpeg";

  } else if (req.files.files.mimetype == 'image/jpg') {

    filename += req.files.files.name + ".jpg";

  } else if (req.files.files.mimetype == 'image/gif') {

    filename += req.files.files.name + ".gif";

  } else if (req.files.files.mimetype == 'image/bmp') {

    filename += req.files.files.name + ".bmp";

  }

  let file = req.files.files;

  file.mv(filename, function(err) {
    if (err)
      return res.status(500).send(err);

    res.json(filename);

  });
});
