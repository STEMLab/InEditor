var express = require("express");
var bodyParser = require('body-parser');
var jsonFormat = require("json-format");
var fs = require("fs");
var BSON = require("bson");
var app = express();


app.use('/', express.static(__dirname));
app.use(express.json({limit: '1gb'}));
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '1gb'
}));
app.use(bodyParser.json());

var server = app.listen(8080, function() {

  console.log('IndoorGML-Editor App listening on port 8080...');

});


app.post('/save-json', function(req, res) {

  fs.writeFile('./output/output.json', jsonFormat(req.body), 'utf8', function(err) {

    if (err) return res.status(500).send(err);
    res.json('success');

  });
});


app.post('/save-project', function(req, res) {

  var bson = new BSON();

  fs.writeFile('./output/save-project.bson', bson.serialize(req.body), function(err) {

    if (err)  return res.status(500).send(err);

    res.json('success');

  });

});

app.get('/load-project', function(req, res) {

  var bson = new BSON();

  fs.readFile('./output/save-project.bson', function(err, data) {

    if (err) return res.status(500).send(err);

    var bson = new BSON();
    var json = bson.deserialize(data);
    res.json(json);

  });

});
