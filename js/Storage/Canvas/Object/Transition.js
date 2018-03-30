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
    log.error(' YOU NEED TO DEVELOP IS-EMPTY FUNCTION FOR TRANSITION OBJ ! ');
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
  Transition.prototype.insertDot = function(index, dot){

    this.dots.splice(index, 0, dot);
    this.addObjectFromDots();

  }

  Transition.prototype.addObjectFromDots = function(){

    var points = [];

    for(var key in this.dots){
      points.push(this.dots[key].point.x);
      points.push(this.dots[key].point.y);
    }

    this.line.attrs.points = points;

  }

  return Transition;

});
