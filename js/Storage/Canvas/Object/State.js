/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class State
  */
  function State(id, _x, _y) {
    this.id = id;

    this.circle = new Konva.Circle({
      radius: 5,
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 1,
      x: _x,
      y: _y
    });

    this.dot = undefined;

  }

  /**
  * @memberof State
  */
  State.prototype.setDot = function(dot){
    this.dot = dot;
  }

  /**
  * @memberof State
  */
  State.prototype.isEmpty = function(){
    log.error(' YOU NEED TO DEVELOP IS-EMPTY FUNCTION FOR STATE OBJ ! ');
  }

  /**
  * @memberof State
  */
  State.prototype.getObj = function(){
    return this.circle;
  }


  return State;

});
