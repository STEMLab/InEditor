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

     this.type = 'hole';
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

  Hole.prototype.addNewDot = function(dot){
    if(dot == undefined || dot == null){
      log.info(dot);
    }
    dot.participateObj(this.id, "hole");

    this.dots.push(dot);
  }


  return Hole;

});
