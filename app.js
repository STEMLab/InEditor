var express = require("express");
var fileUpload = require("express-fileupload");
var bodyParser = require('body-parser');
var locks = require('locks');
var path = require("path");
var jsonFormat = require("json-format");
var fs = require("fs");
var app = express();


app.use('/', express.static(__dirname));
app.use(fileUpload());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

var server = app.listen(8080, function() {

  console.log('IndoorGML-Editor App listening on port 8080...');

  // delete images in "./assets/floorplan/".
  fs.readdir("./assets/floorplan/", function(err, files) {
    for (var i = 0; i < files.length; i++) {
      fs.unlink("./assets/floorplan/" + files[i], function(err) {
        if (err) throw err;
      });
    }
  });

});

var mutex = locks.createMutex();

app.post('/floorplan-upload', function(req, res) {

  if (!req.files)
    return res.status(400).send('No files were uploaded.');

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

  mutex.lock(function() {
    console.log('----- lock : floorplan-upload ------------------');

    fs.writeFile(filename, req.files.files.data, 'binary', function(err) {

      if (err) return res.status(500).send(err);

      res.json(filename);

      console.log('----- unlock : floorplan-upload ----------------');

      mutex.unlock();

    });



  });


});

app.post('/floorplan-create-historyobj', function(req, res) {

  mutex.lock(function() {

    console.log('----- lock : floorplan-create-historyobj -------');

    fs.readdir("./assets/floorplan/", function(err, files) {

      var result;

      for (var i = 0; i < files.length; i++) {
        var split = files[i].split(".");

        if (split[0] == req.body.id) {
          fs.rename("./assets/floorplan/" + files[i], "./assets/floorplan/" + req.body.id + "-save." + split[1], function() {
            result = "./assets/floorplan/" + req.body.id + "-save." + split[1];
            res.json({
              result: result
            });

            console.log('----- unlock : floorplan-create-historyobj -----');
            mutex.unlock();
          });



          break;
        }

      }

    });

  });

});

app.post('/floorplan-undo', function(req, res) {

  mutex.lock(function() {

    console.log('----- lock : floorplan-undo --------------------');
    // console.log(req.body);

    var mode = req.body.mode;
    var floor = req.body.floor;

    if (mode == "delete only") {
      fs.readdir("./assets/floorplan/", function(err, files) {
        // console.log("> delete only : fs.readdir");

        for (var i = 0; i < files.length; i++) {
          var split = files[i].split(".");

          if (split[0] == req.body.floor) {
            fs.unlink("./assets/floorplan/" + files[i], function(err) {
              // console.log("> delete only : " + files[i] + " fs.unlink");
              if (err) throw err;
              res.json({
                result: "delete success"
              });

              console.log('----- unlock : floorplan-undo ------------------');
              mutex.unlock();
            });
            break;
          }
        }
      });
    } else if (mode == "delete and rename") {
      fs.readdir("./assets/floorplan/", function(err, files) {
        // console.log("> delete and rename : fs.readdir");
        for (var i = 0; i < files.length; i++) {
          var split = files[i].split(".");

          if (split[0] == req.body.floor) {
            fs.unlink("./assets/floorplan/" + files[i], function(err) {
              // console.log("> delete and rename : " + files[i] + " fs.unlink");
              if (err) throw err;

              var extention = req.body.filename.split(".")[2];
              // console.log("> extention : " + extention);
              fs.rename(req.body.filename, "./assets/floorplan/" + req.body.floor + "." + extention, function() {
                // console.log("> delete and rename : " + files[i] + " fs.rename");
                res.json({
                  result: "delete and rename success",
                  filename: "./assets/floorplan/" + req.body.floor + "." + extention
                });

                // console.log('> rename : ' + req.body.filename + ' to ' + req.body.floor + "." + extention );
                console.log('----- unlock : floorplan-undo ------------------');
                mutex.unlock();
              });
            });

            break;
          }
        }
      });
    }

  });
});

app.post('/save-json', function(req, res) {

  mutex.lock(function() {

    console.log('----- lock : save-json -------------------');
    console.log(req.body);

    fs.writeFile('./output/output.json', jsonFormat(req.body), 'utf8', function(err) {

      if (err) return res.status(500).send(err);

      res.json('success');

      console.log('----- unlock : save-json -------------------');

      mutex.unlock();

    });

  });

});
