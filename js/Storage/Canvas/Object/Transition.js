/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class Transition
  */
  function Transition(id) {

    /**
    * @memberof Transition
    */
    this.id = id;

    /**
    * @memberof Transition
    */
    this.line = new Konva.Line({
      points: [],
      stroke: Konva.Util.getRandomColor(),
      strokeWidth: 1,
      lineCap: 'round'
    });

    /**
    * @memberof Transition
    */
    this.dots = [];

  }

  /**
  * @memberof Transition
  */
  Transition.prototype.getLineObject = function(){
    return this.line;
  }

  /**
  * @memberof Transition
  */
  Transition.prototype.getDots = function(){
    return this.dots;
  }

  /**
  * @memberof Transition
  */
  Transition.prototype.isEmpty = function(){

    if( this.dots.length == 0 ) return true;

    return false;

  }

  /**
  * @memberof Transition
  */
  Transition.prototype.addState = function(dot){

    if( this.dots.indexOf(dot) == -1 ){
      this.dots.push(dot);
      this.line.getAttr('points').push(dot.point.x, dot.point.y);
      dot.participateObj(this.id, 'transition');
    }

  }

  /**
  * @memberof Transition
  */
  Transition.prototype.removeState = function(dot){

    if( this.dots.indexOf(dot) == -1) return;

    this.dots.splice(this.dots.indexOf(dot), 1);
    this.addObjectFromDots();

  }

  /**
  * @memberof Transition
  */
  Transition.prototype.insertDot = function(index, dot){

    this.dots.splice(index, 0, dot);
    dot.participateObj(this.id, 'transition');
    this.addObjectFromDots();

  }

  /**
   * @memberof Cell
   */
  Transition.prototype.replaceDot = function(dot, index) {
    this.dots[index].leaveObj(this.id);
    this.dots.splice(index, 1);
    this.dots.splice(index, 0, dot);
    dot.participateObj(this.id, 'transition');
    this.addObjectFromDots();
  };

  /**
  * @memberof Transition
  */
  Transition.prototype.addObjectFromDots = function(){

    var points = [];

    for(var key in this.dots){
      points.push(this.dots[key].point.x);
      points.push(this.dots[key].point.y);
    }

    this.line.attrs.points = points;

  }

  /**
  * @memberof Transition
  */
  Transition.prototype.getConnection = function(){
    var result = [];
    var connects = [this.dots[0], this.dots[this.dots.length - 1]];

    for(var i = 0 ; i < 2; i++){
      for(var key in connects[i].memberOf){
        if(connects[i].memberOf[key] == 'state') {
          result.push(key);
          break;
        }
      }

    }

    return result;
  }

  /**
  * @memberof Transition
  */
  Transition.prototype.getDots = function(){
    return this.dots;
  }

  /**
  * @memberof Transition
  */
  Transition.prototype.getDuality = function(){

    for(var i = 0 ; i < this.dots.length; i++){
      for(var key in this.dots[i].memberOf){
        if(this.dots[i].memberOf[key] == 'cellBoundary') return key;
      }
    }

    return null;

  }

  /**
  * @memberof Transition
  */
  Transition.prototype.getLastDot = function(){

    return this.dots[this.dots.length - 1];

  }

  /**
  * @memberof Transition
  */
  Transition.prototype.destroy = function(floor){

    this.line.destroy();

  }

  /**
  * @memberof Transition
  */
  Transition.prototype.deleteLineObject = function(){

    this.line.destroy();
    delete this.line;

  }

  /**
  * @memberof Transition
  */
  Transition.prototype.insertDotIntoLine = function(line, point){

    var indexOfDot1 = this.getDotIndex(line.dot1.uuid);
    var indexOfDot2 = this.getDotIndex(line.dot2.uuid);

    if(indexOfDot1 == -1 || indexOfDot2 == -1){

      log.warn('Transition.insertDotIntoLine : inserted line is not part of '+this.id);
      return;

    }

    console.log(indexOfDot1*1 < indexOfDot2*1);

    if(indexOfDot1*1 < indexOfDot2*1) this.dots.splice(indexOfDot2, 0, point);
    else this.dots.splice(indexOfDot1, 0, point);

    this.addObjectFromDots();

    point.participateObj(this.id, 'transition');

  }

  /**
  * @memberof Transition
  */
  Transition.prototype.getDotIndex = function(uuid){
    for(var key in this.dots){
      if(this.dots[key].uuid == uuid) return key;
    }

    return -1;
  }

  /**
  * @memberof Transition
  * @param line Object { dot1 ,dot2 }
  */
  Transition.prototype.isPartOf = function(point1, point2){
    function isSamePoint(p1, p2){
      if(p1.x === p2.x && p1.y === p2.y )
        return true;
      return false;
    }

    for(var i = 0; i < this.dots.length - 1; i++){
      if((isSamePoint(this.dots[i].point, point1) && isSamePoint(this.dots[i+1].point, point2)) ||
         (isSamePoint(this.dots[i+1].point, point1) && isSamePoint(this.dots[i].point, point2)))
         return true;
    }

    return false;
  }

  Transition.prototype.getWKT = function(){
    var wkt = "LINESTRING (";

    for (var i = 0; i < this.dots.length; i++) {
      wkt += this.dots[i].point.x + " " + this.dots[i].point.y;

      if( i != this.dots.length -1 ) wkt += ", ";
    }

    wkt += ")";

    return wkt;
  }

  return Transition;

});
