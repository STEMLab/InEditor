/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class Dot
   */
  function Dot(_x, _y) {
    /**
     * @memberof Dot
     */
    this.uuid = window.conditions.guid();

    /**
     * @memberof Dot
     */
    this.point = {
      x: _x,
      y: _y
    };

    /**
     * @memberof Dot
     * @desc key : id of object<br>value : type of object(cell, cellBoundary,  ...).
     */
    this.memberOf = {};

  }

  /**
   * @memberof Dot
   * @deprecated
   */
  Dot.prototype.connect = function(uuid, relation, obj) {

    if (this.isConnected(uuid, obj)) {
      this.connects[uuid].push({
        'relation': relation,
        'obj': obj
      });
    } else {
      this.connects[uuid] = [{
        'relation': relation,
        'obj': obj
      }];
    }
  }

  /**
   * @memberof Dot
   * @deprecated
   */
  Dot.prototype.disConnect = function(uuid, object) {

    if (object == null) {

      // disconnect in data
      delete this.connects[uuid];
      delete window.dotFoolContainer.getDotById(uuid).connects[this.uuid];

      // disconnect in canvas
      // 만약 cell에 celll boundary가 추가 되었을 경우, cell의 값을 어떻게 변화 시켜 주어야 하는가?

    } else {

      if (this.isConnected(uuid)) {
        if (this.connects[uuid].length == 1) {
          delete this.connects[uuid];
          delete window.dotFoolContainer.getDotById(uuid).connects[this.uuid];
        } else {
          for (var key in this.connects[uuid]) {
            if (this.connects[uuid][key].obj == object) {
              this.connects[uuid].splice(key, 1);
              return;
            }
          }

          var target = window.dotFoolContainer.getDotById(uuid);
          for (var key in target.connects[this.uuid]) {
            if (target.connects[this.uuid][key].obj == object) {
              window.dotFoolContainer.getDotById(uuid).connects[this.uuid].splice(key, 1);
            }
          }

        }
      } else info.warn(this.uuid + " and " + uuid + " is not connected !");
    }
  }


  /**
   * @memberof Dot
   * @deprecated
   */
  Dot.prototype.isConnected = function(uuid, obj) {

    if (obj == null && this.connects[uuid] != null)
      return this.connect[uuid];

    if (obj != null && this.connects[uuid] != null) {
      for (var key in this.connects[uuid]) {
        if (this.connects[uuid][key].obj == obj) return true;
      }
    }
    return false;

  }

  /**
   * @memberof Dot
   */
  Dot.prototype.getCoor = function() {

    return this.point;

  }

  /**
   * @memberof Dot
   */
  Dot.prototype.isPartOf = function(objId) {

    if (this.partOf[objId] != null) return true;
    else return false;

  }

  /**
   * @memberof Dot
   */
  Dot.prototype.participateObj = function(objId, type) {

    if (this.memberOf[objId] != null) {
      log.info(this.uuid + " is already part of " + objId + " !");
    } else {
      this.memberOf[objId] = type;
    }

  }

  /**
   * @memberof Dot
   */
  Dot.prototype.leaveObj = function(objId) {

    if (this.memberOf[objId] == null) {
      log.info(this.uuid + " is already not part of " + objId + " !");
    } else {
      delete this.memberOf[objId];
    }

  }


  /**
   * @memberof Dot
   */
  Dot.prototype.load = function(values) {

    this.uuid = values.uuid;

    this.point = {
      x: values.point.x,
      y: values.point.y
    };

    this.memberOf = {};
    for(var key in values.memberOf){
      this.memberOf[key] = values.memberOf[key];
    }

  }

  /**
   * @memberof Dot
   */
   Dot.prototype.isState = function(){

     var values = Object.values(this.memberOf);
     if( values.indexOf('state') == -1) return false;
     return true;

   }

   /**
    * @memberof Dot
    */
    Dot.prototype.isPartOfCellBoundary = function(){

      var values = Object.values(this.memberOf);
      if( values.indexOf('cellBoundary') == -1) return false;
      return true;

    }

    /**
     * @memberof Dot
     */
    Dot.prototype.getMemberOf = function(type){
      return this.memberOf;
    }

    /**
     * @memberof Dot
     */
    Dot.prototype.setPoint = function(point){
      this.point = point;
    }

  return Dot;
});
