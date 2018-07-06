/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../PubSub/Subscriber.js",
  "../JsonFormat/FeatureFactory4Factory.js",
  "../JsonFormat/FeatureFactory4Viewer.js",
  "../Storage/Dot/Dot.js"
], function(
  Subscriber,
  FeatureFactory4Factory,
  FeatureFactory4Viewer,
  Dot
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
    var transDots = manager.transAllDots(window.storage.dotFoolContainer.dotFool, window.storage.propertyContainer.getFloorObj());

    var cellsResult = manager.cellObj4Viewer(manager, transDots);
    var bbox = cellsResult.bbox;
    var cells = cellsResult.cells;
    var cellBoundaries = manager.cellBoundaryObj4Viewer(manager, transDots);
    var states = manager.stateObj4Viewer(manager, transDots);
    var transitions = manager.transitionObj4Viewer(manager, transDots);

    var result = {
      'bbox': bbox
    };

    if (Object.keys(cells).length != 0) result['CellSpace'] = cells;
    if (Object.keys(cellBoundaries).length != 0) result['CellSpaceBoundary'] = cellBoundaries;
    if (Object.keys(states).length != 0) result['State'] = states;
    if (Object.keys(transitions).length != 0) result['Transition'] = transitions;

    if (Object.keys(result).length == 1) {

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
  ExportManager.prototype.cellObj4Viewer = function(manager, transDot) {

    var cells = {};
    var VERY_SMALL_VALUE = -999999;
    var VERY_BIG_VALUE = 999999;
    var min = {
      x: VERY_BIG_VALUE,
      y: VERY_BIG_VALUE,
      z: VERY_BIG_VALUE
    };
    var max = {
      x: VERY_SMALL_VALUE,
      y: VERY_SMALL_VALUE,
      z: VERY_SMALL_VALUE
    };

    function getBbox(bbox, point){
      if (point[0] > bbox.max.x)
        bbox.max.x = point[0];
      if (point[1] > bbox.max.y)
        bbox.max.y = point[1];
      if (point[0] < bbox.min.x)
        bbox.min.x = point[0];
      if (point[1] < bbox.min.y)
        bbox.min.y = point[1];
      return bbox;
    }

    var geometries = window.storage.geometryContainer.cellGeometry;
    var properties = window.storage.propertyContainer.cellProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Viewer('CellSpace');
      tmp.setGeometryId("CG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
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
      for (var cellKey in cellkeyInFloor) {
        cells[cellkeyInFloor[cellKey]].setHeight(floorProperties[floorKey].celingHeight);
        var points = cells[cellkeyInFloor[cellKey]].getCoordinates();

        if (floorProperties[floorKey].groundHeight * 1 + floorProperties[floorKey].celingHeight * 1 > max.z)
          max.z = floorProperties[floorKey].groundHeight * 1 + floorProperties[floorKey].celingHeight * 1;
        if (floorProperties[floorKey].groundHeight * 1 < min.z)
          min.z= floorProperties[floorKey].groundHeight * 1;

        for (var i = 0; i < points.length; i++) {
          var bbox = getBbox({min: min, max: max}, points[i]);
          min = bbox.min;
          max = bbox.max;
        }
      }

    //
    //   var cellkeyInFloor = floorProperties[floorKey].cellKey;
    //   var stage = window.storage.canvasContainer.stages[floorProperties[floorKey].id].stage;
    //
    //   var pixelLLC = [0, 0, 0];
    //   var pixelURC = [stage.getAttr('width'), stage.getAttr('height'), 0];
    //   var worldLLC = [floorProperties[floorKey].lowerCorner[0] * 1, floorProperties[floorKey].lowerCorner[1] * 1, 0];
    //   var worldURC = [floorProperties[floorKey].upperCorner[0] * 1, floorProperties[floorKey].upperCorner[1] * 1, 0];
    //
    //
    //   for (var cellKey in cellkeyInFloor) {
    //
    //     cells[cellkeyInFloor[cellKey]].setHeight(floorProperties[floorKey].celingHeight);
    //     var points = cells[cellkeyInFloor[cellKey]].getCoordinates();
    //     if (floorProperties[floorKey].groundHeight * 1 + floorProperties[floorKey].celingHeight * 1 > max.z)
    //       max.z = floorProperties[floorKey].groundHeight * 1 + floorProperties[floorKey].celingHeight * 1;
    //     if (floorProperties[floorKey].groundHeight * 1 < min.z)
    //       min.z = floorProperties[floorKey].groundHeight * 1;
    //
    //     for (var i = 0; i < points.length; i++) {
    //       var trans = manager.affineTransformation(pixelURC, pixelLLC, worldURC, worldLLC, points[i]);
    //       cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'x', trans._data[0]);
    //       cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'y', trans._data[1]);
    //       cells[cellkeyInFloor[cellKey]].updateCoordinates(i, 'z', floorProperties[floorKey].groundHeight * 1);
    //
    //       if (trans._data[0] > max.x)
    //         max.x = trans._data[0];
    //       if (trans._data[1] > max.y)
    //         max.y = trans._data[1];
    //       if (trans._data[0] < min.x)
    //         min.x = trans._data[0];
    //       if (trans._data[1] < min.y)
    //         min.y = trans._data[1];
    //     }
    //   }
    }

    log.info({
      cells: cells,
      bbox: [min.x, min.y, min.z, max.x, max.y, max.z]
    });

    return {
      cells: cells,
      bbox: [min.x, min.y, min.z, max.x, max.y, max.z]
    };

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.cellBoundaryObj4Viewer = function(manager, transDot) {

    var cellBoundaries = {};

    var geometries = window.storage.geometryContainer.cellBoundaryGeometry;
    var properties = window.storage.propertyContainer.cellBoundaryProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Viewer('CellSpaceBoundary');
      tmp.setGeometryId("CBG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
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
      var height = floorProperties[floorKey].doorHeight;

      var cellBoundarykeyInFloor = floorProperties[floorKey].cellBoundaryKey;

      for (var cellBoundaryKey in cellBoundarykeyInFloor) {
        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].setHeight(height);

        // make reverse
        var reverseObj = new FeatureFactory4Viewer('CellSpaceBoundary', conditions);
        reverseObj.copy(cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]]);
        reverseObj.setId(reverseObj.id + '-REVERSE');
        reverseObj.setGeometryId(reverseObj.geometry.properties.id + '-REVERSE');
        reverseObj.setName(reverseObj.attributes.name + '-REVERSE')
        reverseObj.reverseCoor();
        reverseObj.setHeight(height);
        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'] = reverseObj;

      }
    }

    return cellBoundaries;

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.stateObj4Viewer = function(manager, transDot) {

    var states = {};
    var result = [];
    var conditions = window.conditions.exportConditions.State;
    var geometries = window.storage.geometryContainer.stateGeometry;
    var properties = window.storage.propertyContainer.stateProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;
    var manager = window.broker.getManager('exporttofactory', 'ExportManager');

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Viewer('State', conditions);
      tmp.setGeometryId("SG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(transDot[geometries[key].point.uuid]);
      states[geometries[key].id] = tmp;

    }

    // copy attributes
    for (var key in properties) {

      var id = properties[key].id;
      if (conditions.properties.name) states[id].setName(properties[key].name);
      if (conditions.properties.description) states[id].setDescription(properties[key].description);
      if (conditions.properties.duality) states[id].setDuality(properties[key].duality);
      if (conditions.properties.connects) states[id].setConnected(properties[key].connects);

    }

    return states;

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.transitionObj4Viewer = function(manager, transDot) {

    var transitions = {};
    var result = [];
    var conditions = window.conditions.exportConditions.Transition;
    var geometries = window.storage.geometryContainer.transitionGeometry;
    var properties = window.storage.propertyContainer.transitionProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;
    var manager = window.broker.getManager('exporttofactory', 'ExportManager');

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Viewer('Transition', conditions);
      tmp.setId(geometries[key].id);
      tmp.setGeometryId("TG-" + geometries[key].id);
      tmp.setConnects(geometries[key].connects);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
      transitions[geometries[key].id] = tmp;

    }

    // copy attributes
    for (var key in properties) {

      var id = properties[key].id;
      if (conditions.properties.name) transitions[id].setName(properties[key].name);
      if (conditions.properties.description) transitions[id].setDescription(properties[key].description);
      if (conditions.properties.duality) transitions[id].setDuality(properties[key].duality);
      if (conditions.properties.weight) transitions[id].setWeight(properties[key].weight);
      if (conditions.properties.connects) transitions[id].setConnects(properties[key].connects);

    }

    return transitions;

  }


  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.exportToFactory = function(reqObj) {

    var manager = window.broker.getManager('exporttofactory', 'ExportManager');
    manager.getExportConditionFromModal();

    $('#go-factory-modal-body-to-footer-before').addClass('d-none');
    $('#go-factory-modal-body-to-footer-loading').removeClass('d-none');
    $('#go-factory-modal-body-to-footer-down').addClass('d-none');

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

    var multiLayeredGraph = {
      "docId": document.id,
      "parentId": indoorfeatures.id,
      "id": window.conditions.guid()
    };

    var spaceLayers = {
      "docId": document.id,
      "parentId": multiLayeredGraph.id,
      "id": window.conditions.guid()
    }

    var baseURL = reqObj.baseURL;

    var transDots = manager.transAllDots(window.storage.dotFoolContainer.dotFool, window.storage.propertyContainer.getFloorObj());

    var spaceLayer = manager.spaceLayer4Factory(document.id, spaceLayers.id);
    var cells = manager.cellObj4VFactory(document.id, primalspacefeatures.id, transDots);
    var cellBoundaries = manager.cellBoundaryObj4VFactory(document.id, primalspacefeatures.id, transDots);
    var nodes = manager.nodes4Factory(document.id, spaceLayer);
    var edges = manager.edges4Factory(document.id, spaceLayer);
    var states = manager.stateObj4Factory(document.id, nodes, transDots);
    var transitions = manager.transitionObj4VFactory(document.id, edges, transDots);
    log.info(cells);

    /********************************************************************************************************************
    *************************************** 차 후 수 정 *****************************************************************
    *********************************************************************************************************************/
    var address = {
      'post-document': baseURL + '/documents/' + document.id,
      'post-indoorfeatures': baseURL + '/documents/' + document.id + '/indoorfeatures/' + indoorfeatures.id,
      'post-primalspacefeatures': baseURL + '/documents/' + document.id + '/primalspacefeatures/' + primalspacefeatures.id,
      'post-cell': baseURL + '/documents/' + document.id + '/cellspace/',
      'post-cellspaceboundary': baseURL + '/documents/' + document.id + '/cellspaceboundary/',
      'post-multiLayeredGraph': baseURL + '/documents/' + document.id + '/multilayeredgraph/' + multiLayeredGraph.id,
      'post-spacelayers': baseURL + '/documents/' + document.id + '/spacelayers/' + spaceLayers.id,
      'post-spacelayer': baseURL + '/documents/' + document.id + '/spacelayer/',
      'post-nodes': baseURL + '/documents/' + document.id + '/nodes/',
      'post-edges': baseURL + '/documents/' + document.id + '/edges/',
      'post-state': baseURL + '/documents/' + document.id + '/state/',
      'post-transition': baseURL + '/documents/' + document.id + '/transition/',
      'get-document': baseURL + '/documents/' + document.id
    };

    manager.postJson(address['post-document'], JSON.stringify(document));

    if (cells.length != 0 || cellBoundaries.length != 0) {

      manager.postJson(address['post-indoorfeatures'], JSON.stringify(indoorfeatures));
      manager.postJson(address['post-primalspacefeatures'], JSON.stringify(primalspacefeatures));

      for (var i = 0; i < cells.length; i++)
        manager.postJson(address['post-cell'] + cells[i].id, JSON.stringify(cells[i]));

      for (var i = 0; i < cellBoundaries.length; i++)
        manager.postJson(address['post-cellspaceboundary'] + cellBoundaries[i].id, JSON.stringify(cellBoundaries[i]));

    }

    if (states.length != 0 || transitions.length != 0) {

      manager.postJson(address['post-multiLayeredGraph'], JSON.stringify(multiLayeredGraph));
      manager.postJson(address['post-spacelayers'], JSON.stringify(spaceLayers));

      for (var i = 0; i < spaceLayer.length; i++)
        manager.postJson(address['post-spacelayer'] + spaceLayer[i].id, JSON.stringify(spaceLayer[i]));

      for (var i = 0; i < nodes.length; i++)
        manager.postJson(address['post-nodes'] + nodes[i].id, JSON.stringify(nodes[i]));

      for (var i = 0; i < nodes.length; i++)
        manager.postJson(address['post-edges'] + edges[i].id, JSON.stringify(edges[i]));

      for (var i = 0; i < states.length; i++)
        manager.postJson(address['post-state'] + states[i].id, JSON.stringify(states[i]));

      for (var i = 0; i < transitions.length; i++)
        manager.postJson(address['post-transition'] + transitions[i].id, JSON.stringify(transitions[i]));


    }

    manager.getDocument(address['get-document'], document.id);

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.postJson = function(address, data) {
    // log.info('POST : ' + address, data);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.status == 200) {
        log.error('error');

      }
    }

    xhr.open("POST", address, false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(data);
  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.getDocument = function(address, documentId) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && (xhr.status == 302 || xhr.status == 200)) {

        var getXhr = new XMLHttpRequest();
        getXhr.onreadystatechange = function() {

          if (getXhr.readyState == 4 && getXhr.status == 200) {
            $('#go-factory-modal-body-to-footer-before').addClass('d-none');
            $('#go-factory-modal-body-to-footer-loading').addClass('d-none');
            $('#go-factory-modal-body-to-footer-down').removeClass('d-none');

            // download gml
            window.document.getElementById('gml-down-link').href = 'http://127.0.0.1:8080/' + getXhr.responseText;

          }

        }

        getXhr.open("POST", "http://localhost:8080/save-gml/" + documentId, false);
        getXhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        // save gml
        getXhr.send(xhr.responseXML);

      }
    };

    xhr.open("GET", address, false);
    xhr.send();
  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.getExportConditionFromModal = function() {

    var exportConditions = window.conditions.exportConditions;

    // cell
    if ($('#factory-geometry-type-2D').prop("checked")) exportConditions.CellSpace.geometry.extrude = false;
    if ($('#factory-geometry-type-3D').prop("checked")) exportConditions.CellSpace.geometry.extrude = true;

    if ($('#factory-property-cell-name').prop("checked")) exportConditions.CellSpace.properties.name = true;
    else exportConditions.CellSpace.properties.name = false;

    if ($('#factory-property-cell-description').prop("checked")) exportConditions.CellSpace.properties.description = true;
    else exportConditions.CellSpace.properties.description = false;

    if ($('#factory-property-cell-partialboundedByexternalReference').prop("checked")) exportConditions.CellSpace.properties.partialboundedByexternalReference = true;
    else exportConditions.CellSpace.properties.partialboundedByexternalReference = false;

    if ($('#factory-property-cell-externalReference').prop("checked")) exportConditions.CellSpace.properties.externalReference = true;
    else exportConditions.CellSpace.properties.externalReference = false;

    if ($('#factory-property-cell-duality').prop("checked")) exportConditions.CellSpace.properties.duality = true;
    else exportConditions.CellSpace.properties.duality = false;


    // cellboundary
    if ($('#factory-geometry-type-2D').prop("checked")) exportConditions.CellSpaceBoundary.geometry.extrude = false;
    if ($('#factory-geometry-type-3D').prop("checked")) exportConditions.CellSpaceBoundary.geometry.extrude = true;

    if ($('#factory-property-cellbondary-name').prop("checked")) exportConditions.CellSpaceBoundary.properties.name = true;
    else exportConditions.CellSpaceBoundary.properties.name = false;

    if ($('#factory-property-cellbondary-description').prop("checked")) exportConditions.CellSpaceBoundary.properties.description = true;
    else exportConditions.CellSpaceBoundary.properties.description = false;

    if ($('#factory-property-cellbondary-externalReference').prop("checked")) exportConditions.CellSpaceBoundary.properties.externalReference = true;
    else exportConditions.CellSpaceBoundary.properties.externalReference = false;

    if ($('#factory-property-cellbondary-duality').prop("checked")) exportConditions.CellSpaceBoundary.properties.duality = true;
    else exportConditions.CellSpaceBoundary.properties.duality = false;


    // state
    if ($('#factory-property-state-name').prop("checked")) exportConditions.State.properties.name = true;
    else exportConditions.State.properties.name = false;

    if ($('#factory-property-state-description').prop("checked")) exportConditions.State.properties.description = true;
    else exportConditions.State.properties.description = false;

    if ($('#factory-property-state-connects').prop("checked")) exportConditions.State.properties.connects = true;
    else exportConditions.State.properties.connects = false;

    if ($('#factory-property-state-duality').prop("checked")) exportConditions.State.properties.duality = true;
    else exportConditions.State.properties.duality = false;


    // transition
    if ($('#factory-property-transition-name').prop("checked")) exportConditions.Transition.properties.name = true;
    else exportConditions.Transition.properties.name = false;

    if ($('#factory-property-transition-description').prop("checked")) exportConditions.Transition.properties.description = true;
    else exportConditions.Transition.properties.description = false;

    if ($('#factory-property-transition-weight').prop("checked")) exportConditions.Transition.properties.weight = true;
    else exportConditions.Transition.properties.weight = false;

    if ($('#factory-property-transition-duality').prop("checked")) exportConditions.Transition.properties.duality = true;
    else exportConditions.Transition.properties.duality = false;


    // MultiLayer
    if ($('#factory-multilayer-one').prop("checked")) exportConditions.MultiLayer = false;
    if ($('#factory-multilayer-multi').prop("checked")) exportConditions.MultiLayer = true;

  }


  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.spaceLayer4Factory = function(docId, parentId) {

    var floors = window.storage.propertyContainer.floorProperties;
    var spaceLayers = [];

    if (window.conditions.exportConditions.MultiLayer) {
      for (var floorKey in floors) {
        spaceLayers.push({
          "docId": docId,
          "parentId": parentId,
          "id": floors[floorKey].getId()
        });
      }
    } else {
      spaceLayers.push({
        "docId": docId,
        "parentId": parentId,
        "id": window.conditions.guid()
      });
    }

    return spaceLayers;

  }


  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.nodes4Factory = function(docId, spaceLayers) {

    var nodes = [];
    for (var i = 0; i < spaceLayers.length; i++) {

      nodes.push({
        "docId": docId,
        "parentId": spaceLayers[i].id,
        "id": window.conditions.guid()
      });

    }

    return nodes;

  }


  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.edges4Factory = function(docId, spaceLayers) {

    var edges = [];
    for (var i = 0; i < spaceLayers.length; i++) {

      edges.push({
        "docId": docId,
        "parentId": spaceLayers[i].id,
        "id": window.conditions.guid()
      });

    }

    return edges;

  }


  /**
   * @memberof ExportManager
   * @return Array of Format4Factory.CellSpace
   */
  ExportManager.prototype.cellObj4VFactory = function(docId, parentId, transDot) {

    var cells = {};
    var result = [];
    var conditions = window.conditions.exportConditions.CellSpace;
    var geometries = window.storage.geometryContainer.cellGeometry;
    var properties = window.storage.propertyContainer.cellProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;
    var manager = window.broker.getManager('exporttofactory', 'ExportManager');

    var solid = [];

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Factory('CellSpace', conditions);
      tmp.setId(geometries[key].id);
      tmp.setDocId(docId);
      tmp.setParentId(parentId);
      tmp.setGeometryId("CG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
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

      for (var cellKey in cellkeyInFloor) {

        cells[cellkeyInFloor[cellKey]].setWKT(manager.extrudCell(cells[cellkeyInFloor[cellKey]].getCoordinates(), floorProperties[floorKey].celingHeight * 1));
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
  ExportManager.prototype.cellBoundaryObj4VFactory = function(docId, parentId, transDot) {
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
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
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
      for (var cellBoundaryKey in cellBoundarykeyInFloor) {

        var surface = [];

        // make reverse
        var reverseObj = new FeatureFactory4Factory('CellSpaceBoundary', conditions);
        reverseObj.copy(cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]]);
        reverseObj.setId(reverseObj.id + '-REVERSE');
        reverseObj.setGeometryId(reverseObj.geometry.properties.id + '-REVERSE');
        reverseObj.setName(reverseObj.properties.name + '-REVERSE')
        reverseObj.reverseCoor();
        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'] = reverseObj;

        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].setWKT(manager.extrudeCellBoundary(cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].getCoordinates(), floorProperties[floorKey].doorHeight * 1));
        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'].setWKT(manager.extrudeCellBoundary(cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'].getCoordinates(), floorProperties[floorKey].doorHeight * 1));

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
  ExportManager.prototype.stateObj4Factory = function(docId, nodes, transDot) {
    var states = {};
    var result = [];
    var conditions = window.conditions.exportConditions.State;
    var geometries = window.storage.geometryContainer.stateGeometry;
    var properties = window.storage.propertyContainer.stateProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;
    var manager = window.broker.getManager('exporttofactory', 'ExportManager');

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Factory('State', conditions);
      tmp.setId(geometries[key].id);
      tmp.setDocId(docId);
      tmp.setGeometryId("SG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(transDot[geometries[key].point.uuid]);
      states[geometries[key].id] = tmp;

    }

    // copy attributes
    for (var key in properties) {

      var id = properties[key].id;
      if (conditions.properties.name) states[id].setName(properties[key].name);
      if (conditions.properties.description) states[id].setDescription(properties[key].description);
      if (conditions.properties.duality) states[id].setDuality(properties[key].duality);
      if (conditions.properties.connects) states[id].setConnects(properties[key].connects);

    }

    // pixel to real world coordinates
    for (var floorKey in floorProperties) {

      var stateKeyInFloor = floorProperties[floorKey].stateKey;


      for (var stateKey in stateKeyInFloor) {

        states[stateKeyInFloor[stateKey]].setWKT();

        if (nodes.length == 1) states[stateKeyInFloor[stateKey]].setParentId(nodes[0].id);
        else states[stateKeyInFloor[stateKey]].setParentId(floorProperties[floorKey].id);

      }
    }

    for (var key in states) {
      states[key].simplify();
      result.push(states[key]);
    }

    return result;
  }

  /**
   * @memberof ExportManager
   * @return Array of Format4Factory.Transition
   */
  ExportManager.prototype.transitionObj4VFactory = function(docId, edges, transDot) {
    var transitions = {};
    var result = [];
    var conditions = window.conditions.exportConditions.Transition;
    var geometries = window.storage.geometryContainer.transitionGeometry;
    var properties = window.storage.propertyContainer.transitionProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;
    var manager = window.broker.getManager('exporttofactory', 'ExportManager');

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Factory('Transition', conditions);
      tmp.setId(geometries[key].id);
      tmp.setDocId(docId);
      tmp.setGeometryId("TG-" + geometries[key].id);
      tmp.setConnects(geometries[key].connects);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
      transitions[geometries[key].id] = tmp;

    }

    // copy attributes
    for (var key in properties) {

      var id = properties[key].id;
      if (conditions.properties.name) transitions[id].setName(properties[key].name);
      if (conditions.properties.description) transitions[id].setDescription(properties[key].description);
      if (conditions.properties.duality) transitions[id].setDuality(properties[key].duality);
      if (conditions.properties.weight) transitions[id].setWeight(properties[key].weight);
      if (conditions.properties.connects) transitions[id].setConnects(properties[key].connects);
    }

    // pixel to real world coordinates
    for (var floorKey in floorProperties) {

      var transitionKeyInFloor = floorProperties[floorKey].transitionKey;

      for (var transitionKey in transitionKeyInFloor) {

        transitions[transitionKeyInFloor[transitionKey]].setWKT();

        if (edges.length == 1) transitions[transitionKeyInFloor[transitionKey]].setParentId(edges[0].id);
        else transitions[transitionKeyInFloor[transitionKey]].setParentId(floorProperties[floorKey].id);

      }
    }

    for (var key in transitions) {
      transitions[key].simplify();
      result.push(transitions[key]);
    }


    return result;
  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.affineTransformation = function(pixelHeight, pixeWidth, worldURC, worldLLC, point) {

    // MIRROR OPERATION
    var mirrorMatrix = math.matrix([
      [1, 0, 0],
      [0, -1, pixelHeight],
      [0, 0, 1]
    ]);
    var pointMatrix = math.matrix([point[0], point[1], 1]);
    var mirroredPoint = math.multiply(mirrorMatrix, pointMatrix);
    // log.info(mirrorMatrix, ' x ', pointMatrix, ' = ', mirroredPoint);

    var widthScale = Math.abs((worldURC[0] - worldLLC[0]) / pixeWidth);
    var heightScale = Math.abs((worldURC[1] - worldLLC[1]) / pixelHeight);
    var widthTrans = worldLLC[0];
    var heightTrans = worldURC[1];
    var matrix = math.matrix([
      [widthScale, 0, widthTrans],
      [0, heightScale, heightTrans],
      [0, 0, 1]
    ]);

    var result = math.multiply(matrix, mirroredPoint);
    // var result = math.multiply(matrix, pointMatrix);

    return result;

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.extrudCell = function(surface, ch) {

    var down = surface;
    var up = [];
    var result = [];

    for (var i = 0; i < down.length; i++) {

      //validation
      if (i != down.length - 1) {
        if(down[i].toString() == down[i+1].toString()){
            down.splice(i+1, 1);
        }
      }

      var tmp = JSON.parse(JSON.stringify(down[i]));
      tmp[2] += ch;
      up.push(tmp);
    }

    result.push(down);

    for (var i = 0; i < down.length - 1; i++) {

      var downLeft = JSON.parse(JSON.stringify(down[i]));
      var downRight = JSON.parse(JSON.stringify(down[i + 1]));
      var upRigth = JSON.parse(JSON.stringify(up[i + 1]));
      var upLeft = JSON.parse(JSON.stringify(up[i]));

      result.push([downLeft, downRight, upRigth, upLeft, downLeft]);

    }

    result.push(up);

    // var tmp = [];
    // for (var i = 0; i < down.length; i++) {
    //   tmp.push(down[down.length - i - 1]);
    // }
    //
    // result.push(tmp);

    return result;
  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.extrudeCellBoundary = function(line, dh) {

    if(line.length > 3){
      log.info(line);
    }

    var first = line[0];
    var second = line[1];
    var doorCoor = first[2] + dh;

    var result = [first, second, [second[0], second[1], doorCoor],
      [first[0], first[1], doorCoor], first
    ];


    return result;

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.transAllDots = function(dotFools, floorProperties) {

    function copyDot(obj) {
      var copiedDot = new Dot(obj.point.x, obj.point.y);
      copiedDot.uuid = obj.uuid;
      copiedDot.memberOf = copyObject(obj.memberOf);

      return copiedDot;
    }

    function copyObject(obj) {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }

      var copiedObject = obj.constructor();

      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          copiedObject[key] = copyObject(obj[key]);
        }
      }

      return copiedObject;
    }

    var result = {};
    var manager = window.broker.getManager('exporttofactory', 'ExportManager');

    for (var dotFoolKey in dotFools) {
      //function(pixelHeight, pixeWidth, worldURC, worldLLC, point)

      var stage = window.storage.canvasContainer.stages[floorProperties[dotFoolKey].id].stage;
      var height = floorProperties[dotFoolKey].groundHeight*1;
      // var pixelLLC = [0, 0, 0];
      // var pixelURC = [stage.getAttr('width'), stage.getAttr('height'), 0];
      var worldLLC = [floorProperties[dotFoolKey].lowerCorner[0] * 1, floorProperties[dotFoolKey].lowerCorner[1] * 1, 0];
      var worldURC = [floorProperties[dotFoolKey].upperCorner[0] * 1, floorProperties[dotFoolKey].upperCorner[1] * 1, 0];

      for (var dotKey in dotFools[dotFoolKey].dots) {

        var transDot = copyDot(dotFools[dotFoolKey].dots[dotKey]);
        var transPoint = manager.affineTransformation(stage.getAttr('height'), stage.getAttr('width'), worldURC, worldLLC, [transDot.point.x, transDot.point.y, 0]);
        transDot.setPoint({ x: transPoint._data[0], y: transPoint._data[1], z: height});
        result[transDot.uuid] = transDot;

      }

    }

    return result;

  }


  return ExportManager;
});
