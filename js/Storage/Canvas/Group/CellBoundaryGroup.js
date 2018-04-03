/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "../Object/CellBoundary.js"
],function(
  CellBoundary
) {
  'use strict';

  /**
  * @class CellBoundaryGroup
  */
  function CellBoundaryGroup(){

    /**
    * @memberof CellBoundaryGroup
    */
    this.cellBoundaryGroup = new Konva.Group({ x: 0, y: 0 });

    /**
    * @memberof CellBoundaryGroup
    */
    this.cellBoundaries = []; // CellBoundary array

  }

  /**
  * @memberof CellBoundaryGroup
  * @param {CellBoundary} obj
  */
  CellBoundaryGroup.prototype.add = function(obj){

    var newCB = new CellBoundary(obj.id);

    this.copyDots(newCB, obj.dots);

    newCB.addObjectFromDots();

    this.cellBoundaries.push(newCB);

    this.cellBoundaryGroup.add(newCB.getCornersObject());
    this.cellBoundaryGroup.add(newCB.getLineObject());

  }

  CellBoundaryGroup.prototype.simpleAdd = function(obj){

    var newCB = new CellBoundary(obj.id);
    newCB.dots = obj.dots;
    newCB.addObjectFromDots();
    newCB.corners.visible(false);

    this.cellBoundaries.push(newCB);

    this.cellBoundaryGroup.add(newCB.getCornersObject());
    this.cellBoundaryGroup.add(newCB.getLineObject());

  }

  /**
  * @memberof CellBoundaryGroup
  */
  CellBoundaryGroup.prototype.getGroup = function(){
    return this.cellBoundaryGroup;
  }

  /**
  * @memberof CellBoundaryGroup
  */
  CellBoundaryGroup.prototype.getConnection = function(){
    /**
    * need to develop
    */
    return [];
  }


  /**
  * @memberof CellBoundaryGroup
  */
  CellBoundaryGroup.prototype.copyDots = function(cb, dots){

    var len = dots.length;

    for(var i = 0 ; i < len ; i++) cb.addNewDot(dots[i]);

  }

  /**
  * @memberof cellBoundaryGroup
  */
  CellBoundaryGroup.prototype.getObjects = function(){
    return this.cellBoundaries;
  }

  return CellBoundaryGroup;

});
