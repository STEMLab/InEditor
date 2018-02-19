/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../PubSub/Subscriber.js",
  "../JsonFormat/CellFormat.js"
], function(
  Subscriber,
  CellFormat
) {
  'use strict';

  /**
   * @class ProjectManager
   * @augments Subscriber
   */
  function ProjectManager() {

    Subscriber.apply(this, arguments);

    this.init();
  }

  ProjectManager.prototype = Object.create(Subscriber.prototype);

  ProjectManager.prototype.init = function() {

    this.name = 'ProjectManager';

    this.addCallbackFun('exporttojson', this.exportToJson);

  }

  /**
   * @param {Message.reqObj} reqObj null
   * @memberof ProjectManager
   */
  ProjectManager.prototype.exportToJson = function(reqObj) {

    var manager = window.broker.getManager('exporttojson', 'ProjectManager');

    var cell = { "CellSpace" : manager.celldataToJson() };

    var xhr = new XMLHttpRequest();
    var filename = null;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        log.info(">>>> succeed to exporting json");
      }
    }

    xhr.open("POST", "http://127.0.0.1:8080/export-json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(cell));

  }

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.celldataToJson = function() {

    var result = {};
    var geometries = window.storage.geometryContainer.cellGeometry;

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new CellFormat();
      tmp.pushCoordinates(geometries[key].points);
      result[geometries[key].id] = tmp;

    }

    // copy attributes
    var properties = window.storage.propertyContainer.cellProperties;

    for (var key in properties) {

      result[properties[key].id].setName(properties[key].name);
      result[properties[key].id].setDesc(properties[key].description);

    }

    // pixel to real world coordinates
    var floorProperties = window.storage.propertyContainer.floorProperties;

    for(var key in floorProperties){

      var cells = floorProperties[key].cellKey;
      var stage = window.storage.canvasContainer.stages[floorProperties[key].id].stage;

      var widthScale = floorProperties[key].upperCorner[0] / stage.getAttr('width');
      var heightScale = floorProperties[key].upperCorner[1] / stage.getAttr('height');
      var widthTrans = floorProperties[key].upperCorner[0] - stage.getAttr('width');
      var heightTrans = floorProperties[key].upperCorner[1] - stage.getAttr('height');
      var matrix = math.matrix([[widthScale, 0, 0], [0, heightScale, 0], [widthTrans, heightTrans, 1]]);

      for( var index in cells ){

        result[cells[key]].setCoordinates(
          window.broker.getManager('exporttojson', 'ProjectManager').pixel2realSurface(matrix, result[cells[key]].getCoordinates())
        );

      }

    }

    return result;

  }

 /**
 * matrix transform
 * @memberof ProjectManager
 */
  ProjectManager.prototype.pixel2realSurface = function(matrix, pixel){

    log.info("matrix : ", matrix, "pixel : ", pixel);

    var matrixTrans = [];

    var len = pixel.length;

    for(var i = 0; i < len; i++){

      var pixelMatrix = math.matrix([pixel[i][0], pixel[i][1], 0]);
      var result = math.multiply(matrix, pixelMatrix);
      matrixTrans.push(result._data[0], result._data[1]);

    }

    return matrixTrans;

  }


  return ProjectManager;
});
