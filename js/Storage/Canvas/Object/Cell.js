/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
], function(
  Subject
) {
  'use strict';

  /**
   * @desc
   * @class Cell
   */
  function Cell(id) {

    this.id = id;
    this.name = id;

    this.corners = new Konva.Group({
      x: 0,
      y: 0
    });
    this.poly = new Konva.Line({
      points: [],
      fill: '#00D2FF',
      stroke: 'black',
      opacity: 0.3,
      strokeWidth: 1,
      closed: true
    });
  }

  /**
  * @memberof CellGroup
  * @param {Object} x, y
  */
  Cell.prototype.addCorner = function(coor) {
    var rect = new Konva.Rect({
      x: coor.x,
      y: coor.y,
      width: 5,
      height: 5,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1
    });

    this.corners.add(rect);

    this.poly.points().push(coor.x, coor.y);
  }

  /**
  * @memberof CellGroup
  */
  Cell.prototype.getCornersObject = function() {

    return this.corners;

  }

  /**
  * @memberof CellGroup
  */
  Cell.prototype.getPolyObject = function(){

    return this.poly;

  }

  /**
  * @memberof CellGroup
  */
  Cell.prototype.getPointsOfCorners = function(){
    var points = [];
    var len = this.corners.children.length;

    for(var i = 0 ; i < len ; i ++){

      points.push(this.corners.children[i].attrs.x);
      points.push(this.corners.children[i].attrs.y);

    }

    return points;
  }


  return Cell;

});
