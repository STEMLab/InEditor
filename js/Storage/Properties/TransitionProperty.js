/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([],function() {
  'use strict';

  /**
  * @class TransitionProperty
  */
  function TransitionProperty() {

    /**
    * @memberof TransitionProperty
    */
    this.id;

    /**
    * @memberof TransitionProperty
    */
    this.name;

    /**
    * @memberof TransitionProperty
    */
    this.description;

    /**
    * @memberof TransitionProperty
    */
    this.weight;

    /**
    * @memberof TransitionProperty
    */
    this.connects = new Array(2);

    /**
    * @memberof TransitionProperty
    */
    this.duality; // CellSpaceBoundary
  }

  /**
  * @memberof TransitionProperty
  */
  TransitionProperty.prototype.load = function(values){

    this.id = values.id;
    this.name = values.name;
    this.description = values.description;
    this.weight = values.weight;
    this.duality = values.duality;
    this.connects = values.connects;

  }

  return TransitionProperty;
});
