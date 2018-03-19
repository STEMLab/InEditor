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
  ExportManager.prototype.exportToViewer = function(reqObj) {

    $('#go-viewer-modal').modal('hide');

    var manager = window.broker.getManager('exporttoviewer', 'ExportManager');

    var cellsResult = manager.cellObj4Viewer(manager);
    var bbox = cellsResult.bbox;
    var cells = cellsResult.cells;
    var cellBoundaries = manager.cellBoundaryObj4Viewer(manager);
    var states = manager.stateObj4Viewer(manager);
    var transitions = manager.transitionObj4Viewer(manager);

    var result = {
      'bbox': bbox
    };

    if (Object.keys(cells).length != 0) result['CellSpace'] = cells;
    if (Object.keys(cellBoundaries).length != 0) result['CellSpaceBoundary'] = cellBoundaries;
    if (Object.keys(states).length != 0) result['State'] = states;
    if (Object.keys(transitions).length != 0) result['Transition'] = transitions;

    if(Object.keys(result).length == 1){

      log.warn('ExportManager.exportToViewer : There is nothing to export :-<');
      return;

    }

    result = JSON.stringify(result);

    // send json data to viewer
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        log.info(">>>> succeed to export to viewer");
      }
    }

    xhr.open("POST", reqObj.address, true);
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
    var VERY_SMALL_VALUE = -999999;
    var VERY_BIG_VALUE = 999999;
    var min = {
      x: VERY_BIG_VALUE,
      y: VERY_BIG_VALUE,
      z: VERY_BIG_VALUE,
      d: VERY_BIG_VALUE
    };
    var max = {
      x: VERY_SMALL_VALUE,
      y: VERY_SMALL_VALUE,
      z: VERY_SMALL_VALUE,
      d: VERY_SMALL_VALUE
    };


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
        if (floorProperties[floorKey].groundHeight * 1 + floorProperties[floorKey].celingHeight * 1 > max.z)
          max.z = floorProperties[floorKey].groundHeight * 1 + floorProperties[floorKey].celingHeight * 1;
        if (floorProperties[floorKey].groundHeight * 1 < min.z)
          min.z = floorProperties[floorKey].groundHeight * 1;

        for (var i = 0; i < points.length; i++) {
          var trans = manager.affineTransformation(pixelURC, pixelLLC, worldURC, worldLLC, points[i]);
          cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'x', trans._data[0]);
          cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'y', trans._data[1]);
          cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'z', floorProperties[floorKey].groundHeight * 1);

          if (trans._data[0] > max.x)
            max.x = trans._data[0];
          if (trans._data[1] > max.y)
            max.y = trans._data[1];
          if (trans._data[0] < min.x)
            min.x = trans._data[0];
          if (trans._data[1] < min.y)
            min.y = trans._data[1];
        }
      }
    }

    return {
      cells: cells,
      bbox: [min.x, min.y, min.z, max.x, max.y, max.z]
    };

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

    var baseURL = "http://127.0.0.1:8100";
    var index = 0;

    var cells = manager.cellObj4VFactory(document.id, primalspacefeatures.id);
    var cellBoundaries = manager.cellBoundaryObj4VFactory(document.id, primalspacefeatures.id);
    var states = manager.stateObj4VFactory(document.id, primalspacefeatures.id);
    var transitions = manager.transitionObj4VFactory(document.id, primalspacefeatures.id);

    var order = [{
      type: 'document',
      request: 'POST',
      address: baseURL + '/document/' + document.id
    }];

    if (cells.length != 0 || cellBoundaries.length != 0) {
      order.push({
        type: 'indoorfeatures',
        request: 'POST',
        address: baseURL + '/indoorfeatures/' + indoorfeatures.id
      });
      order.push({
        type: 'primalspacefeatures',
        request: 'POST',
        address: baseURL + '/primalspacefeatures/' + primalspacefeatures.id
      });
    }

    if (cells.length != 0) {
      order.push({
        type: 'cellspace',
        request: 'POST',
        address: baseURL + '/cellspace',
        index: 0
      });
    }

    if (cellBoundaries.length != 0) {
      order.push({
        type: 'cellspaceboundary',
        request: 'POST',
        address: baseURL + '/cellspaceboundary',
        index: 0
      });
    }

    order.push({
      type: 'document',
      request: 'GET',
      address: baseURL + '/document/' + document.id
    });

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {

        log.info(xhr.responseText);

        // response of POST
        if (order.length != 0) {

          if (order[index].type == 'indoorfeatures') {

            xhr.open(order[index].request, order[index].address, false);
            order.splice(0, 1);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(indoorfeatures));

          } else if (order[index].type == 'primalspacefeatures') {

            xhr.open(order[index].request, order[index].address, false);
            order.splice(0, 1);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(primalspacefeatures));

          } else if (order[index].type == 'cellspace') {

            xhr.open(order[index].request, order[index].address + '/' + cells[order[index].index], false);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            var tmpdata = JSON.stringify(cells[order[index].index]);
            order[index].index++;
            if(order[index].index == cells.length) order.splice(0, 1);
            xhr.send(tmpdata);

          } else if (order[index].type == 'cellspaceboundary') {

            xhr.open(order[index].request, order[index].address + '/' + cellBoundaries[order[index].index], false);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            var tmpdata = JSON.stringify(cellBoundaries[order[index].index]);
            order[index].index++;
            if(order[index].index == cellBoundaries.length) order.splice(0, 1);
            xhr.send(tmpdata);

          } else if( order[index].type == 'document' && order[index].request == 'GET'){

            xhr.open(order[index].request, order[index].address, false);
            order.splice(0, 1);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send();

          } else {

            log.error('ExportManager.exportToFactory : order list error ', order);

          }

        }
      } else if (xhr.readyState == 4 && xhr.status == 302) {

        // response of GET
        log.info(xhr.responseText);
      }
    }

    // send json data to viewer
    xhr.open(order[index].request, order[index].address, false);
    order.splice(0, 1);
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
