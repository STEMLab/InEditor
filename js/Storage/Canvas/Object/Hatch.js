/**
* @author suheeeee<lalune1120@hotmail.com>
*/
define([
  "./Cell.js",
],function(
  Cell
) {
  'use strict';

  /**
  * @class Hatch
  * @augments Cell
  */
  function Hatch(){

    Cell.apply(this, arguments);

    /**
     * @memberof Hatch
     */
     this.hatchOf =  null;

     this.poly.globalCompositeOperation('multiply');

  }

  /**
  * @memberof Hatch
  */
  Hatch.prototype = Object.create(Cell.prototype);

  /**
  * @memberof Hatch
  */
  Hatch.prototype.setHatchOf = function(cellId){
    this.hatchOf = cellId;
  }

  return Hatch;

});
