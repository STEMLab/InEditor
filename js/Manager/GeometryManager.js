  /**
   * @author suheeeee<lalune1120@hotmail.com>
   */

  define(function(require) {
    "use strict";

    /**
     * @class GeometryManager
     * @augments Subscriber
     */
    function GeometryManager() {

      require('Subscriber').apply(this, arguments);

      this.init();

    }

    GeometryManager.prototype = Object.create(require('Subscriber').prototype);

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.init = function() {
      /**
       * @memberof GeometryManager
       */
      this.name = "GeometryManager";

      this.addCallbackFun("addnewfloor", this.addNewFloor);

      this.addCallbackFun("start-addnewcell", this.startAddNewCell, function() {}, function() {});
      this.addCallbackFun("addnewcell", this.addNewCell, this.drawGeometry_makeHistoryObj, this.addNewCell_undo);
      this.addCallbackFun("end-addnewcell", this.endAddNewCell, this.makeSimpleHistoryObj, this.deleteCell);

      this.addCallbackFun("start-addnewhole", this.startAddNewHole, function() {}, function() {});
      this.addCallbackFun("addnewhole", this.addNewHole, this.drawGeometry_makeHistoryObj, this.addNewCell_undo);
      this.addCallbackFun("end-addnewhole", this.endAddNewHole, function() {}, function() {});

      this.addCallbackFun("start-addnewcellboundary", this.startAddNewCellBoundary, function() {}, function() {});
      this.addCallbackFun("addnewcellboundary", this.addNewCellBoundary, this.addNewCellBoundary_makeHistoryObj, this.addNewCellBoundary_undo);
      this.addCallbackFun("end-addnewcellboundary", this.endAddNewCellBoundary, this.makeSimpleHistoryObj, this.endAddNewCellBoundary_undo);

      this.addCallbackFun("start-addnewhatch", this.startAddNewHatch, function() {}, function() {});
      this.addCallbackFun("addnewhatch", this.addNewHatch, this.drawGeometry_makeHistoryObj, this.addNewCell_undo);
      this.addCallbackFun("end-addnewhatch", this.endAddNewHatch, function() {}, function() {});

      this.addCallbackFun("snapping", this.snappingMousePointer);

      this.addCallbackFun('cancel-addnewcell', this.cancelDrawObj);
      this.addCallbackFun('cancel-addnewcellboundary', this.cancelDrawObj);
      this.addCallbackFun('cancel-addnewtransition', this.cancelDrawObj);
      this.addCallbackFun('cancel-addnewstate', this.cancelDrawObj);
      this.addCallbackFun('cancel-addnewstair', this.cancelDrawStair);
      this.addCallbackFun('cancel-addnewhole', this.cancelDrawObj);
      this.addCallbackFun("cancel-addnewinterlayerconnetction", this.cancelDrawObj);
      this.addCallbackFun('cancel-addnewslantdown', this.cancelDrawObj);
      this.addCallbackFun('cancel-addnewslantup', this.cancelDrawObj);
      //this.addCallbackFun('cancel-addnewslantupdown', this.cancelDrawObj);
      this.addCallbackFun('cancel-addnewhatch', this.cancelDrawObj);

      this.addCallbackFun("start-addnewstate", this.startAddNewState, function() {}, function() {});
      this.addCallbackFun("end-addnewstate", this.endAddNewState, this.makeSimpleHistoryObj, this.endAddNewTransition_undo);

      this.addCallbackFun("start-addnewtransition", this.startAddNewTransition, function() {}, function() {});
      this.addCallbackFun("addnewtransition", this.addNewTransition, this.drawGeometry_makeHistoryObj, this.addNewTransition_undo);
      this.addCallbackFun("end-addnewtransition", this.endAddNewTransition, this.makeSimpleHistoryObj, this.endAddNewTransition_undo);

      this.addCallbackFun("start-addnewstair", this.startAddNewStair, function() {}, function() {});
      this.addCallbackFun("addnewstair", this.addNewStair, this.drawGeometry_makeHistoryObj, this.addNewStair_undo);
      this.addCallbackFun("end-addnewstair", this.endAddNewStair, function() {}, function() {});

      this.addCallbackFun("start-addnewslantdown", this.startAddNewSlantDown, function() {}, function() {});
      this.addCallbackFun("addnewslantdown", this.addNewCell, this.drawGeometry_makeHistoryObj, this.addNewCell_undo);
      this.addCallbackFun("end-addnewslantdown", this.endAddNewSlantDown, this.makeSimpleHistoryObj, this.deleteCell);

      this.addCallbackFun("start-addnewslantup", this.startAddNewSlantDown, function() {}, function() {});
      this.addCallbackFun("addnewslantup", this.addNewCell, this.drawGeometry_makeHistoryObj, this.addNewCell_undo);
      this.addCallbackFun("end-addnewslantup", this.endAddNewSlantUp, this.makeSimpleHistoryObj, this.deleteCell);

      this.addCallbackFun("start-addnewslantupdown", this.startAddNewSlantDown, function() {}, function() {});
      this.addCallbackFun("addnewslantupdown", this.addNewCell, this.drawGeometry_makeHistoryObj, this.addNewCell_undo);
      this.addCallbackFun("end-addnewslantupdown", this.endAddNewSlantUpDown, this.makeSimpleHistoryObj, this.deleteCell);

      this.addCallbackFun("start-addnewinterlayerconnetction", this.startAddNewInterConnetction, function() {}, function() {});
      this.addCallbackFun("addnewinterlayerconnetction", this.addNewInterConnetction, this.drawGeometry_makeHistoryObj, this.addNewInterConnetction_undo);
      this.addCallbackFun("end-addnewinterlayerconnetction", this.endAddNewInterConnetction, function() {}, function() {});

      this.addCallbackFun("modifyline", this.modifyLine);
      this.addCallbackFun("start-modifypoint", this.startModifyPoint, function() {}, function() {});
      this.addCallbackFun("modifypoint", this.modifyPoint, function() {}, function() {});
      this.addCallbackFun("end-modifypoint", this.endModifyPoint, function() {}, function() {});

      this.addCallbackFun("deletecell", this.deleteCell);
      this.addCallbackFun('deletecellboundary', this.deleteCellBoundary);
      this.addCallbackFun("deletestate", this.deleteState);
      this.addCallbackFun('deletetransition', this.deleteTransition);

      this.addCallbackFun("rotateslant", this.rotateSlant);

      // this.addCallbackFun("addcellsfromgml", this.addCellsFromGML);
      // this.addCallbackFun('addcellboundariesfromgml', this.addCellBoundariesFromGML);

      this.addCallbackFun('addobjectfromgml', this.addobjectFromGML);
    };

    /**
     * @memberof GeometryManager
     * @desc just return input parameter(reqObj)
     */
    GeometryManager.prototype.makeSimpleHistoryObj = function(reqObj) {
      return reqObj;
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.addNewFloor = function(reqObj) {
      require('Storage').getInstance().getDotPoolContainer().addNewDotPool(reqObj.floor);
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.startAddNewCell = function(reqobj) {
      var Cell = require('CanvasObject').CELL_SPACE;
      var tmpObj = new Cell("tmpObj");
      tmpObj.type = "cell";
      window.tmpObj = tmpObj;
    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor: floor id
     */
    GeometryManager.prototype.addNewCell = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();

      if (canvasContainer.stages[reqObj.floor].tmpLayer.group.obj == null) {
        canvasContainer.stages[reqObj.floor].tmpLayer.group.addNewObj("cell");
        window.tmpObj.floor = reqObj.floor;
      }

      // add corner
      var point =
        canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor.coor;

      var isDotExist = dotPoolContainer
        .getDotPool(reqObj.floor)
        .getDotByPoint({
          x: point.x,
          y: point.y
        });

      var dot;

      if (isDotExist == null) {
        var Dot = require('Dot');
        dot = new Dot(point.x, point.y);
        dotPoolContainer.getDotPool(reqObj.floor).push(dot);
      } else {
        dot = isDotExist;
      }

      window.tmpObj.addCorner(dot);


      var manager = require('Broker').getInstance().getManager("end-addnewcell", "GeometryManager");

      // draw group
      canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

    };

    /**
     * @memberof GeometryManager
     * @param reqObj floor
     */
    GeometryManager.prototype.drawGeometry_makeHistoryObj = function(reqObj) {
      var uuid = window.tmpObj.getLastDot != undefined ?
        window.tmpObj.getLastDot().uuid : null;
      return {
        floor: reqObj.floor,
        uuid: uuid
      };
    };

    /**
     * @memberof GeometryManager
     * @param undoObj last dot of tmpObj
     */
    GeometryManager.prototype.addNewCell_undo = function(undoObj) {
      var tmpObj = window.tmpObj;

      tmpObj.deleteLastCorner();
      tmpObj.deleteLastPolyLine();

      require('Storage').getInstance().getDotPoolContainer()
        .getDotPool(undoObj.floor)
        .deleteDotFromObj(undoObj.uuid, tmpObj.id);
      require('Storage').getInstance().getCanvasContainer().stages[undoObj.floor].tmpLayer.layer.draw();
    };

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
      var manager = require('Broker').getInstance().getManager("end-addnewcell", "GeometryManager");
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      if (manager.isSelfIntersecting(tmpObj)) {
        var req = 'cancel-addnewcell';
        if (tmpObj.slant != null) {
          if (tmpObj.slant.direction === 'up') req = 'cancel-addnewslantup';
          else if (tmpObj.slant.direction === 'down') req = 'cancel-addnewslantdown';
        }

        require('Broker').getInstance().publish({
          req: req,
          reqObj: {
            'floor': reqObj.floor
          }
        });

        require('Conditions').getInstance().LAST_CELL_ID_NUM--;
        require('Popup')('error', 'INVALID POLYGON', 'The polygon must not be self intersected.')

        return false;
      }

      if (manager.isOverlaped(tmpObj)) {
        var req = 'cancel-addnewcell';
        if (tmpObj.slant != null) {
          if (tmpObj.slant.direction === 'up') req = 'cancel-addnewslantup';
          else if (tmpObj.slant.direction === 'down') req = 'cancel-addnewslantdown';
        }
        require('Broker').getInstance().publish({
          req: req,
          reqObj: {
            'floor': reqObj.floor
          }
        });

        require('Conditions').getInstance().LAST_CELL_ID_NUM--;
        require('Popup')('error', 'INVALID POLYGON', 'Polygons on the same layer should not overlap each other.')

        return false;
      }

      // clear tmp obj
      window.tmpObj = null;
      canvasContainer.stages[
        reqObj.floor
      ].tmpLayer.group.removeObj();

      for (var key in tmpObj.dots) {
        tmpObj.dots[key].leaveObj("tmpObj");
      }

      if (tmpObj.dots.length < 3)
        return false;

      tmpObj.id = reqObj.id;
      tmpObj.name = reqObj.id;

      if (!require('DotMath').isCCWByDots(tmpObj.dots)) tmpObj.dots.reverse();

      // add cell to canvasContainer using tmpObj
      canvasContainer.stages[reqObj.floor].cellLayer.group.add(
        tmpObj
      );

      // fragmenteGeometry

      // set corner to invisible
      var obj =
        canvasContainer.stages[reqObj.floor].cellLayer.group.cells[
          canvasContainer.stages[reqObj.floor].cellLayer.group
          .cells.length - 1
        ];
      obj.corners.visible(false);

      //add cell data in geometry canvasContainer
      var CellGeometry = require('Geometry').CELL_SPACE;
      require('Storage').getInstance().getGeometryContainer().cellGeometry.push(
        new CellGeometry(reqObj.id, obj.dots)
      );

      // add state if there if conditions.automGenerateState is true
      if (require('Conditions').getInstance().automGenerateState) {
        var manager = require('Broker').getInstance().getManager(
          "end-addnewcell",
          "GeometryManager"
        );
        manager.generateStateUsingCell(tmpObj, reqObj.floor);
      }

      // redraw stage
      canvasContainer.stages[reqObj.floor].stage.draw();
    };

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
      var intersection;
      try {
        intersection = centroid.intersection(cell).getCoordinates();
      } catch (e) {
        log.error("can't auto generating state of " + tmpObj.id, e);
        return false;
      }

      var d = 87465132;
      var data = [];

      var StateGeometry = require('Geometry').STATE;
      var geometryContainer = require('Storage').getInstance().getGeometryContainer();
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();

      function setState() {
        var Dot = require('Dot');
        var centroidDot = new Dot(intersection[0].x, intersection[0].y);

        var stateId =
          require('Conditions').getInstance().pre_state + ++require('Conditions').getInstance().LAST_STATE_ID_NUM;
        require('Storage').getInstance().getCanvasContainer().stages[
          floor
        ].stateLayer.group.makeNewStateAndAdd(stateId, centroidDot);

        dotPoolContainer.getDotPool(floor).push(centroidDot);

        geometryContainer.stateGeometry.push(
          new StateGeometry(stateId, centroidDot)
        );
      }

      if (intersection.length == 0) {
        for (var i = 0; i < tmpObj.dots.length; i++) {
          data.push(tmpObj.dots[i].point.x, tmpObj.dots[i].point.y);
        }

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status == 200) {
            var triangles = JSON.parse(xhr.responseText);

            for (var i = 0; i < triangles.length; i += 3) {
              // log.info(i, i + 1, i + 2);
              var partOfCellWKT =
                "POLYGON (( " +
                tmpObj.dots[triangles[i]].point.x +
                " " +
                tmpObj.dots[triangles[i]].point.y +
                ", ";
              partOfCellWKT +=
                tmpObj.dots[triangles[i + 1]].point.x +
                " " +
                tmpObj.dots[triangles[i + 1]].point.y +
                ", ";
              partOfCellWKT +=
                tmpObj.dots[triangles[i + 2]].point.x +
                " " +
                tmpObj.dots[triangles[i + 2]].point.y +
                ", ";
              partOfCellWKT +=
                tmpObj.dots[triangles[i]].point.x +
                " " +
                tmpObj.dots[triangles[i]].point.y +
                "))";
              var partOfCell = reader.read(partOfCellWKT);
              intersection = partOfCell
                .intersection(cell)
                .getCentroid()
                .getCoordinates();

              if (intersection.length == 1) {
                var tmpD = Math.sqrt(
                  Math.abs(Math.pow(realCentroid.x - intersection[0].x, 2)) +
                  Math.abs(Math.pow(realCentroid.y - intersection[0].y, 2))
                );
                if (tmpD < d) d = tmpD;
              }
            }

            // log.info(intersection);

            setState();
          }
        };

        xhr.open("POST", "http://127.0.0.1:5757/triangulate", false);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
      } else {

        if (tmpObj.slant != null && tmpObj.slant.direction == 'down') {
          var y_offset = (tmpObj.dots[2].point.y - tmpObj.dots[1].point.y) / 4;
          var x_offset = (tmpObj.dots[2].point.x - tmpObj.dots[0].point.x) / 4;

          intersection[0].x = tmpObj.dots[2].point.x - x_offset;
          intersection[0].y = tmpObj.dots[2].point.y - y_offset;

        } else if (tmpObj.slant != null && tmpObj.slant.direction == 'up') {
          var x_offset = (tmpObj.dots[2].point.x - tmpObj.dots[0].point.x) / 4;
          var y_offset = (tmpObj.dots[2].point.y - tmpObj.dots[1].point.y) / 4;

          intersection[0].x = tmpObj.dots[0].point.x + x_offset;
          intersection[0].y = tmpObj.dots[0].point.y + y_offset;
        }

        setState();
      }
    };

    /**
     * @param {Object} undoObj id<br>floor: floor id
     * @memberof GeometryManager
     * @desc Remove cell object in canvasContainer which id is undoObj.id
     */
    GeometryManager.prototype.endAddNewCell_undo = function(undoObj) {
      // remove  cell in canvasContainer
      require('Broker').getInstance().getManager("end-addnewcell", "GeometryManager").deleteCell(undoObj);

      // ask remove state or not
    };


    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.startAddNewHole = function(reqobj) {
      var Hole = require('CanvasObject').HOLE;
      var tmpObj = new Hole("tmpObj");
      tmpObj.type = "hole";
      window.tmpObj = tmpObj;

    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor: floor id
     */
    GeometryManager.prototype.addNewHole = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      if (canvasContainer.stages[reqObj.floor].tmpLayer.group.obj == null) {
        var selectedCell = require('Broker').getInstance().getManager('addnewhole', 'GeometryManager').isCellSelected(reqObj.floor);
        if (selectedCell.length == 0) return false;

        canvasContainer.stages[reqObj.floor].tmpLayer.group.addNewObj("hole");
        window.tmpObj.floor = reqObj.floor;
        window.tmpObj.setHoleOf(selectedCell[0]);

        var manager = require('Broker').getInstance().getManager('start-addnewtransition', 'UIManager');
        manager.setTooltipText({
          text: ''
        });
        return reqObj;

      } else {
        // add corner
        var point = canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor.coor;

        var isDotExist = require('Storage').getInstance().getDotPoolContainer()
          .getDotPool(reqObj.floor)
          .getDotByPoint({
            x: point.x,
            y: point.y
          });

        var dot;

        if (isDotExist == null) {
          var Dot = require('Dot');
          dot = new Dot(point.x, point.y);
          require('Storage').getInstance().getDotPoolContainer().getDotPool(reqObj.floor).push(dot);
        } else {
          dot = isDotExist;
        }

        window.tmpObj.addCorner(dot);
        window.tmpObj.setFillColor('#FFFFFF');

        // draw group
        canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
      }


    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.isCellSelected = function(floor) {
      var reader = new jsts.io.WKTReader();
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      var pointCoor = canvasContainer.stages[floor].tmpLayer.group.cursor.coor;
      var point = reader.read('POINT(' + pointCoor.x + ' ' + pointCoor.y + ')');

      var cells = canvasContainer.stages[floor].cellLayer.group.getCells();
      var result = [];
      for (var i in cells) {

        var cell = reader.read(cells[i].getWKT());
        //var intersection = point.intersection(cell).getCoordinates();
        var contains = cell.contains(point);
        if (cell.contains(point)) result.push(cells[i].id);

      }

      var holes = canvasContainer.stages[floor].cellLayer.group.getHoles();
      for (var i in holes) {

        var hole = reader.read(holes[i].getWKT());
        //var intersection = point.intersection(hole).getCoordinates();
        var contains = cell.contains(hole);
        if (result.indexOf(holes[i].holeOf) != -1 && !contains) result.splice(result.indexOf(holes[i].holeOf), 1);

      }

      return result;
    }


    GeometryManager.prototype.isThisTypeObjectSeleted = function(type, floor) {
      var reader = new jsts.io.WKTReader();
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      var pointCoor = canvasContainer.stages[floor].tmpLayer.group.cursor.coor;
      var point = reader.read('POINT(' + pointCoor.x + ' ' + pointCoor.y + ')');

      var objects;
      if (type == 'cell') objects = canvasContainer.stages[floor].cellLayer.group.getCells();
      else if (type == 'cellBoundary') objects = canvasContainer.stages[floor].cellBoundaryLayer.group.getObjects();
      else if (type == 'transition') objects = canvasContainer.stages[floor].transitionLayer.group.getObjects();
      else if (type == 'state') {
        var isDotExist = require('Storage').getInstance().getDotPoolContainer().getDotPool(floor).getDotByPoint({
          x: pointCoor.x,
          y: pointCoor.y
        });

        if (isDotExist == null) return [];
        else return [Object.keys(isDotExist.memberOf)[0]];
      }

      var result = [];

      for (var o of objects) {
        var obj = reader.read(o.getWKT());
        if (type == 'cellBoundary' || type == 'transition') {
          if (point.distance(obj) < require('Conditions').getInstance().realSnappingThreshold) result.push(o.id);
        } else {
          var intersection = [];
          try {
            intersection = point.intersection(obj).getCoordinates();
          } catch (err) {
            // do nothing
          }
          if (intersection.length != 0) result.push(o.id);
        }
      }

      if (type == 'cell') {
        var holes = canvasContainer.stages[floor].cellLayer.group.getHoles();
        for (var i in holes) {

          var hole = reader.read(holes[i].getWKT());
          var intersection = point.intersection(hole).getCoordinates();
          if (intersection.length != 0 && result.indexOf(holes[i].holeOf) != -1) result.splice(result.indexOf(holes[i].holeOf), 1);

        }
      }

      return result;
    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.isStateSelected = function(floor) {
      var reader = new jsts.io.WKTReader();

      var point = require('Storage').getInstance().getCanvasContainer().stages[floor].tmpLayer.group.cursor.coor;
      var isDotExist = require('Storage').getInstance().getDotPoolContainer().getDotPool(floor).getDotByPoint({
        x: point.x,
        y: point.y
      });

      if (isDotExist == null) return [];
      else return [Object.keys(isDotExist.memberOf)[0]];
    }

    GeometryManager.prototype.isTransitionSeleted = function(floor) {
      var reader = new jsts.io.WKTReader();
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      var pointCoor = canvasContainer.stages[floor].tmpLayer.group.cursor.coor;
      var point = reader.read('POINT(' + pointCoor.x + ' ' + pointCoor.y + ')');

      var transitions = canvasContainer.stages[floor].transitionLayer.group.getTransitions();
      log.warn('isTransitionSeleted not completed!')
    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.isObjectSelected = function(floor) {
      var manager = require('Broker').getInstance().getManager("end-addnewcell", "GeometryManager");

      var type = 'state';
      var result = manager.isThisTypeObjectSeleted(type, floor);

      if (result.length == 0) {
        type = 'transition';
        result = manager.isThisTypeObjectSeleted(type, floor);
      }

      if (result.length == 0) {
        type = 'cellBoundary';
        result = manager.isThisTypeObjectSeleted(type, floor);
      }

      if (result.length == 0) {
        type = 'cell';
        result = manager.isThisTypeObjectSeleted(type, floor);
      }

      if (result.length == 0) {
        result = [floor]
        type = 'floor';
      }

      return {
        result: result,
        type: type
      };
    }


    /**
     * @param {Object} reqObj id<br>floor: floor id
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewHole = function(reqObj) {
      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      var tmpObj = window.tmpObj;
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      function cancel() {
        require('Broker').getInstance().publish({
          req: 'cancel-addnewhole',
          reqObj: {
            'floor': reqObj.floor
          }
        });
        require('Conditions').getInstance().LAST_HOLE_ID_NUM--;
      }

      // Twisted side validation
      if (require('Broker').getInstance()
        .getManager("end-addnewcell", "GeometryManager")
        .isSelfIntersecting(tmpObj)
      ) {
        cancel();
        require('Popup')('error', 'INVALID POLYGON', 'The polygon must not be self intersected.')
        return false;
      }

      function getWKT(dots) {
        var wkt = "POLYGON ((";
        for (var i = 0; i < dots.length; i++)
          wkt += dots[i].point.x + " " + dots[i].point.y + ", ";
        wkt += dots[0].point.x + " " + dots[0].point.y + "))";
        return wkt;
      }

      function isHolesOverlaped(cellId, dots) {
        let holes = require('Storage').getInstance().getGeometryContainer()
          .holeGeometry.filter(h => h.holeOf === cellId);
        var reader = new jsts.io.WKTReader();
        var currentHole = reader.read(getWKT(dots));
        var flag = false;

        holes.forEach(h => {
          var tmpHole = reader.read(getWKT(h.points));
          if (!flag && currentHole.overlaps(tmpHole)) flag = true;
        })

        return flag;
      }

      if (isHolesOverlaped(tmpObj.holeOf, tmpObj.dots)) {
        cancel();
        require('Popup')('error', 'INVALID POLYGON', 'Holes on the same CellSpace should not overlap each other.')
        return false;
      }

      // clear tmp obj
      window.tmpObj = null;
      canvasContainer.stages[
        reqObj.floor
      ].tmpLayer.group.removeObj();

      tmpObj.setFillColor('#FFFFFF');

      for (var key in tmpObj.dots) {
        tmpObj.dots[key].leaveObj("tmpObj");
      }

      tmpObj.id = reqObj.id;
      tmpObj.name = reqObj.id;

      var v1 = require('DotMath').getVector(tmpObj.dots[0], tmpObj.dots[1]);
      v1['z'] = 0;
      var v2 = require('DotMath').getVector(tmpObj.dots[1], tmpObj.dots[2]);
      v2['z'] = 0;
      var crossProduct = require('DotMath').crossProduct(v1, v2);
      if (crossProduct.z > 0) tmpObj.dots.reverse();

      // add cell to canvasContainer using tmpObj
      canvasContainer.stages[reqObj.floor].cellLayer.group.addHole(
        tmpObj
      );

      // set corner to invisible
      var obj =
        canvasContainer.stages[reqObj.floor].cellLayer.group.holes[
          canvasContainer.stages[reqObj.floor].cellLayer.group
          .holes.length - 1
        ];
      obj.corners.visible(false);

      //add cell data in geometry canvasContainer
      var HoleGeometry = require('Geometry').HOLE;
      require('Storage').getInstance().getGeometryContainer().holeGeometry.push(
        new HoleGeometry(reqObj.id, obj.dots, obj.holeOf)
      );

      // redraw stage
      canvasContainer.stages[reqObj.floor].stage.draw();
    };


    /**
     * @memberof GeometryManager
     * @param {Array} Array of dots. Assume that you create a face by connecting the lines in sequence to the array.
     * @return {Boolean}
     */
    GeometryManager.prototype.isSelfIntersecting = function(tmpObj) {
      var wkt = tmpObj.getWKT();
      var reader = new jsts.io.WKTReader();
      var cell = reader.read(wkt);

      var validator = new jsts.operation.IsSimpleOp(cell._shell);
      if (validator.isSimpleLinearGeometry(cell._shell))
        return false;

      var graph = new jsts.geomgraph.GeometryGraph(0, cell._shell);
      var cat = new jsts.operation.valid.ConsistentAreaTester(graph);
      var r = cat.isNodeConsistentArea();

      return !r;
    };

    GeometryManager.prototype.isOverlaped = function(tmpObj) {
      var wkt = tmpObj.getWKT();
      var reader = new jsts.io.WKTReader();
      var target = reader.read(wkt);
      var propertyContainer = require('Storage').getInstance().getPropertyContainer();
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var cells;

      if (tmpObj.floor === undefined) {
        var layer = propertyContainer.getFloorById('cell', tmpObj.id);
        cells = canvasContainer.stages[layer].cellLayer.group.cells;
      } else
        cells = canvasContainer.stages[tmpObj.floor].cellLayer.group.cells;

      if (cells.length < 1) return false;
      for (var cell of cells) {
        if(cell.id === tmpObj.id) continue;

        let tmpJstsObj = reader.read(cell.getWKT());
        let intersection = target.intersection(tmpJstsObj);
        if (intersection.getCoordinates().length > 2 && target.overlaps(tmpJstsObj)) { // intersection area is polygon
          if (tmpObj.slant === null) return true;
          else if(require('History').getInstance().getPreviousMsg() === 'addnewslantupdown' &&
                  tmpObj.slant != null && tmpObj.slant.direction === 'down') return true;
          ////////////////////////////////
        }
      }

      return false;
    }

    /**
     * @param {Object} reqObj floor
     * @memberof GeometryManager
     * @desc set tmpObj to null
     */
    GeometryManager.prototype.cancelDrawObj = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();

      if (reqObj.floor != undefined) {
        for (var key in window.tmpObj.dots) {
          dotPoolContainer
            .getDotPool(reqObj.floor)
            .deleteDotFromObj(window.tmpObj.dots[key].uuid, "tmpObj");
        }

        canvasContainer.stages[
          reqObj.floor
        ].tmpLayer.group.removeObj();
        canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
      }

      // clear tmp obj
      window.tmpObj = null;

      require('History').getInstance().cancelCycle();
    };

    /**
     * @memberof GeometryManager
     * @param {Array} Dot array in same floor.
     * @param {Array} Connection data of this floor. This value is array of Object and it's form is { dot1, dot2 }.
     * @param {Object} { x : coordinate of x, y : coordinate of y }
     * @return {Object} { x : coordinate of x, y : coordinate of y } or null
     */
    GeometryManager.prototype.snapping = function(dots, connections, point) {
      var minimum_d = require('Conditions').getInstance().realSnappingThreshold;
      var minimum_connection = null;
      var minimum_point = point;

      for (var i = 0; connections.length > i; i++) {
        function distanceTo(A, B) {
          return Math.sqrt(
            Math.pow(Math.abs(A.x - B.x), 2) + Math.pow(Math.abs(A.y - B.y), 2)
          );
        }

        function dotProduct(A, B) {
          return A.x * B.x + A.y * B.y;
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
          var A = Math.sqrt(
            Math.pow(crossP.x, 2) + Math.pow(crossP.y, 2) + Math.pow(crossP.z, 2)
          );
          var d =
            A / distanceTo(connections[i].dot1.point, connections[i].dot2.point);

          if (minimum_d > d) {
            var u = Math.pow(
              distanceTo(connections[i].dot1.point, connections[i].dot2.point),
              2
            );

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

      return {
        point: minimum_point,
        line: minimum_connection
      };
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.startAddNewCellBoundary = function(reqObj) {
      var CellBoundary = require('CanvasObject').CELL_SPACE_BOUNDARY;
      var tmpObj = new CellBoundary("tmpObj");
      tmpObj.type = "cellBoundary";
      window.tmpObj = tmpObj;
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.addNewCellBoundary = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();

      if (
        canvasContainer.stages[reqObj.floor].tmpLayer.group.obj ==
        null
      ) {
        canvasContainer.stages[
          reqObj.floor
        ].tmpLayer.group.addNewObj("cellBoundary");
        window.tmpObj.floor = reqObj.floor;
      }

      var point =
        canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor
        .coor;

      var isDotExist = dotPoolContainer
        .getDotPool(reqObj.floor)
        .getDotByPoint({
          x: point.x,
          y: point.y
        });

      var dot;

      if (isDotExist == null) {
        var Dot = require('Dot');
        dot = new Dot(point.x, point.y);
        dotPoolContainer.getDotPool(reqObj.floor).push(dot);
      } else {
        dot = isDotExist;
      }

      if (window.tmpObj.dots.length == 0) {
        window.tmpObj.addCorner(dot);
        canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

        // find all cell contain this dot and save it
        var manager = require('Broker').getInstance().getManager(
          "addnewcellboundary",
          "GeometryManager"
        );

        var cells = canvasContainer.stages[reqObj.floor].cellLayer.group.getCells();
        var holes = canvasContainer.stages[reqObj.floor].cellLayer.group.getHoles();
        var objects = cells.concat(holes);
        var lines = manager.findAllLinesContainThePoint(point, objects);

        window.tmpObj.associationCell = lines;
      } else {
        function copyObj(obj) {
          var copy = {};
          if (typeof obj === "object" && obj !== null) {
            for (var attr in obj) {
              if (obj.hasOwnProperty(attr)) {
                copy[attr] = copyObj(obj[attr]);
              }
            }
          } else {
            copy = obj;
          }
          return copy;
        }

        var save = copyObj(window.tmpObj.associationCell);

        for (var key in window.tmpObj.associationCell) {
          var lines = window.tmpObj.associationCell[key];

          for (var i = 0; i < lines.length; i++) {
            if (!require('DotMath').isLineContainDot(lines[i], dot)) {
              window.tmpObj.associationCell[key].splice(i, 1);
              i--;

              if (lines.length == 0) delete window.tmpObj.associationCell[key];
            }
          }
        }

        if (Object.keys(window.tmpObj.associationCell) != 0) {
          var line = Object.values(window.tmpObj.associationCell)[0][0];
          if (require('DotMath').isLineContainDot(line, dot)) {
            window.tmpObj.addCorner(dot);
            canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
          } else {
            dotPoolContainer.getDotPool()[reqObj.floor].deleteDot(dot.uuid);
            require('Popup')('warning', 'INVALID POINT', 'The selected point does not exist on the same line <br>as the other points contained in this cellspaceBoundary.')
          }
        } else {
          window.tmpObj.associationCell = save;

          if (Object.keys(window.tmpObj.associationCell).length === 2) {
            dotPoolContainer.getDotPool()[reqObj.floor].deleteDot(dot.uuid);
            require('Popup')('warning', 'INVALID POINT', 'The selected point does not exist on the same line <br>as the other points contained in this cellspaceBoundary.')
          } else {
            var line = Object.values(window.tmpObj.associationCell)[0][0];
            if (require('DotMath').isLineContainDot(line, dot)) {
              window.tmpObj.addCorner(dot);
              canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
            } else {
              dotPoolContainer.getDotPool()[reqObj.floor].deleteDot(dot.uuid);
              require('Popup')('warning', 'INVALID POINT', 'The selected point does not exist on the same line <br>as the other points contained in this cellspaceBoundary.')
            }
          }
        }
      }
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.findAllLinesContainThePoint = function(point, cells) {
      var result = {};

      for (var key in cells) {
        var isPartOf = cells[key].isPartOf(point);
        if (isPartOf.length != 0) result[cells[key].id] = isPartOf;
      }

      return result;
    };

    /**
     * @memberof GeometryManager
     * @param undoObj floor, uuid of last dot
     */
    GeometryManager.prototype.addNewCellBoundary_undo = function(undoObj) {
      var tmpObj = window.tmpObj;

      tmpObj.removeDot(undoObj.uuid);
      tmpObj.associationCell = undoObj.cells;

      require('Storage').getInstance().getDotPoolContainer()
        .getDotPool(undoObj.floor)
        .deleteDotFromObj(undoObj.uuid, tmpObj.id);
      require('Storage').getInstance().getCanvasContainer().stages[undoObj.floor].tmpLayer.layer.draw();
    };

    /**
     * @memberof GeometryManager
     * @param reqObj floor
     */
    GeometryManager.prototype.addNewCellBoundary_makeHistoryObj = function(reqObj) {
      function copyObj(obj) {
        var copy = {};
        if (typeof obj === "object" && obj !== null) {
          for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
              copy[attr] = copyObj(obj[attr]);
            }
          }
        } else {
          copy = obj;
        }
        return copy;
      }

      return {
        floor: reqObj.floor,
        uuid: window.tmpObj.getLastDot().uuid,
        associationCell: copyObj(window.tmpObj.associationCell)
      };
    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj { id, floor, isEmpty }
     */
    GeometryManager.prototype.endAddNewCellBoundary = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      function copyObj(obj) {
        var copy = {};
        if (typeof obj === "object" && obj !== null) {
          for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
              copy[attr] = copyObj(obj[attr]);
            }
          }
        } else {
          copy = obj;
        }
        return copy;
      }

      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      var tmpObj = window.tmpObj;
      tmpObj.associationCell = copyObj(window.tmpObj.associationCell);

      // clear tmp obj
      //window.tmpObj = null;
      canvasContainer.stages[reqObj.floor].tmpLayer.group.removeObj();
      canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

      for (var key in tmpObj.dots) {
        tmpObj.dots[key].leaveObj("tmpObj");
      }

      tmpObj.id = reqObj.id;
      tmpObj.name = reqObj.id;

      // add cellboundary using tmpObj
      canvasContainer.stages[reqObj.floor].cellBoundaryLayer.group.add(tmpObj);

      // 셀이 3개 라인이 2개인 경우의 예외처리 필요 *************************************************************************************************
      // add dots in cellboundary to cells
      var associationCells = tmpObj.associationCell;
      var geometryContainer = require('Storage').getInstance().getGeometryContainer();
      for (var key in associationCells) {
        var cell = canvasContainer.stages[
          reqObj.floor
        ].getElementById("cell", key);
        var reverse = cell.insertLineIntoLine(associationCells[key][0], tmpObj.dots);

        // update geometryContainer
        if (cell.holeOf == undefined)
          geometryContainer.getElementById("cell", key).updatePoints(cell.getDots());

      }

      // set corner to invisible
      var obj =
        canvasContainer.stages[reqObj.floor].cellBoundaryLayer.group.cellBoundaries[
          canvasContainer.stages[reqObj.floor].cellBoundaryLayer.group.cellBoundaries.length - 1];
      obj.setCornersVisible(false);

      canvasContainer.stages[reqObj.floor].stage.draw();

      //add cellBoundary data in geometry canvasContainer
      var CellBoundaryGeometry = require('Geometry').CELL_SPACE_BOUNDARY;
      geometryContainer.cellBoundaryGeometry.push(
        new CellBoundaryGeometry(reqObj.id, reverse ? obj.dots.reverse() : obj.dots)
      );
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewCellBoundary_undo = function(undoObj) {
      require('Broker').getInstance().getManager("end-addnewcell", "GeometryManager").deleteCellBoundary(undoObj);
    };

    GeometryManager.prototype.deleteCellBoundary = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();

      // remove cellboundary in canvasContainer
      var cellboundaries =
        canvasContainer.stages[reqObj.floor].cellBoundaryLayer
        .group.cellBoundaries;

      for (var key in cellboundaries) {
        if (cellboundaries[key].id == reqObj.id) {
          cellboundaries[key].destroy();

          // free dot from object
          for (var dotkey in cellboundaries[key].dots) {
            dotPoolContainer
              .getDotPool(reqObj.floor)
              .deleteDotFromObj(
                cellboundaries[key].dots[dotkey].uuid,
                cellboundaries[key].id
              );
          }

          // redraw canvas
          canvasContainer.stages[reqObj.floor].cellBoundaryLayer.layer.draw();
          cellboundaries.splice(key, 1);

          break;
        }
      }

      // remove cell in geometryContainer
      cellboundaries = require('Storage').getInstance().getGeometryContainer().cellBoundaryGeometry;
      for (var key in cellboundaries) {
        if (cellboundaries[key].id == reqObj.id) {
          cellboundaries.splice(key, 1);
          break;
        }
      }
    }

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor, point
     */
    GeometryManager.prototype.snappingMousePointer = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();

      var point = reqObj.point;
      point.x = point.x - canvasContainer.stages[reqObj.floor].stage.attrs.x;
      point.x = point.x / canvasContainer.stages[reqObj.floor].stage.attrs.scaleX;

      point.y = point.y - canvasContainer.stages[reqObj.floor].stage.attrs.y;
      point.y = point.y / canvasContainer.stages[reqObj.floor].stage.attrs.scaleY;

      var isDotExist = null;
      if (require('History').getInstance().getPreviousMsg() == 'modifypoint') {
        isDotExist = dotPoolContainer
          .getDotPool(reqObj.floor)
          .getDotByPointaAllowDuplication({
            x: point.x,
            y: point.y
          });

        if (isDotExist != null && isDotExist.length == 2) {
          isDotExist.splice(isDotExist.indexOf(window.tmpObj), 1)
          isDotExist = isDotExist[0];
        } else if (isDotExist != null && isDotExist.length == 1) {
          isDotExist = isDotExist[0];
        }

      } else {
        isDotExist = dotPoolContainer
          .getDotPool(reqObj.floor)
          .getDotByPoint({
            x: point.x,
            y: point.y
          });
      }

      var newPoint;
      var snappingData = {
        isSnapped: false,
        snapedObj: {
          type: "",
          obj: null
        }
      };

      if (isDotExist == null) {
        var manager = require('Broker').getInstance().getManager("snapping", "GeometryManager");
        var dots = Object.values(
          dotPoolContainer.getDotPool(reqObj.floor).getDots()
        );
        var connections = canvasContainer.stages[reqObj.floor].getConnection();
        var snapping = manager.snapping(dots, connections, point);

        newPoint = snapping.point;

        if (snapping.line != null) {
          snappingData = {
            isSnapped: true,
            snapedObj: {
              type: "line",
              obj: snapping.line
            }
          };
        }
      } else {
        newPoint = isDotExist.point;

        snappingData = {
          isSnapped: true,
          snapedObj: {
            type: "point",
            obj: isDotExist
          }
        };
      }

      var cursor = canvasContainer.stages[reqObj.floor].tmpLayer.group.getCursor();

      cursor.setCoor(newPoint);
      cursor.setVisible(true);
      canvasContainer.stages[reqObj.floor].tmpLayer.group.setCursorData(snappingData);
      canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
    };

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
      var result = [];

      for (i = 0; i < len && !partof.result; i++) {
        partof = cells[i].isPartOf(point);
        if (partof.result)
          result.push({
            line: {
              dot1: partof.connection.dot1,
              dot2: partof.connection.dot2
            },
            cells: []
          });
      }

      // if point is not on a line, return null
      if (result == null) return null;

      // find other cell contain this line
      var candidateCells = result.line.dot1.memberOf;
      for (var key in candidateCells) {
        if (
          candidateCells[key] == "cell" &&
          result.line.dot2.memberOf[key] != null
        ) {
          result.cells.push(key);
        }
      }

      return result;
    };

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

      var cos =
        (V1.x * V2.x + V1.y * V2.y) /
        (Math.sqrt(Math.pow(V1.x, 2) + Math.pow(V1.y, 2)) *
          Math.sqrt(Math.pow(V2.x, 2) + Math.pow(V2.y, 2)));
      var threshold = 0.0000001;

      if (!(1 - threshold <= cos && cos <= 1 + threshold) ||
        !(-1 - threshold <= cos && cos <= -1 + threshold)
      )
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
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.startAddNewTransition = function(reqObj) {
      var Transition = require('CanvasObject').TRANSITION;
      var tmpObj = new Transition("tmpObj");
      tmpObj.type = "transition";
      window.tmpObj = tmpObj;
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.addNewTransition = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();

      if (
        canvasContainer.stages[reqObj.floor].tmpLayer.group.obj ==
        null
      ) {
        canvasContainer.stages[
          reqObj.floor
        ].tmpLayer.group.addNewObj("transition");
        window.tmpObj.floor = reqObj.floor;
      }

      // get  coordinate
      var point =
        canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor
        .coor;

      var isDotExist = dotPoolContainer
        .getDotPool(reqObj.floor)
        .getDotByPoint({
          x: point.x,
          y: point.y
        });

      if (isDotExist != null && tmpObj.dots.length <= 1 && isDotExist.isState()) {
        window.tmpObj.addState(isDotExist);
        // isDotExist.participateObj('tmpObj', 'transition');

        if (tmpObj.dots.length == 2) {
          var manager = require('Broker').getInstance().getManager(
            "start-addnewtransition",
            "UIManager"
          );
          manager.setTooltipText({
            floor: reqObj.floor,
            text: "If you want to set duality of this transition, click cellspacecoundry.\nIf not, please click transition button or push enter"
          });
        }
      } else if (tmpObj.dots.length == 2) {
        // is part of cellBoundary
        var cellBoundaries = canvasContainer.stages[
          reqObj.floor
        ].cellBoundaryLayer.group.getObjects();

        for (var boundaryKey in cellBoundaries) {
          var dots = cellBoundaries[boundaryKey].getDots();
          var line = {
            dot1: dots[0],
            dot2: dots[1]
          };

          var duality = require('Storage').getInstance().getPropertyContainer().getElementById('cellBoundary', cellBoundaries[boundaryKey].id).duality;
          if (duality != '' && duality != null) {
            require('Popup')('warning', 'INVALID CELLSPACEBOUNDARY', 'Selected CellSpaceBoudnary already has a duality');
          } else if (
            require('DotMath').isLineContainDot(line, {
              point: point
            })
          ) {
            var Dot = require('Dot');
            var newDot = new Dot(point.x, point.y);
            dotPoolContainer.getDotPool(reqObj.floor).push(newDot);
            window.tmpObj.insertDot(1, newDot);

            // segmentation cellboundary
            cellBoundaries[boundaryKey].insertCorner(newDot, 1);

            // segmentation cell
            function getCommonCell(dot1, dot2) {
              var cell_1 = [];
              var cell_1_keys = Object.keys(dot1.memberOf);
              for (var i = 0; i < cell_1_keys.length; i++) {
                if (dot1.memberOf[cell_1_keys[i]] == 'cell')
                  cell_1.push(cell_1_keys[i])
              }

              var result = [];

              var cell_2_keys = Object.keys(dot2.memberOf);
              for (var i = 0; i < cell_2_keys.length; i++) {
                if (cell_1.indexOf(cell_2_keys[i]) != -1)
                  result.push(cell_2_keys[i])
              }

              return result;
            }

            var cells = getCommonCell(line.dot1, line.dot2);
            for (var i in cells) {
              var cell = canvasContainer.stages[
                reqObj.floor
              ].getElementById('cell', cells[i]);

              cell.insertDotIntoLine(line, newDot);
            }
          }
        }
      } else {
        return false;
      }

      canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
    };

    /**
     * @memberof GeometryManager
     * @param {Object} undoObj floor : id of floor<br>uuid : id of dot
     */
    GeometryManager.prototype.addNewTransition_undo = function(undoObj) {
      // change tooltip text
      if (tmpObj.dots.length == 2) {
        var manager = require('Broker').getInstance().getManager(
          "start-addnewtransition",
          "UIManager"
        );
        manager.setTooltipText({
          floor: undoObj.floor,
          text: ""
        });
      }

      var dotPool = require('Storage').getInstance().getDotPoolContainer().getDotPool(undoObj.floor);

      // remove state data from obj and free dot
      window.tmpObj.removeState(dotPool.getDotById(undoObj.uuid));
      dotPool.deleteDotFromObj(undoObj.uuid, "tmpObj");

      require('Storage').getInstance().getCanvasContainer().stages[undoObj.floor].tmpLayer.layer.draw();
    };

    GeometryManager.prototype.deleteTransition = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();

      // remove transition object in canvasContainer
      var canvasObj = canvasContainer.stages[reqObj.floor].getElementById("transition", reqObj.id);
      canvasObj.destroy();

      // free dot from object
      var dots = canvasObj.getDots();
      for (var dotKey in dots) {
        var floorId = require('Storage').getInstance().getPropertyContainer().getFloorById(Object.values(dots[dotKey].memberOf)[0], Object.keys(dots[dotKey].memberOf)[0]);
        var dotPool = dotPoolContainer.getDotPool(floorId);
        dotPool.deleteDotFromObj(dots[dotKey].uuid, reqObj.id);

        // if dots[dotKey] is part of cell boundary
        var memberOf = dots[dotKey].getMemberOf();
        for (var memKey in memberOf) {
          if (memberOf[memKey] == "cellBoundary") {
            var boundryObj = canvasContainer.stages[reqObj.floor].getElementById("cellboundary", memKey);
            if (boundryObj.isRemovableDot(dots[dotKey])) {
              dotPool.deleteDotFromObj(dots[dotKey].uuid, boundryObj.id);
            }
          }
        }
      }

      canvasContainer.stages[reqObj.floor].transitionLayer.group.transitions.splice(
        canvasContainer.stages[reqObj.floor].transitionLayer.group.transitions.indexOf(canvasObj),
        1
      );

      // remove transition geometry in geometryContainer
      var geometryContainer = require('Storage').getInstance().getGeometryContainer();
      geometryContainer.removeObj(
        geometryContainer.getElementById("transition", reqObj.id)
      );

      // redraw stage
      canvasContainer.stages[reqObj.floor].stage.draw();
    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewTransition = function(reqObj) {
      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      var tmpObj = window.tmpObj;
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      // clear tmp object
      window.tmpObj = null;
      canvasContainer.stages[reqObj.floor].tmpLayer.group.removeObj();

      for (var key in tmpObj.dots) {
        tmpObj.dots[key].leaveObj("tmpObj");
      }

      tmpObj.id = reqObj.id;
      tmpObj.name = reqObj.id;

      // add transition to canvasContainer using tmpObj
      canvasContainer.stages[reqObj.floor].transitionLayer.group.add(tmpObj);

      //add transition data in geometry canvasContainer
      var TransitionGeometry = require('Geometry').TRANSITION;
      require('Storage').getInstance().getGeometryContainer().transitionGeometry.push(
        new TransitionGeometry(
          tmpObj.id,
          tmpObj.getConnection(),
          tmpObj.getDots()
        )
      );

      // change color of cellboundary
      var duality = tmpObj.getDuality();
      if (duality != null) {
        canvasContainer.stages[reqObj.floor]
          .getElementById("cellboundary", duality)
          .changeLineColor("gray");
      }

      // redraw stage
      canvasContainer.stages[reqObj.floor].stage.draw();
    };

    /**
     * @memberof GeometryManager
     * @param {Object} undoObj floor, id
     */
    GeometryManager.prototype.endAddNewTransition_undo = function(undoObj) {
      require('Broker').getInstance().getManager("end-addnewcell", "GeometryManager").deleteTransition(undoObj);
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.startAddNewStair = function(reqObj) {
      var Transition = require('CanvasObject').TRANSITION;
      var tmpObj = new Transition("tmpObj");
      tmpObj.type = "transition";
      window.tmpObj = tmpObj;
    };

    /**
     * @memberof GeometryManager
     * @desc In case of the transition which connects different floor, if will be saved to first state's container(floor)
     */
    GeometryManager.prototype.addNewStair = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      if (window.tmpObj.floor == null) {
        canvasContainer.stages[
          reqObj.floor
        ].tmpLayer.group.addNewObj("stair");
        window.tmpObj.floor = reqObj.floor;
      }

      // get  coordinate
      var point =
        canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor
        .coor;

      var isDotExist = require('Storage').getInstance().getDotPoolContainer()
        .getDotPool(reqObj.floor)
        .getDotByPoint({
          x: point.x,
          y: point.y
        });

      if (isDotExist != null && tmpObj.dots.length <= 1 && isDotExist.isState()) {
        window.tmpObj.addState(isDotExist);
        isDotExist.participateObj("tmpObj", "transition");

        if (tmpObj.dots.length == 1) {
          var manager = require('Broker').getInstance().getManager(
            "start-addnewstair",
            "UIManager"
          );
          manager.setTooltipText({
            floor: reqObj.floor,
            text: "select state on another floor"
          });
        } else {
          var manager = require('Broker').getInstance().getManager(
            "start-addnewstair",
            "UIManager"
          );
          manager.setTooltipText({
            text: ""
          });
          window.tmpObj.deleteLineObject();
        }

        var memeberof = window.tmpObj.getLastDot().getMemberOf();
        var stateKey = null;
        for (var key in memeberof) {
          if (memeberof[key] == "state") {
            stateKey = key;
            break;
          }
        }

        canvasContainer.stages[reqObj.floor]
          .getElementById("state", stateKey)
          .setColor("blue");
        canvasContainer.stages[reqObj.floor]
          .getElementById("state", stateKey)
          .getObj()
          .draw();
      } else {
        return false;
      }
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.addNewStair_undo = function(undoObj) {
      let dot = window.tmpObj.dots[window.tmpObj.dots.length - 1];
      let i = Object.values(dot.memberOf).indexOf('state');
      let id = Object.keys(dot.memberOf)[i];

      require('Broker').getInstance().getManager("addnewstair", "GeometryManager")
        .addNewTransition_undo(undoObj);
      window.tmpObj.floor = null;


      ///////////////////////////////////////////////////////////////////////////////
      /////////////////////////// move to UIManager /////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      let state = require('Storage').getInstance().getCanvasContainer()
        .stages[undoObj.floor]
        .getElementById('state', id);
      state.setColor('yellow');
      state.getObj().draw();

      require('Broker').getInstance().getManager("start-addnewstair", "UIManager")
        .setTooltipText({
          floor: undoObj.floor,
          text: "select state"
        });
    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.cancelDrawStair = function(reqObj) {
      let stateIds = [];
      window.tmpObj.dots.forEach(dot => {
        if (dot.isState()) {
          let i = Object.values(dot.memberOf).indexOf('state');
          stateIds.push(Object.keys(dot.memberOf)[i]);
        }
      });

      let stage = require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor]

      require('Broker').getInstance().getManager("addnewstair", "GeometryManager")
        .cancelDrawObj(reqObj);

      for (let id of stateIds) {
        let state = stage.getElementById('state', id);
        state.setColor('yellow');
        state.getObj().draw();
      }
    }


    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewStair = function(reqObj) {
      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      var tmpObj = window.tmpObj;

      // clear tmp object
      window.tmpObj = null;
      require('Storage').getInstance().getCanvasContainer().stages[
        reqObj.floor
      ].tmpLayer.group.removeObj();

      for (var key in tmpObj.dots) {
        tmpObj.dots[key].leaveObj("tmpObj");
      }

      tmpObj.id = reqObj.id;
      tmpObj.name = reqObj.id;

      //add transition data in geometry canvasContainer
      var TransitionGeometry = require('Geometry').TRANSITION;
      require('Storage').getInstance().getGeometryContainer().transitionGeometry.push(
        new TransitionGeometry(
          tmpObj.id,
          tmpObj.getConnection(),
          tmpObj.getDots()
        )
      );

    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor: floor id<br>line : {dot1, dot2}
     */
    GeometryManager.prototype.modifyLine = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      // add dot in cursor point
      var point = canvasContainer.stages[
        reqObj.floor
      ].tmpLayer.group.getCursor().coor;

      var Dot = require('Dot');
      var newDot = new Dot(point.x, point.y);
      require('Storage').getInstance().getDotPoolContainer().getDotPool(reqObj.floor).push(newDot);

      // find thd objects containg the line
      var array1 = Object.keys(reqObj.line.dot1.memberOf);
      var array2 = Object.keys(reqObj.line.dot2.memberOf);

      function isMemberOfArray1(value) {
        return array1.indexOf(value) != -1;
      }

      var filtered = array2.filter(isMemberOfArray1);

      var isPartOf = [];
      var stage = canvasContainer.stages[reqObj.floor];
      for (var i in filtered) {
        var obj = stage.getElementById(reqObj.line.dot1.memberOf[filtered[i]], filtered[i]);
        if(obj.slant != null) {
          require('Popup')(
            'warning',
            'YOU CAN NOT ADD MORE CORNER ON THIS CELLSPACE.',
            'CellSpace with slant should have four corner.');
          return false;
        } // slant
        if(obj.isPartOf(reqObj.line.dot1, reqObj.line.dot2)) {
          isPartOf.push(filtered[i]);
        }
      }

      filtered = isPartOf;

      window.ori = {};
      window.modify = {
        type: 'line',
        uuid: newDot.uuid
      };

      for (var i in filtered) {
        var type = reqObj.line.dot1.memberOf[filtered[i]];
        var id = filtered[i];
        window.ori[id] = {
          type: type,
          dots: [...require('Storage').getInstance().getGeometryContainer()
            .getElementById(type, id).points
          ]
        };

        var obj = canvasContainer.stages[reqObj.floor].getElementById(type, id);
        obj.insertDotIntoLine(reqObj.line, newDot);
      }

    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor: floor id<br>point : dot
     */
    GeometryManager.prototype.startModifyPoint = function(reqObj) {
      window.tmpObj = reqObj.point;

      if (window.ori === undefined) {
        window.modify = {
          type: 'point',
          uuid: window.tmpObj.uuid,
          point: JSON.parse(JSON.stringify(window.tmpObj.point))
        };

        window.ori = {};
        var geometryContainer = require('Storage').getInstance().getGeometryContainer();
        Object.keys(window.tmpObj.memberOf).forEach(key => {
          var dots = [];
          if(tmpObj.memberOf[key] === 'state')
            dots = [JSON.parse(JSON.stringify(geometryContainer.getElementById(tmpObj.memberOf[key], key).point))];
          else
            dots = [...geometryContainer.getElementById(tmpObj.memberOf[key], key).points];

          window.ori[key] = {
            type: tmpObj.memberOf[key],
            dots: dots
          }
        });
      }

      log.info(ori);
    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor: floor id
     */
    GeometryManager.prototype.modifyPoint = function(reqObj) {
      if (tmpObj == null) return -1;

      tmpObj.setPoint(
        require('Storage').getInstance().getCanvasContainer().stages[
          reqObj.floor
        ].tmpLayer.group.getCursor().coor
      );

      // update obj
      var floor = require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor];
      for (var key in tmpObj.memberOf) {
        floor.getElementById(tmpObj.memberOf[key].toLowerCase(), key).addObjectFromDots();
      }

      floor.stage.draw();
    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor: floor id
     */
    GeometryManager.prototype.endModifyPoint = function(reqObj) {
      var movedDot = window.tmpObj;
      var geometryContainer = require('Storage').getInstance().getGeometryContainer();
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();
      var propertyContainer = require('Storage').getInstance().getPropertyContainer();
      var stageObj = require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor];
      var updateException = [];

      // validation
      var manager = require('Broker').getInstance().getManager("end-addnewcell", "GeometryManager");
      var dotPool = dotPoolContainer.dotPool[reqObj.floor];
      var flag = false;
      Object.keys(movedDot.memberOf).forEach(key => {
        if(flag) return;

        if (flag) return;
        if (movedDot.memberOf[key] === 'cell'){
          var canObj = stageObj.getElementById('cell', key);
          if (!manager.isValidPolygon(canObj)) flag = true;
          else if (manager.isSelfIntersecting(canObj)) flag = true;
          else if (manager.isOverlaped(canObj)) flag = true;
        }
        else if(movedDot.memberOf[key] === 'state'){
          var duality = propertyContainer.getElementById('state', key).duality;
          if(duality === '' || duality === null) return;

          var cellObj = stageObj.getElementById('cell', duality);
          if(!manager.isPolygonContainDot(cellObj, movedDot.point)){
            require('Popup')(
              'error',
              'INVALID POSITION',
              'STATE ' + key + ' must located the inside of CellSpace ' + duality +'.')
            flag = true;
          }
        }
        else if(movedDot.memberOf[key] === 'transition'){
          var connects = propertyContainer.getElementById('transition', key).connects;
          var smallFlag = false;
          connects.forEach(state => {
            if(smallFlag) return;
            var duality = propertyContainer.getElementById('state', state).duality;
            if(duality === '' || duality === null) return;

            var cellObj = stageObj.getElementById('cell', duality);
            smallFlag = manager.isPolygonContainDot(cellObj, movedDot.point);
          })

          if(!smallFlag){
            require('Popup')(
              'error',
              'INVALID POSITION',
              'TRANSITION ' + key + ' must located the inside of CellSpace ' + connects[0] + ' or ' + connects[1] +'.')
            flag = true;
          }
        }

      });

      // cancel modify
      if (flag) {
        Object.keys(window.ori).forEach(key => {
          if (window.modify.type === 'point')
            dotPool.getDotById(window.modify.uuid).setPoint(window.modify.point);

          var canvaObj = stageObj.getElementById(window.ori[key].type.toLowerCase(), key);
          canvaObj.dots = ori[key].dots;
          canvaObj.addObjectFromDots();
          geometryContainer.getElementById(window.ori[key].type, key);

          if (window.modify.type === 'line')
            dotPool.deleteDotFromObj(movedDot.uuid, key);

        });

        stageObj.stage.draw();
        delete window.modify;
        delete window.ori;
        return;
      }

      // if dot exist
      var isDotExist = require('Storage').getInstance().getDotPoolContainer().dotPool[
        reqObj.floor
      ].getDotByPointaAllowDuplication(movedDot.point);

      if (isDotExist[0] == movedDot) {} else if (isDotExist.length == 2) {
        isDotExist.splice(isDotExist.indexOf(movedDot), 1);

        for (var exception in isDotExist[0].memberOf) {
          updateException.push(exception);
        }

        for (var key in movedDot.memberOf) {
          var obj = stageObj.getElementById(movedDot.memberOf[key], key);
          var dotIndex = obj.getDotIndex(movedDot.uuid);
          obj.replaceDot(isDotExist[0], dotIndex);

        }

        if (Object.keys(movedDot.memberOf).length == 0)
          require('Storage').getInstance().getDotPoolContainer().dotPool[reqObj.floor].deleteDot(movedDot.uuid);
        movedDot = isDotExist[0];

        /////////////////////////////////////////////////////////////////
      }

      // update geometry data
      for (var key in movedDot.memberOf) {
        if (movedDot.memberOf[key] == "state") {
          var dot = stageObj.getElementById(movedDot.memberOf[key], key).getDot();
          geometryContainer.getElementById(
            movedDot.memberOf[key],
            key
          ).point = dot;
        } else if (updateException.indexOf(key) == -1) {

          var dots = stageObj
            .getElementById(movedDot.memberOf[key].toLowerCase(), key)
            .getDots();
          geometryContainer.getElementById(
            movedDot.memberOf[key],
            key
          ).points = dots;
        }
      }

      window.tmpObj = null;
      delete window.modify;
      delete window.ori;
    };


    /**
     * @memberof GeometryManager
     * @param {Object} reqObj geojson, floor
     */
    GeometryManager.prototype.addObjectFromGeojson = function(reqObj) {
      log.info("addObjectFromGeojson >> ", reqObj);
      document
        .getElementById("project-import-modal-option")
        .classList.add("d-none");
      document
        .getElementById("project-import-modal-loading")
        .classList.remove("d-none");

      var manager = require('Broker').getInstance().getManager("addnewfloor", "GeometryManager");
      var VERY_SMALL_VALUE = -99999999999;
      var VERY_BIG_VALUE = 99999999999;
      var boundingBox = {
        min: {
          x: VERY_BIG_VALUE,
          y: VERY_BIG_VALUE
        },
        max: {
          x: VERY_SMALL_VALUE,
          y: VERY_SMALL_VALUE
        }
      };

      require('Conditions').getInstance().coordinateThreshold = reqObj.condition.significant;
      require('Conditions').getInstance().realCoordinateThreshold = reqObj.condition.significant;
      require('Conditions').getInstance().snappingThreshold = reqObj.condition.significant;
      require('Conditions').getInstance().realSnappingThreshold = reqObj.condition.significant;

      var features = reqObj.geojson.features;
      for (var i in features) {
        switch (features[i].geometry.type) {
          case "Polygon":
            boundingBox = manager.addCellFromGeojson(
              features[i].geometry.coordinates[0],
              features[i].properties,
              reqObj.floor[0],
              boundingBox
            );
            break;
          case "LineString":
            manager.addCellBoundaryFromGeojson(
              features[i].geometry.coordinates[0],
              features[i].properties,
              reqObj.floor[0]
            );
            break;
          default:
            log.warn(
              "GeometryManager :: There is no match feature type with ",
              features[i].geometry.type
            );
            break;
        }
      }

      // console.log('boundingBox :: ', boundingBox);

      // resize stage
      var width = boundingBox.max.x - boundingBox.min.x;
      var height = boundingBox.max.y - boundingBox.min.y;
      var ratio = {};

      if (width > height)
        ratio = {
          width: width / height,
          height: 1
        };
      else
        ratio = {
          width: 1,
          height: height / width
        };

      var stage = require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor];
      var containerSize = {
        height: document.getElementById(reqObj.floor).clientHeight,
        width: document.getElementById(reqObj.floor).clientWidth
      };
      var containerRatio = {};

      if (containerSize.width > containerSize.height)
        containerRatio = {
          width: containerSize.width / containerSize.height,
          height: 1
        };
      else
        containerRatio = {
          width: 1,
          height: containerSize.height / containerSize.width
        };

      var newSize = {
        height: 0,
        width: 0
      };

      if (ratio.height == 1) {
        newSize = {
          width: containerSize.width,
          height: containerSize.height / ratio.width
        };
      } else {
        newSize = {
          width: containerSize.width / ratio.height,
          height: containerSize.height
        };
      }

      // console.log('newSize :: ', newSize);

      stage.stage.height(newSize.height);
      stage.stage.width(newSize.width);
      stage.backgroundLayer.setGrid(newSize.width, newSize.height);

      // world to pixel
      function affineTransformation(
        pixelURC,
        pixelLLC,
        worldURC,
        worldLLC,
        point,
        scale
      ) {
        var widthScale = pixelURC[0] / worldURC[0];
        var heightScale = pixelURC[1] / worldURC[1];
        var widthTrans = pixelLLC[0] - worldLLC[0];
        var heightTrans = pixelLLC[1] - worldLLC[1];
        var matrix = math.matrix([
          [scale, 0, widthTrans * scale],
          [0, scale, heightTrans * scale],
          [0, 0, 1]
        ]);

        var pointMatrix = math.matrix([point.x, point.y, 1]);
        var result = math.multiply(matrix, pointMatrix);
        // log.info(result._data);
        return {
          x: result._data[0],
          y: result._data[1]
        };
      }

      // goal - original
      /** bounding box일 경우 설정 */
      var canvasCenter = {
        x: newSize.width / 2,
        y: newSize.height / 2
      };

      // console.log('trance ::', canvasCenter.x - (boundingBox.min.x + width / 2), canvasCenter.y - (boundingBox.min.y + height / 2));

      var allDots = require('Storage').getInstance().getDotPoolContainer().dotPool[
        reqObj.floor[0]
      ].getDots();

      for (var i in allDots) {
        allDots[i].setPoint(
          affineTransformation(
            [newSize.width, newSize.height], [10, 10], [boundingBox.max.x, boundingBox.max.y], [boundingBox.min.x, boundingBox.min.y],
            allDots[i].point,
            1
          )
        );
      }

      var cells = require('Storage').getInstance().getCanvasContainer().stages[
        reqObj.floor
      ].cellLayer.group.getCells();
      for (var i in cells) {
        cells[i].addObjectFromDots();
      }

      stage.stage.draw();

      // treeview updatere
      require('UI').getInstance().sidebar.treeview.refresh(
        require('Storage').getInstance().getPropertyContainer()
      );

      log.info("succeed to addObjectFromGeojson");

      document.getElementById("project-import-modal-close-btn").click();
      document
        .getElementById("project-import-modal-option")
        .classList.remove("d-none");
      document
        .getElementById("project-import-modal-loading")
        .classList.add("d-none");

      require('Conditions').getInstance().coordinateThreshold = 10;
      require('Conditions').getInstance().realCoordinateThreshold = 10;
      require('Conditions').getInstance().snappingThreshold = 10;
      require('Conditions').getInstance().realSnappingThreshold = 10;

    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.addCellFromGeojson = function(coordinates, properties, floor, boundingBox) {
      var id = properties.Id;
      var name = properties.Name == undefined ? id : properties.Name;
      var manager = require('Broker').getInstance().getManager("end-addnewcell", "GeometryManager");
      var Dot = require('Dot');
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();

      // canvas container
      var dots = [];
      for (var i = 0; i < coordinates.length - 1; i++) {
        var dotPool = dotPoolContainer.getDotPool(floor);
        var dot = dotPool.getDotByPoint({
          x: coordinates[i][0],
          y: coordinates[i][1]
        });
        if (dot == null) {
          dot = new Dot(coordinates[i][0], coordinates[i][1]);
          dotPool.push(dot);
        }

        var coor = dot.getCoor();
        if (coor.x > boundingBox.max.x) boundingBox.max.x = coor.x;
        if (coor.y > boundingBox.max.y) boundingBox.max.y = coor.y;
        if (coor.x < boundingBox.min.x) boundingBox.min.x = coor.x;
        if (coor.y < boundingBox.min.y) boundingBox.min.y = coor.y;

        dots.push(dot);
      }


      var Cell = require('CanvasObject').CELL_SPACE;
      var cellObj = new Cell(id);
      cellObj.dots = dots;
      // cellObj.addObjectFromDots();
      // obj will added to stage after resizing canvas aspect ratio
      require('Storage').getInstance().getCanvasContainer().stages[floor].cellLayer.group.add(cellObj);
      require('Storage').getInstance().getCanvasContainer().stages[floor].cellLayer.layer.draw();

      // geometry container
      var CellGeometry = require('Geometry').CELL_SPACE;
      require('Storage').getInstance().getGeometryContainer().cellGeometry.push(
        new CellGeometry(id, cellObj.getDots())
      );



      if (require('Conditions').getInstance().automGenerateState) {
        manager.generateStateUsingCell(cellObj, floor);
      }

      // property container
      manager = require('Broker').getInstance().getManager("end-addnewcell", "PropertyManager");

      manager.endAddNewCell({
        id: id,
        floor: floor
      });

      manager.updateProperty({
        type: "cell",
        id: id,
        updateContent: {
          name: name,
          description: null
        }
      });

      require('Storage').getInstance().getCanvasContainer().stages[floor].stage.draw();

      return boundingBox;
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.addCellBoundaryFromGeojson = function(coordinates, properties, floor) {
      var id = properties.id;
      var name = properties.name;

      /**
       * need to develop
       */
    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj id: id of cell</br>floor: floor id of cell
     */
    GeometryManager.prototype.deleteCell = function(reqObj) {

      require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor].cellLayer.group.delete(reqObj.id, reqObj.floor);

      // remove cell in geometryContainer
      var cells = require('Storage').getInstance().getGeometryContainer().cellGeometry;
      for (var key in cells) {
        if (cells[key].id == reqObj.id) {
          cells.splice(key, 1);
          break;
        }
      }

      // redraw
      require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor].cellLayer.layer.draw();

    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj id: id of state</br>floor: floor id of state
     */
    GeometryManager.prototype.deleteState = function(reqObj) {

      require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor].stateLayer.group.delete(reqObj.id, reqObj.floor);

      // remove cell in geometryContainer
      var states = require('Storage').getInstance().getGeometryContainer().stateGeometry;
      for (var key in states) {
        if (states[key].id == reqObj.id) {
          states.splice(key, 1);
          break;
        }
      }

      // redraw
      require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor].stateLayer.layer.draw();

    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.startAddNewSlantDown = function(reqObj) {
      var Cell = require('CanvasObject').CELL_SPACE;
      var tmpObj = new Cell("tmpObj");
      tmpObj.type = "cell";
      tmpObj.slant = 'down';
      window.tmpObj = tmpObj;
    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewSlantDown = function(reqObj) {

      var manager = require('Broker').getInstance().getManager(
        "end-addnewcell",
        "GeometryManager"
      );

      window.tmpObj.setSlant('down');
      if (manager.endAddNewCell(reqObj) === false) return false;

      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      canvasContainer.stages[reqObj.floor].getElementById('cell', reqObj.id).setSlant('down');
      require('Storage').getInstance().getGeometryContainer().getElementById('cell', reqObj.id).slant = canvasContainer.stages[reqObj.floor].getElementById('cell', reqObj.id).slant;

      canvasContainer.stages[reqObj.floor].stage.draw();

    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewSlantUp = function(reqObj) {

      var manager = require('Broker').getInstance().getManager(
        "end-addnewcell",
        "GeometryManager"
      );

      window.tmpObj.setSlant('up');
      if (manager.endAddNewCell(reqObj) === false) return false;

      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      canvasContainer.stages[reqObj.floor].getElementById('cell', reqObj.id).setSlant('up');
      require('Storage').getInstance().getGeometryContainer().getElementById('cell', reqObj.id).slant = canvasContainer.stages[reqObj.floor].getElementById('cell', reqObj.id).slant;

      canvasContainer.stages[reqObj.floor].stage.draw();

    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewSlantUpDown = function(reqObj) {

      var manager = require('Broker').getInstance().getManager(
        "end-addnewcell",
        "GeometryManager"
      );

      var upId = require('Conditions').getInstance().pre_cell + (++require('Conditions').getInstance().LAST_CELL_ID_NUM);

      var Cell = require('CanvasObject').CELL_SPACE;

      function copyCell(obj, newId) {
        var tmpCell = new Cell(newId);
        var dots = obj.getDots();
        var dotsLen = dots.length;
        for (var i = 1; i <= dotsLen; i++) {
          tmpCell.addCorner(dots[dotsLen - i]);
        }
        tmpCell.floor = obj.floor;
        return tmpCell;
      }

      var tmpObj4Up = copyCell(window.tmpObj, upId);

      if(!manager.endAddNewSlantDown(reqObj)){
        require('Broker').getInstance().publish({
          req: 'cancel-addnewslantupdown',
          reqObj: {
            'floor': reqObj.floor
          }
        });

        return false;
      }

      window.tmpObj = tmpObj4Up;
      manager.endAddNewSlantUp({
        floor: reqObj.floor,
        id: upId
      });

      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor].stage.draw();

    }


    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.startAddNewState = function(reqObj) {
      // log.info('startAddNewState::', reqObj);
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewState = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();
      var point = canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor.coor;

      var isDotExist = dotPoolContainer.getDotPool(reqObj.floor).getDotByPoint({
        x: point.x,
        y: point.y
      });

      var dot;

      if (isDotExist == null) {
        var Dot = require('Dot');
        dot = new Dot(point.x, point.y);
        dotPoolContainer.getDotPool(reqObj.floor).push(dot);
      } else {
        dot = isDotExist;
      }

      if (reqObj.duality != '' && reqObj.duality != null) {
        var lines = canvasContainer.getElementById('cell', reqObj.duality).getLines();
        var DotMath = require('DotMath');
        for (var line of lines) {
          if (DotMath.isLineContainDot(line, dot)) {
            dotPoolContainer.getDotPool(reqObj.floor).deleteDot(dot.uuid);
            require('Popup')('warning', 'INVALID POSITION', '')
            return false;
          }
        }
      }


      canvasContainer.stages[reqObj.floor].stateLayer.group.makeNewStateAndAdd(reqObj.id, dot);

      var StateGeometry = require('Geometry').STATE;
      require('Storage').getInstance().getGeometryContainer().stateGeometry.push(new StateGeometry(reqObj.id, dot));

      canvasContainer.stages[reqObj.floor].stateLayer.layer.draw();

    };


    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.rotateSlant = function(reqObj) {

      var geo = require('Storage').getInstance().getGeometryContainer().getElementById('cell', reqObj.id);

      if (geo != null) {
        geo.points.splice(geo.points.length, 0, geo.points[0]);
        geo.points.splice(0, 1);

        var canvasObj = require('Storage').getInstance().getCanvasContainer().getElementById('cell', reqObj.id);
        canvasObj.dots = geo.points;
        canvasObj.addObjectFromDots();
        canvasObj.setSlant(canvasObj.slant.direction);
        geo.slant = canvasObj.slant;

        require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor].stage.draw();
      }
    };


    GeometryManager.prototype.startAddNewInterConnetction = function(reqObj) {
      var InterLayerConnectionProperty = require('Property').INTERLAYER_CONNECTION;
      var tmpObj = new InterLayerConnectionProperty("tmpObj");
      tmpObj.type = "interlayerConnection";
      window.tmpObj = tmpObj;
    }

    GeometryManager.prototype.addNewInterConnetction = function(reqObj) {
      var manager = require('Broker').getInstance().getManager(
        "addnewinterlayerconnetction",
        "GeometryManager"
      );

      var isState = manager.isStateSelected(reqObj.floor);
      if (isState instanceof Array) isState = isState[0];

      var layer = require('Storage').getInstance().getPropertyContainer().getElementById('floor', reqObj.floor).layer;

      if (isState) {
        window.tmpObj.addState(isState);

        var canvasContainer = require('Storage').getInstance().getCanvasContainer();
        canvasContainer.stages[reqObj.floor]
          .getElementById("state", isState)
          .setColor("blue");

        canvasContainer.stages[reqObj.floor]
          .getElementById("state", isState)
          .getObj()
          .draw();

        var floors = require('Storage').getInstance().getPropertyContainer().floorProperties;
        floors.forEach(fp => {
          if (fp.layer === layer)
            require('Broker').getInstance().getManager(
              "start-addnewinterlayerconnetction", "UIManager"
            ).setTooltipText({
              floor: fp.id,
              text: 'select state on another layer'
            })
        })
      }
    }

    GeometryManager.prototype.addNewInterConnetction_undo = function(undoObj) {
      if (window.tmpObj.interConnects[0] === undefined) return; // nothing to do
      let state = window.tmpObj.interConnects[0];

      // reset tool tip
      require('Broker').getInstance().getManager(
        "start-addnewinterlayerconnetction", "UIManager"
      ).setTooltipText({
        text: 'select state'
      })

      // redraw state
      var floor = require('Storage').getInstance().getPropertyContainer().getFloorById('state', state);
      var canvasObj = require('Storage').getInstance().getCanvasContainer().stages[floor].getElementById('state', state);
      canvasObj.setColor('yellow');
      canvasObj.getObj().draw();

      // reset tmpObj
      require('Broker').getInstance().getManager(
        "start-addnewinterlayerconnetction", "GeometryManager"
      ).startAddNewInterConnetction();
    }

    GeometryManager.prototype.endAddNewInterConnetction = function(reqObj) {
      var InterLayerConnectionProperty = require('Property').INTERLAYER_CONNECTION;
      var newInter = new InterLayerConnectionProperty(reqObj.id);
      newInter.interConnects = window.tmpObj.interConnects.slice(0);
      newInter.connectedLayer = window.tmpObj.connectedLayer.slice(0);
      window.tmpObj = null;

      require('Storage').getInstance().getPropertyContainer().interlayerConnections.push(newInter);


    }

    GeometryManager.prototype.addCellsFromGML = function(reqObj) {

      var dotPool = require('Storage').getInstance().getDotPoolContainer().getDotPool(reqObj.floor);
      var Dot = require('Dot');
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var geometryContainer = require('Storage').getInstance().getGeometryContainer();

      // add cellspace
      for (var cell of reqObj.data) {

        if (cell.points.length == 0) continue;

        var dots = [];
        for (var point of cell.points) {
          var dot = dotPool.getDotByPoint({
            x: point[0],
            y: point[1]
          });

          if (dot == null) {
            dot = new Dot(point[0], point[1]);
            dotPool.push(dot);
          }

          dot.participateObj(reqObj.id, 'cell');

          dots.push(dot);
        }

        var Cell = require('CanvasObject').CELL_SPACE;
        var cellObj = new Cell(cell.id);
        cellObj.dots = dots;
        canvasContainer.stages[reqObj.floor].cellLayer.group.add(cellObj);
        canvasContainer.stages[reqObj.floor].cellLayer.layer.draw();

        // geometry container
        var CellGeometry = require('Geometry').CELL_SPACE;
        geometryContainer.cellGeometry.push(
          new CellGeometry(cell.id, cellObj.getDots())
        );
      }
    }

    GeometryManager.prototype.addCellBoundariesFromGML = function(reqObj) {

      var dotPool = require('Storage').getInstance().getDotPoolContainer().getDotPool(reqObj.floor);
      var Dot = require('Dot');
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var geometryContainer = require('Storage').getInstance().getGeometryContainer();

      for (var cb of reqObj.data) {

        if (cb.points.length == 0) continue;

        var dots = [];
        for (var point of cb.points) {
          var dot = dotPool.getDotByPoint({
            x: point[0],
            y: point[1]
          });

          if (dot == null) {
            dot = new Dot(point[0], point[1]);
            dotPool.push(dot);
          }

          dots.push(dot);
        }

        var CellBoundary = require('CanvasObject').CELL_SPACE_BOUNDARY;
        var cbObj = new CellBoundary(cb.id);
        cbObj.dots = dots;
        cbObj.setCornersVisible(false);
        canvasContainer.stages[reqObj.floor].cellBoundaryLayer.group.add(cbObj);
        canvasContainer.stages[reqObj.floor].cellBoundaryLayer.layer.draw();

        var CellBoundaryGeometry = require('Geometry').CELL_SPACE_BOUNDARY;
        geometryContainer.cellBoundaryGeometry.push(
          new CellBoundaryGeometry(cbObj.id, cbObj.dots)
        );

      }
    }

    GeometryManager.prototype.addobjectFromGML = function(reqObj) {
      function isCCW(p1, p2, p3) {
        var v1 = require('DotMath').getVector(p1, p2);
        v1['z'] = 0;
        var v2 = require('DotMath').getVector(p2, p3);
        v2['z'] = 0;

        if (require('DotMath').crossProduct(v1, v2) > 0) return false;
        else return true;
      }

      var Dot = require('Dot');

      function makeDot(point, dotPool) {
        var dot = dotPool.getDotByPoint({
          x: point[0],
          y: point[1]
        });

        if (dot == null) {
          dot = new Dot(point[0], point[1]);
          dotPool.push(dot);
        }

        return dot;
      }

      var HoleGeometry = require('Geometry').HOLE;
      var CellGeometry = require('Geometry').CELL_SPACE;
      var geometryContainer = require('Storage').getInstance().getGeometryContainer();
      var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();

      for (var floor of Object.values(reqObj)) {
        var dotPool = dotPoolContainer.getDotPool(floor.id);

        // cellspace
        for (var c of Object.values(floor.cells)) {

          // push dots
          var dots = [];
          for (var point of c.points) {
            var dot = makeDot(point, dotPool);
            dots.push(dot);
            dot.participateObj(c.id, 'cell');
          }

          if (!isCCW(dots[0], dots[1], dots[2])) dots.reverse();

          if (c.holes != undefined) {
            for (var i in c.holes) {
              var hdots = [];
              for (var point of c.holes[i]) {
                var dot = makeDot(point, dotPool);
                hdots.push(dot);
              }

              if (!isCCW({
                  point: {
                    x: hdots[0][0],
                    y: hdots[0][1]
                  }
                }, {
                  point: {
                    x: hdots[1][0],
                    y: hdots[1][1]
                  }
                }, {
                  point: {
                    x: hdots[2][0],
                    y: hdots[2][1]
                  }
                })) hdots.reverse();

              geometryContainer.holeGeometry.push(
                new HoleGeometry(require('Conditions').getInstance().pre_hole + (++require('Conditions').getInstance().LAST_HOLE_ID_NUM), hdots, c.id)
              );
            }
          }

          geometryContainer.cellGeometry.push(
            new CellGeometry(c.id, dots)
          );
        }

        // cellspaceboudnary
        var CellBoundaryGeometry = require('Geometry').CELL_SPACE_BOUNDARY;
        for (var cb of Object.values(floor.cellBoundaries)) {
          var dots = [];
          for (var point of cb.points) {
            var dot = makeDot(point, dotPool);
            dots.push(dot);
            dot.participateObj(cb.id, 'cellBoundary');
          }

          geometryContainer.cellBoundaryGeometry.push(
            new CellBoundaryGeometry(cb.id, dots)
          );
        }

        // state
        var StateGeometry = require('Geometry').STATE;
        for (var s of Object.values(floor.states)) {
          var dot = makeDot(s.point, dotPool);
          dot.participateObj(s.id, 'state');

          geometryContainer.stateGeometry.push(
            new StateGeometry(s.id, dot)
          );
        }

        // transition
        var TransitionGeometry = require('Geometry').TRANSITION;
        for (var t of Object.values(floor.transitions)) {
          var dots = [];
          for (var point of t.points) {
            var dot = makeDot(point, dotPool);
            dots.push(dot);
            dot.participateObj(t.id, 'transition');
          }

          geometryContainer.transitionGeometry.push(
            new TransitionGeometry(t.id, t.connects, dots)
          );
        }
      }

      require('Storage').getInstance().getCanvasContainer().addObjFromGeometries(geometryContainer);
      require('UI').getInstance().treeView.refresh(require('Storage').getInstance().getPropertyContainer());


    }

    GeometryManager.prototype.startAddNewHatch = function(reqObj) {
      var Cell = require('CanvasObject').CELL_SPACE;
      var tmpObj = new Cell("tmpObj");
      tmpObj.type = "hatch";
      window.tmpObj = tmpObj;
    }

    GeometryManager.prototype.addNewHatch = function(reqObj) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      if (canvasContainer.stages[reqObj.floor].tmpLayer.group.obj == null) {
        var selectedCell = require('Broker').getInstance().getManager('addnewhatch', 'GeometryManager').isCellSelected(reqObj.floor);
        if (selectedCell.length == 0) return false;

        canvasContainer.stages[reqObj.floor].tmpLayer.group.addNewObj("hatch");
        window.tmpObj.floor = reqObj.floor;
        window.tmpObj.setHatchOf(selectedCell[0]);

        var manager = require('Broker').getInstance().getManager('start-addnewtransition', 'UIManager');
        manager.setTooltipText({
          text: ''
        });
        return reqObj;

      } else {
        // add corner
        var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();
        var point = canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor.coor;

        var isDotExist = dotPoolContainer
          .getDotPool(reqObj.floor)
          .getDotByPoint({
            x: point.x,
            y: point.y
          });

        var dot;
        var Dot = require('Dot');

        if (isDotExist == null) {
          dot = new Dot(point.x, point.y);
          dotPoolContainer.getDotPool(reqObj.floor).push(dot);
        } else {
          dot = isDotExist;
        }

        window.tmpObj.addCorner(dot);
        window.tmpObj.setFillColor('#000000');

        // draw group
        canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

      }
    }

    GeometryManager.prototype.endAddNewHatch = function(reqObj) {
      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      var tmpObj = window.tmpObj;
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();

      // clear tmp obj
      window.tmpObj = null;
      canvasContainer.stages[reqObj.floor].tmpLayer.group.removeObj();

      tmpObj.setFillColor('#111111');

      for (var key in tmpObj.dots) {
        tmpObj.dots[key].leaveObj("tmpObj");
      }

      // Twisted side validation
      if (require('Broker').getInstance()
        .getManager("end-addnewcell", "GeometryManager")
        .isSelfIntersecting(tmpObj)
      ) {
        log.error("This object have twisted side !");
        return -1;
      }

      tmpObj.id = reqObj.id;
      tmpObj.name = reqObj.id;

      var v1 = require('DotMath').getVector(tmpObj.dots[0], tmpObj.dots[1]);
      v1['z'] = 0;
      var v2 = require('DotMath').getVector(tmpObj.dots[1], tmpObj.dots[2]);
      v2['z'] = 0;
      var crossProduct = require('DotMath').crossProduct(v1, v2);
      if (crossProduct.z > 0) tmpObj.dots.reverse();

      require('Storage').getInstance().getPropertyContainer().getElementById('cell', tmpObj.hatchOf).addPartialboundedBy(tmpObj.id);

      // add cell to canvasContainer using tmpObj
      canvasContainer.stages[reqObj.floor].cellLayer.group.addHatch(tmpObj);

      // set corner to invisible
      var obj =
        canvasContainer.stages[reqObj.floor].cellLayer.group.hatchs[
          canvasContainer.stages[reqObj.floor].cellLayer.group
          .hatchs.length - 1
        ];
      obj.corners.visible(false);

      var HatchGeometry = require('Geometry').HATCH;
      require('Storage').getInstance().getGeometryContainer().hatchGeometry.push(
        new HatchGeometry(reqObj.id, obj.dots, obj.hatchOf)
      );

      // redraw stage
      canvasContainer.stages[reqObj.floor].stage.draw();
    }

    GeometryManager.prototype.isValidPolygon = function(tmpObj){
      var wkt = tmpObj.getWKT();
      var reader = new jsts.io.WKTReader();
      return reader.read(wkt).isValid();
    }

    GeometryManager.prototype.isPolygonContainDot = function(cell, dot){
      var cellWKT = cell.getWKT();
      var dotWKT = "POINT(" + dot.x + " " + dot.y +")";
      var reader = new jsts.io.WKTReader();

      return reader.read(cellWKT).contains(reader.read(dotWKT));
    }

    return GeometryManager;
  });
