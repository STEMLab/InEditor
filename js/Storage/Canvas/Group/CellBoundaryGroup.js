define([
  "../Object/Cell.js"
],function(
  Cell
) {
  'use strict';

  function CellBoundaryGroup(){

    this.cellBoundaryGroup = new Konva.Group({ x: 0, y: 0 });
    this.cellBoundaries = []; // Cell array

  }

  CellBoundaryGroup.prototype.addCellBoundary = function(){

    cellBoundaries.push(new CellBoundary());
    cellBoundaryGroup.add(cellBoundaries[cellBoundaries.lenght-1].corners, cellBoundaries[cellBoundaries.lenght-1].line);
    console.log("add cellBoundaries complete : ", this);
  }

  CellBoundaryGroup.prototype.getGroup = function(){
    return this.cellBoundaryGroup;
  }

  return CellBoundaryGroup;

});
