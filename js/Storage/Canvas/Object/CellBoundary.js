/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class CellBoundary
  */
  function CellBoundary(id){

    /**
    * @memberof CellBoundary
    */
    this.id = id;

    /**
    * @memberof CellBoundary
    */
    this.name = id;

    /**
    * @memberof CellBoundary
    */
    this.corners = Konva.Group({x:0, y:0});

    /**
    * @memberof CellBoundary
    */
    this.line = new Konva.Line({
          points:[],
          stroke: 'black',
          strokeWidth: 5
    });

    /**
    * @memberof CellBoundary
    */
    this.dots = [];
  }

  /**
  * @memberof CellBoundary
  */
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

  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.getCornersObject = function(){
    return this.corners;
  }

  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.getDots = function(){
    return this.dots;
  }

  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.getDotIndex = function(uuid){
    for(var key in this.dots){
      if(this.dots[key].uuid == uuid) return key;
    }

    return -1;
  }

  return CellBoundary;

});
