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
    this.id = null;

    /**
    * @memberof Transition
    */
    this.name = null;

    /**
    * @memberof Transition
    */
    this.line = new Konva.Line({
      points: [],
      stroke: 'black',
      strokeWidth: 5,
      lineCap: 'round',
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

  return Transition;

});
