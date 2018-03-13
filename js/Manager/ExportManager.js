/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../PubSub/Subscriber.js",
  "../JsonFormat/FeatureFactory4Factory.js",
  "../JsonFormat/FeatureFactory4Viewer.js"
], function(
  Subscriber,
  FeatureFactory4Factory,
  FeatureFactory4Viewer
) {
  'use strict';

  /**
   * @class ExportManager
   * @augments Subscriber
   */
  function ExportManager() {

    Subscriber.apply(this, arguments);

    this.init();
  }

  ExportManager.prototype = Object.create(Subscriber.prototype);

  ExportManager.prototype.init = function() {

    this.name = 'ExportManager';

    this.addCallbackFun('exporttoviewer', this.exportToViewer);
    this.addCallbackFun('exporttofactory', this.exportToFactory);

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.exportToViewer = function() {

    var manager = window.broker.getManager('exporttoviewer', 'ExportManager');

    var cells = manager.cellObj4Viewer(manager);
    var cellBoundaries = manager.cellBoundaryObj4Viewer();
    var states = manager.stateObj4Viewer();
    var transitions = manager.transitionObj4Viewer();

    var result = {};
    if (Object.keys(cells).length != 0) result['CellSpace'] = cells;
    if (Object.keys(cellBoundaries).length != 0) result['CellSpaceBoundary'] = cellBoundaries;
    if (Object.keys(states).length != 0) result['State'] = states;
    if (Object.keys(transitions).length != 0) result['Transition'] = transitions;

    result = JSON.stringify(result);

    // send json data to viewer
    var xhr = new XMLHttpRequest();
    var filename = null;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        log.info(">>>> succeed to exporting json");
      }
    }

    xhr.open("POST", "http://127.0.0.1:8080/save-json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(result);
  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.cellObj4Viewer = function(manager) {

    var cells = {};

    var geometries = window.storage.geometryContainer.cellGeometry;
    var properties = window.storage.propertyContainer.cellProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Viewer('CellSpace');
      tmp.setGeometryId("CG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points);
      cells[geometries[key].id] = tmp;

    }

    // copy attributes
    for (var key in properties) {

      var id = properties[key].id;
      cells[id].setName(properties[key].name);
      cells[id].setDescription(properties[key].description);
      cells[id].setPartialboundedBy(properties[key].partialboundedBy);
      cells[id].setExternalReference(properties[key].externalReference);
      cells[id].setDuality(properties[key].duality);

    }

    // pixel to real world coordinates
    for (var floorKey in floorProperties) {

      var cellkeyInFloor = floorProperties[floorKey].cellKey;
      var stage = window.storage.canvasContainer.stages[floorProperties[floorKey].id].stage;

      var pixelLLC = [0, 0, 0];
      var pixelURC = [stage.getAttr('width'), stage.getAttr('height'), 0];
      var worldLLC = [floorProperties[floorKey].lowerCorner[0] * 1, floorProperties[floorKey].lowerCorner[1] * 1, 0];
      var worldURC = [floorProperties[floorKey].upperCorner[0] * 1, floorProperties[floorKey].upperCorner[1] * 1, 0];


      for (var cellKey in cellkeyInFloor) {

        cells[cellkeyInFloor[cellKey]].setHeight(floorProperties[floorKey].celingHeight);
        var points = cells[cellkeyInFloor[cellKey]].getCoordinates();

        for (var i = 0; i < points.length; i++) {
          var trans = manager.affineTransformation(pixelURC, pixelLLC, worldURC, worldLLC, points[i]);
          cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'x', trans._data[0]);
          cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'y', trans._data[1]);
          cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'z', floorProperties[floorKey].groundHeight * 1);
        }
      }
    }

    return cells;

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.cellBoundaryObj4Viewer = function() {

    var cells = {};


    return cells;

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.stateObj4Viewer = function() {

    var cells = {};


    return cells;

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.transitionObj4Viewer = function() {

    var cells = {};


    return cells;

  }


  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.exportToFactory = function() {

    var manager = window.broker.getManager('exporttofactory', 'ExportManager');

    var result = {};

    var document = {
      "id": window.storage.propertyContainer.projectProperty.id
    };

    var indoorfeatures = {
      "docId": document.id,
      "id": window.conditions.guid()
    };

    var primalspacefeatures = {
      "docId": document.id,
      "parentId": indoorfeatures.id,
      "id": window.conditions.guid()
    };

    var cells = manager.cellObj4VFactory(document.id, primalspacefeatures.id);
    var cellBoundaries = manager.cellBoundaryObj4VFactory(document.id, primalspacefeatures.id);
    var states = manager.stateObj4VFactory(document.id, primalspacefeatures.id);
    var transitions = manager.transitionObj4VFactory(document.id, primalspacefeatures.id);

    var result = {};
    result['Document'] = document;
    result['indoorfeatures'] = indoorfeatures;
    result['primalspacefeatures'] = primalspacefeatures;

    if (cells.length != 0) result['CellSpace'] = cells;
    if (cellBoundaries.length != 0) result['CellSpaceBoundary'] = cellBoundaries;

    result = JSON.stringify(result);

    // send json data to viewer
    var xhr = new XMLHttpRequest();
    var filename = null;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        log.info(">>>> succeed to exporting json");
      }
    }

    xhr.open("POST", "http://127.0.0.1:8080/save-json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(result);

  }

  /**
  * @memberof ExportManager
  * @return Array of Format4Factory.CellSpace
  */
  ExportManager.prototype.cellObj4VFactory = function(docId, parentId){

    var cells = {};
    var result = [];
    var conditions = window.conditions.exportConditions.CellSpace;
    var geometries = window.storage.geometryContainer.cellGeometry;
    var properties = window.storage.propertyContainer.cellProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;
    var manager = window.broker.getManager('exporttofactory', 'ExportManager');

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Factory('CellSpace', conditions);
      tmp.setId(geometries[key].id);
      tmp.setDocId(docId);
      tmp.setParentId(parentId);
      tmp.setGeometryId("CG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points);
      cells[geometries[key].id] = tmp;

    }

    // copy attributes
    for (var key in properties) {

      var id = properties[key].id;
      if(conditions.properties.name) cells[id].setName(properties[key].name);
      if(conditions.properties.description) cells[id].setDescription(properties[key].description);
      if(conditions.properties.partialboundedBy) cells[id].setPartialboundedBy(properties[key].partialboundedBy);
      if(conditions.properties.externalReference) cells[id].setExternalReference(properties[key].externalReference);
      if(conditions.properties.duality) cells[id].setDuality(properties[key].duality);

    }

    // pixel to real world coordinates
    for (var floorKey in floorProperties) {

      var cellkeyInFloor = floorProperties[floorKey].cellKey;
      var stage = window.storage.canvasContainer.stages[floorProperties[floorKey].id].stage;

      var pixelLLC = [0, 0, 0];
      var pixelURC = [stage.getAttr('width'), stage.getAttr('height'), 0];
      var worldLLC = [floorProperties[floorKey].lowerCorner[0] * 1, floorProperties[floorKey].lowerCorner[1] * 1, 0];
      var worldURC = [floorProperties[floorKey].upperCorner[0] * 1, floorProperties[floorKey].upperCorner[1] * 1, 0];


      for (var cellKey in cellkeyInFloor) {

        cells[cellkeyInFloor[cellKey]].setHeight(floorProperties[floorKey].celingHeight);
        var points = cells[cellkeyInFloor[cellKey]].getCoordinates();

        for (var i = 0; i < points.length; i++) {
          var trans = manager.affineTransformation(pixelURC, pixelLLC, worldURC, worldLLC, points[i]);
          cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'x', trans._data[0]);
          cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'y', trans._data[1]);
          cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'z', floorProperties[floorKey].groundHeight * 1);
        }
      }
    }

    for(var key in cells){
      result.push(cells[key]);
    }

    return result;

  }

  /**
  * @memberof ExportManager
  * @return Array of Format4Factory.CellSpaceBoundary
  */
  ExportManager.prototype.cellBoundaryObj4VFactory = function(docId, parentId){
    var cellBoundaries = [];

    return cellBoundaries;
  }

  /**
  * @memberof ExportManager
  * @return Array of Format4Factory.State
  */
  ExportManager.prototype.stateObj4VFactory = function(docId, parentId){
    var states = [];

    return states;
  }

  /**
  * @memberof ExportManager
  * @return Array of Format4Factory.Transition
  */
  ExportManager.prototype.transitionObj4VFactory = function(docId, parentId){
    var transitions = [];

    return transitions;
  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.affineTransformation = function(pixelURC, pixelLLC, worldURC, worldLLC, point) {

    var widthScale = worldURC[0] / pixelURC[0];
    var heightScale = worldURC[1] / pixelURC[1];
    var widthTrans = worldLLC[0] - pixelLLC[0];
    var heightTrans = worldLLC[1] - pixelLLC[1];
    var matrix = math.matrix([
      [widthScale, 0, widthTrans],
      [0, heightScale, heightTrans],
      [0, 0, 1]
    ]);
    var pointMatrix = math.matrix([point[0], point[1], point[2]]);

    return math.multiply(matrix, pointMatrix);

  }


  return ExportManager;
});
