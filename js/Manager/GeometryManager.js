  /**
   * @author suheeeee<lalune1120@hotmail.com>
   */

  define([
    "../Storage/Canvas/Object/Cell.js",
    "../Storage/Geometries/CellGeometry.js",
    "../Storage/Canvas/Object/Hole.js",
    "../Storage/Geometries/HoleGeometry.js",
    "../Storage/Canvas/Object/CellBoundary.js",
    "../PubSub/Subscriber.js",
    "../Storage/Dot/Dot.js",
    "../Storage/Geometries/CellBoundaryGeometry.js",
    "../Storage/Canvas/Object/State.js",
    "../Storage/Canvas/Object/Transition.js",
    "../Storage/Dot/DotMath.js",
    "../Storage/Geometries/TransitionGeometry.js",
    "../Storage/Geometries/StateGeometry.js",
    "../Storage/test.js",
    "../Storage/Properties/InterLayerConnectionProperty.js"
  ], function(
    Cell,
    CellGeometry,
    Hole,
    HoleGeometry,
    CellBoundary,
    Subscriber,
    Dot,
    CellBoundaryGeometry,
    State,
    Transition,
    DotMath,
    TransitionGeometry,
    StateGeometry,
    Test,
    InterLayerConnectionProperty
  ) {
    "use strict";

    /**
     * @class GeometryManager
     * @augments Subscriber
     */
    function GeometryManager() {
      Subscriber.apply(this, arguments);

      this.init();

      var singletonTest = Test.getInstance({
        a: "hello"
      });
      log.info(singletonTest);
    }

    GeometryManager.prototype = Object.create(Subscriber.prototype);

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
      this.addCallbackFun("addnewhole", this.addNewHole, function() {}, function() {});
      this.addCallbackFun("end-addnewhole", this.endAddNewHole, function() {}, function() {});

      this.addCallbackFun("start-addnewcellboundary", this.startAddNewCellBoundary, function() {}, function() {});
      this.addCallbackFun("addnewcellboundary", this.addNewCellBoundary, this.addNewCellBoundary_makeHistoryObj, this.addNewCellBoundary_undo);
      this.addCallbackFun("end-addnewcellboundary", this.endAddNewCellBoundary, this.makeSimpleHistoryObj, this.endAddNewCellBoundary_undo);

      this.addCallbackFun("snapping", this.snappingMousePointer);

      this.addCallbackFun("cancel-addnewcell", this.cancelDrawObj);
      this.addCallbackFun("cancel-addnewcellboundary", this.cancelDrawObj);
      this.addCallbackFun("cancel-addnewtransition", this.cancelDrawObj);

      this.addCallbackFun("start-addnewstate", this.startAddNewState, function() {}, function() {});
      this.addCallbackFun("end-addnewstate", this.endAddNewState, this.makeSimpleHistoryObj, this.endAddNewTransition_undo);

      this.addCallbackFun("start-addnewtransition", this.startAddNewTransition, function() {}, function() {});
      this.addCallbackFun("addnewtransition", this.addNewTransition, this.drawGeometry_makeHistoryObj, this.addNewTransition_undo);
      this.addCallbackFun("end-addnewtransition", this.endAddNewTransition, this.makeSimpleHistoryObj, this.endAddNewTransition_undo);

      this.addCallbackFun("start-addnewstair", this.startAddNewStair, function() {}, function() {});
      this.addCallbackFun("addnewstair", this.addNewStair, function() {}, function() {});
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
      this.addCallbackFun("addnewinterlayerconnetction", this.addNewInterConnetction, function() {}, function() {});
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

      this.addCallbackFun("addcellsfromgml", this.addCellsFromGML);
      this.addCallbackFun('addcellboundariesfromgml', this.addCellBoundariesFromGML);
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
      window.storage.dotFoolContainer.addNewDotFool(reqObj.floor);
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.startAddNewCell = function(reqobj) {
      var tmpObj = new Cell("tmpObj");
      tmpObj.type = "cell";
      window.tmpObj = tmpObj;
    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor: floor id
     */
    GeometryManager.prototype.addNewCell = function(reqObj) {
      if (window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.obj == null) {
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.addNewObj("cell");
        window.tmpObj.floor = reqObj.floor;
      }

      // add corner
      var point =
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor.coor;

      var isDotExist = window.storage.dotFoolContainer
        .getDotFool(reqObj.floor)
        .getDotByPoint({
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
    };

    /**
     * @memberof GeometryManager
     * @param reqObj floor
     */
    GeometryManager.prototype.drawGeometry_makeHistoryObj = function(reqObj) {
      return {
        floor: reqObj.floor,
        uuid: window.tmpObj.getLastDot().uuid
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

      window.storage.dotFoolContainer
        .getDotFool(undoObj.floor)
        .deleteDotFromObj(undoObj.uuid, tmpObj.id);
      window.storage.canvasContainer.stages[undoObj.floor].tmpLayer.layer.draw();
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

      // clear tmp obj
      window.tmpObj = null;
      window.storage.canvasContainer.stages[
        reqObj.floor
      ].tmpLayer.group.removeObj();
      // window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

      for (var key in tmpObj.dots) {
        tmpObj.dots[key].leaveObj("tmpObj");
      }

      // Twisted side validation
      if (!window.broker
        .getManager("end-addnewcell", "GeometryManager")
        .validateTwistedSide(tmpObj.dots)
      ) {
        log.error("This object have twisted side !");
        return false;
      }

      tmpObj.id = reqObj.id;
      tmpObj.name = reqObj.id;

      var v1 = DotMath.getVector(tmpObj.dots[0], tmpObj.dots[1]);
      v1['z'] = 0;
      var v2 = DotMath.getVector(tmpObj.dots[1], tmpObj.dots[2]);
      v2['z'] = 0;
      var crossProduct = DotMath.crossProduct(v1, v2);
      if(crossProduct.z > 0) tmpObj.dots.reverse();

      // add cell to canvasContainer using tmpObj
      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.add(
        tmpObj
      );

      // fragmenteGeometry

      // set corner to invisible
      var obj =
        window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.cells[
          window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group
          .cells.length - 1
        ];
      obj.corners.visible(false);

      //add cell data in geometry canvasContainer
      window.storage.geometryContainer.cellGeometry.push(
        new CellGeometry(reqObj.id, obj.dots)
      );

      // add state if there if conditions.automGenerateState is true
      if (window.conditions.automGenerateState) {
        var manager = window.broker.getManager(
          "end-addnewcell",
          "GeometryManager"
        );
        manager.generateStateUsingCell(tmpObj, reqObj.floor);
      }

      // redraw stage
      window.storage.canvasContainer.stages[reqObj.floor].stage.draw();
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

      function setState() {
        var centroidDot = new Dot(intersection[0].x, intersection[0].y);

        var stateId =
          window.conditions.pre_state + ++window.conditions.LAST_STATE_ID_NUM;
        window.storage.canvasContainer.stages[
          floor
        ].stateLayer.group.makeNewStateAndAdd(stateId, centroidDot);

        window.storage.dotFoolContainer.getDotFool(floor).push(centroidDot);

        window.storage.geometryContainer.stateGeometry.push(
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

        xhr.open("POST", "http://127.0.0.1:8080/triangulate", false);
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
      window.broker.getManager("end-addnewcell", "GeometryManager").deleteCell(undoObj);

      // ask remove state or not
    };


    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.startAddNewHole = function(reqobj) {
      var tmpObj = new Hole("tmpObj");
      tmpObj.type = "hole";
      window.tmpObj = tmpObj;

    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor: floor id
     */
    GeometryManager.prototype.addNewHole = function(reqObj) {

      if (window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.obj == null) {
        var selectedCell = window.broker.getManager('addnewhole', 'GeometryManager').isCellSelected(reqObj.floor);
        if (selectedCell.length == 0) return false;

        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.addNewObj("hole");
        window.tmpObj.floor = reqObj.floor;
        window.tmpObj.setHoleOf(selectedCell[0]);

        var manager = window.broker.getManager('start-addnewtransition', 'UIManager');
        manager.setTooltipText({
          text: ''
        });
        return reqObj;
      } else {
        // add corner
        var point =
          window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor
          .coor;

        var isDotExist = window.storage.dotFoolContainer
          .getDotFool(reqObj.floor)
          .getDotByPoint({
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
        window.tmpObj.setFillColor('#FFFFFF');

        // draw group
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
        // window.storage.canvasContainer.stages[reqObj.floor].stage.draw();

        // log.trace(window.storage.dotFoolContainer);
      }


    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.isCellSelected = function(floor) {
      var reader = new jsts.io.WKTReader();

      var pointCoor = window.storage.canvasContainer.stages[floor].tmpLayer.group.cursor.coor;
      var point = reader.read('POINT(' + pointCoor.x + ' ' + pointCoor.y + ')');

      var cells = window.storage.canvasContainer.stages[floor].cellLayer.group.getCells();
      var result = [];
      for (var i in cells) {

        var cell = reader.read(cells[i].getWKT());
        var intersection = point.intersection(cell).getCoordinates();
        if (intersection.length != 0) result.push(cells[i].id);

      }

      var holes = window.storage.canvasContainer.stages[floor].cellLayer.group.getHoles();
      for (var i in holes) {

        var hole = reader.read(holes[i].getWKT());
        var intersection = point.intersection(hole).getCoordinates();
        if (intersection.length != 0 && result.indexOf(holes[i].holeOf) != -1) result.splice(result.indexOf(holes[i].holeOf), 1);

      }

      return result;
    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.isStateSelected = function(floor) {
      var reader = new jsts.io.WKTReader();

      var point = window.storage.canvasContainer.stages[floor].tmpLayer.group.cursor.coor;
      var isDotExist = window.storage.dotFoolContainer.getDotFool(floor).getDotByPoint({
        x: point.x,
        y: point.y
      });

      if (isDotExist == null) return [];
      else return [Object.keys(isDotExist.memberOf)[0]];
    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.isObjectSelected = function(floor) {
      var manager = window.broker.getManager("end-addnewcell", "GeometryManager");

      var type = 'state';
      var result = manager.isStateSelected(floor);

      if (result.length == 0) {
        result = manager.isCellSelected(floor);
        type = 'cell';
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

      // clear tmp obj
      window.tmpObj = null;
      window.storage.canvasContainer.stages[
        reqObj.floor
      ].tmpLayer.group.removeObj();

      tmpObj.setFillColor('#FFFFFF');

      for (var key in tmpObj.dots) {
        tmpObj.dots[key].leaveObj("tmpObj");
      }

      // Twisted side validation
      if (!window.broker
        .getManager("end-addnewcell", "GeometryManager")
        .validateTwistedSide(tmpObj.dots)
      ) {
        log.error("This object have twisted side !");
        return false;
      }

      tmpObj.id = reqObj.id;
      tmpObj.name = reqObj.id;

      // add cell to canvasContainer using tmpObj
      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.addHole(
        tmpObj
      );

      // fragmenteGeometry

      // set corner to invisible
      log.info(window.storage.canvasContainer.stages[reqObj.floor].cellLayer);
      var obj =
        window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.holes[
          window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group
          .holes.length - 1
        ];
      obj.corners.visible(false);

      //add cell data in geometry canvasContainer
      window.storage.geometryContainer.holeGeometry.push(
        new HoleGeometry(reqObj.id, obj.dots, obj.holeOf)
      );

      // redraw stage
      window.storage.canvasContainer.stages[reqObj.floor].stage.draw();
    };


    /**
     * @memberof GeometryManager
     * @param {Array} Array of dots. Assume that you create a face by connecting the lines in sequence to the array.
     * @return {Boolean}
     */
    GeometryManager.prototype.validateTwistedSide = function(dots) {
      return true;
    };

    /**
     * @param {Object} reqObj floor
     * @memberof GeometryManager
     * @desc set tmpObj to null
     */
    GeometryManager.prototype.cancelDrawObj = function(reqObj) {
      if (reqObj.floor != undefined) {
        for (var key in window.tmpObj.dots) {
          window.storage.dotFoolContainer
            .getDotFool(reqObj.floor)
            .deleteDotFromObj(window.tmpObj.dots[key].uuid, "tmpObj");
        }

        window.storage.canvasContainer.stages[
          reqObj.floor
        ].tmpLayer.group.removeObj();
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
      }

      // clear tmp obj
      window.tmpObj = null;

      window.myhistory.cancelCycle();
    };

    /**
     * @memberof GeometryManager
     * @param {Array} Dot array in same floor.
     * @param {Array} Connection data of this floor. This value is array of Object and it's form is { dot1, dot2 }.
     * @param {Object} { x : coordinate of x, y : coordinate of y }
     * @return {Object} { x : coordinate of x, y : coordinate of y } or null
     */
    GeometryManager.prototype.snapping = function(dots, connections, point) {
      var minimum_d = window.conditions.realSnappingThreshold;
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
      var tmpObj = new CellBoundary("tmpObj");
      tmpObj.type = "cellBoundary";
      window.tmpObj = tmpObj;
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.addNewCellBoundary = function(reqObj) {
      if (
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.obj ==
        null
      ) {
        window.storage.canvasContainer.stages[
          reqObj.floor
        ].tmpLayer.group.addNewObj("cellBoundary");
        window.tmpObj.floor = reqObj.floor;
      }

      var point =
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor
        .coor;

      var isDotExist = window.storage.dotFoolContainer
        .getDotFool(reqObj.floor)
        .getDotByPoint({
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

      if (window.tmpObj.dots.length == 0) {
        window.tmpObj.addCorner(dot);
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

        // find all cell contain this dot and save it
        var manager = window.broker.getManager(
          "addnewcellboundary",
          "GeometryManager"
        );

        var cells = window.storage.canvasContainer.stages[
          reqObj.floor
        ].cellLayer.group.getCells();

        var holes  = window.storage.canvasContainer.stages[
          reqObj.floor
        ].cellLayer.group.getHoles();

        var objects = cells.concat(holes);

        var lines = manager.findAllLinesContainThePoint(point, objects  );

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
            if (!DotMath.isLineContainDot(lines[i], dot)) {
              window.tmpObj.associationCell[key].splice(i, 1);
              i--;

              if (lines.length == 0) delete window.tmpObj.associationCell[key];
            }
          }
        }

        if (Object.keys(window.tmpObj.associationCell) != 0) {
          window.tmpObj.addCorner(dot);
          window.storage.canvasContainer.stages[
            reqObj.floor
          ].tmpLayer.layer.draw();
        } else {
          window.tmpObj.associationCell = save;
          log.warn(
            "Selected point is not connected with another point which participated in the cellspaceboundary what you making."
          );
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

      window.storage.dotFoolContainer
        .getDotFool(undoObj.floor)
        .deleteDotFromObj(undoObj.uuid, tmpObj.id);
      window.storage.canvasContainer.stages[undoObj.floor].tmpLayer.layer.draw();
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
      window.storage.canvasContainer.stages[
        reqObj.floor
      ].tmpLayer.group.removeObj();
      window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

      for (var key in tmpObj.dots) {
        tmpObj.dots[key].leaveObj("tmpObj");
      }

      tmpObj.id = reqObj.id;
      tmpObj.name = reqObj.id;

      // add cellboundary using tmpObj
      window.storage.canvasContainer.stages[
        reqObj.floor
      ].cellBoundaryLayer.group.add(tmpObj);

      // 셀이 3개 라인이 2개인 경우의 예외처리 필요 *************************************************************************************************
      // add dots in cellboundary to cells
      var associationCells = tmpObj.associationCell;
      for (var key in associationCells) {
        var cell = window.storage.canvasContainer.stages[
          reqObj.floor
        ].getElementById("cell", key);
        cell.insertLineIntoLine(associationCells[key][0], tmpObj.dots);

        // update geometryContainer
        if(cell.holeOf == undefined){
          window.storage.geometryContainer
            .getElementById("cell", key)
            .updatePoints(cell.getDots());
        }
      }

      // set corner to invisible
      var obj =
        window.storage.canvasContainer.stages[reqObj.floor].cellBoundaryLayer
        .group.cellBoundaries[
          window.storage.canvasContainer.stages[reqObj.floor].cellBoundaryLayer
          .group.cellBoundaries.length - 1
        ];
      obj.setCornersVisible(false);

      // redraw cellBoundaryLayer
      // window.storage.canvasContainer.stages[reqObj.floor].cellBoundaryLayer.layer.draw();
      window.storage.canvasContainer.stages[reqObj.floor].stage.draw();

      //add cellBoundary data in geometry canvasContainer
      window.storage.geometryContainer.cellBoundaryGeometry.push(
        new CellBoundaryGeometry(reqObj.id, obj.dots)
      );
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewCellBoundary_undo = function(undoObj) {
      window.broker.getManager("end-addnewcell", "GeometryManager").deleteCellBoundary(undoObj);
    };

    GeometryManager.prototype.deleteCellBoundary = function(reqObj){
      // remove cellboundary in canvasContainer
      var cellboundaries =
        window.storage.canvasContainer.stages[reqObj.floor].cellBoundaryLayer
        .group.cellBoundaries;

      for (var key in cellboundaries) {
        if (cellboundaries[key].id == reqObj.id) {
          cellboundaries[key].destroy();

          // free dot from object
          for (var dotkey in cellboundaries[key].dots) {
            window.storage.dotFoolContainer
              .getDotFool(reqObj.floor)
              .deleteDotFromObj(
                cellboundaries[key].dots[dotkey].uuid,
                cellboundaries[key].id
              );
          }

          // redraw canvas
          window.storage.canvasContainer.stages[
            reqObj.floor
          ].cellBoundaryLayer.layer.draw();
          cellboundaries.splice(key, 1);

          break;
        }
      }

      // remove cell in geometryContainer
      cellboundaries = window.storage.geometryContainer.cellBoundaryGeometry;
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
      var point = reqObj.point;
      point.x =
        point.x -
        window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.x;
      point.x =
        point.x /
        window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleX;

      point.y =
        point.y -
        window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.y;
      point.y =
        point.y /
        window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleY;

      var isDotExist = null;
      if (window.myhistory.getPreviousMsg() == 'modifypoint') {
        isDotExist = window.storage.dotFoolContainer
          .getDotFool(reqObj.floor)
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
        isDotExist = window.storage.dotFoolContainer
          .getDotFool(reqObj.floor)
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
        var manager = window.broker.getManager("snapping", "GeometryManager");
        var dots = Object.values(
          window.storage.dotFoolContainer.getDotFool(reqObj.floor).getDots()
        );
        var connections = window.storage.canvasContainer.stages[
          reqObj.floor
        ].getConnection();
        // log.info(connections);
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

      var cursor = window.storage.canvasContainer.stages[
        reqObj.floor
      ].tmpLayer.group.getCursor();

      cursor.setCoor(newPoint);
      cursor.setVisible(true);
      window.storage.canvasContainer.stages[
        reqObj.floor
      ].tmpLayer.group.setCursorData(snappingData);

      window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
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
      var tmpObj = new Transition("tmpObj");
      tmpObj.type = "transition";
      window.tmpObj = tmpObj;
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.addNewTransition = function(reqObj) {
      if (
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.obj ==
        null
      ) {
        window.storage.canvasContainer.stages[
          reqObj.floor
        ].tmpLayer.group.addNewObj("transition");
        window.tmpObj.floor = reqObj.floor;
      }

      // get  coordinate
      var point =
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor
        .coor;

      var isDotExist = window.storage.dotFoolContainer
        .getDotFool(reqObj.floor)
        .getDotByPoint({
          x: point.x,
          y: point.y
        });

      if (isDotExist != null && tmpObj.dots.length <= 1 && isDotExist.isState) {
        window.tmpObj.addState(isDotExist);
        // isDotExist.participateObj('tmpObj', 'transition');

        if (tmpObj.dots.length == 2) {
          var manager = window.broker.getManager(
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
        var cellBoundaries = window.storage.canvasContainer.stages[
          reqObj.floor
        ].cellBoundaryLayer.group.getObjects();
        for (var boundaryKey in cellBoundaries) {
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

          if (
            DotMath.isLineContainDot(line, {
              point: point
            })
          ) {
            var newDot = new Dot(point.x, point.y);
            window.storage.dotFoolContainer.getDotFool(reqObj.floor).push(newDot);
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
              var cell = window.storage.canvasContainer.stages[
                reqObj.floor
              ].getElementById('cell', cells[i]);

              cell.insertDotIntoLine(line, newDot);
            }
          }
        }
      } else {
        return false;
      }

      window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();
    };

    /**
     * @memberof GeometryManager
     * @param {Object} undoObj floor : id of floor<br>uuid : id of dot
     */
    GeometryManager.prototype.addNewTransition_undo = function(undoObj) {
      // change tooltip text
      if (tmpObj.dots.length == 2) {
        var manager = window.broker.getManager(
          "start-addnewtransition",
          "UIManager"
        );
        manager.setTooltipText({
          floor: undoObj.floor,
          text: ""
        });
      }

      var dotFool = window.storage.dotFoolContainer.getDotFool(undoObj.floor);

      // remove state data from obj and free dot
      window.tmpObj.removeState(dotFool.getDotById(undoObj.uuid));
      dotFool.deleteDotFromObj(undoObj.uuid, "tmpObj");

      window.storage.canvasContainer.stages[undoObj.floor].tmpLayer.layer.draw();
    };

    GeometryManager.prototype.deleteTransition = function(reqObj){
      // remove transition object in canvasContainer
      var canvasObj = window.storage.canvasContainer.stages[
        reqObj.floor
      ].getElementById("transition", reqObj.id);
      canvasObj.destroy();

      // free dot from object
      var dots = canvasObj.getDots();
      // var dotFool = window.storage.dotFoolContainer.getDotFool(reqObj.floor);
      for (var dotKey in dots) {
        var floorId = window.storage.propertyContainer.getFloorById(Object.values(dots[dotKey].memberOf)[0],Object.keys(dots[dotKey].memberOf)[0]);
        var dotFool = window.storage.dotFoolContainer.getDotFool(floorId);
        dotFool.deleteDotFromObj(dots[dotKey].uuid, reqObj.id);

        // if dots[dotKey] is part of cell boundary
        var memberOf = dots[dotKey].getMemberOf();
        for (var memKey in memberOf) {
          if (memberOf[memKey] == "cellBoundary") {
            var boundryObj = window.storage.canvasContainer.stages[
              reqObj.floor
            ].getElementById("cellboundary", memKey);
            if (boundryObj.isRemovableDot(dots[dotKey])) {
              dotFool.deleteDotFromObj(dots[dotKey].uuid, boundryObj.id);
            }
          }
        }
      }

      window.storage.canvasContainer.stages[
        reqObj.floor
      ].transitionLayer.group.transitions.splice(
        window.storage.canvasContainer.stages[
          reqObj.floor
        ].transitionLayer.group.transitions.indexOf(canvasObj),
        1
      );

      // remove transition geometry in geometryContainer
      window.storage.geometryContainer.removeObj(
        window.storage.geometryContainer.getElementById("transition", reqObj.id)
      );

      // redraw stage
      window.storage.canvasContainer.stages[reqObj.floor].stage.draw();
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

      // clear tmp object
      window.tmpObj = null;
      window.storage.canvasContainer.stages[
        reqObj.floor
      ].tmpLayer.group.removeObj();
      // window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

      for (var key in tmpObj.dots) {
        tmpObj.dots[key].leaveObj("tmpObj");
      }

      tmpObj.id = reqObj.id;
      tmpObj.name = reqObj.id;

      // add transition to canvasContainer using tmpObj
      window.storage.canvasContainer.stages[
        reqObj.floor
      ].transitionLayer.group.add(tmpObj);

      //add transition data in geometry canvasContainer
      window.storage.geometryContainer.transitionGeometry.push(
        new TransitionGeometry(
          tmpObj.id,
          tmpObj.getConnection(),
          tmpObj.getDots()
        )
      );

      // change color of cellboundary
      var duality = tmpObj.getDuality();
      if (duality != null) {
        window.storage.canvasContainer.stages[reqObj.floor]
          .getElementById("cellboundary", duality)
          .changeLineColor("gray");
      }

      // redraw stage
      window.storage.canvasContainer.stages[reqObj.floor].stage.draw();
    };

    /**
     * @memberof GeometryManager
     * @param {Object} undoObj floor, id
     */
    GeometryManager.prototype.endAddNewTransition_undo = function(undoObj) {
      window.broker.getManager("end-addnewcell", "GeometryManager").deleteTransition(undoObj);
    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.startAddNewStair = function(reqObj) {
      var tmpObj = new Transition("tmpObj");
      tmpObj.type = "transition";
      window.tmpObj = tmpObj;
    };

    /**
     * @memberof GeometryManager
     * @desc In case of the transition which connects different floor, if will be saved to first state's container(floor)
     */
    GeometryManager.prototype.addNewStair = function(reqObj) {
      if (window.tmpObj.floor == null) {
        window.storage.canvasContainer.stages[
          reqObj.floor
        ].tmpLayer.group.addNewObj("stair");
        window.tmpObj.floor = reqObj.floor;
      }

      // get  coordinate
      var point =
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.cursor
        .coor;

      var isDotExist = window.storage.dotFoolContainer
        .getDotFool(reqObj.floor)
        .getDotByPoint({
          x: point.x,
          y: point.y
        });

      if (isDotExist != null && tmpObj.dots.length <= 1 && isDotExist.isState()) {
        window.tmpObj.addState(isDotExist);
        isDotExist.participateObj("tmpObj", "transition");

        if (tmpObj.dots.length == 1) {
          var manager = window.broker.getManager(
            "start-addnewstair",
            "UIManager"
          );
          manager.setTooltipText({
            floor: reqObj.floor,
            text: "select state on another floor"
          });
        } else {
          var manager = window.broker.getManager(
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

        window.storage.canvasContainer.stages[reqObj.floor]
          .getElementById("state", stateKey)
          .setColor("blue");
        window.storage.canvasContainer.stages[reqObj.floor]
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
    GeometryManager.prototype.endAddNewStair = function(reqObj) {
      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      var tmpObj = window.tmpObj;

      // clear tmp object
      window.tmpObj = null;
      window.storage.canvasContainer.stages[
        reqObj.floor
      ].tmpLayer.group.removeObj();
      // window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

      for (var key in tmpObj.dots) {
        tmpObj.dots[key].leaveObj("tmpObj");
      }

      tmpObj.id = reqObj.id;
      tmpObj.name = reqObj.id;

      //add transition data in geometry canvasContainer
      window.storage.geometryContainer.transitionGeometry.push(
        new TransitionGeometry(
          tmpObj.id,
          tmpObj.getConnection(),
          tmpObj.getDots()
        )
      );

      // log.info(window.tmpObj);
      // log.info(window.storage);
    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor: floor id<br>line : {dot1, dot2}
     */
    GeometryManager.prototype.modifyLine = function(reqObj) {
      log.info("GeometryManager : modifyLine called");

      // add dot in cursor point
      var point = window.storage.canvasContainer.stages[
        reqObj.floor
      ].tmpLayer.group.getCursor().coor;
      var newDot = new Dot(point.x, point.y);
      window.storage.dotFoolContainer.getDotFool(reqObj.floor).push(newDot);

      // find thd objects containg the line
      var array1 = Object.keys(reqObj.line.dot1.memberOf);
      var array2 = Object.keys(reqObj.line.dot2.memberOf);

      function isMemberOfArray1(value) {
        return array1.indexOf(value) != -1;
      }

      var filtered = array2.filter(isMemberOfArray1);

      var isPartOf = [];
      var stage = window.storage.canvasContainer.stages[reqObj.floor];
      for (var i in filtered) {
        var obj = stage.getElementById(reqObj.line.dot1.memberOf[filtered[i]], filtered[i]);
        if (obj.isPartOf(reqObj.line.dot1, reqObj.line.dot2)) {
          isPartOf.push(filtered[i]);
        }
      }

      filtered = isPartOf;

      for (var i in filtered) {
        var obj = window.storage.canvasContainer.stages[
          reqObj.floor
        ].getElementById(reqObj.line.dot1.memberOf[filtered[i]], filtered[i]);
        obj.insertDotIntoLine(reqObj.line, newDot);
      }

      // window.storage.canvasContainer.stages[reqObj.floor].stage.draw();
    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor: floor id<br>point : dot
     */
    GeometryManager.prototype.startModifyPoint = function(reqObj) {
      log.info(reqObj);

      // var cursor = window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.getCursor();
      // var cursorData = window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.getCursorData();

      window.tmpObj = reqObj.point;
      // log.info(cursor, cursorData);
    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj floor: floor id
     */
    GeometryManager.prototype.modifyPoint = function(reqObj) {
      tmpObj.setPoint(
        window.storage.canvasContainer.stages[
          reqObj.floor
        ].tmpLayer.group.getCursor().coor
      );

      // update obj
      var floor = window.storage.canvasContainer.stages[reqObj.floor];
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
      var geometryContainer = window.storage.geometryContainer;
      var stageObj = window.storage.canvasContainer.stages[reqObj.floor];
      var updateException = [];

      // if dot exist
      var isDotExist = window.storage.dotFoolContainer.dotFool[
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
          window.storage.dotFoolContainer.dotFool[reqObj.floor].deleteDot(movedDot.uuid);
        movedDot = isDotExist[0];

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

      log.info(window.storage.geometryContainer);
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

      var manager = window.broker.getManager("addnewfloor", "GeometryManager");
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

      window.conditions.coordinateThreshold = reqObj.condition.significant;
      window.conditions.realCoordinateThreshold = reqObj.condition.significant;
      window.conditions.snappingThreshold = reqObj.condition.significant;
      window.conditions.realSnappingThreshold = reqObj.condition.significant;

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

      var stage = window.storage.canvasContainer.stages[reqObj.floor];
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

      var allDots = window.storage.dotFoolContainer.dotFool[
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

      var cells = window.storage.canvasContainer.stages[
        reqObj.floor
      ].cellLayer.group.getCells();
      for (var i in cells) {
        cells[i].addObjectFromDots();
      }

      stage.stage.draw();

      // treeview updatere
      window.uiContainer.sidebar.treeview.refresh(
        window.storage.propertyContainer
      );

      log.info("succeed to addObjectFromGeojson");

      document.getElementById("project-import-modal-close-btn").click();
      document
        .getElementById("project-import-modal-option")
        .classList.remove("d-none");
      document
        .getElementById("project-import-modal-loading")
        .classList.add("d-none");

      window.conditions.coordinateThreshold = 10;
      window.conditions.realCoordinateThreshold = 10;
      window.conditions.snappingThreshold = 10;
      window.conditions.realSnappingThreshold = 10;

    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.addCellFromGeojson = function(coordinates, properties, floor, boundingBox) {
      var id = properties.Id;
      var name = properties.Name == undefined ? id : properties.Name;
      var manager = window.broker.getManager("end-addnewcell", "GeometryManager");

      // canvas container
      var dots = [];
      for (var i = 0; i < coordinates.length - 1; i++) {
        var dotFool = window.storage.dotFoolContainer.getDotFool(floor);
        var dot = dotFool.getDotByPoint({
          x: coordinates[i][0],
          y: coordinates[i][1]
        });
        if (dot == null) {
          dot = new Dot(coordinates[i][0], coordinates[i][1]);
          dotFool.push(dot);
        }

        var coor = dot.getCoor();
        if (coor.x > boundingBox.max.x) boundingBox.max.x = coor.x;
        if (coor.y > boundingBox.max.y) boundingBox.max.y = coor.y;
        if (coor.x < boundingBox.min.x) boundingBox.min.x = coor.x;
        if (coor.y < boundingBox.min.y) boundingBox.min.y = coor.y;

        dots.push(dot);
      }

      // if(!manager.validateTwistedSide(dots)){
      //   log.error("This object have twisted side !");
      //   return false;
      // }

      var cellObj = new Cell(id);
      cellObj.dots = dots;
      // cellObj.addObjectFromDots();
      // obj will added to stage after resizing canvas aspect ratio
      window.storage.canvasContainer.stages[floor].cellLayer.group.add(cellObj);
      window.storage.canvasContainer.stages[floor].cellLayer.layer.draw();

      // geometry container
      window.storage.geometryContainer.cellGeometry.push(
        new CellGeometry(id, cellObj.getDots())
      );



      if (window.conditions.automGenerateState) {
        manager.generateStateUsingCell(cellObj, floor);
      }

      // property container
      manager = window.broker.getManager("end-addnewcell", "PropertyManager");

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

      window.storage.canvasContainer.stages[floor].stage.draw();

      // treeview updatere
      // window.uiContainer.sidebar.treeview.addCell(id, floor);

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

      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.delete(reqObj.id, reqObj.floor);

      // remove cell in geometryContainer
      var cells = window.storage.geometryContainer.cellGeometry;
      for (var key in cells) {
        if (cells[key].id == reqObj.id) {
          cells.splice(key, 1);
          break;
        }
      }

      // redraw
      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.layer.draw();

    };

    /**
     * @memberof GeometryManager
     * @param {Object} reqObj id: id of state</br>floor: floor id of state
     */
    GeometryManager.prototype.deleteState = function(reqObj) {

      window.storage.canvasContainer.stages[reqObj.floor].stateLayer.group.delete(reqObj.id, reqObj.floor);

      // remove cell in geometryContainer
      var states = window.storage.geometryContainer.stateGeometry;
      for (var key in states) {
        if (states[key].id == reqObj.id) {
          states.splice(key, 1);
          break;
        }
      }

      // redraw
      window.storage.canvasContainer.stages[reqObj.floor].stateLayer.layer.draw();

    };

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.startAddNewSlantDown = function(reqObj) {
      var tmpObj = new Cell("tmpObj");
      tmpObj.type = "cell";
      tmpObj.slant = 'down';
      window.tmpObj = tmpObj;
    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewSlantDown = function(reqObj) {

      var manager = window.broker.getManager(
        "end-addnewcell",
        "GeometryManager"
      );

      window.tmpObj.setSlant('down');
      manager.endAddNewCell(reqObj);

      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      window.storage.canvasContainer.stages[reqObj.floor].getElementById('cell', reqObj.id).setSlant('down');
      window.storage.geometryContainer.getElementById('cell', reqObj.id).slant = window.storage.canvasContainer.stages[reqObj.floor].getElementById('cell', reqObj.id).slant;

      window.storage.canvasContainer.stages[reqObj.floor].stage.draw();

    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewSlantUp = function(reqObj) {

      var manager = window.broker.getManager(
        "end-addnewcell",
        "GeometryManager"
      );

      window.tmpObj.setSlant('up');
      manager.endAddNewCell(reqObj);

      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      window.storage.canvasContainer.stages[reqObj.floor].getElementById('cell', reqObj.id).setSlant('up');
      window.storage.geometryContainer.getElementById('cell', reqObj.id).slant = window.storage.canvasContainer.stages[reqObj.floor].getElementById('cell', reqObj.id).slant;

      window.storage.canvasContainer.stages[reqObj.floor].stage.draw();

    }

    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.endAddNewSlantUpDown = function(reqObj) {

      var manager = window.broker.getManager(
        "end-addnewcell",
        "GeometryManager"
      );

      var upId = window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM);

      function copyCell(obj, newId) {
        var tmpCell = new Cell(newId);
        var dots = obj.getDots();
        var dotsLen = dots.length;
        for (var i = 1; i <= dotsLen; i++) {
          tmpCell.addCorner(dots[dotsLen - i]);
        }
        return tmpCell;
      }

      var tmpObj4Up = copyCell(window.tmpObj, upId);

      manager.endAddNewSlantDown(reqObj);

      window.tmpObj = tmpObj4Up;
      manager.endAddNewSlantUp({
        floor: reqObj.floor,
        id: upId
      });

      if (reqObj.isEmpty != null) {
        window.tmpObj = null;
        return;
      }

      // window.storage.canvasContainer.stages[reqObj.floor].getElementById('cell', reqObj.id).setSlant('down');
      // window.storage.geometryContainer.getElementById('cell', reqObj.id).slant = 'down';
      //
      // window.storage.canvasContainer.stages[reqObj.floor].getElementById('cell', upId).setSlant('up');
      // window.storage.geometryContainer.getElementById('cell', upId).slant = 'up';
      //
      window.storage.canvasContainer.stages[reqObj.floor].stage.draw();

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

      window.storage.canvasContainer.stages[reqObj.floor].stateLayer.group.makeNewStateAndAdd(reqObj.id, dot);

      window.storage.geometryContainer.stateGeometry.push(new StateGeometry(reqObj.id, dot));

      window.storage.canvasContainer.stages[reqObj.floor].stateLayer.layer.draw();

    };


    /**
     * @memberof GeometryManager
     */
    GeometryManager.prototype.rotateSlant = function(reqObj) {

      var geo = window.storage.geometryContainer.getElementById('cell', reqObj.id);

      if (geo != null) {
        geo.points.splice(geo.points.length, 0, geo.points[0]);
        geo.points.splice(0, 1);

        var canvasObj = window.storage.canvasContainer.getElementById('cell', reqObj.id);
        canvasObj.dots = geo.points;
        canvasObj.addObjectFromDots();
        canvasObj.setSlant(canvasObj.slant.direction);
        geo.slant = canvasObj.slant;

        window.storage.canvasContainer.stages[reqObj.floor].stage.draw();
      }
    };


    GeometryManager.prototype.startAddNewInterConnetction = function(reqObj) {
      var tmpObj = new InterLayerConnectionProperty("tmpObj");
      tmpObj.type = "interlayerConnection";
      window.tmpObj = tmpObj;
    }

    GeometryManager.prototype.addNewInterConnetction = function(reqObj) {
      var manager = window.broker.getManager(
        "addnewinterlayerconnetction",
        "GeometryManager"
      );

      var isState = manager.isStateSelected(reqObj.floor);
      if(isState instanceof Array) isState = isState[0];

      var layer = window.storage.propertyContainer.getElementById('floor', reqObj.floor).layer;

      if (isState) {
        window.tmpObj.addState(isState);
      }
    }

    GeometryManager.prototype.endAddNewInterConnetction = function(reqObj) {
      var newInter = new InterLayerConnectionProperty(reqObj.id);
      newInter.interConnects = window.tmpObj.interConnects.slice(0);
      newInter.connectedLayer = window.tmpObj.connectedLayer.slice(0);
      window.tmpObj = null;

      window.storage.propertyContainer.interlayerConnections.push(newInter);
    }

    GeometryManager.prototype.addCellsFromGML = function(reqObj){

      var dotFool = window.storage.dotFoolContainer.getDotFool(reqObj.floor);

      // add cellspace
      for(var cell of reqObj.data){

        if(cell.points.length == 0) continue;

        var dots = [];
        for(var point of cell.points){
          var dot = dotFool.getDotByPoint({
            x: point[0],
            y: point[1]
          });

          if (dot == null) {
            dot = new Dot(point[0], point[1]);
            dotFool.push(dot);
          }

          dots.push(dot);
        }

        var cellObj = new Cell(cell.id);
        cellObj.dots = dots;
        window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.add(cellObj);
        window.storage.canvasContainer.stages[reqObj.floor].cellLayer.layer.draw();

        // geometry container
        window.storage.geometryContainer.cellGeometry.push(
          new CellGeometry(cell.id, cellObj.getDots())
        );
      }
    }

    GeometryManager.prototype.addCellBoundariesFromGML = function(reqObj){

      var dotFool = window.storage.dotFoolContainer.getDotFool(reqObj.floor);

      for(var cb of reqObj.data){

        if(cb.points.length == 0) continue;

        var dots = [];
        for(var point of cb.points){
          var dot = dotFool.getDotByPoint({
            x: point[0],
            y: point[1]
          });

          if (dot == null) {
            dot = new Dot(point[0], point[1]);
            dotFool.push(dot);
          }

          dots.push(dot);
        }

        var cbObj = new CellBoundary(cb.id);
        cbObj.dots = dots;
        cbObj.setCornersVisible(false);
        window.storage.canvasContainer.stages[reqObj.floor].cellBoundaryLayer.group.add(cbObj);
        window.storage.canvasContainer.stages[reqObj.floor].cellBoundaryLayer.layer.draw();


        window.storage.geometryContainer.cellBoundaryGeometry.push(
          new CellBoundaryGeometry(cbObj.id, cbObj.dots)
        );

      }
    }

    return GeometryManager;
  });
