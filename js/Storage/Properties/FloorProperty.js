/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([],function() {
  'use strict';

  /**
  * @classdesc
  * @class
  */
  function FloorProperty() {

    this.id = window.conditions.pre_floor + (++window.conditions.LAST_FLOOR_ID_NUM);
    this.name = this.id;
    this.level = window.conditions.LAST_FLOOR_ID_NUM;
    this.groundHeight = 0;
    this.celingHeight = 0;
    this.doorHeight = 0;
    this.descript = new String();
    this.cellKey = [];
    this.cellBoundaryKey = [];
    this.stateKey = [];
    this.transitionKey = [];

  }

  return FloorProperty;
});
