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
     this.description = {};
     var list = require('Conditions').getInstance().descList;
     for(var l of list){
       this.description[l] = "";
     }


    /**
     * @memberof StateProperty
     */
    this.duality = ""; // CellSpace

    /**
     * @memberof StateProperty
     */
    this.connects = [];

    /**
     * @memberof StateProperty
     */
     this.height = 0;
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
    this.height = values.height;

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

  /**
  * @memberof StateProperty
  * @param {String} id of connected dot
  */
  StateProperty.prototype.setHeight = function(height){
    this.height = height;
  }

  return StateProperty;
});
