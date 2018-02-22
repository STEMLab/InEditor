/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class CellBoundary
  */
  function CellBoundary(){

    this.id = null;
    this.name = null;

    this.corners = Konva.Group({x:0, y:0});
    this.line = new Konva.Line({
          points:[],
          stroke: 'black',
          strokeWidth: 5
    });
  }

  CellBoundary.prototype.addCorner = function(_x, _y){
    var rect = new Konva.Rect({
      x: _x,
      y: _y,
      width: 5,
      height: 5,
      fill: 'white',
      stroke: 'blue',
      strokeWidth: 1
    });

    this.corners.add(rect);

    this.line.points().push(_x, _y);
  }

  CellBoundary.prototype.getCornersObject = function(){
    return this.corners;
  }


  return CellBoundary;

});
