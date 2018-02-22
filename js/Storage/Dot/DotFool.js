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
   * @class DotFool
   */
  function DotFool() {

    /**
    * @memberof DotFool
    */
    this.dots = {};

  }

  /**
  * @memberof DotFool
  * @param Dot dot
  */
  DotFool.prototype.push = function( dot ){
    if(this.dots[dot.uuid] != null ) {

      info.error(dot.uuid + " is alreay exist!");
      return;

    }
    else {

      this.dots[dot.uuid] = dot;

    }
  }

  /**
  * @memberof DotFool
  */
  DotFool.prototype.getDotById = function( id ){

    return this.dots[id];

  }

  /**
  * @memberof DotFool
  * @return true : successed to delete dot<br>false : fail to delete dot
  */
  DotFool.prototype.deleteDot = function( id ){

    if( this.dots[id] == null ) return false;

    delete this.dots[uuid];
    return true;

  }


  return DotFool;
});
