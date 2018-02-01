/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "../Object/Cell.js"
], function(
  Cell
) {
  'use strict';

  /**
   * @desc
   * @class CellGroup
   */
  function CellGroup() {

    this.cellGroup = new Konva.Group({
      x: 0,
      y: 0
    });
    this.tmpGroup = new Konva.Group({
      x: 0,
      y: 0
    });
    this.cells = []; // Cell array

  }

  /**
   * @memberof CellGroup
   * @param {Cell} obj
   */
  CellGroup.prototype.addNewCell = function(obj) {

    var fullCopyObj = new Cell(obj.id);
    // fullCopyObj.corners = this.copyCorner(obj.corners, fullCopyObj.corners);
    this.copyCorner(obj.corners, fullCopyObj);

    this.cells.push(fullCopyObj);

    // console.log(this.cells[this.cells.length-1].getObject());
    this.cellGroup.add(this.cells[this.cells.length - 1].getPolyObject());
    this.cellGroup.add(this.cells[this.cells.length - 1].getCornersObject());

  }

  /**
   * @memberof CellGroup
   * @param {Konva.Group} obj
   */
  CellGroup.prototype.copyCorner = function(obj, myobj) {

    /********************************************************************************
    ********************** 수정 ******************************************************
    *********************************************************************************/
    var direction = 'counterclockwise';

    // Checks whether the object is drawn clockwise.
    if (obj.children.length > 1 && obj.children[0].attrs.x < obj.children[1].attrs.x) {
      direction = 'clockwise';
    }

    var len = obj.children.length;

    if (direction == 'counterclockwise') {
      // If the object is drawn counterclockwise, copy the object as it is.

      for (var i = 0; i < len; i++) {
        myobj.addCorner({
          x: obj.children[i].attrs.x,
          y: obj.children[i].attrs.y
        });
      }

    } else {

      myobj.addCorner({
        x: obj.children[0].attrs.x,
        y: obj.children[0].attrs.y
      });

      for (var i = 1; i < len; i++) {
        myobj.addCorner({
          x: obj.children[len-i].attrs.x,
          y: obj.children[len-i].attrs.y
        });
      }

    }

  }

  CellGroup.prototype.getCellGroup = function() {
    return this.cellGroup;
  }

  CellGroup.prototype.getTmpGroup = function() {
    return this.tmpGroup;
  }

  return CellGroup;

});
