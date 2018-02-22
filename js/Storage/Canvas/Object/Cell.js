/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
   * @class Cell
   */
  function Cell(id) {

    /**
    * @memberof Cell
    */
    this.id = id;

    /**
    * @memberof Cell
    */
    this.name = id;

    /**
    * @memberof Cell
    */
    this.corners = new Konva.Group({
      x: 0,
      y: 0
    });

    /**
    * @memberof Cell
    */
    this.poly = new Konva.Line({
      points: [],
      fill: '#00D2FF',
      stroke: 'black',
      opacity: 0.3,
      strokeWidth: 1,
      closed: true
    });

    /**
    * @memberof Cell
    */
    this.dots = [];
  }

  /**
  * @memberof Cell
  * @param {Object} x, y
  */
  Cell.prototype.addCorner = function( uuid ){

    this.addNewDot(uuid);

    // Modify the connect value of the input dot if there is a point added just before it.
    this.addCornerObj( uuid, window.storage.dotFoolContainer.getDotById(uuid).getCoor());

  }

  /**
  * @memberof Cell
  * @param {Object} cor x, y
  * @param String uuid of dot
  */
  Cell.prototype.addCornerObj = function(uuid, coor) {
    var rect = new Konva.Rect({
      x: coor.x,
      y: coor.y,
      width: 5,
      height: 5,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1
    });

    rect.uuid = uuid;

    this.corners.add(rect);

    this.poly.points().push(coor.x, coor.y);
  }

  /**
  * @memberof Cell
  */
  Cell.prototype.deleteLastCorner = function(){

    this.corners.children[this.corners.children.length-1].destroy();

  }

  /**
  * @memberof Cell
  */
  Cell.prototype.deleteLastPolyLine = function(){

    this.poly.attrs.points = this.poly.attrs.points.slice(0, this.poly.attrs.points.length-2);

  }

  /**
  * @memberof Cell
  */
  Cell.prototype.getCornersObject = function() {

    return this.corners;

  }

  /**
  * @memberof Cell
  */
  Cell.prototype.getPolyObject = function(){

    return this.poly;

  }

  /**
  * @memberof Cell
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

  /**
  * @memberof Cell
  */
  Cell.prototype.destory = function(){

    this.corners.destroy();
    this.poly.destroy();

  }

  /**
  * @memberof Cell
  */
  Cell.prototype.addNewDot = function( uuid ){

    this.dots.push(uuid);

  }

  return Cell;

});
