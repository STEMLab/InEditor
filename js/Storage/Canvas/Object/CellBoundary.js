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
    this.corners = new Konva.Group({
      x: 0,
      y: 0
    });

    /**
    * @memberof CellBoundary
    */
    this.line = new Konva.Line({
          points:[],
          stroke: 'black',
          strokeWidth: 4
    });

    /**
    * @memberof CellBoundary
    */
    this.dots = [];

    /**
    * @memberof CellBoundary
    */
    this.associationCell = null;
  }

  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.addCorner = function( dot ){

    this.addNewDot(dot);

    this.addCornerObj(dot.uuid, dot.getCoor());

  }

  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.addNewDot = function(dot){
    dot.participateObj(this.id, 'cellBoundary');

    this.dots.push(dot);
  }

  CellBoundary.prototype.addCornerObj = function(uuid, coor){

    var rect = new Konva.Rect({
      x: coor.x,
      y: coor.y,
      width: 5,
      height: 5,
      fill: 'white',
      stroke: 'blue',
      strokeWidth: 1
    });

    rect.uuid = uuid;

    this.corners.add(rect);

    this.line.points().push(coor.x, coor.y);

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
  CellBoundary.prototype.getLineObject = function(){
    return this.line;
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

  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.isEmpty = function(){
    if(this.dots.length == 0) return true;

    return false;
  }

  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.addObjectFromDots = function(){

    this.corners.destroyChildren();
    this.line.attrs.points = [];

    for(var key in this.dots){
      this.addCornerObj(this.dots[key].uuid, this.dots[key].getCoor());
    }

  }

  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.setCornersVisible = function(visible){
    this.corners.visible(visible);
  }



  return CellBoundary;

});
