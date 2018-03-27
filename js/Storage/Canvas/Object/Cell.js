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
      fill: Konva.Util.getRandomColor(),
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
  * @param {Dot} dot
  */
  Cell.prototype.addCorner = function( dot ){

    this.addNewDot(dot);

    // Modify the connect value of the input dot if there is a point added just before it.
    this.addCornerObj( dot.uuid, dot.getCoor());

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

    this.dots.splice(this.dots.length-1, 1);
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
  Cell.prototype.getLastDot = function(){

    return this.dots[this.dots.length-1];

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
  Cell.prototype.destroy = function(floor){

    this.corners.destroy();
    this.poly.destroy();

  }

  /**
  * @memberof Cell
  */
  Cell.prototype.addNewDot = function( dot ){

    dot.participateObj(this.id, 'cell');

    this.dots.push(dot);

  }

  /**
  * @memberof Cell
  */
  Cell.prototype.addObjectFromDots = function(){

    this.corners.destroyChildren();
    this.poly.attrs.points = [];

    for(var key in this.dots){
      this.addCornerObj(this.dots[key].uuid, this.dots[key].getCoor());
    }

  }

  /**
  * @memberof Cell
  */
  Cell.prototype.getDots = function(){
    return this.dots;
  }

  /**
  * @memberof Cell
  */
  Cell.prototype.getDotIndex = function(uuid){
    for(var key in this.dots){
      if(this.dots[key].uuid == uuid) return key;
    }

    return -1;
  }

  /**
  * @memberof Cell
  */
  Cell.prototype.isEmpty = function(){
    if(this.dots.length == 0) return true;

    return false;
  }

  /**
  * @memberof Cell
  * @param {Object} point1
  * @param {Object} point2
  * @desc Plz sure that inputed values are already snapping.
  */
  Cell.prototype.isPartOf = function(point1, point2){

    function isSame(A, B){
      var isSameX = (Math.abs(A.x - B.x) <= 0.0001);
      var isSameY = (Math.abs(A.y - B.y) <= 0.0001);

      return (isSameX && isSameY);
    }

    var len = this.dots.length;

    for(var i = 0 ; i < len ; i ++ ){
      var line;
      if( i == len - 1 ) line = { 'dot1' : this.dots[i], 'dot2' : this.dots[0] };
      else line = { 'dot1' : this.dots[i], 'dot2' : this.dots[i + 1] };

      // dot1 -> dot2
      var V1 = {
        x: line.dot2.point.x - line.dot1.point.x,
        y: line.dot2.point.y - line.dot1.point.y
      };

      var V2;

      if( point2 == null ){

        // dot1 -> point1
        V2 = {
          x: point1.x - line.dot1.point.x,
          y: point1.y - line.dot1.point.y
        };

      } else {

        // point1 -> point2
        V2 = {
          x: point2.x - point1.x,
          y: point2.y - point1.y
        };

      }

      var cos = (V1.x * V2.x + V1.y * V2.y) /
                ( Math.sqrt(Math.pow(V1.x, 2) + Math.pow(V1.y, 2))
                  * Math.sqrt(Math.pow(V2.x, 2) + Math.pow(V2.y, 2)));

      var threshold = 0.0000001;

      if( ( 1 - threshold <= cos && cos <= 1 + threshold ) || ( (-1) - threshold <= cos && cos <= (-1) + threshold ) ){

        // if point1 is part of this line.
        return { 'result' : true, 'connection' : line };

      }

    }

    return { 'result' : false };

  }


  /**
  * @memberof Cell
  */
  Cell.prototype.insertDotIntoLine = function(line, point){

    var indexOfDot1 = this.dots.getDotIndex(line.dot1.uuid);
    var indexOfDot2 = this.dots.getDotIndex(line.dot2.uuid);

    if(indexOfDot1 == -1 || indexOfDot2 == -1){

      log.warn('Cell.insertDotIntoLine : inserted line is not part of '+this.id);
      return;

    }

    if(indexOfDot1 > indexOfDot2) this.dots.splice(indexOfDot2, 0, point);
    else this.dots.splice(indexOfDot1, 0, point);

    this.addObjectFromDots();

    point.participateObj(this.id, 'cell');

  }

  return Cell;

});
