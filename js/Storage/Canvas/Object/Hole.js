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
  * @class Hole
  * @augments Cell
  */
  function Hole(){

    Cell.apply(this, arguments);

    /**
     * @memberof Hole
     */
     this.holeOf =  null;

     this.poly.globalCompositeOperation('xor');

  }

  /**
  * @memberof Hole
  */
  Hole.prototype = Object.create(Cell.prototype);

  /**
  * @memberof Hole
  */
  Hole.prototype.setHoleOf = function(cellId){
    this.holeOf = cellId;
  }


  return Hole;

});
