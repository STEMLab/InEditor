define([
  "../Object/Cell.js"
],function(
  Cell
) {
  'use strict';


  function CellGroup(){

    this.cellGroup = new Konva.Group({ x: 0, y: 0 });
    this.tmpGroup = new Konva.Group({x: 0, y: 0});
    this.cells = []; // Cell array

  }

  /**
  * @param {Cell} obj
  */
  CellGroup.prototype.addNewCell = function(obj){

    this.cells.push(obj);
    this.cellGroup.add(this.cells[this.cells.length-1].getObject());

  }

  CellGroup.prototype.getCellGroup = function(){
    return this.cellGroup;
  }

  CellGroup.prototype.getTmpGroup = function(){
    return this.tmpGroup;
  }

  return CellGroup;

});
