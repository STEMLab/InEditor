/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./Dot.js"
], function(
  Dot
) {
  'use strict';

  /**
   * @class DotFool
   */
  function DotFool(floor) {

    /**
     * @memberof DotFool
     */
    this.dots = {};

    /**
     * @memberof DotFool
     */
    this.floor = floor;

  }

  /**
   * @memberof DotFool
   * @param Dot dot
   */
  DotFool.prototype.push = function(dot) {
    if (this.dots[dot.uuid] != null) {

      this.dots[dot.uuid].participateObj(dot.partOf[0]);
      info.error(dot.uuid + " is alreay exist!");
      return;

    } else {

      this.dots[dot.uuid] = dot;

    }
  }


  /**
   * @memberof DotFool
   */
  DotFool.prototype.getDotById = function(id) {

    return this.dots[id];

  }

  /**
   * @memberof DotFool
   * @param {Object} point { x, y }
   */
  DotFool.prototype.getDotByPoint = function(point) {
    var value = Object.values(this.dots);
    var coordinateThreshold = window.conditions.coordinateThreshold;

    // If value exist in boundry, return true.
    // If you want to adjust the recognition sensitivity, modify conditions.coordinateThreshold.
    function isDotExist(value) {
      var d = Math.sqrt(Math.pow(Math.abs(value.point.x - point.x), 2) + Math.pow(Math.abs(value.point.y - point.y), 2));
      return d < coordinateThreshold;
    }

    var filtered = value.filter(isDotExist);

    if (filtered.length == 0) return null;
    if (filtered.length == 1) return filtered[0];
    else {
      log.error("Duplicate dots exist : ", filtered);
      return null;
    }
  }


  /**
   * @memberof DotFool
   * @return true : successed to delete dot<br>false : fail to delete dot
   */
  DotFool.prototype.deleteDot = function(uuid) {

    if (this.dots[uuid] == null) return false;

    /**
     * dot.memberof가 null이 아닐 경우, 해당 객체에서 dot을 제거하는 부분 추가 필요
     */
    delete this.dots[uuid];

    // log.trace(window.storage.dotFoolContainer);
    return true;

  }

  /**
   * @memberof DotFool
   */
  DotFool.prototype.deleteDotFromObj = function(dotUuid, objId) {

    var dot = this.getDotById(dotUuid);

    // Leave Obj
    this.dots[dotUuid].leaveObj(objId);

    if (Object.keys(this.dots[dotUuid].memberOf).length == 0) {
      this.deleteDot(dotUuid);
    }

  }

  /**
   * @memberof DotFool
   * @deprecated
   */
  DotFool.prototype.connectTwoDot = function(uuid1, uuid2, relation, obj) {

    var connection1 = this.getDotById(uuid1).isConnected(uuid2, obj);
    var connection2 = this.getDotById(uuid2).isConnected(uuid1, obj);

    if (!this.getDotById(uuid1).isConnected(uuid2, obj)) {
      this.getDotById(uuid1).connect(uuid2, relation, obj);
    }

    if (!this.getDotById(uuid2).isConnected(uuid1, obj)) {
      this.getDotById(uuid2).connect(uuid1, relation, obj);
    }

  }

  /**
   * @memberof DotFool
   * @return {Boolean}
   */
  DotFool.prototype.isConnected = function(uuid1, uuid2) {

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

    for (var key in commonObj) {
      var type = dot1.memberOf[result[key]];
      var obj;

      switch (type) {
        case 'cell':
          obj = window.storage.canvasContainer.getElementById('cell', commonObj[key]);
          break;
        case 'cellBoundary':
          obj = window.storage.canvasContainer.getElementById('cellBoundary', commonObj[key]);
          break;
        case 'transition':
          obj = window.storage.canvasContainer.getElementById('transition', commonObj[key]);
          break;
        case 'state':
          log.error("Two different dot present on state ! Something wrong.. ");
          return false;
          break;
        default:
          log.error("The value of dot.memberOf is something wrong... Plz check dot : " + uuid1 + " and dot : " + uuid2 + ".");
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

  }

  /**
   * @memberof DotFool
   * @return {Object}
   */
  DotFool.prototype.getDots = function() {
    return this.dots;
  }

  /**
   * @memberof DotFool
   */
  DotFool.prototype.load = function(values) {

    this.floor = values.floor;
    this.dots = {};

    for (var key in values.dots) {
      var tmp = new Dot();
      tmp.load(values.dots[key]);
      this.push(tmp);
    }

  }

  return DotFool;
});
