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
    this.name = id;

    /**
    * @memberof Transition
    */
    this.line = new Konva.Line({
      points: [],
      stroke: 'black',
      strokeWidth: 3.5,
      lineCap: 'round',
      dash: [10, 10]
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

  return Transition;

});
