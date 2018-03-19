/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class StateGeometry
  */
  function StateGeometry() {

    /**
    * @memberof StateGeometry
    */
    this.id;

    /**
    * @memberof StateGeometry
    */
    this.points = new Array(2);
  }

  /**
  * @memberof StateGeometry
  */
  StateGeometry.prototype.load = function(values){
    this.id = values.id;
    this.points = values.points;
  }


  return StateGeometry;
});
