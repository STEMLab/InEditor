/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "../../Dot/DotMath.js"
], function(
  DotMath
) {
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

    dot.participateObj(this.id, 'cellBoundary');

  }

  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.insertCorner = function(dot, index){

    // if index == undefined
    if( index == undefined ){

      for(var i = 0 ; i < this.dots.length - 1; i ++){

        var line = { dot1 : this.dots[i], dot2 : this.dots[i+1] };

        if( DotMath.isLineContainDot(line, dot) ){

          this.dots.splice(i, 0, dot);
          dot.participateObj(this.id, 'cellBoundary');
          this.addObjectFromDots();

        }

      }

    } else {

      if(this.dots.length <= index ) return;
      if( DotMath.isLineContainDot({ dot1 : this.dots[index-1], dot2 : this.dots[index] }, dot) ){

        this.dots.splice(index, 0, dot);
        dot.participateObj(this.id, 'cellBoundary');
        this.addObjectFromDots();

      }

    }

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

  /**
  * @memberof Transition
  */
  CellBoundary.prototype.insertDot = function(index, dot){

    this.dots.splice(index, 0, dot);
    dot.participateObj(this.id, 'cellBoundary');
    this.addObjectFromDots();

  }

  /**
   * @memberof CellBoundary
   */
  CellBoundary.prototype.replaceDot = function(dot, index) {
    this.dots[index].leaveObj(this.id);
    this.dots.splice(index, 1);
    this.dots.splice(index, 0, dot);
    dot.participateObj(this.id, 'cellBoundary');
    this.addObjectFromDots();
  };


  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.insertDotIntoLine = function(line, point){

    var indexOfDot1 = this.dots.getDotIndex(line.dot1.uuid);
    var indexOfDot2 = this.dots.getDotIndex(line.dot2.uuid);

    if(indexOfDot1 == -1 || indexOfDot2 == -1){

      log.warn('Cell.insertDotIntoLine : inserted line is not part of '+this.id);
      return;

    }

    if(indexOfDot1 > indexOfDot2) this.dots.splice(indexOfDot2, 0, point);
    else this.dots.splice(indexOfDot1, 0, point);

    this.addObjectFromDots();

    point.participateObj(this.id, 'cellBoundary');

  }

  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.removeDot = function(uuid){
    var i = 0;
    for(i = this.dots.length - i - 1 ; i > -1 ; i++){
      if( this.dots[i].uuid == uuid ){
        this.dots.splice(i, 1);
        this.addObjectFromDots();
        break;
      }
    }
  }

  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.getLastDot = function(){
    return this.dots[this.dots.length - 1];
  }


  /**
  * @memberof CellBoundary
  */
  CellBoundary.prototype.destroy = function(){

    this.corners.destroy();
    this.line.destroy();

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
  CellBoundary.prototype.changeLineColor = function(color){
    this.line.setAttr('stroke', color);
  }

  /**
  * @memberof CellBoundary
  * @desc If the dot, inserted as parameter, is located the middle of the line which consists of other dots of this object and the dot not belongs in another object except this, the dot could be removed from this object.
  */
  CellBoundary.prototype.isRemovableDot = function(dot){

    for(var i = 0 ; i < this.dots.length - 2; i++){
      if( dot == this.dots[i] || dot == this.dots[i+2] ) continue;

      var line = {dot1 : this.dots[i], dot2: this.dots[i+2]};
      if(DotMath.isLineContainDot(line, dot) && Object.keys(dot.getMemberOf()).length == 1 ){
        return true;
      }
    }

    return false;

  }

  // now this only check line case
  CellBoundary.prototype.isPartOf = function(point1, point2){
    for(var i = 0; i < this.dots.length - 1; i++){
      if((this.dots[i] == point1 && this.dots[i+1] == point2) ||
         (this.dots[i] == point2 && this.dots[i+1] == point1))
         return true;
    }
    return false;
  }

  CellBoundary.prototype.getWKT = function(){
    var wkt = "LINESTRING (";

    for (var i = 0; i < this.dots.length; i++) {
      wkt += this.dots[i].point.x + " " + this.dots[i].point.y;

      if( i != this.dots.length -1 ) wkt += ", ";
    }

    wkt += ")";

    return wkt;
  }

  return CellBoundary;

});
