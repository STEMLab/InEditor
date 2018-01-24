/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([],function() {
  'use strict';

  /**
  * @exports FloorProperty
  */
  function FloorProperty() {

    this.id = window.conditions.pre_floor + (++window.conditions.LAST_FLOOR_ID_NUM);
    this.name = this.id;
    this.level = window.conditions.LAST_FLOOR_ID_NUM;
    this.lowerCorner = [0, 0, 0];
    this.upperCorner = [0, 0, 0];
    this.groundHeight = 0;
    this.celingHeight = 0;
    this.doorHeight = 0;
    this.description = new String();
    this.cellKey = [];
    this.cellBoundaryKey = [];
    this.stateKey = [];
    this.transitionKey = [];

  }

  return FloorProperty;
});
