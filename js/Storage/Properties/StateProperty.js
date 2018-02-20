/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([],function() {
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

  return StateProperty;
});
