/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([],function() {
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
    */
    this.lowerCorner = [0, 0];

    /**
    * @memberof FloorProperty
    */
    this.upperCorner = [0, 0];

    /**
    * @memberof FloorProperty
    */
    this.groundHeight = "0";

    /**
    * @memberof FloorProperty
    */
    this.celingHeight = "0";

    /**
    * @memberof FloorProperty
    */
    this.doorHeight = "0";

    /**
    * @memberof FloorProperty
    */
    this.description = new String();

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

  }

  return FloorProperty;
});
