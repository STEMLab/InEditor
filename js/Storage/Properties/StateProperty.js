/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class StateProperty
   */
  function StateProperty() {

    /**
     * @memberof StateProperty
     */
    this.id;

    /**
     * @memberof StateProperty
     */
    this.name;

    /**
     * @memberof StateProperty
     */
    this.description;

    /**
     * @memberof StateProperty
     */
    this.duality; // CellSpace

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

  return StateProperty;
});
