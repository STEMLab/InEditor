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
    this.uuid = require('Conditions').getInstance().guid();

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
