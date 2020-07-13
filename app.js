var express = require("express");
var bodyParser = require('body-parser');
var vkbeautify = require('vkbeautify');
var fs = require("fs");
var BSON = require("bson");
var cors = require('cors');
var earcut = require('earcut');
var opn = require('opn');
var cmd     = require('node-command-line'),
    Promise = require('bluebird');
var os = require('os');
var app = express();

app.use('/', express.static(__dirname));
app.use(cors());
var jsonParsor = bodyParser.json();
app.use(bodyParser.json({limit: '1gb'}));
app.use(bodyParser.raw({
  limit: '1gb' }));
app.use(bodyParser.text({limit: '1gb'}));

var server = app.listen(5757, function() {

  console.log('IndoorGML-Editor App listening on port 5757...');
  opn('http://127.0.0.1:5757/', {app: 'chrome'});

  //console.log(process.env)
  Promise.coroutine(function *() {
    var res = yield cmd.run('javac ./lib/coor-converter/Convert.java -classpath ./lib/coor-converter/gdal.jar')
    if(res.success){
        // no message
    } else{
        console.log('error. failed to build convert module')
        console.log('To use convert module(set coordinates using map) you must set java anc gdal libary. Check description of ./lib/coor-converter/Convert.java')
        console.log('\n***')
        console.log(res.error)
        console.log('***')
    }
  })();

  fs.exists('./output/repo.json', function (exists) { 
      if(!exists){
        fs.writeFile('./output/repo.json', '{}', function(err){
            console.log('write repo.json') 
        })
      }
  });  
  

});


app.post('/save-json', function(req, res) {

  fs.writeFile('./output/output.json', jsonFormat(req.body), 'utf8', function(err) {

    if (err) return res.status(500).send(err);
    res.json('success');

  });
});


app.post('/save-project', function(req, res) {

  const data = JSON.stringify(req.body.doc);

  fs.writeFile(req.body.path, data, function(err) {
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

app.post('/save-gml/*', function(req, res) {

  fs.writeFile('./output/'+ req.params[0] +'.gml', vkbeautify.xml(req.body) , function(err) {

    if (err)  {
      console.log(err);
      return res.status(500).send(err);
    }

    res.send('/output/'+ req.params[0] +'.gml');

  });
});

app.post('/xml-to-json', function(req,res){
  var IndoorGML_Non_Navi_1_0_3 = require('./json/IndoorGML_Non_Navi_1_0_3.js').IndoorGML_Non_Navi_1_0_3;
  var IndoorGML_Navi_1_0_3 = require('./json/IndoorGML_Navi_1_0_3.js').IndoorGML_Navi_1_0_3;
  var IndoorGML_Storey = require('./json/IndoorGML_Storey.js').IndoorGML_Storey;
  var Jsonix = require('jsonix').Jsonix;
  var context = new Jsonix.Context([IndoorGML_Storey, IndoorGML_Non_Navi_1_0_3, IndoorGML_Navi_1_0_3]);
  var unmarshaller = context.createUnmarshaller();

  var resume = unmarshaller.unmarshalFile(req.body, function(result) {
  		res.send(JSON.stringify(result, null, 1));
  	});
});

app.post('/convert-bson-to-json', function(req, res){

  var buffer = new Buffer.from(req.body, "binary");
  var bson = new BSON();
  var json = bson.deserialize(buffer);
  res.send(json);

});

app.post('/triangulate', function(req, res){

  var triangles = earcut(req.body);
  res.send(triangles);

});

function convert(res) {
  console.log('------------------ convert to real world coordinates ------------------\n');

  Promise.coroutine(function *() {
    var cmdres = yield cmd.run('java -cp ./lib/coor-converter;./lib/coor-converter/gdal.jar Convert ./lib/coor-converter/const.txt ./lib/coor-converter/target.txt ./lib/coor-converter/result.txt');
    if(cmdres.success){
        console.log('--------------------------------------------------------------------\n\n');
        fs.readFile('./lib/coor-converter/result.txt', function(err, data) {
            if (err) return res.status(500).send(err);
            res.send(data);
        });
    } else{
        console.log('error. failed to convert real world coordinates')
        console.log(cmdres.error)
    }
  })();
}

app.post('/trans-dot', function(req, res) {

  let constArr = req.body.constArr;
  let allCoorArr = req.body.allCoorArr;

  fs.writeFile('./lib/coor-converter/const.txt', constArr, function(err) {
    if (err)  {
      console.log(err);
      return res.status(500).send(err);
    }

    fs.writeFile('./lib/coor-converter/target.txt', allCoorArr, function(err) {

      if (err)  {
        console.log(err);
        return res.status(500).send(err);
      }

      convert(res);

    });
  });

});


app.post('/validation', function(req, res) {
  let cityJSON = req.body.cityJSON;

  if(os.type() != 'Windows_NT') {
      console.log('validation only working on Windowss')
      res.status(500).send("warn! validation only work at Windows" );
  }
  else {
    var writeFile = Promise.promisify(require("fs").writeFile);
    var readFile = Promise.promisify(require("fs").readFile);
    let validation = Promise.coroutine(function *() {
        console.log('---------------------------- validation ----------------------------\n');
        yield cmd.run('.\\lib\\val3dity-2.1.0-windows-x64\\val3dity-2.1.0\\val3dity .\\output\\tmpJSON.json --report_json .\\output\\repo');
        console.log('--------------------------------------------------------------------\n\n');
      })
  
      writeFile('./output/tmpJSON.json', vkbeautify.json(JSON.stringify(cityJSON)))
      .then(()=> writeFile('./output/repo.json', '{}'))
      .then(()=> validation())
      .then(()=> readFile('./output/repo.json'))
      .then(content => {
        let data = JSON.parse(content);
        if(JSON.stringify({}) === JSON.stringify(data)) res.status(500).send("error! validation report is empty." );
        else if(data.invalid_features == 0 && data.invalid_primitives == 0) res.send(true);
        else res.status(500).send(data.invalid_primitives + " errors founded.\nFull validation report saved to \".\output\repo.json\"" );
      })
      .catch(function(e){
        console.log(e);
        return res.status(500).send(e);
      });
  }
});
