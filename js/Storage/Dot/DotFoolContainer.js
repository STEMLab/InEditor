/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "./DotFool.js"
], function(
  DotFool
) {
  'use strict';

  /**
   * @class DotFoolContainer
   */
  function DotFoolContainer() {

    /**
    * @memberof DotFoolContainer
    */
    this.floor = [];

  }

  /**
  * @memberof DotFoolContainer
  * @param String floorId id of floor
  * @return true : successed to add new dot fool<br>false : fail to add new dot fool
  */
  DotFoolContainer.prototype.add = function( floorId ) {

    if( this.floor[floorId] != null ) return false;

    this.floor[floorId] = new DotFool();

  }




  return DotFoolContainer;
});
