/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../Storage/Canvas/Object/Cell.js",
  "../Storage/Geometries/CellGeometry.js",
  "../Storage/Canvas/Object/CellBoundary.js",
  "../PubSub/Subscriber.js",
  "../Storage/Dot/Dot.js",
  "../Storage/Geometries/CellBoundaryGeometry.js",
  "../Storage/Canvas/Object/State.js",
  "../Storage/Canvas/Object/Transition.js",
  "../Storage/Dot/DotMath.js"
], function(
  Cell,
  CellGeometry,
  CellBoundary,
  Subscriber,
  Dot,
  CellBoundaryGeometry,
  State,
  Transition,
  DotMath
) {
  'use strict';

  /**
   * @class GeometryManager
   * @augments Subscriber
   */
  function GeometryManager() {

    Subscriber.apply(this, arguments);

    this.init();
  }

  GeometryManager.prototype = Object.create(Subscriber.prototype);

  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.init = function() {

    /**
     * @memberof GeometryManager
     */
    this.name = 'GeometryManager';

    this.addCallbackFun('addnewfloor', this.addNewFloor);

    this.addCallbackFun('start-addnewcell', this.startAddNewCell, function() {}, function() {});
    this.addCallbackFun('addnewcell', this.addNewCell, this.drawGeometry_makeHistoryObj, this.addNewCell_undo);
    this.addCallbackFun('end-addnewcell', this.endAddNewCell, this.makeSimpleHistoryObj, this.endAddNewCell_undo);

    this.addCallbackFun('start-addnewcellboundary', this.startAddNewCellBoundary, function() {}, function() {});
    this.addCallbackFun('addnewcellboundary', this.addNewCellBoundary, this.drawGeometry_makeHistoryObj, this.addNewCellBoundary_undo);
    this.addCallbackFun('end-addnewcellboundary', this.endAddNewCellBoundary, this.makeSimpleHistoryObj, this.endAddNewCellBoundary_undo);

    this.addCallbackFun('snapping', this.snappingMousePointer);

    this.addCallbackFun('cancel-addnewcell', this.cancelAddNewCell);
    this.addCallbackFun('cancel-addnewcellboundary', this.cancelAddNewCellBoundary);

    this.addCallbackFun('start-addnewtransition', this.startAddNewTransition, function() {}, function() {});
    this.addCallbackFun('addnewtransition', this.addNewTransition, function() {}, function() {});
    this.addCallbackFun('end-addnewtransition', this.endAddNewTransition, function(){}, function(){});

  }

  /**
   * @memberof GeometryManager
   * @desc just return input parameter(reqObj)
   */
  GeometryManager.prototype.makeSimpleHistoryObj = function(reqObj) {
    return reqObj;
  }

  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.addNewFloor = function(reqObj) {
    window.storage.dotFoolContainer.addNewDotFool(reqObj.floor);
  }


  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.startAddNewCell = function(reqobj) {

    var tmpObj = new Cell('tmpObj');
    tmpObj.type = 'cell';
    window.tmpObj = tmpObj;

  }


  /**
   * @memberof GeometryManager
   * @param {Object} reqObj floor: floor id
   */
  GeometryManager.prototype.addNewCell = function(reqObj) {

    if (window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.obj == null) {
      window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.addNewObj('cell');
      window.tmpObj.floor = reqObj.floor;
    }

    // add corner
    var point = window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor.coor;

    var isDotExist = window.storage.dotFoolContainer.getDotFool(reqObj.floor).getDotByPoint({
      x: point.x,
      y: point.y
    });

    var dot;

    if (isDotExist == null) {
      dot = new Dot(point.x, point.y);
      window.storage.dotFoolContainer.getDotFool(reqObj.floor).push(dot);
    } else {
      dot = isDotExist;
    }

    window.tmpObj.addCorner(dot);

    // draw group
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
    // window.storage.canvasContainer.stages[reqObj.floor].stage.draw();

    // log.trace(window.storage.dotFoolContainer);

  }

  /**
   * @memberof GeometryManager
   * @param reqObj floor
   */
  GeometryManager.prototype.drawGeometry_makeHistoryObj = function(reqObj) {
    return {
      floor: reqObj.floor,
      uuid: window.tmpObj.getLastDot().uuid
    };
  }


  /**
   * @memberof GeometryManager
   * @param undoObj last dot of tmpObj
   */
  GeometryManager.prototype.addNewCell_undo = function(undoObj) {

    var tmpObj = window.tmpObj;

    tmpObj.deleteLastCorner();
    tmpObj.deleteLastPolyLine();

    window.storage.dotFoolContainer.getDotFool(undoObj.floor).deleteDotFromObj(undoObj.uuid, tmpObj.id);
    window.storage.canvasContainer.stages[undoObj.floor].tmpLayer.layer.draw();

  }

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof GeometryManager
   * @desc draw new cell object in canvas
   */
  GeometryManager.prototype.endAddNewCell = function(reqObj) {

    if (reqObj.isEmpty != null) {
      window.tmpObj = null;
      return;
    }

    var tmpObj = window.tmpObj;

    // clear tmp obj
    window.tmpObj = null;
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.removeObj();
    // window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

    for (var key in tmpObj.dots) {
      tmpObj.dots[key].leaveObj('tmpObj');
    }

    // Twisted side validation
    if (!window.broker.getManager('end-addnewcell', 'GeometryManager').validateTwistedSide(tmpObj.dots)) {
      log.error("This object have twisted side !");
      return false;
    }

    tmpObj.id = reqObj.id;
    tmpObj.name = reqObj.id;

    // add cell to canvasContainer using tmpObj
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.add(tmpObj);

    // fragmenteGeometry

    // set corner to invisible
    var obj = window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.cells[window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.cells.length - 1];
    obj.corners.visible(false);

    //add cell data in geometry canvasContainer
    window.storage.geometryContainer.cellGeometry.push(new CellGeometry(reqObj.id, obj.dots));

    // add state if there if conditions.automGenerateState is true
    if (window.conditions.automGenerateState) {

      var manager = window.broker.getManager('end-addnewcell', 'GeometryManager');
      manager.generateStateUsingCell(tmpObj, reqObj.floor);

    }

    // redraw stage
    window.storage.canvasContainer.stages[reqObj.floor].stage.draw();

  }

  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.generateStateUsingCell = function(tmpObj, floor) {

    // add state
    var wkt = tmpObj.getWKT();
    var reader = new jsts.io.WKTReader();
    var cell = reader.read(wkt);
    var centroid = cell.getCentroid();
    var realCentroid = cell.getCentroid().getCoordinates()[0];
    var intersection = centroid.intersection(cell).getCoordinates();
    var d = 87465132;
    var data = [];

    function setState() {
      var centroidDot = new Dot(intersection[0].x, intersection[0].y);

      var stateId = window.conditions.pre_state+(++window.conditions.LAST_STATE_ID_NUM);
      window.storage.canvasContainer.stages[floor].stateLayer.group.makeNewStateAndAdd(stateId, centroidDot);

      centroidDot.participateObj(stateId, 'state');
      window.storage.dotFoolContainer.getDotFool(floor).push(centroidDot);
    }

    if(intersection.length == 0){

      for(var i = 0 ; i < tmpObj.dots.length; i++){
        data.push(tmpObj.dots[i].point.x, tmpObj.dots[i].point.y);
      }

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status == 200) {
          var triangles = JSON.parse(xhr.responseText);

          for(var i = 0 ; i < triangles.length; i += 3){

            log.info(i, i+1, i+2);
            var partOfCellWKT = 'POLYGON (( ' + tmpObj.dots[triangles[i]].point.x + ' ' + tmpObj.dots[triangles[i]].point.y + ', ';
              partOfCellWKT += tmpObj.dots[triangles[i+1]].point.x + ' ' + tmpObj.dots[triangles[i+1]].point.y + ', ';
              partOfCellWKT += tmpObj.dots[triangles[i+2]].point.x + ' ' + tmpObj.dots[triangles[i+2]].point.y + ', ';
              partOfCellWKT += tmpObj.dots[triangles[i]].point.x + ' ' + tmpObj.dots[triangles[i]].point.y + '))';
            var partOfCell = reader.read(partOfCellWKT);
            intersection = partOfCell.intersection(cell).getCentroid().getCoordinates();

            if(intersection.length == 1){
              var tmpD = Math.sqrt(Math.abs(Math.pow(realCentroid.x-intersection[0].x, 2)) + Math.abs(Math.pow(realCentroid.y-intersection[0].y, 2)));
              if(tmpD < d) d = tmpD;
            }
          }

          log.info(intersection);

          setState();

        }
      }

      xhr.open("POST", "http://127.0.0.1:8080/triangulate", false);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data));

    } else {

      setState();

    }

  }

  /**
   * @param {Object} undoObj id<br>floor: floor id
   * @memberof GeometryManager
   * @desc Remove cell object in canvasContainer which id is undoObj.id
   */
  GeometryManager.prototype.endAddNewCell_undo = function(undoObj) {

    // remove  cell in canvasContainer
    var cells = window.storage.canvasContainer.stages[undoObj.floor].cellLayer.group.cells;

    for (var key in cells) {
      if (cells[key].id == undoObj.id) {

        // destroy canvas object
        cells[key].destroy(undoObj.floor);

        // free dot from object
        for (var cellkey in cells[key].dots) {
          window.storage.dotFoolContainer.getDotFool(undoObj.floor).deleteDotFromObj(cells[key].dots[cellkey].uuid, cells[key].id);
        }

        // redraw canvas
        window.storage.canvasContainer.stages[undoObj.floor].cellLayer.layer.draw();
        cells.splice(key, 1);
      }
    }

    // remove cell in geometryContainer
    cells = window.storage.geometryContainer.cellGeometry;
    for (var key in cells) {
      if (cells[key].id == undoObj.id) {
        cells.splice(key, 1);
        break;
      }
    }

  }

  /**
   * @memberof GeometryManager
   * @param {Array} Array of dots. Assume that you create a face by connecting the lines in sequence to the array.
   * @return {Boolean}
   */
  GeometryManager.prototype.validateTwistedSide = function(dots) {

    return true;

  }

  /**
   * @param {Object} reqObj floor
   * @memberof GeometryManager
   * @desc set tmpObj to null
   */
  GeometryManager.prototype.cancelAddNewCell = function(reqObj) {

    if (reqObj.floor == undefined) {
      window.tmpObj = null;
      return;
    }

    for (var key in window.tmpObj.dots) {
      window.storage.dotFoolContainer.getDotFool(reqObj.floor).deleteDotFromObj(window.tmpObj.dots[key].uuid, 'tmpObj');
    }

    // clear tmp obj
    window.tmpObj = null;
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.removeObj();
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

    window.myhistory.history.pop_back();

  }

  /**
   * @memberof GeometryManager
   * @param {Array} Dot array in same floor.
   * @param {Array} Connection data of this floor. This value is array of Object and it's form is { dot1, dot2 }.
   * @param {Object} { x : coordinate of x, y : coordinate of y }
   * @return {Object} { x : coordinate of x, y : coordinate of y } or null
   */
  GeometryManager.prototype.snapping = function(dots, connections, point) {

    var minimum_d = window.conditions.snappingThreshold;
    var minimum_connection = null;
    var minimum_point = point;

    for (var i = 0; connections.length > i; i++) {

      function distanceTo(A, B) {
        return Math.sqrt(Math.pow(Math.abs(A.x - B.x), 2) + Math.pow(Math.abs(A.y - B.y), 2));
      }

      function dotProduct(A, B) {
        return (A.x * B.x) + (A.y * B.y);
      }

      function crossProduct(A, B) {
        return {
          x: A.y * B.z - A.z * B.y,
          y: A.z * B.x - A.x * B.z,
          z: A.x * B.y - A.y * B.x
        };
      }

      // v1 : dot1 -> point
      // v2 : dot2 -> point
      // v3 : dot1 -> dot2
      var V1 = {
        x: point.x - connections[i].dot1.point.x,
        y: point.y - connections[i].dot1.point.y
      };
      var V2 = {
        x: point.x - connections[i].dot2.point.x,
        y: point.y - connections[i].dot2.point.y
      };
      var V3 = {
        x: connections[i].dot2.point.x - connections[i].dot1.point.x,
        y: connections[i].dot2.point.y - connections[i].dot1.point.y
      };

      var V1DotV3 = dotProduct(V1, V3);
      var V2DotV3 = dotProduct(V2, V3);

      if (V1DotV3 * V2DotV3 <= 0) {
        var crossP = crossProduct({
          x: V1.x,
          y: V1.y,
          z: 0
        }, {
          x: V3.x,
          y: V3.y,
          z: 0
        });
        var A = Math.sqrt(Math.pow(crossP.x, 2) + Math.pow(crossP.y, 2) + Math.pow(crossP.z, 2));
        var d = A / distanceTo(connections[i].dot1.point, connections[i].dot2.point);

        if (minimum_d > d) {
          var u = Math.pow(distanceTo(connections[i].dot1.point, connections[i].dot2.point), 2);

          // new minimum point : dot1 + v3 unit vector * d
          var V3Unit = {
            x: V3.x / u,
            y: V3.y / u
          };

          var dotP = dotProduct(V1, V3);

          // log.info(V3Unit.x * dotP, V3Unit.y * dotP);

          minimum_point = {
            x: connections[i].dot1.point.x + V3Unit.x * dotP,
            y: connections[i].dot1.point.y + V3Unit.y * dotP
          };

          // log.info("minimum_point updated : ", minimum_point);

          minimum_connection = connections[i];
        }
      }
    }

    return minimum_point;
  }

  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.startAddNewCellBoundary = function(reqObj) {
    var tmpObj = new CellBoundary('tmpObj');
    tmpObj.type = 'cellBoundary';
    window.tmpObj = tmpObj;
  }

  /**
   * @memberof GeometryManager
   * @param {Object} reqObj floor
   */
  GeometryManager.prototype.addNewCellBoundary = function(reqObj) {

    if (window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.obj == null) {
      window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.addNewObj('cellBoundary');
      window.tmpObj.floor = reqObj.floor;
    }

    var point = window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor.coor;

    var isDotExist = window.storage.dotFoolContainer.getDotFool(reqObj.floor).getDotByPoint({
      x: point.x,
      y: point.y
    });

    var dot;

    if (window.tmpObj.cells == null) {

      var manager = window.broker.getManager('addnewcellboundary', 'GeometryManager');
      var cells = window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.getCells();
      var line = manager.isExistOnALine(point, cells);

      if (line == null) return false;
      window.tmpObj.cells = line.cells;

      if (isDotExist == null) {
        dot = new Dot(point.x, point.y);
        window.storage.dotFoolContainer.getDotFool(reqObj.floor).push(dot);
      } else {
        dot = isDotExist;
      }

    } else {

      var isConnected;
      var cell = window.storage.canvasContainer.getElementById('cell', window.tmpObj.cells[0]);

      if (isDotExist == null) {
        isConnected = cell.isPartOf(window.tmpObj.dots[window.tmpObj.dots.length - 1].point, point);

        if (isConnected.result) {
          dot = new Dot(point.x, point.y);
          window.storage.dotFoolContainer.getDotFool(reqObj.floor).push(dot);
        } else {
          log.info("The point you click is not on the line in " + window.tmpObj.cells);
          return false;
        }

      } else {

        isConnected = cell.isPartOf(window.tmpObj.dots[window.tmpObj.dots.length - 1].point, isDotExist.point);

        if (isConnected.result) {
          dot = isDotExist;
        } else {
          log.info("The point you click is not on the line in " + window.tmpObj.cells);
        }

      }

    }

    if (dot != null) {
      window.tmpObj.addCorner(dot);
      window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
    }

    // log.trace(window.storage.canvasContainer);

  }


  /**
   * @memberof GeometryManager
   * @param undoObj floor, uuid of last dot
   */
  GeometryManager.prototype.addNewCellBoundary_undo = function(undoObj) {

    var tmpObj = window.tmpObj;

    tmpObj.removeDot(undoObj.uuid);
    window.storage.dotFoolContainer.getDotFool(undoObj.floor).deleteDotFromObj(undoObj.uuid, tmpObj.id);
    window.storage.canvasContainer.stages[undoObj.floor].tmpLayer.layer.draw();

  }


  /**
   * @memberof GeometryManager
   * @param {Object} reqObj { id, floor, isEmpty }
   */
  GeometryManager.prototype.endAddNewCellBoundary = function(reqObj) {

    if (reqObj.isEmpty != null) {
      window.tmpObj = null;
      return;
    }

    log.info("tmpObj : ", window.tmpObj);

    var tmpObj = window.tmpObj;

    // clear tmp obj
    window.tmpObj = null;
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.removeObj();
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

    for (var key in tmpObj.dots) {
      tmpObj.dots[key].leaveObj('tmpObj');
    }

    tmpObj.id = reqObj.id;
    tmpObj.name = reqObj.id;

    // add cellboundary using tmpObj
    window.storage.canvasContainer.stages[reqObj.floor].cellBoundaryLayer.group.add(tmpObj);

    // set corner to invisible
    var obj = window.storage.canvasContainer.stages[reqObj.floor].cellBoundaryLayer.group.cellBoundaries[window.storage.canvasContainer.stages[reqObj.floor].cellBoundaryLayer.group.cellBoundaries.length - 1];
    obj.setCornersVisible(false);

    // redraw cellBoundaryLayer
    window.storage.canvasContainer.stages[reqObj.floor].cellBoundaryLayer.layer.draw();

    //add cellBoundary data in geometry canvasContainer
    window.storage.geometryContainer.cellBoundaryGeometry.push(new CellBoundaryGeometry(reqObj.id, obj.dots));

    log.trace(window.storage);

  }


  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.endAddNewCellBoundary_undo = function(undoObj) {

    log.info(undoObj);

    // remove cellboundary in canvasContainer
    var cellboundaries = window.storage.canvasContainer.stages[undoObj.floor].cellBoundaryLayer.group.cellBoundaries;

    for (var key in cellboundaries) {
      if (cellboundaries[key].id == undoObj.id) {
        cellboundaries[key].destroy(undoObj.floor);

        // free dot from object
        for (var dotkey in cellboundaries[key].dots) {
          window.storage.dotFoolContainer.getDotFool(undoObj.floor).deleteDotFromObj(cellboundaries[key].dots[dotkey].uuid, cellboundaries[key].id);
        }

        // redraw canvas
        window.storage.canvasContainer.stages[undoObj.floor].cellBoundaryLayer.layer.draw();
        cellboundaries.splice(key, 1);
      }
    }

    // remove cell in geometryContainer
    cellboundaries = window.storage.geometryContainer.cellBoundaryGeometry;
    for (var key in cellboundaries) {
      if (cellboundaries[key].id == undoObj.id) {
        cellboundaries.splice(key, 1);
        break;
      }
    }

  }


  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.cancelAddNewCellBoundary = function(reqObj) {

    if (reqObj.floor == undefined) {
      window.tmpObj = null;
      return;
    }

    for (var key in window.tmpObj.dots) {
      window.storage.dotFoolContainer.getDotFool(reqObj.floor).deleteDotFromObj(window.tmpObj.dots[key].uuid, 'tmpObj');
    }

    // clear tmp obj
    window.tmpObj = null;
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.removeObj();
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

    window.myhistory.history.pop_back();
  }

  /**
   * @memberof GeometryManager
   * @param {Object} reqObj floor, point
   */
  GeometryManager.prototype.snappingMousePointer = function(reqObj) {

    var point = reqObj.point;
    point.x = point.x - window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.x;
    point.x = point.x / window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleX;

    point.y = point.y - window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.y;
    point.y = point.y / window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleY;

    var isDotExist = window.storage.dotFoolContainer.getDotFool(reqObj.floor).getDotByPoint({
      x: point.x,
      y: point.y
    });

    var newPoint;

    if (isDotExist == null) {

      var manager = window.broker.getManager('snapping', 'GeometryManager');
      var dots = Object.values(window.storage.dotFoolContainer.getDotFool(reqObj.floor).getDots());
      var connections = window.storage.canvasContainer.stages[reqObj.floor].getConnection();
      newPoint = manager.snapping(dots, connections, point);

    } else {

      newPoint = isDotExist.point;

    }

    var cursor = window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.getCursor();

    cursor.setCoor(newPoint);
    cursor.setVisible(true);

    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

  }

  /**
   * @memberof GeometryManager
   * @param {Object} point current point, { x, y }
   * @param {Array} cells
   * @return {Obejct} { line : { dot1, dot2 }, cells : [ cell ] }
   */
  GeometryManager.prototype.isExistOnALine = function(point, cells) {

    var partof = {
      result: false
    };
    var len = cells.length;
    var i;
    var result = null;

    // find first cell which point is contain
    for (i = 0; i < len && !partof.result; i++) {
      partof = cells[i].isPartOf(point);
      if (partof.result) result = {
        'line': {
          'dot1': partof.connection.dot1,
          'dot2': partof.connection.dot2
        },
        'cells': []
      };
    }

    // if point is not on a line, return null
    if (result == null) return null;

    // find other cell contain this line
    var candidateCells = result.line.dot1.memberOf;
    for (var key in candidateCells) {
      if (candidateCells[key] == 'cell' && result.line.dot2.memberOf[key] != null) {
        result.cells.push(key);
      }
    }

    return result;

  }


  /**
   * @memberof GeometryManager
   * @desc In Indoor-GML, Geometry should not duplicated with each other. To mainta this conraction, if the newest point is on exist line, we need to add information about that point to dot.
   * @param {Object} line { dot1 , dot2 }
   * @param {Dot} newPoint
   */
  GeometryManager.prototype.insertDotIntoLine = function(line, newPoint) {

    // check newPoint is on the line
    // line.dot1 -> line.dot2
    var V1 = {
      x: line.dot2.point.x - line.dot1.point.x,
      y: line.dot2.point.y - line.dot1.point.y
    };

    // line.dot1 -> newPoint
    var V2 = {
      x: newPoint.point.x - line.dot1.point.x,
      y: newPoint.point.y - line.dot1.point.y
    };

    var cos = (V1.x * V2.x + V1.y * V2.y) /
      (Math.sqrt(Math.pow(V1.x, 2) + Math.pow(V1.y, 2)) *
        Math.sqrt(Math.pow(V2.x, 2) + Math.pow(V2.y, 2)));
    var threshold = 0.0000001;

    if (!(1 - threshold <= cos && cos <= 1 + threshold) || !((-1) - threshold <= cos && cos <= (-1) + threshold))
      return;

    // find the cells which line is included
    var candidateObjs = line.dot1.memberOf;
    var keyOfMemberofDot2 = Object.keys(line.dot2.memberOf);
    for (var key in candidateObjs) {
      if (keyOfMemberofDot2.indexOf(key) == -1) delete candidateObjs[key];
    }

    // insert dot in geometry
    candidateObjs.forEach(function(obj) {
      obj.insertDotIntoLine(line, newPoint);
    });

  }

  /**
  * @memberof GeometryManager
  */
  GeometryManager.prototype.startAddNewTransition = function(reqObj){

    var tmpObj = new Transition('tmpObj');
    tmpObj.type = 'transition';
    window.tmpObj = tmpObj;

  }

  /**
  * @memberof GeometryManager
  */
  GeometryManager.prototype.addNewTransition = function(reqObj){

    if (window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.obj == null) {
      window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.addNewObj('transition');
      window.tmpObj.floor = reqObj.floor;
    }

    // get  coordinate
    var point = window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor.coor;

    var isDotExist = window.storage.dotFoolContainer.getDotFool(reqObj.floor).getDotByPoint({
      x: point.x,
      y: point.y
    });

    if( isDotExist != null && tmpObj.dots.length <= 1 && isDotExist.isState ) {

      window.tmpObj.addState(isDotExist);
      isDotExist.participateObj('tmpObj', 'transition');

      if(tmpObj.dots.length == 2){
        var manager = window.broker.getManager('start-addnewtransition', 'UIManager');
        manager.setTooltipText({
          floor: reqObj.floor,
          text: 'If you want to set duality of this transition, click cellspacecoundry.\nIf not, please click transition button or push enter'
        });
      }

    } else if( tmpObj.dots.length == 2 ){

      // is part of cellBoundary
      var cellBoundaries = window.storage.canvasContainer.stages[reqObj.floor].cellBoundaryLayer.group.getObjects();
      for(var boundaryKey in cellBoundaries){

        var dots = cellBoundaries[boundaryKey].getDots();

        // this lines shoule activate when factory support real line string
        // for(var i = 0 ; i < dots.length ; i ++){
        //
        //   var line = { dot1 : null, dot2 : null };
        //   line.dot1 = dots[i];
        //   if( i == dots.length - 1 ) line.dot2 = dots[0];
        //   else line.dot2 = dots[1];
        //
        // }

        var line = {
          dot1: dots[0],
          dot2: dots[1]
        };

        if(DotMath.isLineContainDot(line, {point: point})){
          var newDot = new Dot(point.x, point.y);
          window.storage.dotFoolContainer.getDotFool(reqObj.floor).push(newDot);
          window.tmpObj.insertDot(1, newDot);

          // segmentation cellboundary
        }

      }

    }

    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

    log.trace(window.storage);

  }


  /**
  * @memberof GeometryManager
  */
  GeometryManager.prototype.endAddNewTransition = function(reqObj){

    log.info('call end add new transition');

    if( reqObj.isEmpty != null){
      window.tmpObj = null;
      return;
    }

    var tmpObj = window.tmpObj;

    // clear tmp object
    window.tmpObj = null;
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.removeObj();
    // window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

    for (var key in tmpObj.dots){
      tmpObj.dots[key].leaveObj('tmpObj');
    }


    tmpObj.id = reqObj.id;
    tmpObj.name = reqObj.id;

    // add transition to canvasContainer using tmpObj
    window.storage.canvasContainer.stages[reqObj.floor].transitionLayer.group.add(tmpObj);



  }



  return GeometryManager;
});
