/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class TransitionGeometry
  */
  function TransitionGeometry(id, connects, dots) {

    /**
    * @memberof TransitionGeometry
    */
    this.id = id;

    /**
    * @memberof TransitionGeometry
    */
    this.connects = connects;

    /**
    * @memberof TransitionGeometry
    */
    this.points = dots;
  }

  /**
  * @memberof TransitionGeometry
  */
  TransitionGeometry.prototype.load = function(values){
    this.id = values.id;
    this.connects = values.connects;
    this.points = points
  }

  return TransitionGeometry;
});
