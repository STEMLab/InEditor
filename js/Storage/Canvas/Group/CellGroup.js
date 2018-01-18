define([
  "../Object/Cell.js"
],function(
  Cell
) {
  'use strict';


  function CellGroup(){

    this.cellGroup = new Konva.Group({ x: 0, y: 0 });
    this.cells = []; // Cell array

  }

  CellGroup.prototype.addNewCell = function(){

    console.log(Conditions.pre_cell+Conditins.LAST_CELL_ID_NUM);
    cells.push(new Cell(Conditions.pre_cell+Conditins.LAST_CELL_ID_NUM));
    console.log("add cell complete : ", this);
  }

  CellGroup.prototype.getGroup = function(){
    return this.cellGroup;
  }

  return CellGroup;

});
