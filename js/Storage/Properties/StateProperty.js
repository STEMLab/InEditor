/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class StateProperty
   */
  function StateProperty(id) {

    /**
     * @memberof StateProperty
     */
    this.id = id;

    /**
     * @memberof StateProperty
     */
    this.name = id;

    /**
     * @memberof StateProperty
     */
    this.description = "";

    /**
     * @memberof StateProperty
     */
    this.duality = ""; // CellSpace

    /**
     * @memberof StateProperty
     */
    this.connects = [];
  }

  /**
   * @memberof StateProperty
   */
  StateProperty.prototype.load = function(values){

    this.id = values.id;
    this.name = values.name;
    this.description = values.description;
    this.duality = values.duality;
    this.connects = values.connects;

  }

  /**
  * @memberof StateProperty
  */
  StateProperty.prototype.setDuality = function(duality){

    this.duality = duality;

  }

  /**
  * @memberof StateProperty
  */
  StateProperty.prototype.getId = function(){
    return this.id;
  }

  /**
  * @memberof StateProperty
  * @param {String} id of connected dot
  */
  StateProperty.prototype.addConnects = function(connect){
    this.connects.push(connect);
  }

  return StateProperty;
});
