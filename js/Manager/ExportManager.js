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
    var cellBoundaries = manager.cellBoundaryObj4Viewer(manager);
    var states = manager.stateObj4Viewer(manager);
    var transitions = manager.transitionObj4Viewer(manager);

    var result = {};
    if (Object.keys(cells).length != 0) result['CellSpace'] = cells;
    if (Object.keys(cellBoundaries).length != 0) result['CellSpaceBoundary'] = cellBoundaries;
    if (Object.keys(states).length != 0) result['State'] = states;
    if (Object.keys(transitions).length != 0) result['Transition'] = transitions;

    result = JSON.stringify(result);

    // send json data to viewer
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        log.info(">>>> succeed to export to viewer");
      }
    }

    xhr.open("POST", "http://127.0.0.1:8100/viewer", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(result);
  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.post = function(xhr, address, data) {



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
  ExportManager.prototype.cellBoundaryObj4Viewer = function(manager) {

    var cellBoundaries = {};

    var geometries = window.storage.geometryContainer.cellBoundaryGeometry;
    var properties = window.storage.propertyContainer.cellBoundaryProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Viewer('CellSpaceBoundary');
      tmp.setGeometryId("CBG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points);
      cellBoundaries[geometries[key].id] = tmp;

    }

    // copy attributes
    for (var key in properties) {

      var id = properties[key].id;
      cellBoundaries[id].setName(properties[key].name);
      cellBoundaries[id].setDescription(properties[key].description);
      cellBoundaries[id].setExternalReference(properties[key].externalReference);
      cellBoundaries[id].setDuality(properties[key].duality);

    }

    // pixel to real world coordinates
    for (var floorKey in floorProperties) {

      var cellBoundarykeyInFloor = floorProperties[floorKey].cellBoundaryKey;
      var stage = window.storage.canvasContainer.stages[floorProperties[floorKey].id].stage;

      var pixelLLC = [0, 0, 0];
      var pixelURC = [stage.getAttr('width'), stage.getAttr('height'), 0];
      var worldLLC = [floorProperties[floorKey].lowerCorner[0] * 1, floorProperties[floorKey].lowerCorner[1] * 1, 0];
      var worldURC = [floorProperties[floorKey].upperCorner[0] * 1, floorProperties[floorKey].upperCorner[1] * 1, 0];


      for (var cellBoundaryKey in cellBoundarykeyInFloor) {

        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].setHeight(floorProperties[floorKey].doorHeight);
        var points = cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].getCoordinates();

        for (var i = 0; i < points.length; i++) {
          var trans = manager.affineTransformation(pixelURC, pixelLLC, worldURC, worldLLC, points[i]);
          cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].updateCoordinates(i, 'x', trans._data[0]);
          cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].updateCoordinates(i, 'y', trans._data[1]);
          cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].updateCoordinates(i, 'z', floorProperties[floorKey].groundHeight * 1);
        }


        // make reverse
        var reverseObj = new FeatureFactory4Viewer('CellSpaceBoundary');
        reverseObj.copy(cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]]);
        reverseObj.setGeometryId(reverseObj.geometry.properties.id + '-REVERSE');
        reverseObj.setName(reverseObj.attributes.name + '-REVERSE');
        reverseObj.reverseCoor();
        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'] = reverseObj;
      }
    }

    return cellBoundaries;

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
    var order = {
      'index': 1,
      'list': [
        ['Document', "http://127.0.0.1:8100/Document/" + document.id]
      ]};

    if(cells.length != 0 || cellBoundaries.length != 0){
      order.list.push(['indoorfeatures', "http://127.0.0.1:8100/indoorfeatures/" + document.id]);
      order.list.push(['primalspacefeatures', "http://127.0.0.1:8100/primalspacefeatures/" + document.id]);
    }

    if(cells.length != 0){
      order.list.push(['cellspace', "http://127.0.0.1:8100/cellspace/" + document.id, 0]);
    }

    if(cellBoundaries.length != 0){
      order.list.push(['cellspaceboundary', "http://127.0.0.1:8100/cellspaceboundary/" + document.id, 0]);
    }

    order.list.push(['document', "http://127.0.0.1:8100/document/" + document.id]);

    log.info(order);

    var xhr = new XMLHttpRequest();
    xhr.timeout = 100;

    xhr.ontimeout = function() {

      if (order.index < order.list.length) {

        switch (order.list[order.index][0]) {
          case 'indoorfeatures':
            xhr.open("POST", order.list[order.index][1], true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(indoorfeatures));
            order.index++;
            break;
          case 'primalspacefeatures':
            xhr.open("POST", order.list[order.index][1], true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(primalspacefeatures));
            order.index++;
            break;
          case 'cellspace':
            xhr.open("POST", order.list[order.index][1], true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(cells[order.list[order.index][2]]));
            order.list[order.index][2]++;

            if (order.list[order.index][2] == cells.length) {
              order.index++;
            }

            break;
          case 'cellspaceboundary':
            xhr.open("POST", order.list[order.index][1], true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(cellBoundaries[order.list[order.index][2]]));
            order.list[order.index][2]++;

            if (order.list[order.index][2] == cellBoundaries.length) {
              order.index++;
              break;
            }
            break;
          case 'document':
            xhr.timeout = null;
            xhr.open("GET", order.list[order.index][1], false);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send();
            order.index++;
            break;
          default:
        }

      }
    }

    // send json data to viewer
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        log.info(">>>> export to factory end");
      }
    }

    xhr.open("POST", "http://127.0.0.1:8100/Document/" + document.id, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(document));
  }

  /**
   * @memberof ExportManager
   * @return Array of Format4Factory.CellSpace
   */
  ExportManager.prototype.cellObj4VFactory = function(docId, parentId) {

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
      if (conditions.properties.name) cells[id].setName(properties[key].name);
      if (conditions.properties.description) cells[id].setDescription(properties[key].description);
      if (conditions.properties.partialboundedBy) cells[id].setPartialboundedBy(properties[key].partialboundedBy);
      if (conditions.properties.externalReference) cells[id].setExternalReference(properties[key].externalReference);
      if (conditions.properties.duality) cells[id].setDuality(properties[key].duality);

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

    for (var key in cells) {
      cells[key].simplify();
      result.push(cells[key]);
    }

    return result;

  }

  /**
   * @memberof ExportManager
   * @return Array of Format4Factory.CellSpaceBoundary
   */
  ExportManager.prototype.cellBoundaryObj4VFactory = function(docId, parentId) {
    var cellBoundaries = {};
    var result = [];
    var conditions = window.conditions.exportConditions.CellSpaceBoundary;
    var geometries = window.storage.geometryContainer.cellBoundaryGeometry;
    var properties = window.storage.propertyContainer.cellBoundaryProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;
    var manager = window.broker.getManager('exporttofactory', 'ExportManager');

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Factory('CellSpaceBoundary', conditions);
      tmp.setId(geometries[key].id);
      tmp.setDocId(docId);
      tmp.setParentId(parentId);
      tmp.setGeometryId("CBG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points);
      cellBoundaries[geometries[key].id] = tmp;

    }

    // copy attributes
    for (var key in properties) {

      var id = properties[key].id;
      if (conditions.properties.name) cellBoundaries[id].setName(properties[key].name);
      if (conditions.properties.description) cellBoundaries[id].setDescription(properties[key].description);
      if (conditions.properties.externalReference) cellBoundaries[id].setExternalReference(properties[key].externalReference);
      if (conditions.properties.duality) cellBoundaries[id].setDuality(properties[key].duality);

    }

    // pixel to real world coordinates
    for (var floorKey in floorProperties) {

      var cellBoundarykeyInFloor = floorProperties[floorKey].cellBoundaryKey;
      var stage = window.storage.canvasContainer.stages[floorProperties[floorKey].id].stage;

      var pixelLLC = [0, 0, 0];
      var pixelURC = [stage.getAttr('width'), stage.getAttr('height'), 0];
      var worldLLC = [floorProperties[floorKey].lowerCorner[0] * 1, floorProperties[floorKey].lowerCorner[1] * 1, 0];
      var worldURC = [floorProperties[floorKey].upperCorner[0] * 1, floorProperties[floorKey].upperCorner[1] * 1, 0];


      for (var cellBoundaryKey in cellBoundarykeyInFloor) {

        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].setHeight(floorProperties[floorKey].doorHeight);
        var points = cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].getCoordinates();

        for (var i = 0; i < points.length; i++) {
          var trans = manager.affineTransformation(pixelURC, pixelLLC, worldURC, worldLLC, points[i]);
          cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].updateCoordinates(i, 'x', trans._data[0]);
          cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].updateCoordinates(i, 'y', trans._data[1]);
          cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].updateCoordinates(i, 'z', floorProperties[floorKey].groundHeight * 1);
        }

        // make reverse
        var reverseObj = new FeatureFactory4Factory('CellSpaceBoundary', conditions);
        reverseObj.copy(cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]]);
        reverseObj.setId(reverseObj.id + '-REVERSE');
        reverseObj.setGeometryId(reverseObj.geometry.properties.id + '-REVERSE');
        reverseObj.setName(reverseObj.properties.name + '-REVERSE')
        reverseObj.reverseCoor();
        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'] = reverseObj;
      }
    }

    for (var key in cellBoundaries) {
      cellBoundaries[key].simplify();
      result.push(cellBoundaries[key]);
    }

    return result;
  }

  /**
   * @memberof ExportManager
   * @return Array of Format4Factory.State
   */
  ExportManager.prototype.stateObj4VFactory = function(docId, parentId) {
    var states = [];

    return states;
  }

  /**
   * @memberof ExportManager
   * @return Array of Format4Factory.Transition
   */
  ExportManager.prototype.transitionObj4VFactory = function(docId, parentId) {
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
