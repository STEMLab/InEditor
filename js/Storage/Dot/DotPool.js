/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Dot.js"], function(Dot) {
  "use strict";

  /**
   * @class DotPool
   */
  function DotPool(floor) {
    /**
     * @memberof DotPool
     */
    this.dots = {};

    /**
     * @memberof DotPool
     */
    this.floor = floor;
  }

  /**
   * @memberof DotPool
   * @param Dot dot
   */
  DotPool.prototype.push = function(dot) {
    if (this.dots[dot.uuid] != null) {
      this.dots[dot.uuid].participateObj(dot.partOf[0]);
      info.error(dot.uuid + " is alreay exist!");
      return;
    } else {
      this.dots[dot.uuid] = dot;
    }
  };

  /**
   * @memberof DotPool
   */
  DotPool.prototype.getDotById = function(id) {
    return this.dots[id];
  };

  /**
   * @memberof DotPool
   * @param {Object} point { x, y }
   */
  DotPool.prototype.getDotByPoint = function(point, type) {
    var value = Object.values(this.dots);
    var coordinateThreshold = require("Conditions").getInstance()
      .realCoordinateThreshold;

    // If value exist in boundry, return true.
    // If you want to adjust the recognition sensitivity, modify conditions.coordinateThreshold.
    function isDotExist(value) {
      var d = Math.sqrt(
        Math.pow(Math.abs(value.point.x - point.x), 2) +
          Math.pow(Math.abs(value.point.y - point.y), 2)
      );
      return d < coordinateThreshold;
    }

    var filtered = value.filter(isDotExist);

    if (filtered.length == 0) return null;
    if (filtered.length == 1) return filtered[0];
    else {
      require("Popup")(
        "warning",
        "The dots are too close!",
        "It is recommended to zoom further."
      );

      return null;
    }
  };

  /**
   * @memberof DotPool
   * @param {Object} point { x, y }
   */
  DotPool.prototype.getDotByPointaAllowDuplication = function(point) {
    var value = Object.values(this.dots);
    var coordinateThreshold = require("Conditions").getInstance()
      .realCoordinateThreshold;

    // If value exist in boundry, return true.
    // If you want to adjust the recognition sensitivity, modify conditions.coordinateThreshold.
    function isDotExist(value) {
      var d = Math.sqrt(
        Math.pow(Math.abs(value.point.x - point.x), 2) +
          Math.pow(Math.abs(value.point.y - point.y), 2)
      );
      return d < coordinateThreshold;
    }

    var filtered = value.filter(isDotExist);

    if (filtered.length == 0) return null;
    else return filtered;
  };

  DotPool.prototype.combineDuplicatedDots = function(dot1, dot2) {
    var coordinateThreshold = require("Conditions").getInstance()
      .realCoordinateThreshold;

    function isSameDot(dot1, dot2) {
      var d = Math.sqrt(
        Math.pow(Math.abs(dot1.point.x - dot2.point.x), 2) +
          Math.pow(Math.abs(dot1.point.y - dot2.point.y), 2)
      );
      return d < coordinateThreshold;
    }

    if (!isSameDot(dot1, dot2)) {
      log.error("Two dots are not duplicated !");
    } else {
      // combind dot2 to dot1
      var keys = Object.keys(dot2.memberOf);

      // for( var i in keys ){
      // }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
  };

  /**
   * @memberof DotPool
   * @return true : successed to delete dot<br>false : fail to delete dot
   */
  DotPool.prototype.deleteDot = function(uuid) {
    if (this.dots[uuid] == null) return false;

    /**
     * dot.memberof가 null이 아닐 경우, 해당 객체에서 dot을 제거하는 부분 추가 필요
     */
    delete this.dots[uuid];

    return true;
  };

  /**
   * @memberof DotPool
   */
  DotPool.prototype.deleteDotFromObj = function(dotUuid, objId) {
    var dot = this.getDotById(dotUuid);

    // Leave Obj
    this.dots[dotUuid].leaveObj(objId);

    if (Object.keys(this.dots[dotUuid].memberOf).length == 0) {
      this.deleteDot(dotUuid);
    }
  };

  /**
   * @memberof DotPool
   * @deprecated
   */
  DotPool.prototype.connectTwoDot = function(uuid1, uuid2, relation, obj) {
    var connection1 = this.getDotById(uuid1).isConnected(uuid2, obj);
    var connection2 = this.getDotById(uuid2).isConnected(uuid1, obj);

    if (!this.getDotById(uuid1).isConnected(uuid2, obj)) {
      this.getDotById(uuid1).connect(uuid2, relation, obj);
    }

    if (!this.getDotById(uuid2).isConnected(uuid1, obj)) {
      this.getDotById(uuid2).connect(uuid1, relation, obj);
    }
  };

  /**
   * @memberof DotPool
   * @return {Boolean}
   */
  DotPool.prototype.isConnected = function(uuid1, uuid2) {
    var dot1 = this.getDotById(uuid1);
    var dot2 = this.getDotById(uuid2);

    var participation1 = Object.keys(dot1.memberOf);
    var participation2 = Object.keys(dot2.memberOf);

    var commonObj = [];
    for (var key in participation1) {
      if (participation2.indexOf(participation1[key]) != -1) {
        commonObj.push(participation1[key]);
      }
    }

    var canvasContainer = require("Storage")
      .getInstance()
      .getCanvasContainer();
    for (var key in commonObj) {
      var type = dot1.memberOf[result[key]];
      var obj;

      switch (type) {
        case "cell":
          obj = canvasContainer.getElementById("cell", commonObj[key]);
          break;
        case "cellBoundary":
          obj = canvasContainer.getElementById("cellBoundary", commonObj[key]);
          break;
        case "transition":
          obj = canvasContainer.getElementById("transition", commonObj[key]);
          break;
        case "state":
          log.error("Two different dot present on state ! Something wrong.. ");
          return false;
          break;
        default:
          log.error(
            "The value of dot.memberOf is something wrong... Plz check dot : " +
              uuid1 +
              " and dot : " +
              uuid2 +
              "."
          );
          return false;
      }

      var dots = obj.getDots();
      var index1 = obj.getDotIndex(uuid1);

      if (index1 == -1) log.error(uuid1 + " + is no exist in " + obj.id);
      else {
        var frontIndex = index1 - 1;
        if (frontIndex == -1) frontIndex = dots.length - 1;

        var backIndex = index1 + 1;
        if (backIndex == dots.length) backIndex = 0;

        if (dots[frontIndex].uuid == uuid2 || dots[backIndex].uuid == uuid2)
          return true;
      }
    }

    return false;
  };

  /**
   * @memberof DotPool
   * @return {Object}
   */
  DotPool.prototype.getDots = function() {
    return this.dots;
  };

  /**
   * @memberof DotPool
   */
  DotPool.prototype.load = function(values) {
    this.floor = values.floor;
    this.dots = {};

    for (var key in values.dots) {
      var tmp = new Dot();
      tmp.load(values.dots[key]);
      this.push(tmp);
    }
  };

  return DotPool;
});
