/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  "use strict";

  /**
   * @class ExportManager
   * @augments Subscriber
   */
  function ExportManager() {
    require("Subscriber").apply(this, arguments);

    this.init();
  }

  ExportManager.prototype = Object.create(require("Subscriber").prototype);
  ExportManager.prototype.init = function() {
    this.name = "ExportManager";

    this.addCallbackFun("exporttoviewer", this.exportToViewer);
    this.addCallbackFun("exporttofactory", this.exportToFactory);
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.exportToViewer = function(reqObj) {
    $("#go-viewer-modal").modal("hide");

    var manager = require("Broker")
      .getInstance()
      .getManager("exporttoviewer", "ExportManager");
    var transDots = manager.transAllDots(
      require("Storage")
        .getInstance()
        .getDotPoolContainer().dotPool,
      require("Storage")
        .getInstance()
        .getPropertyContainer()
        .getFloorObj()
    );

    var cellsResult = manager.cellObj4Viewer(manager, transDots);
    var bbox = cellsResult.bbox;
    var cells = cellsResult.cells;
    var cellBoundaries = manager.cellBoundaryObj4Viewer(manager, transDots);
    var states = manager.stateObj4Viewer(manager, transDots);
    var transitions = manager.transitionObj4Viewer(manager, transDots);

    var result = {
      bbox: bbox
    };

    if (Object.keys(cells).length != 0) result["CellSpace"] = cells;
    if (Object.keys(cellBoundaries).length != 0)
      result["CellSpaceBoundary"] = cellBoundaries;
    if (Object.keys(states).length != 0) result["State"] = states;
    if (Object.keys(transitions).length != 0)
      result["Transition"] = transitions;

    if (Object.keys(result).length == 1) {
      log.warn("ExportManager.exportToViewer : There is nothing to export :-<");
      return;
    }

    result = JSON.stringify(result);

    // send json data to viewer
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        log.info(">>>> succeed to export to viewer");
      }
    };
    log.info(result);

    xhr.open("POST", reqObj.address, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(result);
  };

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

    var geometries = require("Storage")
      .getInstance()
      .getGeometryContainer().cellGeometry;
    var properties = require("Storage")
      .getInstance()
      .getPropertyContainer().cellProperties;
    var floorProperties = require("Storage")
      .getInstance()
      .getPropertyContainer().floorProperties;
    var manager = require("Broker")
      .getInstance()
      .getManager("exporttofactory", "ExportManager");

    var holeGeometries = require("Storage")
      .getInstance()
      .getGeometryContainer().holeGeometry;
    var holeMap = {};

    var slantMap = {};

    // copy geometry coordinates
    for (var key in geometries) {
      var tmp = require("FeatureFactory4Viewer")("CellSpace");
      tmp.setGeometryId("CG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
      cells[geometries[key].id] = tmp;

      if (geometries[key].slant != null)
        slantMap[geometries[key].id] = geometries[key].slant;
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

        if (slantMap[cellId] == undefined)
          cells[cellId].setCoor(
            manager.extrudeCell(
              coor[0],
              floorProperties[floorKey].celingHeight * 1
            ),
            "3D"
          );
        else if (slantMap[cellId].direction == "up")
          cells[cellId].setCoor(
            manager.extrudeCellWithUpSlant(
              coor[0],
              [
                [
                  transDot[slantMap[cellId].line[0][0].uuid],
                  transDot[slantMap[cellId].line[0][1].uuid]
                ],
                [
                  transDot[slantMap[cellId].line[1][0].uuid],
                  transDot[slantMap[cellId].line[1][1].uuid]
                ]
              ],
              floorProperties[floorKey].celingHeight * 1
            ),
            "3D"
          );
        else if (slantMap[cellId].direction == "down")
          cells[cellId].setCoor(
            manager.extrudeCellWithDownSlant(
              coor[0],
              [
                [
                  transDot[slantMap[cellId].line[0][0].uuid],
                  transDot[slantMap[cellId].line[0][1].uuid]
                ],
                [
                  transDot[slantMap[cellId].line[1][0].uuid],
                  transDot[slantMap[cellId].line[1][1].uuid]
                ]
              ],
              floorProperties[floorKey].celingHeight * 1
            ),
            "3D"
          );

        // add hole
        if (holeMap[cellId] != undefined) {
          for (var holeKey in holeMap[cellId]) {
            cells[cellId].addHole(
              manager.extrudeCell(
                holeMap[cellId][holeKey],
                floorProperties[floorKey].celingHeight * 1
              )[0]
            );
          }
        }

        if (
          floorProperties[floorKey].groundHeight * 1 +
            floorProperties[floorKey].celingHeight * 1 >
          max.z
        )
          max.z =
            floorProperties[floorKey].groundHeight * 1 +
            floorProperties[floorKey].celingHeight * 1;
        if (floorProperties[floorKey].groundHeight * 1 < min.z)
          min.z = floorProperties[floorKey].groundHeight * 1;

        for (var i = 0; i < coor[0].length; i++) {
          var bbox = getBbox(
            {
              min: min,
              max: max
            },
            coor[0][i]
          );
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
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.cellBoundaryObj4Viewer = function(manager, transDot) {
    var cellBoundaries = {};

    var conditions = require("Conditions").getInstance().exportConditions
      .CellSpaceBoundary;
    var geometries = require("Storage")
      .getInstance()
      .getGeometryContainer().cellBoundaryGeometry;
    var properties = require("Storage")
      .getInstance()
      .getPropertyContainer().cellBoundaryProperties;
    var floorProperties = require("Storage")
      .getInstance()
      .getPropertyContainer().floorProperties;

    // copy geometry coordinates
    for (var key in geometries) {
      var tmp = require("FeatureFactory4Viewer")("CellSpaceBoundary");
      tmp.setGeometryId("CBG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
      cellBoundaries[geometries[key].id] = tmp;
    }

    // copy attributes
    for (var key in properties) {
      var id = properties[key].id;
      cellBoundaries[id].setName(properties[key].name);
      cellBoundaries[id].setDescription(properties[key].description);
      cellBoundaries[id].setExternalReference(
        properties[key].externalReference
      );
      cellBoundaries[id].setDuality(properties[key].duality);
      cellBoundaries[id].addProperty("height", properties[key].height);
      cellBoundaries[id].addProperty("bottom", properties[key].bottom);
    }

    // pixel to real world coordinates
    for (var floorKey in floorProperties) {
      var height = floorProperties[floorKey].doorHeight;

      var cellBoundarykeyInFloor = floorProperties[floorKey].cellBoundaryKey;

      for (var cellBoundaryKey in cellBoundarykeyInFloor) {
        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].setHeight(
          height
        );

        // make reverse
        var reverseObj = require("FeatureFactory4Viewer")(
          "CellSpaceBoundary",
          conditions
        );
        reverseObj.copy(
          cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]]
        );
        reverseObj.setId(reverseObj.id + "-REVERSE");
        reverseObj.setGeometryId(
          reverseObj.geometry.properties.id + "-REVERSE"
        );
        reverseObj.setName(reverseObj.attributes.name + "-REVERSE");
        reverseObj.reverseCoor();
        reverseObj.addProperty("height", cellBoundaries[id].attributes.height);
        cellBoundaries[
          cellBoundarykeyInFloor[cellBoundaryKey] + "-REVERSE"
        ] = reverseObj;

        var coor = cellBoundaries[
          cellBoundarykeyInFloor[cellBoundaryKey]
        ].getCoordinates();
        var coor_reverse = cellBoundaries[
          cellBoundarykeyInFloor[cellBoundaryKey] + "-REVERSE"
        ].getCoordinates();

        cellBoundaries[cellBoundarykeyInFloor[cellBoundaryKey]].setCoor([
          manager.extrudeCellBoundary(coor, reverseObj.attributes.height * 1)
        ]);
        cellBoundaries[
          cellBoundarykeyInFloor[cellBoundaryKey] + "-REVERSE"
        ].setCoor([
          manager.extrudeCellBoundary(
            coor_reverse,
            reverseObj.attributes.height * 1
          )
        ]);
      }
    }

    log.info("ExportManager :: cellBoundaryObj4Viewer", {
      cellBoundaries: cellBoundaries
    });

    return cellBoundaries;
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.stateObj4Viewer = function(manager, transDot) {
    var states = {};
    var result = [];
    var conditions = require("Conditions").getInstance().exportConditions.State;
    var geometries = require("Storage")
      .getInstance()
      .getGeometryContainer().stateGeometry;
    var properties = require("Storage")
      .getInstance()
      .getPropertyContainer().stateProperties;
    var floorProperties = require("Storage")
      .getInstance()
      .getPropertyContainer().floorProperties;
    var manager = require("Broker")
      .getInstance()
      .getManager("exporttofactory", "ExportManager");

    // copy geometry coordinates
    for (var key in geometries) {
      var tmp = require("FeatureFactory4Viewer")("State", conditions);
      tmp.setGeometryId("SG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(transDot[geometries[key].point.uuid]);
      states[geometries[key].id] = tmp;
    }

    // copy attributes
    for (var key in properties) {
      var id = properties[key].id;
      if (conditions.properties.name) states[id].setName(properties[key].name);
      if (conditions.properties.description)
        states[id].setDescription(properties[key].description);
      if (conditions.properties.duality)
        states[id].setDuality(properties[key].duality);
      if (conditions.properties.connects)
        states[id].setConnected(properties[key].connects);
    }

    return states;
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.transitionObj4Viewer = function(manager, transDot) {
    var transitions = {};
    var result = [];
    var conditions = require("Conditions").getInstance().exportConditions
      .Transition;
    var geometries = require("Storage")
      .getInstance()
      .getGeometryContainer().transitionGeometry;
    var properties = require("Storage")
      .getInstance()
      .getPropertyContainer().transitionProperties;
    var floorProperties = require("Storage")
      .getInstance()
      .getPropertyContainer().floorProperties;
    var manager = require("Broker")
      .getInstance()
      .getManager("exporttofactory", "ExportManager");

    // copy geometry coordinates
    for (var key in geometries) {
      var tmp = require("FeatureFactory4Viewer")("Transition", conditions);
      tmp.setId(geometries[key].id);
      tmp.setGeometryId("TG-" + geometries[key].id);
      tmp.setConnects(geometries[key].connects);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
      transitions[geometries[key].id] = tmp;
    }

    // copy attributes
    for (var key in properties) {
      var id = properties[key].id;
      if (conditions.properties.name)
        transitions[id].setName(properties[key].name);
      if (conditions.properties.description)
        transitions[id].setDescription(properties[key].description);
      if (conditions.properties.duality)
        transitions[id].setDuality(properties[key].duality);
      if (conditions.properties.weight)
        transitions[id].setWeight(properties[key].weight);
      if (conditions.properties.connects)
        transitions[id].setConnects(properties[key].connects);
    }

    return transitions;
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.exportToFactory = function(reqObj) {
    var manager = require("Broker")
      .getInstance()
      .getManager("exporttofactory", "ExportManager");
    manager.getExportConditionFromModal();
    // $("#go-factory-modal").modal("hide");
    // $("#go-factory-loading").modal("show");

    var result = {};

    var document = {
      id: require("Storage")
        .getInstance()
        .getPropertyContainer().projectProperty.name
    };

    var indoorfeatures = {
      docId: document.id,
      id: require("Conditions")
        .getInstance()
        .guid()
    };

    var primalspacefeatures = {
      docId: document.id,
      parentId: indoorfeatures.id,
      id: require("Conditions")
        .getInstance()
        .guid()
    };

    var multiLayeredGraph = {
      docId: document.id,
      parentId: indoorfeatures.id,
      id: require("Conditions")
        .getInstance()
        .guid()
    };

    var spaceLayers = {
      docId: document.id,
      parentId: multiLayeredGraph.id,
      id: require("Conditions")
        .getInstance()
        .guid()
    };

    var interEdges = {
      docId: document.id,
      parentId: multiLayeredGraph.id,
      id: require("Conditions")
        .getInstance()
        .guid()
    };

    var baseURL = reqObj.baseURL;

    var transDots = manager.transAllDots(
      require("Storage")
        .getInstance()
        .getDotPoolContainer().dotPool,
      require("Storage")
        .getInstance()
        .getPropertyContainer()
        .getFloorObj()
    );

    var spaceLayer = manager.spaceLayer4Factory(document.id, spaceLayers.id);
    var cells = manager.cellObj4Factory(
      document.id,
      primalspacefeatures.id,
      transDots
    );
    var cellBoundaries = manager.cellBoundaryObj4Factory(
      document.id,
      primalspacefeatures.id,
      transDots
    );

    var nodes = manager.nodes4Factory(document.id, spaceLayer);
    var edges = manager.edges4Factory(document.id, spaceLayer);
    var states = manager.stateObj4Factory(document.id, nodes, transDots);
    var transitions = manager.transitionObj4Factory(
      document.id,
      edges,
      transDots,
      cellBoundaries
    );
    var interlayerConnections = manager.interlayerConnectionObj4Factory(
      document.id,
      interEdges
    );

    /**************************************
     * add non navi later
     **************************************/
    var address = {
      "delete-document": baseURL + "/documents/" + document.id,
      "post-document": baseURL + "/documents/" + document.id,
      "post-indoorfeatures": baseURL +"/documents/" + document.id + "/indoorfeatures/" + indoorfeatures.id,
      "post-primalspacefeatures": baseURL + "/documents/" + document.id + "/primalspacefeatures/" + primalspacefeatures.id,
      "post-cell": baseURL + "/documents/" + document.id + "/cellspace/",
      "post-navigablespace": baseURL + "/documents/" + document.id + "/navigablespace/",
      "post-generalspace": baseURL + "/documents/" + document.id + "/generalspace/",
      "post-transferspace": baseURL + "/documents/" + document.id + "/transferspace/",
      "post-transitionspace": baseURL + "/documents/" + document.id + "/transitionspace/",
      "post-connectionspace": baseURL + "/documents/" + document.id + "/connectionspace/",
      "post-anchorspace": baseURL + "/documents/" + document.id + "/anchorspace/",
      "post-cellspaceboundary": baseURL + "/documents/" + document.id + "/cellspaceboundary/",
      "post-connectionboundary": baseURL + "/documents/" + document.id + "/connectionboundary/",
      "post-anchorboundary": baseURL + "/documents/" + document.id + "/anchorboundary/",
      "post-nonnavigablespace": baseURL + "/documents/" + document.id + "/nonnavigablespace/",
      "post-multiLayeredGraph": baseURL + "/documents/" + document.id + "/multilayeredgraph/" + multiLayeredGraph.id,
      "post-spacelayers": baseURL + "/documents/" + document.id + "/spacelayers/" + spaceLayers.id,
      "post-spacelayer": baseURL + "/documents/" + document.id + "/spacelayer/",
      "post-nodes": baseURL + "/documents/" + document.id + "/nodes/",
      "post-edges": baseURL + "/documents/" + document.id + "/edges/",
      "post-state": baseURL + "/documents/" + document.id + "/state/",
      "post-transition": baseURL + "/documents/" + document.id + "/transition/",
      "post-interEdges": baseURL + "/documents/" + document.id + "/interedges/" + interEdges.id,
      "post-interlayerConnection": baseURL + "/documents/" + document.id + "/interlayerconnection/",
      "get-document": baseURL + "/documents/" + document.id
    };

    if (!manager.deleteJson(address["delete-document"])) return;

    manager.postJson(address["post-document"], JSON.stringify(document));

    if (
      cells.cell.length != 0 ||
      cells.navigableSpace.length != 0 ||
      cells.generalSpace.length != 0 ||
      cells.transferSpace.length != 0 ||
      cells.transitionSpace.length != 0 ||
      cells.connectionSpace.length != 0 ||
      cells.anchorSpace.length != 0 ||
      cells.nonnavigableSpace.length != 0 ||
      cellBoundaries.cellboundary.length != 0 ||
      cellBoundaries.connectionboundary.length != 0 ||
      cellBoundaries.anchorboundary.length != 0
    ) {
      manager.postJson(
        address["post-indoorfeatures"],
        JSON.stringify(indoorfeatures)
      );
      manager.postJson(
        address["post-primalspacefeatures"],
        JSON.stringify(primalspacefeatures)
      );

      for (var i = 0; i < cells.cell.length; i++)
        manager.postJson(
          address["post-cell"] + cells.cell[i].id,
          JSON.stringify(cells.cell[i])
        );

      for (var i = 0; i < cells.navigableSpace.length; i++)
        manager.postJson(
          address["post-navigablespace"] + cells.navigableSpace[i].id,
          JSON.stringify(cells.navigableSpace[i])
        );

      for (var i = 0; i < cells.generalSpace.length; i++)
        manager.postJson(
          address["post-generalspace"] + cells.generalSpace[i].id,
          JSON.stringify(cells.generalSpace[i])
        );

      for (var i = 0; i < cells.transferSpace.length; i++)
        manager.postJson(
          address["post-transferspace"] + cells.transferSpace[i].id,
          JSON.stringify(cells.transferSpace[i])
        );

      for (var i = 0; i < cells.transitionSpace.length; i++)
        manager.postJson(
          address["post-transitionspace"] + cells.transitionSpace[i].id,
          JSON.stringify(cells.transitionSpace[i])
        );

      for (var i = 0; i < cells.connectionSpace.length; i++)
        manager.postJson(
          address["post-connectionspace"] + cells.connectionSpace[i].id,
          JSON.stringify(cells.connectionSpace[i])
        );

      for (var i = 0; i < cells.anchorSpace.length; i++)
        manager.postJson(
          address["post-anchorspace"] + cells.anchorSpace[i].id,
          JSON.stringify(cells.anchorSpace[i])
        );

      for (var i = 0; i < cells.nonnavigableSpace.length; i++)
       manager.postJson(
         address["post-nonnavigablespace"] + cells.nonnavigableSpace[i].id,
         JSON.stringify(cells.nonnavigableSpace[i])
       );

      for (var i = 0; i < cellBoundaries.cellboundary.length; i++)
        manager.postJson(
          address["post-cellspaceboundary"] + cellBoundaries.cellboundary[i].id,
          JSON.stringify(cellBoundaries.cellboundary[i])
        );

      for (var i = 0; i < cellBoundaries.connectionboundary.length; i++)
        manager.postJson(
          address["post-connectionboundary"] +
            cellBoundaries.connectionboundary[i].id,
          JSON.stringify(cellBoundaries.connectionboundary[i])
        );

      for (var i = 0; i < cellBoundaries.anchorboundary.length; i++)
        manager.postJson(
          address["post-anchorboundary"] + cellBoundaries.anchorboundary[i].id,
          JSON.stringify(cellBoundaries.anchorboundary[i])
        );
    }

    if (states.length != 0 || transitions.length != 0) {
      manager.postJson(
        address["post-multiLayeredGraph"],
        JSON.stringify(multiLayeredGraph)
      );
      manager.postJson(
        address["post-spacelayers"],
        JSON.stringify(spaceLayers)
      );

      for (var i = 0; i < spaceLayer.length; i++)
        manager.postJson(
          address["post-spacelayer"] + spaceLayer[i].id,
          JSON.stringify(spaceLayer[i])
        );

      for (var i = 0; i < nodes.length; i++)
        manager.postJson(
          address["post-nodes"] + nodes[i].id,
          JSON.stringify(nodes[i])
        );

      for (var i = 0; i < edges.length; i++)
        manager.postJson(
          address["post-edges"] + edges[i].id,
          JSON.stringify(edges[i])
        );

      for (var i = 0; i < states.length; i++)
        manager.postJson(
          address["post-state"] + states[i].id,
          JSON.stringify(states[i])
        );

      for (var i = 0; i < transitions.length; i++)
        manager.postJson(
          address["post-transition"] + transitions[i].id,
          JSON.stringify(transitions[i])
        );
    }

    if (interlayerConnections.length != 0) {
      manager.postJson(address["post-interEdges"], JSON.stringify(interEdges));

      for (var i = 0; i < interlayerConnections.length; i++)
        manager.postJson(
          address["post-interlayerConnection"] + interlayerConnections[i].id,
          JSON.stringify(interlayerConnections[i])
        );
    }

    manager.getDocument(address["get-document"], document.id);

    manager.getCodeListFile(cells.codeList);
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.postJson = function(address, data) {
    // log.info('POST : ' + address, data);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
      if (xhr.status == 200) {
        log.error("error", e);
      }
    };

    try {
      xhr.open("POST", address, false);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(data);
    } catch (error) {
      require("Popup")("error", "Status " + xhr.status, error);
    }
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.deleteJson = function(address) {
    log.info("DELETE : " + address);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.status == 200) {
        log.error(error);
      }
    };

    try {
      xhr.open("DELETE", address, false);
      xhr.send(null);
      return 1;
    } catch (error) {
      require("Popup")(
        "error",
        "Status 0",
        "Maybe your InFactory server is not running..."
      );

      return 0;
    }
  };

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
            $("#go-factory-download").modal("show");

            // download gml
            window.document.getElementById("gml-down-link").href =
              "http://127.0.0.1:5757/" + getXhr.responseText;
          }
        };

        getXhr.open(
          "POST",
          "http://localhost:5757/save-gml/" + documentId,
          false
        );
        getXhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        getXhr.send(xhr.responseXML);
      }
    };

    try {
      xhr.open("GET", address, false);
      xhr.send();
    } catch (error) {
      log.info(error);
    }
  };

  ExportManager.prototype.getCodeListFile = function(ccl) {
    var txt = "";
    for (var m in ccl) {
      var path = m + ",";
      if (m.toLowerCase() == "nonnavigablespace") {
        for (var c in ccl[m])
          txt += "NonNavigableSpace," + c + "," + ccl[m][c] + "\n";
      } else {
        for (var c in ccl[m]["function"])
          txt += path + "function," + c + "," + ccl[m]["function"][c] + "\n";
        for (var c in ccl[m]["class"])
          txt += path + "class," + c + "," + ccl[m]["class"][c] + "\n";
        for (var c in ccl[m]["usage"])
          txt += path + "function," + c + "," + ccl[m]["usage"][c] + "\n";
      }
    }

    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:application/csv;charset=utf-8," + encodeURIComponent(txt)
    );
    element.setAttribute("download", "CodeList.csv");
    element.classList.add("mx-auto");
    element.classList.add("d-block");
    element.classList.add("p-3");
    element.classList.add("text-center");
    element.innerHTML = "Download Code List(CSV)";
    for (
      var i = 0;
      i <
      window.document.getElementById("go-factory-download").children[1].children
        .length -
        1;
      i++
    ) {
      window.document
        .getElementById("go-factory-download")
        .children[1].removeChild(
          window.document.getElementById("go-factory-download").children[1]
            .children[1]
        );
    }
    window.document
      .getElementById("go-factory-download")
      .children[1].appendChild(element);
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.getExportConditionFromModal = function() {
    var exportConditions = require("Conditions").getInstance().exportConditions;

    // cell
    if ($("#factory-geometry-type-2D").prop("checked"))
      exportConditions.CellSpace.geometry.extrude = false;
    if ($("#factory-geometry-type-3D").prop("checked"))
      exportConditions.CellSpace.geometry.extrude = true;

    if ($("#factory-property-cell-name").prop("checked"))
      exportConditions.CellSpace.properties.name = true;
    else exportConditions.CellSpace.properties.name = false;

    if ($("#factory-property-cell-description").prop("checked"))
      exportConditions.CellSpace.properties.description = true;
    else exportConditions.CellSpace.properties.description = false;

    if (
      $("#factory-property-cell-partialboundedByexternalReference").prop(
        "checked"
      )
    )
      exportConditions.CellSpace.properties.partialboundedByexternalReference = true;
    else
      exportConditions.CellSpace.properties.partialboundedByexternalReference = false;

    if ($("#factory-property-cell-externalReference").prop("checked"))
      exportConditions.CellSpace.properties.externalReference = true;
    else exportConditions.CellSpace.properties.externalReference = false;

    if ($("#factory-property-cell-duality").prop("checked"))
      exportConditions.CellSpace.properties.duality = true;
    else exportConditions.CellSpace.properties.duality = false;

    // cellboundary
    if ($("#factory-geometry-type-2D").prop("checked"))
      exportConditions.CellSpaceBoundary.geometry.extrude = false;
    if ($("#factory-geometry-type-3D").prop("checked"))
      exportConditions.CellSpaceBoundary.geometry.extrude = true;

    if ($("#factory-property-cellbondary-name").prop("checked"))
      exportConditions.CellSpaceBoundary.properties.name = true;
    else exportConditions.CellSpaceBoundary.properties.name = false;

    if ($("#factory-property-cellbondary-description").prop("checked"))
      exportConditions.CellSpaceBoundary.properties.description = true;
    else exportConditions.CellSpaceBoundary.properties.description = false;

    if ($("#factory-property-cellbondary-externalReference").prop("checked"))
      exportConditions.CellSpaceBoundary.properties.externalReference = true;
    else
      exportConditions.CellSpaceBoundary.properties.externalReference = false;

    if ($("#factory-property-cellbondary-duality").prop("checked"))
      exportConditions.CellSpaceBoundary.properties.duality = true;
    else exportConditions.CellSpaceBoundary.properties.duality = false;

    // state
    if ($("#factory-property-state-name").prop("checked"))
      exportConditions.State.properties.name = true;
    else exportConditions.State.properties.name = false;

    if ($("#factory-property-state-description").prop("checked"))
      exportConditions.State.properties.description = true;
    else exportConditions.State.properties.description = false;

    if ($("#factory-property-state-connects").prop("checked"))
      exportConditions.State.properties.connects = true;
    else exportConditions.State.properties.connects = false;

    if ($("#factory-property-state-duality").prop("checked"))
      exportConditions.State.properties.duality = true;
    else exportConditions.State.properties.duality = false;

    // transition
    if ($("#factory-property-transition-name").prop("checked"))
      exportConditions.Transition.properties.name = true;
    else exportConditions.Transition.properties.name = false;

    if ($("#factory-property-transition-description").prop("checked"))
      exportConditions.Transition.properties.description = true;
    else exportConditions.Transition.properties.description = false;

    if ($("#factory-property-transition-weight").prop("checked"))
      exportConditions.Transition.properties.weight = true;
    else exportConditions.Transition.properties.weight = false;

    if ($("#factory-property-transition-duality").prop("checked"))
      exportConditions.Transition.properties.duality = true;
    else exportConditions.Transition.properties.duality = false;

    // MultiLayer
    if ($("#factory-multilayer-one").prop("checked"))
      exportConditions.MultiLayer = false;
    if ($("#factory-multilayer-multi").prop("checked"))
      exportConditions.MultiLayer = true;

    // geometry type
    if ($("#factory-geometry-type-2D").prop("checked"))
      exportConditions.Geometry = "2D";
    if ($("#factory-geometry-type-3D").prop("checked"))
      exportConditions.Geometry = "3D";
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.spaceLayer4Factory = function(docId, parentId) {
    var floors = require("Storage")
      .getInstance()
      .getPropertyContainer().floorProperties;
    var spaceLayers = [];

    for (var floorKey in floors) {
      var layer = floors[floorKey].layer;
      if (spaceLayers.indexOf(layer) == -1) spaceLayers.push(layer);
    }

    for (var key in spaceLayers) {
      spaceLayers[key] = {
        docId: docId,
        parentId: parentId,
        id: spaceLayers[key]
      };
    }

    return spaceLayers;
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.nodes4Factory = function(docId, spaceLayers) {
    var nodes = [];
    for (var i = 0; i < spaceLayers.length; i++) {
      nodes.push({
        docId: docId,
        parentId: spaceLayers[i].id,
        id: require("Conditions")
          .getInstance()
          .guid()
      });
    }

    return nodes;
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.edges4Factory = function(docId, spaceLayers) {
    var edges = [];
    for (var i = 0; i < spaceLayers.length; i++) {
      edges.push({
        docId: docId,
        parentId: spaceLayers[i].id,
        id: require("Conditions")
          .getInstance()
          .guid()
      });
    }

    return edges;
  };

  /**
   * @memberof ExportManager
   * @return Array of Format4Factory.CellSpace
   */
  ExportManager.prototype.cellObj4Factory = function(
    docId,
    parentId,
    transDot
  ) {
    var cells = {};

    var conditions = require("Conditions").getInstance().exportConditions
      .CellSpace;
    var geometries = require("Storage")
      .getInstance()
      .getGeometryContainer().cellGeometry;
    var properties = require("Storage")
      .getInstance()
      .getPropertyContainer().cellProperties;
    var floorProperties = require("Storage")
      .getInstance()
      .getPropertyContainer().floorProperties;
    var manager = require("Broker")
      .getInstance()
      .getManager("exporttofactory", "ExportManager");
    var geoType = require("Conditions").getInstance().exportConditions.Geometry;
    var codeList = {};

    var cityJSON = {
      version: "1.0",
      CityObjects: {},
      type: "CityJSON",
      vertices: []
    };

    var holeGeometries = require("Storage")
      .getInstance()
      .getGeometryContainer().holeGeometry;
    var holeMap = {};

    var slantMap = {};

    // copy geometry coordinates
    for (var key in geometries) {
      var tmp = require("FeatureFactory4Factory")("CellSpace", conditions);
      tmp.setId(geometries[key].id);
      tmp.setDocId(docId);
      tmp.setParentId(parentId);
      tmp.setGeometryId("CG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
      tmp.reduceCoordinates();

      cells[geometries[key].id] = tmp;

      if (geometries[key].slant != null)
        slantMap[geometries[key].id] = geometries[key].slant;
    }

    var cl = require("Property").CODE_LIST.getInstance();

    // copy attributes
    for (var key in properties) {
      var id = properties[key].id;
      if (conditions.properties.name) cells[id].setName(properties[key].name);
      if (conditions.properties.description)
        cells[id].setDescription(properties[key].description);
      if (conditions.properties.partialboundedBy)
        cells[id].setPartialboundedBy(properties[key].partialboundedBy);
      if (conditions.properties.externalReference)
        cells[id].setExternalReference(properties[key].externalReference);
      if (conditions.properties.duality)
        cells[id].setDuality(properties[key].duality);

      //////////////////////////////////////////////////////////////////////////////
      if (properties[key].storey != "")
        cells[id].addDesc("storey", properties[key].storey);
      cells[id].addProperty("height", properties[key].height);
      cells[id].addProperty("bottom", properties[key].bottom);

      //////////////////////////////////////////////////////////////////////////////

      if (properties[key].extend.moduleType != "") {
        if (properties[key].extend.featureType == "NonNavigableSpace") {
          cells[id].setType("NonNavigableSpace");
          cells[id].addProperty(
            "obstacleType",
            properties[key].extend.attributes.obstacleType
          );

          if (codeList["nonnavigableSpace"] == undefined)
            codeList["nonnavigableSpace"] = {};

          codeList["nonnavigableSpace"][
            cells[id].properties.obstacleType
          ] = cl.getDesc(
            ["NonNavigableSpace"],
            cells[id].properties.obstacleType
          );
        } else {
          cells[id].setType(properties[key].extend.featureType);
          cells[id].addProperty(
            "function",
            properties[key].extend.attributes.function
          );
          cells[id].addProperty(
            "class",
            properties[key].extend.attributes.class
          );
          cells[id].addProperty(
            "usage",
            properties[key].extend.attributes.usage
          );

          if (codeList[cells[id].type] == undefined)
            codeList[cells[id].type] = {
              function: {},
              class: {},
              usage: {}
            };

          codeList[cells[id].type]["function"][
            cells[id].properties.function
          ] = cl.getDesc(
            [cells[id].type, "function"],
            cells[id].properties.function
          );

          codeList[cells[id].type]["class"][
            cells[id].properties.class
          ] = cl.getDesc([cells[id].type, "class"], cells[id].properties.class);

          codeList[cells[id].type]["usage"][
            cells[id].properties.usage
          ] = cl.getDesc(
            [cells[id].type, "function"],
            cells[id].properties.usage
          );
        }
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

          coordinates[coordinates.length - 1][2] += cells[id].properties.bottom;

          //test code
          coordinates[coordinates.length - 1][2] += 0.0001;
        }
        coordinates.push(coordinates[0]);

        if (holeMap[id] != undefined) holeMap[id].push(coordinates);
        else holeMap[id] = [coordinates];
      }
    }

    // pixel to real world coordinates
    for (var floorKey in floorProperties) {
      var cellkeyInFloor = floorProperties[floorKey].cellKey;
      var prtDesc = floorProperties[floorKey].description;

      for (var cellKey in cellkeyInFloor) {
        var cellId = cellkeyInFloor[cellKey];

        var coor = cells[cellId].getCoordinates()[0];
        if (!require("DotMath").isCCWByArr(coor)) coor.reverse();
        // 이해를 위해 extrude cell  func를 수정하는 것이 좋을 듯 하다.

        if (geoType == "3D") {
          if (slantMap[cellId] == undefined) {
            cells[cellId].setCoor(
              manager.extrudeCell(
                coor,
                // cells[cellId].type != "CellSpace" ? cells[cellId].properties.height : floorProperties[floorKey].celingHeight),
                cells[cellId].properties.height * 1
              ),
              "3D"
            );
          } else if (slantMap[cellId].direction == "up")
            cells[cellId].setCoor(
              manager.extrudeCellWithUpSlant(
                coor,
                [
                  [
                    transDot[slantMap[cellId].line[0][0].uuid],
                    transDot[slantMap[cellId].line[0][1].uuid]
                  ],
                  [
                    transDot[slantMap[cellId].line[1][0].uuid],
                    transDot[slantMap[cellId].line[1][1].uuid]
                  ]
                ],
                floorProperties[floorKey].celingHeight * 1
              ),
              "3D"
            );
          else if (slantMap[cellId].direction == "down")
            cells[cellId].setCoor(
              manager.extrudeCellWithDownSlant(
                coor,
                [
                  [
                    transDot[slantMap[cellId].line[0][0].uuid],
                    transDot[slantMap[cellId].line[0][1].uuid]
                  ],
                  [
                    transDot[slantMap[cellId].line[1][0].uuid],
                    transDot[slantMap[cellId].line[1][1].uuid]
                  ]
                ],
                floorProperties[floorKey].celingHeight * 1
              ),
              "3D"
            );
        } else if (geoType == "2D") {
          //  coor.reverse();
          cells[cellId].setCoor([coor], "2D");
        }

        // add hole
        if (holeMap[cellId] != undefined) {
          for (var holeKey in holeMap[cellId]) {
            var holeCoor = holeMap[cellId][holeKey];
            if (!require("DotMath").isCCWByArr(holeCoor)) holeCoor.reverse();
            // add hole func에서 solid를 뒤집어서 push 하고 있다.

            if (geoType == "3D") {
              // cells[cellId].addHole(manager.extrudeCell(holeCoor, floorProperties[floorKey].celingHeight * 1 - 0.2), '3D');
              cells[cellId].addHole(
                manager.extrudeCell(
                  holeCoor,
                  cells[cellId].properties.height * 1 - 0.0002
                ),
                "3D"
              );
            } else if (geoType == "2D") {
              cells[cellId].addHole(holeCoor, "2D");
            }
          }
        }

        function addVertices(solid) {
          for (var surfaceIndex in solid[0]) {
            var polygon = solid[0][surfaceIndex][0][0];
            var polygon_ = [];

            for (var i = 0; i < polygon.length - 1; i++) {
              var index = cityJSON.vertices.indexOf(JSON.stringify(polygon[i]));
              if (index == -1) {
                cityJSON.vertices.push(JSON.stringify(polygon[i]));
                index = cityJSON.vertices.length - 1;
              }
              polygon_.push(index);
            }

            solid[0][surfaceIndex][0] = polygon_;
          }
          return solid;
        }

        if (geoType == "3D") {
          if (cityJSON.CityObjects[cellId] == null) {
            var coordinates = cells[cellId].getCoordinates();
            var jsonGeo = addVertices(JSON.parse(JSON.stringify(coordinates)));

            cityJSON.CityObjects[cellId] = {
              geometry: [
                {
                  boundaries: jsonGeo,
                  type:
                    cells[cellId].geometry.type == "Solid"
                      ? "Solid"
                      : "MultiSurface",
                  lod: 1
                }
              ],
              type: "GenericCityObject"
            };
          }
        }

        cells[cellId].convertCoor2WKT();
        cells[cellId].addPrtDesc(prtDesc);
        cells[cellId].convertDescObj2Str();
      }
    }

    // validation
    if (geoType == "3D") {
      for (var i in cityJSON.vertices)
        cityJSON.vertices[i] = JSON.parse(cityJSON.vertices[i]);

      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status == 200) {
          require("Popup")("success", "Geometry validation successed!");
        } else if (xhr.readyState === 4 && xhr.status == 500) {
          require("Popup")(
            "error",
            "Geometry validation failed!",
            xhr.response
          );
        }
      };

      xhr.open("POST", "http://localhost:5757/validation", false);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      let data = JSON.stringify({
        cityJSON: cityJSON
      });

      log.info(cityJSON);
      xhr.send(data);
    }

    var result = {
      cell: [],
      navigableSpace: [],
      generalSpace: [],
      transferSpace: [],
      transitionSpace: [],
      connectionSpace: [],
      anchorSpace: [],
      nonnavigableSpace: [],
      codeList: codeList
    };

    for (var key in cells) {
      cells[key].simplify();

      if (cells[key].type == "CellSpace") result.cell.push(cells[key]);
      else if (cells[key].type == "NavigableSpace")
        result.navigableSpace.push(cells[key]);
      else if (cells[key].type == "GeneralSpace")
        result.generalSpace.push(cells[key]);
      else if (cells[key].type == "TransferSpace")
        result.transferSpace.push(cells[key]);
      else if (cells[key].type == "TransitionSpace")
        result.transitionSpace.push(cells[key]);
      else if (cells[key].type == "ConnectionSpace")
        result.connectionSpace.push(cells[key]);
      else if (cells[key].type == "AnchorSpace")
        result.anchorSpace.push(cells[key]);
      else if (cells[key].type == "NonNavigableSpace")
        result.nonnavigableSpace.push(cells[key]);
      //else if (cells[key].type == "NonNavigableSpace") result.cell.push(cells[key]);
    }

    return result;
  };

  /**
   * @memberof ExportManager
   * @return Array of Format4Factory.CellSpaceBoundary
   */
  ExportManager.prototype.cellBoundaryObj4Factory = function(
    docId,
    parentId,
    transDot
  ) {
    var cellBoundaries = {};
    var conditions = require("Conditions").getInstance().exportConditions
      .CellSpaceBoundary;
    var geometries = require("Storage")
      .getInstance()
      .getGeometryContainer().cellBoundaryGeometry;
    var properties = require("Storage")
      .getInstance()
      .getPropertyContainer().cellBoundaryProperties;
    var floorProperties = require("Storage")
      .getInstance()
      .getPropertyContainer().floorProperties;
    var manager = require("Broker")
      .getInstance()
      .getManager("exporttofactory", "ExportManager");
    var geoType = require("Conditions").getInstance().exportConditions.Geometry;
    var codeList = {};

    // copy geometry coordinates
    for (var key in geometries) {
      var tmp = require("FeatureFactory4Factory")(
        "CellSpaceBoundary",
        conditions
      );
      tmp.setId(geometries[key].id);
      tmp.setDocId(docId);
      tmp.setParentId(parentId);
      tmp.setGeometryId("CBG-" + geometries[key].id);
      tmp.pushCoordinatesFromDots(geometries[key].points, transDot);
      cellBoundaries[geometries[key].id] = tmp;
    }

    var cl = require("Property").CODE_LIST.getInstance();

    // copy attributes
    for (var key in properties) {
      var id = properties[key].id;
      if (conditions.properties.name)
        cellBoundaries[id].setName(properties[key].name);
      if (conditions.properties.description)
        cellBoundaries[id].setDescription(properties[key].description);
      if (conditions.properties.externalReference)
        cellBoundaries[id].setExternalReference(
          properties[key].externalReference
        );
      if (conditions.properties.duality)
        cellBoundaries[id].setDuality(properties[key].duality);

      if (properties[key].extend.moduleType != "") {
        cellBoundaries[id].setType(properties[key].extend.featureType);
      }

      cellBoundaries[id].addProperty("height", properties[key].height);
      cellBoundaries[id].addProperty("bottom", properties[key].bottom);
      cellBoundaries[id].addProperty(
        "isReverserble",
        properties[key].isReverserble
      );
    }

    // pixel to real world coordinates
    for (var floorKey in floorProperties) {
      var cellBoundarykeyInFloor = floorProperties[floorKey].cellBoundaryKey;
      var prtDesc = floorProperties[floorKey].description;

      for (var cellBoundaryKey in cellBoundarykeyInFloor) {
        var surface = [];
        var id = cellBoundarykeyInFloor[cellBoundaryKey];
        var reverseObj = null;

        // make reverse
        reverseObj = require("FeatureFactory4Factory")(
          "CellSpaceBoundary",
          conditions
        );
        reverseObj.copy(cellBoundaries[id]);
        reverseObj.setId(reverseObj.id + "-REVERSE");
        reverseObj.setGeometryId(
          cellBoundaries[id].geometry.properties.id + "-REVERSE"
        );
        reverseObj.setName(cellBoundaries[id].properties.name + "-REVERSE");
        reverseObj.reverseCoor();
        reverseObj.reverseDuality();
        reverseObj.addProperty("height", cellBoundaries[id].properties.height);

        if (cellBoundaries[id].type != "CellSpaceBoundary") {
          reverseObj.setType(cellBoundaries[id].type);
          reverseObj.addProperty(
            "function",
            cellBoundaries[id].properties.function
          );
          reverseObj.addProperty("class", cellBoundaries[id].properties.class);
          reverseObj.addProperty("usage", cellBoundaries[id].properties.usage);
        }

        cellBoundaries[id + "-REVERSE"] = reverseObj;

        var coor = cellBoundaries[id].getCoordinates();
        if (geoType == "3D") {
          var h = cellBoundaries[id].properties.height * 1;
          cellBoundaries[id].setWKT(manager.extrudeCellBoundary(coor, h), "3D");
        } else if (geoType == "2D") {
          cellBoundaries[id].setWKT(coor, "2D");
        }

        cellBoundaries[id].addPrtDesc(prtDesc);
        cellBoundaries[id].convertDescObj2Str();
        delete cellBoundaries[id].properties.height;
        delete cellBoundaries[id].properties.bottom;
        delete cellBoundaries[id].properties.isReverserble;

        var coor_reverse = cellBoundaries[id + "-REVERSE"].getCoordinates();
        if (geoType == "3D") {
          var h = cellBoundaries[id + "-REVERSE"].properties.height * 1;
          cellBoundaries[id + "-REVERSE"].setWKT(
            manager.extrudeCellBoundary(coor_reverse, h),
            "3D"
          );
        } else if (geoType == "2D") {
          cellBoundaries[id + "-REVERSE"].setWKT(coor_reverse, "2D");
        }

        cellBoundaries[id + "-REVERSE"].addPrtDesc(prtDesc);
        cellBoundaries[id + "-REVERSE"].convertDescObj2Str();
        delete cellBoundaries[id + "-REVERSE"].properties.height;
        delete cellBoundaries[id + "-REVERSE"].properties.bottom;
        delete cellBoundaries[id + "-REVERSE"].properties.isReverserble;
      }
    }

    var result = {
      cellboundary: [],
      connectionboundary: [],
      anchorboundary: []
    };

    // add hatch
    var hatchs = require("Storage")
      .getInstance()
      .getGeometryContainer().hatchGeometry;
    for (var h of hatchs) {
      var tmp = require("FeatureFactory4Factory")(
        "CellSpaceBoundary",
        conditions
      );
      log.info(h);
      tmp.setId(h.id);
      tmp.setName(h.name);
      tmp.setDocId(docId);
      tmp.setParentId(parentId);
      tmp.setGeometryId("CBG-" + h.id);
      tmp.pushCoordinatesFromDots(h.points, transDot);

      tmp.setType("ConnectionBoundary");

      if (h.direction == "up") {
        for (var i in tmp.geometry.coordinates) {
          tmp.geometry.coordinates[i][2] += 20 * 1;
        }
      }
      tmp.geometry.coordinates.push(tmp.getCoordinates()[0]);
      tmp.setWKT(tmp.getCoordinates(), "3D");

      result.connectionboundary.push(tmp);

      var tmp_ = require("FeatureFactory4Factory")(
        "CellSpaceBoundary",
        conditions
      );
      log.info(h);
      tmp_.setId(h.id + "-REVERSE");
      tmp_.setDocId(docId);
      tmp_.setParentId(parentId);
      tmp_.setGeometryId("CBG-" + h.id + "-REVERSE");
      tmp_.pushCoordinatesFromDots(h.points.reverse(), transDot);

      tmp_.setType("ConnectionBoundary");

      if (h.direction == "up") {
        for (var i in tmp_.geometry.coordinates) {
          tmp_.geometry.coordinates[i][2] += 20 * 1;
        }
      }

      tmp_.geometry.coordinates.push(tmp_.getCoordinates()[0]);
      tmp_.setWKT(tmp_.getCoordinates(), "3D");

      result.connectionboundary.push(tmp_);
    }

    for (var key in cellBoundaries) {
      cellBoundaries[key].simplify();

      if (cellBoundaries[key].type == "CellSpaceBoundary")
        result.cellboundary.push(cellBoundaries[key]);
      else if (cellBoundaries[key].type == "ConnectionBoundary")
        result.connectionboundary.push(cellBoundaries[key]);
      else if (cellBoundaries[key].type == "AnchorBoundary")
        result.anchorboundary.push(cellBoundaries[key]);
    }

    return result;
  };

  /**
   * @memberof ExportManager
   * @return Array of Format4Factory.State
   */
  ExportManager.prototype.stateObj4Factory = function(docId, nodes, transDot) {
    var states = {};
    var result = [];
    var conditions = require("Conditions").getInstance().exportConditions.State;
    var geometries = require("Storage")
      .getInstance()
      .getGeometryContainer().stateGeometry;
    var properties = require("Storage")
      .getInstance()
      .getPropertyContainer().stateProperties;
    var floorProperties = require("Storage")
      .getInstance()
      .getPropertyContainer().floorProperties;
    var manager = require("Broker")
      .getInstance()
      .getManager("exporttofactory", "ExportManager");

    // copy geometry coordinates
    for (var key in geometries) {
      var tmp = require("FeatureFactory4Factory")("State", conditions);
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
      if (conditions.properties.description)
        states[id].setDescription(properties[key].description);
      if (conditions.properties.duality)
        states[id].setDuality(properties[key].duality);
      if (conditions.properties.connects)
        states[id].setConnects(properties[key].connects);
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
  };

  /**
   * @memberof ExportManager
   * @return Array of Format4Factory.Transition
   */
  ExportManager.prototype.transitionObj4Factory = function(
    docId,
    edges,
    transDot
  ) {
    var transitions = {};
    var result = [];
    var conditions = require("Conditions").getInstance().exportConditions
      .Transition;
    var geometries = require("Storage")
      .getInstance()
      .getGeometryContainer().transitionGeometry;
    var properties = require("Storage")
      .getInstance()
      .getPropertyContainer().transitionProperties;
    var floorProperties = require("Storage")
      .getInstance()
      .getPropertyContainer().floorProperties;
    var manager = require("Broker")
      .getInstance()
      .getManager("exporttofactory", "ExportManager");

    // copy geometry coordinates
    for (var key in geometries) {
      var tmp = require("FeatureFactory4Factory")("Transition", conditions);
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
      if (conditions.properties.name)
        transitions[id].setName(properties[key].name);
      if (conditions.properties.description)
        transitions[id].setDescription(properties[key].description);
      if (conditions.properties.duality)
        transitions[id].setDuality(properties[key].duality);
      if (conditions.properties.weight)
        transitions[id].setWeight(properties[key].weight);
      if (conditions.properties.connects)
        transitions[id].setConnects(properties[key].connects);
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
        var reverseObj = require("FeatureFactory4Factory")(
          "Transition",
          conditions
        );
        reverseObj.copy(transitions[transitionKeyInFloor[transitionKey]]);
        reverseObj.setId(reverseObj.id + "-REVERSE");
        reverseObj.setGeometryId(
          reverseObj.geometry.properties.id + "-REVERSE"
        );
        reverseObj.setName(reverseObj.properties.name + "-REVERSE");
        reverseObj.reverseCoor();
        reverseObj.reverseDuality();
        transitions[
          transitionKeyInFloor[transitionKey] + "-REVERSE"
        ] = reverseObj;

        transitions[transitionKeyInFloor[transitionKey]].setWKT();
        transitions[transitionKeyInFloor[transitionKey]].setParentId(prtId);
        transitions[transitionKeyInFloor[transitionKey]].addPrtDesc(prtDesc);
        transitions[transitionKeyInFloor[transitionKey]].convertDescObj2Str();

        transitions[transitionKeyInFloor[transitionKey] + "-REVERSE"].setWKT();
        transitions[
          transitionKeyInFloor[transitionKey] + "-REVERSE"
        ].setParentId(prtId);
        transitions[
          transitionKeyInFloor[transitionKey] + "-REVERSE"
        ].addPrtDesc(prtDesc);
        transitions[
          transitionKeyInFloor[transitionKey] + "-REVERSE"
        ].convertDescObj2Str();
      }
    }

    for (var key in transitions) {
      transitions[key].simplify();
      result.push(transitions[key]);
    }

    return result;
  };

  ExportManager.prototype.interlayerConnectionObj4Factory = function(
    docId,
    interEdges
  ) {
    var result = [];
    var properties = require("Storage")
      .getInstance()
      .getPropertyContainer().interlayerConnections;

    for (var key in properties) {
      var tmp = require("FeatureFactory4Factory")("InterlayerConnection");
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
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.affineTransformation = function(
    pixelHeight,
    pixeWidth,
    worldURC,
    worldLLC,
    point
  ) {
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
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.extrudeCell = function(surface, ch) {
    // input surface should be clock wise
    var down = surface;
    var up = [];
    var surfaces = [];

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

    surfaces.push([[up]]);

    for (var i = 0; i < down.length - 1; i++) {
      var downLeft = JSON.parse(JSON.stringify(down[i]));
      var downRight = JSON.parse(JSON.stringify(down[i + 1]));
      var upRigth = JSON.parse(JSON.stringify(up[i + 1]));
      var upLeft = JSON.parse(JSON.stringify(up[i]));

      surfaces.push([[[downLeft, downRight, upRigth, upLeft, downLeft]]]);
    }

    // rotate down surface
    down.reverse();

    surfaces.push([[down]]);

    return [surfaces];
  };

  /**
   * @memberof ExportManager
   * @desc no floor
   */
  ExportManager.prototype.extrudeCellWithUpSlant = function(
    surface,
    lines,
    ch
  ) {
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

    surfaces.push([[up]]);

    var downToUpIndex = [];
    var flag = false;

    for (var i = 0; i < down.length - 1; i++) {
      var downLeft, downRight, upRight, upLeft;

      if (
        lines[0][0].point.x == down[i][0] &&
        lines[0][0].point.y == down[i][1]
      ) {
        downLeft = JSON.parse(JSON.stringify(down[i]));
        upRight = JSON.parse(JSON.stringify(up[i + 1]));
        upLeft = JSON.parse(JSON.stringify(up[i]));
        surfaces.push([[[downLeft, upRight, upLeft, downLeft]]]);
        flag = false;
      } else if (
        lines[1][0].point.x == down[i][0] &&
        lines[1][0].point.y == down[i][1]
      ) {
        downRight = JSON.parse(JSON.stringify(down[i + 1]));
        upRight = JSON.parse(JSON.stringify(up[i + 1]));
        upLeft = JSON.parse(JSON.stringify(up[i]));
        surfaces.push([[[downRight, upRight, upLeft, downRight]]]);
        flag = false;
        downToUpIndex.push(i);
      } else if (
        lines[0][1].point.x == down[i][0] &&
        lines[0][1].point.y == down[i][1]
      ) {
        flag = true;
        downToUpIndex.push(i);
      } else if (flag) {
        downToUpIndex.push(i);
      } else {
        downLeft = JSON.parse(JSON.stringify(down[i]));
        downRight = JSON.parse(JSON.stringify(down[i + 1]));
        upRight = JSON.parse(JSON.stringify(up[i + 1]));
        upLeft = JSON.parse(JSON.stringify(up[i]));
        surfaces.push([[[downLeft, downRight, upRight, upLeft, downLeft]]]);
      }
    }

    for (var i = 0; i < downToUpIndex.length; i++) {
      down[downToUpIndex[i]] = up[downToUpIndex[i]];
    }

    down.reverse();

    surfaces.push([[down]]);

    return [surfaces];
  };

  /**
   * @memberof ExportManager
   * @desc no ceilling
   */
  ExportManager.prototype.extrudeCellWithDownSlant = function(
    surface,
    lines,
    ch
  ) {
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
      if (
        lines[0][0].point.x == down[i][0] &&
        lines[0][0].point.y == down[i][1]
      ) {
        downLeft = JSON.parse(JSON.stringify(down[i]));
        downRight = JSON.parse(JSON.stringify(down[i + 1]));
        upRight = JSON.parse(JSON.stringify(up[i + 1]));
        surfaces.push([[[downLeft, downRight, upRight, downLeft]]]);

        flag = false;
        upToDownIndex.push(i);
      } else if (
        lines[1][0].point.x == down[i][0] &&
        lines[1][0].point.y == down[i][1]
      ) {
        downLeft = JSON.parse(JSON.stringify(down[i]));
        downRight = JSON.parse(JSON.stringify(down[i + 1]));
        upLeft = JSON.parse(JSON.stringify(up[i]));
        surfaces.push([[[downLeft, downRight, upLeft, downLeft]]]);

        flag = false;
      } else if (
        lines[1][1].point.x == down[i][0] &&
        lines[1][1].point.y == down[i][1]
      ) {
        flag = true;
        upToDownIndex.push(i);
      } else if (flag) {
        upToDownIndex.push(i);
      } else {
        downLeft = JSON.parse(JSON.stringify(down[i]));
        downRight = JSON.parse(JSON.stringify(down[i + 1]));
        upRight = JSON.parse(JSON.stringify(up[i + 1]));
        upLeft = JSON.parse(JSON.stringify(up[i]));
        surfaces.push([[[downLeft, downRight, upRight, upLeft, downLeft]]]);
      }
    }

    for (var i = 0; i < upToDownIndex.length; i++) {
      up[upToDownIndex[i]] = down[upToDownIndex[i]];

      if (upToDownIndex[i] == 0) up[up.length - 1] = up[0];
      if (upToDownIndex[i] == up.length - 1) up[0] = up[up.length - 1];
    }

    down.reverse();

    surfaces.push([[down]]);
    surfaces.push([[up]]);

    return [surfaces];
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.extrudeCellBoundary = function(line, dh) {
    var result = JSON.parse(JSON.stringify(line));

    line.reverse();
    for (var i in line) line[i][2] += dh;

    result = result.concat(line);
    result.push(result[0]);

    return result;
  };

  /**
   * @memberof ExportManager
   */
  ExportManager.prototype.transAllDots = function(dotPools, floorProperties) {
    var result = {};
    var manager = require("Broker")
      .getInstance()
      .getManager("exporttofactory", "ExportManager");
    var pp = require("Storage")
      .getInstance()
      .getPropertyContainer().projectProperty;

    if (pp.isRealCoor && pp.realCoorFloor != "")
      result = manager.transAllDotsUsingTool(dotPools, floorProperties, pp);
    else result = manager.transAllDotsUsingMatrix(dotPools, floorProperties);

    //change state height
    var proeprtyContainer = require("Storage")
      .getInstance()
      .getPropertyContainer();
    for (var key in result) {
      if (result[key].isState()) {
        var index = Object.values(result[key].memberOf).indexOf("state");
        var stateId = Object.keys(result[key].memberOf)[index];
        if (proeprtyContainer.getElementById("state", stateId) == null) {
          //log.info(result, key, result[key])
          delete result[key];
        } else {
          result[key].point.z +=
            proeprtyContainer.getElementById("state", stateId).height * 1;
        }
      }
    }

    return result;
  };

  ExportManager.prototype.transAllDotsUsingMatrix = function(
    dotPools,
    floorProperties
  ) {
    function copyDot(obj) {
      var Dot = require("Dot");
      var copiedDot = new Dot(obj.point.x, obj.point.y);
      copiedDot.uuid = obj.uuid;
      copiedDot.memberOf = copyObject(obj.memberOf);

      return copiedDot;
    }

    function copyObject(obj) {
      if (obj === null || typeof obj !== "object") {
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

    let result = {};
    var manager = require("Broker")
      .getInstance()
      .getManager("exporttofactory", "ExportManager");

    for (var dotPoolKey in dotPools) {
      //function(pixelHeight, pixeWidth, worldURC, worldLLC, point)

      let stage = require("Storage")
        .getInstance()
        .getCanvasContainer().stages[floorProperties[dotPoolKey].id].stage;
      let height = floorProperties[dotPoolKey].groundHeight * 1;
      let worldLLC = [
        floorProperties[dotPoolKey].lowerCorner[0] * 1,
        floorProperties[dotPoolKey].lowerCorner[1] * 1,
        0
      ];
      let worldURC = [
        floorProperties[dotPoolKey].upperCorner[0] * 1,
        floorProperties[dotPoolKey].upperCorner[1] * 1,
        0
      ];

      for (let dotKey in dotPools[dotPoolKey].dots) {
        let transDot = copyDot(dotPools[dotPoolKey].dots[dotKey]);
        let transPoint = manager.affineTransformation(
          stage.getAttr("height"),
          stage.getAttr("width"),
          worldURC,
          worldLLC,
          [transDot.point.x, transDot.point.y, 0]
        );
        transDot.setPoint({
          x: transPoint._data[0],
          y: transPoint._data[1],
          z: height
        });
        if (transDot.point == undefined) log.info("ttt", transDot);
        result[transDot.uuid] = transDot;
      }
    }

    return result;
  };

  ExportManager.prototype.transAllDotsUsingTool = function(
    dotPools,
    floorProperties,
    projectProperty
  ) {
    function array2string(arr) {
      let str = "";
      for (let lineI in arr) {
        let line = arr[lineI];
        for (let i in line) {
          str += line[i];
          if (i != line.length - 1) str += ", ";
        }
        if (lineI != arr.length - 1) str += "\r\n";
      }

      return str;
    }

    function copyDot(obj) {
      var Dot = require("Dot");
      var copiedDot = new Dot(obj.point.x, obj.point.y);
      copiedDot.uuid = obj.uuid;
      copiedDot.memberOf = copyObject(obj.memberOf);

      return copiedDot;
    }

    function copyObject(obj) {
      if (obj === null || typeof obj !== "object") {
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

    let constArr = [];
    let allCoorArr = [];
    let result = {};

    let canvasCoor = require("Storage")
      .getInstance()
      .getCanvasContainer()
      .stages[projectProperty.realCoorFloor].getWD();
    let lowerCorner =
      floorProperties[projectProperty.realCoorFloor].lowerCorner;
    let upperCorner =
      floorProperties[projectProperty.realCoorFloor].upperCorner;

    constArr.push([...lowerCorner, 0, 0]);
    constArr.push([...upperCorner, canvasCoor.width, canvasCoor.height]);
    constArr.push([lowerCorner[0], upperCorner[1], 0, canvasCoor.height]);
    constArr.push([upperCorner[0], lowerCorner[1], canvasCoor.width, 0]);

    for (let dotPoolKey in dotPools) {
      for (let dotKey in dotPools[dotPoolKey].dots)
        allCoorArr.push([
          dotPools[dotPoolKey].dots[dotKey].point.x,
          dotPools[dotPoolKey].dots[dotKey].point.y
        ]);
    }

    constArr = array2string(constArr);
    allCoorArr = array2string(allCoorArr);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        let strArr = xhr.response.split("\r\n");
        strArr = strArr.slice(0, strArr.length - 1);

        let coors = [];
        for (let coorStr of strArr) {
          coorStr = coorStr.split(",");
          coorStr[0] = coorStr[0] * 1;
          coorStr[1] = coorStr[1] * 1;
          coors.push(coorStr);
        }

        let i = 0;

        for (let dotPoolKey in dotPools) {
          let height = floorProperties[dotPoolKey].groundHeight * 1;

          for (let dotKey in dotPools[dotPoolKey].dots) {
            let transDot = copyDot(dotPools[dotPoolKey].dots[dotKey]);
            transDot.setPoint({
              x: coors[i][0],
              y: coors[i][1],
              z: height
            });
            result[transDot.uuid] = transDot;
            i++;
          }
        }

        return result;
      }
    };

    xhr.open("POST", "http://localhost:5757/trans-dot", false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let data = JSON.stringify({
      constArr: constArr,
      allCoorArr: allCoorArr
    });
    log.info(data);
    xhr.send(data);

    return result;
  };

  return ExportManager;
});
