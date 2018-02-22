/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "./Dot.js"
], function(
  Dot
) {
  'use strict';

  /**
   * @class DotFoolContainer
   */
  function DotFoolContainer() {

    /**
    * @memberof DotFoolContainer
    */
    this.dotFool = {};

  }

  /**
  * @memberof DotFoolContainer
  * @return true : successed to add new dot<br>false : fail to add new dot
  */
  DotFoolContainer.prototype.addNewDot = function( dot ) {

    this.dotFool[ dot.uuid ] = dot;

  }

  /**
  * @memberof DotFoolContainer
  * @param String floor id
  * @return Object key : uuid<br>value : Dot
  */
  DotFoolContainer.prototype.getAllDotInFloor = function( floor ){

    var keys = Object.keys(this.dotFool);
    var result = {};

    for( var key in keys ){
      if( this.dotFool[key].floor == floor ) result[key] = this.dotFool[key];
    }

    return result;

  }

  DotFoolContainer.prototype.getDotById = function( uuid ){
    return this.dotFool[uuid];
  }


  return DotFoolContainer;
});
