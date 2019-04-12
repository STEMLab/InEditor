/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class FloorProperty
   */
  function FloorProperty(id) {

    /**
     * @memberof FloorProperty
     */
    this.id = id;

    /**
     * @memberof FloorProperty
     */
    this.name = this.id;

    /**
     * @memberof FloorProperty
     */
    this.level = window.conditions.LAST_FLOOR_ID_NUM;

    /**
     * @memberof FloorProperty
     * @default x : 0, y : 0
     */
    this.lowerCorner = [0, 0];

    /**
     * @memberof FloorProperty
     * @default x : 400, y : 100
     */
    this.upperCorner = [400, 300];

    /**
     * @memberof FloorProperty
     */
    this.groundHeight = "0";

    /**
     * @memberof FloorProperty
     * @default 20
     */
    this.celingHeight = "20";

    /**
     * @memberof FloorProperty
     * @default 15
     */
    this.doorHeight = "15";

    /**
     * @memberof FloorProperty
     */
     this.description = {};
     var list = window.conditions.descList;
     for(var l of list){
       this.description[l] = "";
     }

    /**
     * @memberof FloorProperty
     */
    this.cellKey = [];

    /**
     * @memberof FloorProperty
     */
    this.cellBoundaryKey = [];

    /**
     * @memberof FloorProperty
     */
    this.stateKey = [];

    /**
     * @memberof FloorProperty
     */
    this.transitionKey = [];

    /**
    * @memberof FloorProperty
    */
    this.layer = "base";
  }

  FloorProperty.prototype.load = function(values) {

    this.name = values.name;

    this.level = values.level;

    this.lowerCorner = values.lowerCorner;

    this.upperCorner = values.upperCorner;

    this.groundHeight = values.groundHeight;

    this.celingHeight = values.celingHeight;

    this.doorHeight = values.doorHeight;

    this.description = values.description;

    this.cellKey = values.cellKey;

    this.cellBoundaryKey = values.cellBoundaryKey;

    this.stateKey = values.stateKey;

    this.transitionKey = values.transitionKey;

    this.layer = values.layer;

  }

  FloorProperty.prototype.getId = function(){
    return this.id;
  }

  FloorProperty.prototype.setMapCoor = function(bottomLeft, topRight){
    this.lowerCorner = bottomLeft;
    this.upperCorner = topRight;
  }

  return FloorProperty;
});
