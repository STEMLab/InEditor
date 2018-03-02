/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../Storage/Canvas/Object/Cell.js",
  "../Storage/Geometries/CellGeometry.js",
  "../PubSub/Subscriber.js",
  "../Storage/Dot/Dot.js"
], function(
  Cell,
  CellGeometry,
  Subscriber,
  Dot
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
    this.addCallbackFun('addnewcell', this.addNewCell, this.addNewCell_makeHistoryObj, this.addNewCell_undo);
    this.addCallbackFun('end-addnewcell', this.endAddNewCell, this.endAddNewCell_makeHistoryObj, this.endAddNewCell_undo);
    this.addCallbackFun('canceladdnewcell', this.cancelAddNewCell);

  }

  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.addNewFloor = function(reqObj) {
    window.storage.dotFoolContainer.addNewDotFool(reqObj.floor);
  }


  /**
   * @memberof GeometryManager
   * @deceated
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
  GeometryManager.prototype.addNewCell0 = function(reqObj) {

    // if tmpObj havn't floor data, add floor data in it.
    if (window.tmpObj.floor == null) {

      window.tmpObj.floor = reqObj.floor;
      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.destroyChildren();
      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.add(window.tmpObj.poly, window.tmpObj.corners);

    }

    // add corner
    var point = window.storage.canvasContainer.stages[reqObj.floor].stage.getPointerPosition();
    point.x = point.x - window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.x;
    point.x = point.x / window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleX;

    point.y = point.y - window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.y;
    point.y = point.y / window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleY;

    window.tmpObj.addCorner(point);

    // draw group
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.draw();

  }

  /**
   * @memberof GeometryManager
   * @param {Object} reqObj floor: floor id
   */
  GeometryManager.prototype.addNewCell = function(reqObj) {

    // If this is the first `addnewcell` msg for this cycle, set TmpLayer in stage.
    if (window.storage.canvasContainer.stages[reqObj.floor].tmpLayer == null) {

      window.storage.canvasContainer.stages[reqObj.floor].addTmpObj('cell');
      window.tmpObj.floor = reqObj.floor;

    }

    // add corner
    var point = window.storage.canvasContainer.stages[reqObj.floor].stage.getPointerPosition();
    point.x = point.x - window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.x;
    point.x = point.x / window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleX;

    point.y = point.y - window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.y;
    point.y = point.y / window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleY;


    var isDotExist = window.storage.dotFoolContainer.getDotFool(reqObj.floor).getDotByPoint({
      x: point.x,
      y: point.y
    });
    var dot;

    if (isDotExist == null) {
      var manager = window.broker.getManager('addnewcell', 'GeometryManager');
      var dots = Object.values(window.storage.dotFoolContainer.getDotFool(reqObj.floor).getDots());
      var connections = window.storage.canvasContainer.stages[reqObj.floor].getConnection();

      var snapping = manager.snapping(dots, connections, point);
      dot = new Dot(snapping.x, snapping.y);
      window.storage.dotFoolContainer.getDotFool(reqObj.floor).push(dot);
    } else {
      dot = isDotExist;
    }

    window.tmpObj.addCorner(dot);

    // draw group
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.tmpGroup.draw();

    // log.trace(window.storage.canvasContainer);
    // log.trace(window.storage.dotFoolContainer);

  }

  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.addNewCell_makeHistoryObj = function(reqObj) {

    return reqObj;

  }

  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.addNewCell_undo = function(undoObj) {

    var tmpObj = window.tmpObj;

    tmpObj.deleteLastCorner();
    tmpObj.deleteLastPolyLine();

    window.storage.dotFoolContainer.getDotFool(undoObj.floor).deleteDotFromObj(tmpObj.dots[window.tmpObj.dots.length - 1].uuid, tmpObj.id);
    window.storage.canvasContainer.stages[undoObj.floor].tmpLayer.layer.draw();

  }


  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof GeometryManager
   * @desc draw new cell object in canvas
   */
  GeometryManager.prototype.endAddNewCell0 = function(reqObj) {

    var tmpObj = window.tmpObj;
    window.tmpObj = null;

    tmpObj.id = reqObj.id;
    tmpObj.name = reqObj.id;

    // add cell using tmpObj
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.addNewCell(tmpObj);

    // destroy tmpGroup children
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.destroyChildren();

    // set corner to invisible
    var obj = window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.cells[window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.cells.length - 1];
    obj.corners.visible(false);

    // redraw cellLayer
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.layer.draw();

    //add cell data in geometry canvasContainer
    window.storage.geometryContainer.cellGeometry.push(new CellGeometry(reqObj.id, obj.getPointsOfCorners()));

    // add state


    log.trace(window.storage.canvasContainer);
    log.trace(window.storage.geometryContainer);

  }

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof GeometryManager
   * @desc draw new cell object in canvas
   */
  GeometryManager.prototype.endAddNewCell = function(reqObj) {

    var tmpObj = window.tmpObj;

    // clear tmp obj
    window.tmpObj = null;
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.destroy();
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer = null;

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

    // add cell using tmpObj
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.addNewCell(tmpObj);

    // set corner to invisible
    var obj = window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.cells[window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.cells.length - 1];
    obj.corners.visible(false);

    // redraw cellLayer
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.layer.draw();

    //add cell data in geometry canvasContainer
    window.storage.geometryContainer.cellGeometry.push(new CellGeometry(reqObj.id, obj.dots));

    // add state


    log.trace(window.storage.canvasContainer);
    log.trace(window.storage.dotFoolContainer);
    log.trace(window.storage.geometryContainer);

  }

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof GeometryManager
   * @return cell id
   */
  GeometryManager.prototype.endAddNewCell_makeHistoryObj = function(reqObj) {

    return reqObj;

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
        cells[key].destory(undoObj.floor);

        window.storage.canvasContainer.stages[undoObj.floor].cellLayer.layer.draw();
        cells.splice(key, 1);
      }
    }

    // remove cell in geometryContainer
    cells = window.storage.geometryContainer.cellGeometry;
    for (var key in cells) {
      if (cells[key].id == undoObj.id) {
        cells.splice(key, 1);
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

    // clear tmp obj
    window.tmpObj = null;
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.destroy();
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer = null;

    window.myhistory.history.pop_back();

  }

  /**
   * @memberof GeometryManager
   * @param {Array} Dot[@see Dot] array in same floor.
   * @param {Array} Connection data of this floor. This value is array of Object and it's form is { dot1, dot2 }.
   * @param {Object} { x : coordinate of x, y : coordinate of y }
   * @return {Object} { x : coordinate of x, y : coordinate of y } or null
   */
  GeometryManager.prototype.snapping = function(dots, connections, point) {
    // log.info(dots, connections, point);

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

      function crossProduct(A, B){
        return { x : A.y * B.z - A.z * B.y, y : A.z*B.x - A.x * B.z, z : A.x * B.y - A.y * B.x };
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
        var crossP = crossProduct({x: V1.x, y: V1.y, z: 0}, {x: V3.x, y: V3.y, z: 0});
        var A = Math.sqrt(Math.pow(crossP.x, 2) + Math.pow(crossP.y, 2) + Math.pow(crossP.z, 2));
        var d = A / distanceTo(connections[i].dot1.point, connections[i].dot2.point);

        if (minimum_d > d) {
          var u = Math.pow(distanceTo(connections[i].dot1.point, connections[i].dot2.point),2);

          // new minimum point : dot1 + v3 unit vector * d
          var V3Unit = {
            x: V3.x / u,
            y: V3.y / u
          };

          var dotP = dotProduct(V1, V3);

          log.info(V3Unit.x * dotP, V3Unit.y * dotP);

          minimum_point = {
            x: connections[i].dot1.point.x + V3Unit.x * dotP,
            y: connections[i].dot1.point.y + V3Unit.y * dotP
          };

          log.info("minimum_point updated : ", minimum_point);

          minimum_connection = connections[i];
        }
      }
    }

    return minimum_point;
  }


  return GeometryManager;
});
