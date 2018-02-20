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
    this.connects = new Array(2); // id of stateGeometry
  }

  return TransitionGeometry;
});
