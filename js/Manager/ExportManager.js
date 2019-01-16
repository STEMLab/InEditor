/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../PubSub/Subscriber.js",
  "../JsonFormat/FeatureFactory4Factory.js",
  "../JsonFormat/FeatureFactory4Viewer.js",
  "../Storage/Dot/Dot.js",
  "../Storage/Dot/DotMath.js"
], function(
  Subscriber,
  FeatureFactory4Factory,
  FeatureFactory4Viewer,
  Dot,
  DotMath
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
    log.info(result);

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

    function getBbox(bbox, point) {
      if (point[0] > bbox.max.x) bbox.max.x = point[0];
      if (point[1] > bbox.max.y) bbox.max.y = point[1];

      if (point[0] < bbox.min.x) bbox.min.x = point[0];
      if (point[1] < bbox.min.y) bbox.min.y = point[1];
      return bbox;
    }

    var geometries = window.storage.geometryContainer.cellGeometry;
    var properties = window.storage.propertyContainer.cellProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;
    var manager = window.broker.getManager('exporttofactory', 'ExportManager');

    var holeGeometries = window.storage.geometryContainer.holeGeometry;
    var holeMap = {};

    var slantMap = {};

    // copy geometry coordinates
    for (var key in geometries) {

      var tmp = new FeatureFactory4Viewer('CellSpace');
      tmp.setGeometryId("CG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
      cells[geometries[key].id] = tmp;

      if (geometries[key].slant != null) slantMap[geometries[key].id] = geometries[key].slant;
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

    // make hole map
    for (var key in holeGeometries) {
      var id = holeGeometries[key].holeOf;
      if (cells[id] != undefined) {
        var points = holeGeometries[key].points;
        var coordinates = [];

        for (var key in points) {
          coordinates.push(Object.values(transDot[points[key].uuid].point));
        }
        coordinates.push(coordinates[0]);

        if (holeMap[id] != undefined) holeMap[id].push(coordinates);
        else holeMap[id] = [coordinates];
      }

    }

    // pixel to real world coordinates
    for (var floorKey in floorProperties) {

      var cellkeyInFloor = floorProperties[floorKey].cellKey;

      for (var cellKey in cellkeyInFloor) {
        var cellId = cellkeyInFloor[cellKey];
        var coor = cells[cellId].getCoordinates();

        cells[cellId].setHeight(floorProperties[floorKey].celingHeight);

        if (slantMap[cellId] == undefined) cells[cellId].setCoor(manager.extrudeCell(coor[0], floorProperties[floorKey].celingHeight * 1), '3D');
        else if (slantMap[cellId].direction == 'up')
          cells[cellId].setCoor(
            manager.extrudeCellWithUpSlant(
              coor[0], [
                [transDot[slantMap[cellId].line[0][0].uuid], transDot[slantMap[cellId].line[0][1].uuid]],
                [transDot[slantMap[cellId].line[1][0].uuid], transDot[slantMap[cellId].line[1][1].uuid]]
              ],
              floorProperties[floorKey].celingHeight * 1),
            '3D'
          );
        else if (slantMap[cellId].direction == 'down')
          cells[cellId].setCoor(
            manager.extrudeCellWithDownSlant(
              coor[0], [
                [transDot[slantMap[cellId].line[0][0].uuid], transDot[slantMap[cellId].line[0][1].uuid]],
                [transDot[slantMap[cellId].line[1][0].uuid], transDot[slantMap[cellId].line[1][1].uuid]]
              ],
              floorProperties[floorKey].celingHeight * 1),
            '3D'
          );

        // add hole
        if (holeMap[cellId] != undefined) {
          for (var holeKey in holeMap[cellId]) {
            cells[cellId].addHole(manager.extrudeCell(holeMap[cellId][holeKey], floorProperties[floorKey].celingHeight * 1)[0]);
          }
        }

        if (floorProperties[floorKey].groundHeight * 1 + floorProperties[floorKey].celingHeight * 1 > max.z)
          max.z = floorProperties[floorKey].groundHeight * 1 + floorProperties[floorKey].celingHeight * 1;
        if (floorProperties[floorKey].groundHeight * 1 < min.z)
          min.z = floorProperties[floorKey].groundHeight * 1;

        for (var i = 0; i < coor[0].length; i++) {
          var bbox = getBbox({
            min: min,
            max: max
          }, coor[0][i]);
          min = bbox.min;
          max = bbox.max;
        }
      }

    }

    // log.info('ExportManager :: cellObject4Viewer', {
    //   cells: cells,
    //   bbox: [min.x, min.y, min.z, max.x, max.y, max.z]
    // });

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

        var coor = cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].getCoordinates();
        var coor_reverse = cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'].getCoordinates();

        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].setCoor([manager.extrudeCellBoundary(coor, floorProperties[floorKey].doorHeight * 1)]);
        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'].setCoor([manager.extrudeCellBoundary(coor_reverse, floorProperties[floorKey].doorHeight * 1)]);

      }
    }

    log.info('ExportManager :: cellBoundaryObj4Viewer', {
      cellBoundaries: cellBoundaries
    });

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
    $('#go-factory-modal').modal('hide');
    $('#go-factory-loading').modal('show');

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

    var interEdges = {
      "docId": document.id,
      "parentId": multiLayeredGraph.id,
      "id": window.conditions.guid()
    }

    var baseURL = reqObj.baseURL;

    var transDots = manager.transAllDots(window.storage.dotFoolContainer.dotFool, window.storage.propertyContainer.getFloorObj());

    var spaceLayer = manager.spaceLayer4Factory(document.id, spaceLayers.id);
    var cells = manager.cellObj4VFactory(document.id, primalspacefeatures.id, transDots);
    var cellBoundaries = manager.cellBoundaryObj4VFactory(document.id, primalspacefeatures.id, transDots);

    // tmp(190114)
    // manager.renameCellBoundary(cells.cell, cellBoundaries);

    var nodes = manager.nodes4Factory(document.id, spaceLayer);
    var edges = manager.edges4Factory(document.id, spaceLayer);
    var states = manager.stateObj4Factory(document.id, nodes, transDots);
    var transitions = manager.transitionObj4VFactory(document.id, edges, transDots, cellBoundaries);
    var interlayerConnections = manager.interlayerConnectionObj4Factory(document.id, interEdges);

    var address = {
      'delete-document': baseURL + '/documents/' + document.id,
      'post-document': baseURL + '/documents/' + document.id,
      'post-indoorfeatures': baseURL + '/documents/' + document.id + '/indoorfeatures/' + indoorfeatures.id,
      'post-primalspacefeatures': baseURL + '/documents/' + document.id + '/primalspacefeatures/' + primalspacefeatures.id,
      'post-cell': baseURL + '/documents/' + document.id + '/cellspace/',
      'post-navigablespace': baseURL + '/documents/' + document.id + '/navigablespace/',
      'post-generalspace': baseURL + '/documents/' + document.id + '/generalspace/',
      'post-transferspace': baseURL + '/documents/' + document.id + '/transferspace/',
      'post-transitionspace': baseURL + '/documents/' + document.id + '/transitionspace/',
      'post-connectionspace': baseURL + '/documents/' + document.id + '/connectionspace/',
      'post-anchorspace': baseURL + '/documents/' + document.id + '/anchorspace/',
      'post-cellspaceboundary': baseURL + '/documents/' + document.id + '/cellspaceboundary/',
      'post-multiLayeredGraph': baseURL + '/documents/' + document.id + '/multilayeredgraph/' + multiLayeredGraph.id,
      'post-spacelayers': baseURL + '/documents/' + document.id + '/spacelayers/' + spaceLayers.id,
      'post-spacelayer': baseURL + '/documents/' + document.id + '/spacelayer/',
      'post-nodes': baseURL + '/documents/' + document.id + '/nodes/',
      'post-edges': baseURL + '/documents/' + document.id + '/edges/',
      'post-state': baseURL + '/documents/' + document.id + '/state/',
      'post-transition': baseURL + '/documents/' + document.id + '/transition/',
      'post-interEdges': baseURL + '/documents/' + document.id + '/interedges/' + interEdges.id,
      'post-interlayerConnection': baseURL + '/documents/' + document.id + '/interlayerconnection/',

      'get-document': baseURL + '/documents/' + document.id
    };

    manager.deleteJson(address['delete-document']);

    manager.postJson(address['post-document'], JSON.stringify(document));

    if (cells.cell.length != 0 ||
      cells.navigableSpace.length != 0 ||
      cells.generalSpace.length != 0 ||
      cells.transferSpace.length != 0 ||
      cells.transitionSpace.length != 0 ||
      cells.connectionSpace.length != 0 ||
      cells.anchorSpace.length != 0 ||
      cellBoundaries.length != 0) {

      manager.postJson(address['post-indoorfeatures'], JSON.stringify(indoorfeatures));
      manager.postJson(address['post-primalspacefeatures'], JSON.stringify(primalspacefeatures));

      for (var i = 0; i < cells.cell.length; i++)
        manager.postJson(address['post-cell'] + cells.cell[i].id, JSON.stringify(cells.cell[i]));

      for (var i = 0; i < cells.navigableSpace.length; i++)
        manager.postJson(address['post-navigablespace'] + cells.navigableSpace[i].id, JSON.stringify(cells.navigableSpace[i]));

      for (var i = 0; i < cells.generalSpace.length; i++)
        manager.postJson(address['post-generalspace'] + cells.generalSpace[i].id, JSON.stringify(cells.generalSpace[i]));

      for (var i = 0; i < cells.transferSpace.length; i++)
        manager.postJson(address['post-transferspace'] + cells.transferSpace[i].id, JSON.stringify(cells.transferSpace[i]));

      for (var i = 0; i < cells.transitionSpace.length; i++)
        manager.postJson(address['post-transitionspace'] + cells.transitionSpace[i].id, JSON.stringify(cells.transitionSpace[i]));

      for (var i = 0; i < cells.connectionSpace.length; i++)
        manager.postJson(address['post-connectionspace'] + cells.connectionSpace[i].id, JSON.stringify(cells.connectionSpace[i]));

      for (var i = 0; i < cells.anchorSpace.length; i++)
        manager.postJson(address['post-anchorspace'] + cells.anchorSpace[i].id, JSON.stringify(cells.anchorSpace[i]));


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

      for (var i = 0; i < edges.length; i++)
        manager.postJson(address['post-edges'] + edges[i].id, JSON.stringify(edges[i]));

      for (var i = 0; i < states.length; i++)
        manager.postJson(address['post-state'] + states[i].id, JSON.stringify(states[i]));

      for (var i = 0; i < transitions.length; i++)
        manager.postJson(address['post-transition'] + transitions[i].id, JSON.stringify(transitions[i]));


    }

    if (interlayerConnections.length != 0) {
      manager.postJson(address['post-interEdges'], JSON.stringify(interEdges));

      for (var i = 0; i < interlayerConnections.length; i++)
        manager.postJson(address['post-interlayerConnection'] + interlayerConnections[i].id, JSON.stringify(interlayerConnections[i]));
    }

    manager.getDocument(address['get-document'], document.id);

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.postJson = function(address, data) {
    log.info('POST : ' + address, data);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.status == 200) {
        log.error('error');

      }
    }

    // log.info("POST ", address, 'data : ', data);

    xhr.open("POST", address, false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(data);
  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.deleteJson = function(address) {
    // log.info('POST : ' + address, data);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.status == 200) {
        log.error('error');

      }
    }

    log.info("DELETE ", address);

    xhr.open("DELETE", address, false);
    xhr.send(null);
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
            // $('#go-factory-loading').modal('hide');
            $('#go-factory-download').modal('show');

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

    log.info("GET ", address);
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


    // geometry type
    if ($('#factory-geometry-type-2D').prop("checked")) exportConditions.Geometry = '2D';
    if ($('#factory-geometry-type-3D').prop("checked")) exportConditions.Geometry = '3D';

  }


  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.spaceLayer4Factory = function(docId, parentId) {

    var floors = window.storage.propertyContainer.floorProperties;
    var spaceLayers = [];

    for (var floorKey in floors) {
      var layer = floors[floorKey].layer;
      if (spaceLayers.indexOf(layer) == -1) spaceLayers.push(layer);
    }

    for (var key in spaceLayers) {
      spaceLayers[key] = {
        "docId": docId,
        "parentId": parentId,
        "id": spaceLayers[key]
      };
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

    var conditions = window.conditions.exportConditions.CellSpace;
    var geometries = window.storage.geometryContainer.cellGeometry;
    var properties = window.storage.propertyContainer.cellProperties;
    var floorProperties = window.storage.propertyContainer.floorProperties;
    var manager = window.broker.getManager('exporttofactory', 'ExportManager');
    var geoType = window.conditions.exportConditions.Geometry;

    var holeGeometries = window.storage.geometryContainer.holeGeometry;
    var holeMap = {};

    var slantMap = {};

    var solid = [];

    // copy geometry coordinates
    for (var key in geometries) {
      var tmp;

      // if (geometries[key].naviType == "")
      tmp = new FeatureFactory4Factory('CellSpace', conditions);
      // else
      // tmp = new FeatureFactory4Factory('NavigableSpace', conditions);

      tmp.setId(geometries[key].id);
      tmp.setDocId(docId);
      tmp.setParentId(parentId);
      tmp.setGeometryId("CG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);

      cells[geometries[key].id] = tmp;

      if (geometries[key].slant != null) slantMap[geometries[key].id] = geometries[key].slant;

    }

    // copy attributes
    for (var key in properties) {

      var id = properties[key].id;
      if (conditions.properties.name) cells[id].setName(properties[key].name);
      if (conditions.properties.description) cells[id].setDescription(properties[key].description);
      if (conditions.properties.partialboundedBy) cells[id].setPartialboundedBy(properties[key].partialboundedBy);
      if (conditions.properties.externalReference) cells[id].setExternalReference(properties[key].externalReference);
      if (conditions.properties.duality) cells[id].setDuality(properties[key].duality);


      if (cells[id].type == "NavigableSpace") {
        cells[id].setType(properties[key].naviType);
        cells[id].setClass(properties[key].navi.class);
        cells[id].setFunction(properties[key].navi.function);
        cells[id].setUsage(properties[key].navi.usage);
      }

    }

    // make hole map
    for (var key in holeGeometries) {
      var id = holeGeometries[key].holeOf;
      if (cells[id] != undefined) {
        var points = holeGeometries[key].points;
        var coordinates = [];

        for (var key in points) {
          coordinates.push(Object.values(transDot[points[key].uuid].point));
        }
        coordinates.push(coordinates[0]);

        if (holeMap[id] != undefined) holeMap[id].push(coordinates);
        else holeMap[id] = [coordinates];
      }

    }

    function isCCW(coor){
      var wkt = "POLYGON ((";

      for (var i = 0; i < coor.length; i++) {
        wkt += coor[i][0] + " " + coor[i][1] + " " + coor[i][2];

        if (i != coor.length - 1) wkt += ",";
      }

      wkt += coor[0][0] + " " + coor[0][1] + " " + coor[0][2] + "))";

      var reader = new jsts.io.WKTReader();
      var c = reader.read(wkt);

      return jsts.algorithm.Orientation.isCCW(c.getCoordinates());
    }

    // pixel to real world coordinates
    for (var floorKey in floorProperties) {
      var cellkeyInFloor = floorProperties[floorKey].cellKey;
      var prtDesc = floorProperties[floorKey].description;

      for (var cellKey in cellkeyInFloor) {
        var cellId = cellkeyInFloor[cellKey];

        var coor = cells[cellId].getCoordinates()[0];
        if(isCCW(coor)) coor.reverse();;

        if (geoType == '3D') {
          if (slantMap[cellId] == undefined) cells[cellId].setCoor(manager.extrudeCell(coor, floorProperties[floorKey].celingHeight * 1), '3D');
          else if (slantMap[cellId].direction == 'up')
            cells[cellId].setCoor(
              manager.extrudeCellWithUpSlant(
                coor, [
                  [transDot[slantMap[cellId].line[0][0].uuid], transDot[slantMap[cellId].line[0][1].uuid]],
                  [transDot[slantMap[cellId].line[1][0].uuid], transDot[slantMap[cellId].line[1][1].uuid]]
                ],
                floorProperties[floorKey].celingHeight * 1),
              '3D'
            );
          else if (slantMap[cellId].direction == 'down')
          cells[cellId].setCoor(
            manager.extrudeCellWithDownSlant(
              coor, [
                [transDot[slantMap[cellId].line[0][0].uuid], transDot[slantMap[cellId].line[0][1].uuid]],
                [transDot[slantMap[cellId].line[1][0].uuid], transDot[slantMap[cellId].line[1][1].uuid]]
              ],
              floorProperties[floorKey].celingHeight * 1),
            '3D'
          );
        } else if (geoType == '2D') {
          coor.reverse();
          cells[cellId].setCoor([coor], '2D');
        }



        // add hole
        if (holeMap[cellId] != undefined) {
          for (var holeKey in holeMap[cellId]) {

            var holeCoor = holeMap[cellId][holeKey];
            if(isCCW(holeCoor)) holeCoor.reverse();

            if (geoType == '3D') cells[cellId].addHole(manager.extrudeCell(holeCoor, floorProperties[floorKey].celingHeight * 1), '3D');
            else if (geoType == '2D') {
              cells[cellId].addHole(holeCoor, '2D');
            }
          }
        }

        cells[cellId].convertCoor2WKT();
        cells[cellId].addPrtDesc(prtDesc);
        cells[cellId].convertDescObj2Str();
      }
    }

    var result = {
      'cell': [],
      'navigableSpace': [],
      'generalSpace': [],
      'transferSpace': [],
      'transitionSpace': [],
      'connectionSpace': [],
      'anchorSpace': []
    };

    for (var key in cells) {
      cells[key].simplify();
      if (cells[key].type == "CellSpace") result.cell.push(cells[key]);
      else if (cells[key].type == "NavigableSpace") result.navigableSpace.push(cells[key]);
      else if (cells[key].type == "GeneralSpace") result.generalSpace.push(cells[key]);
      else if (cells[key].type == "TransferSpace") result.transferSpace.push(cells[key]);
      else if (cells[key].type == "TransitionSpace") result.transitionSpace.push(cells[key]);
      else if (cells[key].type == "ConnectionSpace") result.connectionSpace.push(cells[key]);
      else if (cells[key].type == "AnchorSpace") result.anchorSpace.push(cells[key]);
    }

    log.info(result);

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
    var geoType = window.conditions.exportConditions.Geometry;

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
      var prtDesc = floorProperties[floorKey].description;

      for (var cellBoundaryKey in cellBoundarykeyInFloor) {

        var surface = [];

        // make reverse
        var reverseObj = new FeatureFactory4Factory('CellSpaceBoundary', conditions);
        reverseObj.copy(cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]]);
        reverseObj.setId(reverseObj.id + '-REVERSE');
        reverseObj.setGeometryId(reverseObj.geometry.properties.id + '-REVERSE');
        // reverseObj.setName(reverseObj.properties.name + '-REVERSE');
        reverseObj.setName(reverseObj.properties.name);
        reverseObj.reverseCoor();
        reverseObj.reverseDuality();
        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'] = reverseObj;

        var coor = cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].getCoordinates();
        var coor_reverse = cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'].getCoordinates();
        if (geoType == '3D') {
          cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].setWKT(manager.extrudeCellBoundary(coor, floorProperties[floorKey].doorHeight * 1), '3D');
          cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'].setWKT(manager.extrudeCellBoundary(coor_reverse, floorProperties[floorKey].doorHeight * 1), '3D');
        } else if (geoType == '2D') {
          cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].setWKT(coor, '2D');
          cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'].setWKT(coor_reverse, '2D');
        }

        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].addPrtDesc(prtDesc);
        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'].addPrtDesc(prtDesc);

        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].convertDescObj2Str();
        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey] + '-REVERSE'].convertDescObj2Str();

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
      var prtDesc = floorProperties[floorKey].description;

      var prtId = "layer-0";
      for (var nodesKey in nodes) {
        if (nodes[nodesKey].parentId == floorProperties[floorKey].layer) {
          prtId = nodes[nodesKey].id;
          break;
        }
      }


      for (var stateKey in stateKeyInFloor) {

        states[stateKeyInFloor[stateKey]].setWKT();
        states[stateKeyInFloor[stateKey]].setParentId(prtId);
        states[stateKeyInFloor[stateKey]].addPrtDesc(prtDesc);
        states[stateKeyInFloor[stateKey]].convertDescObj2Str();
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
      var prtDesc = floorProperties[floorKey].description;
      var transitionKeyInFloor = floorProperties[floorKey].transitionKey;

      var prtId = "layer-0";
      for (var edgesKey in edges) {
        if (edges[edgesKey].parentId == floorProperties[floorKey].layer) {
          prtId = edges[edgesKey].id;
          break;
        }
      }


      for (var transitionKey in transitionKeyInFloor) {

        var reverseObj = new FeatureFactory4Factory('Transition', conditions);
        reverseObj.copy(transitions[transitionKeyInFloor[transitionKey]]);
        reverseObj.setId(reverseObj.id + '-REVERSE');
        reverseObj.setGeometryId(reverseObj.geometry.properties.id + '-REVERSE');
        reverseObj.setName(reverseObj.properties.name + '-REVERSE')
        reverseObj.reverseCoor();
        reverseObj.reverseDuality();
        transitions[transitionKeyInFloor[transitionKey] + '-REVERSE'] = reverseObj;

        transitions[transitionKeyInFloor[transitionKey]].setWKT();
        transitions[transitionKeyInFloor[transitionKey]].setParentId(prtId);
        transitions[transitionKeyInFloor[transitionKey]].addPrtDesc(prtDesc);
        transitions[transitionKeyInFloor[transitionKey]].convertDescObj2Str();

        transitions[transitionKeyInFloor[transitionKey] + '-REVERSE'].setWKT();
        transitions[transitionKeyInFloor[transitionKey] + '-REVERSE'].setParentId(prtId);
        transitions[transitionKeyInFloor[transitionKey] + '-REVERSE'].addPrtDesc(prtDesc);
        transitions[transitionKeyInFloor[transitionKey] + '-REVERSE'].convertDescObj2Str();
      }
    }

    for (var key in transitions) {
      transitions[key].simplify();
      result.push(transitions[key]);
    }


    return result;
  }

  ExportManager.prototype.interlayerConnectionObj4Factory = function(docId, interEdges) {
    var result = [];
    var properties = window.storage.propertyContainer.interlayerConnections;

    for (var key in properties) {
      var tmp = new FeatureFactory4Factory('InterlayerConnection');
      tmp.id = properties[key].id;
      tmp.docId = docId;
      tmp.parentId = interEdges.id;
      tmp.setInterConnects(properties[key].interConnects);
      tmp.setConnectedLayers(properties[key].connectedLayer);
      tmp.setTopoExpression(properties[key].typeOfTopoExpression);
      tmp.setComment(properties[key].comment);
      result.push(tmp);
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
    var heightTrans = worldLLC[1];
    var matrix = math.matrix([
      [widthScale, 0, widthTrans],
      [0, heightScale, heightTrans],
      [0, 0, 1]
    ]);

    var result = math.multiply(matrix, mirroredPoint);
    // var result = math.multiply(matrix, pointMatrix);
    // result = math.multiply(mirrorMatrix, result);

    return result;

  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.extrudeCell = function(surface, ch) {

    var down = surface;
    var up = [];
    var surfaces = [];

    // check down is now clockwise
    // var dot1 = {point: { x: down[0][0], y: down[0][1]}};
    // var dot2 = {point: { x: down[1][0], y: down[1][1]}};
    // var dot3 = {point: { x: down[2][0], y: down[2][1]}};
    // if(DotMath.isClockWise(dot1, dot2, dot3) == 1)
    //   down.reverse();

    // set up
    for (var i = 0; i < down.length; i++) {

      //validation
      if (i != down.length - 1) {
        if (down[i].toString() == down[i + 1].toString()) {
          down.splice(i + 1, 1);
        }
      }

      var tmp = JSON.parse(JSON.stringify(down[i]));
      tmp[2] += ch;
      up.push(tmp);
    }

    surfaces.push([
      [up]
    ]);

    for (var i = 0; i < down.length - 1; i++) {

      var downLeft = JSON.parse(JSON.stringify(down[i]));
      var downRight = JSON.parse(JSON.stringify(down[i + 1]));
      var upRigth = JSON.parse(JSON.stringify(up[i + 1]));
      var upLeft = JSON.parse(JSON.stringify(up[i]));

      surfaces.push([
        [
          [downLeft, downRight, upRigth, upLeft, downLeft]
        ]
      ]);

    }

    // rotate down surface
    down.reverse();

    surfaces.push([
      [down]
    ]);

    return [surfaces];
  }

  /**
   * @memberof ExportManager
   * @desc no floor
   */
  ExportManager.prototype.extrudeCellWithUpSlant = function(surface, lines, ch) {

    var down = surface;
    var up = [];
    var surfaces = [];

    for (var i = 0; i < down.length; i++) {

      //validation
      if (i != down.length - 1) {
        if (down[i].toString() == down[i + 1].toString()) {
          down.splice(i + 1, 1);
        }
      }

      var tmp = JSON.parse(JSON.stringify(down[i]));
      tmp[2] += ch;
      up.push(tmp);
    }

    surfaces.push([
      [up]
    ]);

    var downToUpIndex = [];
    var flag = false;

    for (var i = 0; i < down.length - 1; i++) {

      var downLeft, downRight, upRight, upLeft;

      if (lines[0][0].point.x == down[i][0] && lines[0][0].point.y == down[i][1]) {
        downLeft = JSON.parse(JSON.stringify(down[i]));
        upRight = JSON.parse(JSON.stringify(up[i + 1]));
        upLeft = JSON.parse(JSON.stringify(up[i]));
        surfaces.push([
          [
            [downLeft, upRight, upLeft, downLeft]
          ]
        ]);
        flag = false;
      } else if (lines[1][0].point.x == down[i][0] && lines[1][0].point.y == down[i][1]) {
        downRight = JSON.parse(JSON.stringify(down[i + 1]));
        upRight = JSON.parse(JSON.stringify(up[i + 1]));
        upLeft = JSON.parse(JSON.stringify(up[i]));
        surfaces.push([
          [
            [downRight, upRight, upLeft, downRight]
          ]
        ]);
        flag = false;
        downToUpIndex.push(i);
      } else if (lines[0][1].point.x == down[i][0] && lines[0][1].point.y == down[i][1]) {
        flag = true;
        downToUpIndex.push(i);
      } else if(flag){
        downToUpIndex.push(i);
      }else {
        downLeft = JSON.parse(JSON.stringify(down[i]));
        downRight = JSON.parse(JSON.stringify(down[i + 1]));
        upRight = JSON.parse(JSON.stringify(up[i + 1]));
        upLeft = JSON.parse(JSON.stringify(up[i]));
        surfaces.push([
          [
            [downLeft, downRight, upRight, upLeft, downLeft]
          ]
        ]);
      }
    }

    for (var i = 0; i < downToUpIndex.length; i++) {
      down[downToUpIndex[i]] = up[downToUpIndex[i]];
    }

    down.reverse();

    surfaces.push([
      [down]
    ]);

    return [surfaces];
  }

  /**
   * @memberof ExportManager
   * @desc no ceilling
   */
  ExportManager.prototype.extrudeCellWithDownSlant = function(surface, lines, ch) {

    var down = surface;
    var up = [];
    var surfaces = [];

    for (var i = 0; i < down.length; i++) {

      //validation
      if (i != down.length - 1) {
        if (down[i].toString() == down[i + 1].toString()) {
          down.splice(i + 1, 1);
        }
      }

      var tmp = JSON.parse(JSON.stringify(down[i]));
      tmp[2] += ch;
      up.push(tmp);
    }

    var upToDownIndex = [];
    var flag = false;

    for (var i = 0; i < down.length - 1; i++) {

      var downLeft, downRight, upRight, upLeft;
      if (lines[0][0].point.x == down[i][0] && lines[0][0].point.y == down[i][1]) {
        downLeft = JSON.parse(JSON.stringify(down[i]));
        downRight = JSON.parse(JSON.stringify(down[i + 1]));
        upRight = JSON.parse(JSON.stringify(up[i + 1]));
        surfaces.push([
          [
            [downLeft, downRight, upRight, downLeft]
          ]
        ]);

        flag = false;
        upToDownIndex.push(i);
      } else if (lines[1][0].point.x == down[i][0] && lines[1][0].point.y == down[i][1]) {
        downLeft = JSON.parse(JSON.stringify(down[i]));
        downRight = JSON.parse(JSON.stringify(down[i + 1]));
        upLeft = JSON.parse(JSON.stringify(up[i]));
        surfaces.push([
          [
            [downLeft, downRight, upLeft, downLeft]
          ]
        ]);

        flag = false;
      } else if(lines[1][1].point.x == down[i][0] && lines[1][1].point.y == down[i][1]){
        flag = true;
        upToDownIndex.push(i);
      } else if(flag){
        upToDownIndex.push(i);
      } else {
        downLeft = JSON.parse(JSON.stringify(down[i]));
        downRight = JSON.parse(JSON.stringify(down[i + 1]));
        upRight = JSON.parse(JSON.stringify(up[i + 1]));
        upLeft = JSON.parse(JSON.stringify(up[i]));
        surfaces.push([
          [
            [downLeft, downRight, upRight, upLeft, downLeft]
          ]
        ]);
      }
    }

    for (var i = 0; i < upToDownIndex.length; i++) {
      up[upToDownIndex[i]] = down[upToDownIndex[i]];

      if(upToDownIndex[i] == 0)           up[up.length-1] = up[0];
      if(upToDownIndex[i] == up.length-1) up[0] = up[up.length-1];

    }

    down.reverse();

    surfaces.push([[down]]);
    surfaces.push([[up]]);

    return [surfaces];
  }

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.extrudeCellBoundary = function(line, dh) {

    if (line.length > 3) {
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
      var height = floorProperties[dotFoolKey].groundHeight * 1;
      // var pixelLLC = [0, 0, 0];
      // var pixelURC = [stage.getAttr('width'), stage.getAttr('height'), 0];
      var worldLLC = [floorProperties[dotFoolKey].lowerCorner[0] * 1, floorProperties[dotFoolKey].lowerCorner[1] * 1, 0];
      var worldURC = [floorProperties[dotFoolKey].upperCorner[0] * 1, floorProperties[dotFoolKey].upperCorner[1] * 1, 0];

      for (var dotKey in dotFools[dotFoolKey].dots) {

        var transDot = copyDot(dotFools[dotFoolKey].dots[dotKey]);
        var transPoint = manager.affineTransformation(stage.getAttr('height'), stage.getAttr('width'), worldURC, worldLLC, [transDot.point.x, transDot.point.y, 0]);
        transDot.setPoint({
          x: transPoint._data[0],
          y: transPoint._data[1],
          z: height
        });
        result[transDot.uuid] = transDot;

      }

    }

    //change state height
    var proeprtyContainer = window.storage.propertyContainer;
    for (var key in result) {
      if (result[key].isState()) {
        var index = Object.values(result[key].memberOf).indexOf('state');
        var stateId = Object.keys(result[key].memberOf)[index];
        result[key].point.z += proeprtyContainer.getElementById('state', stateId).height * 1;
      }
    }

    return result;

  }

  ExportManager.prototype.renameCellBoundary = function(cells, cellBoundaries){
    log.info('renameCellBoundary !!' , cells, cellBoundaries);

    var cbo = {} ,co = {};
    for(var c of cells) co[c.properties.name] = c;
    for(var cb of cellBoundaries) cbo[cb.id] = cb;

    function getReverseName(str){
      if(str.indexOf('REVERSE') == -1) return str += '-REVERSE';
      else return str.substr(0, str.indexOf('-REVERSE'));
    }

    function isPartOfPBB(pbb, bid){
      if(pbb === undefined) return false;
      for(var i of pbb) if(i === bid) return true;
      return false;
    }

    for(var key in cbo){
      var cb = cbo[key];
      var cbname = cb.properties.name;
      var cname = cbname.substring(cbname.indexOf('C'), cbname.indexOf('-') == -1 ? cbname.length : cbname.indexOf('-'));
      var post = "", postr = "";

      if(co[cname] != undefined && isPartOfPBB(co[cname].properties.partialboundedBy, cb.id)){
        post = 'I';
        postr = 'E';
      }
      else if(co[cname] != undefined && isPartOfPBB(co[cname].properties.partialboundedBy, getReverseName(cb.id))){
        post = 'E';
        postr = 'I';
      }

      cb.properties.name += post;
      cbo[getReverseName(cb.id)].properties.name += postr;
      delete cbo[cb.id];
      delete cbo[getReverseName(cb.id)];
    }

    log.info(cells, cellBoundaries);
  }

  return ExportManager;
});
