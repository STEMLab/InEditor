/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class TransitionGeometry
  */
  function TransitionGeometry() {

    /**
    * @memberof TransitionGeometry
    */
    this.id;

    /**
    * @memberof TransitionGeometry
    */
    this.points = [];
  }

  /**
  * @memberof TransitionGeometry
  */
  TransitionGeometry.prototype.load = function(values){
    this.id = values.id;
    this.connects = values.points;
  }

  return TransitionGeometry;
});
