/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "../Object/State.js"
],function(
  State
) {
  'use strict';

  /**
  * @class StateGroup
  */
  function StateGroup(){

    this.stateGroup = new Konva.Group({ x: 0, y: 0 });
    this.states = []; // states array

  }

  StateGroup.prototype.makeNewStateAndAdd = function(id, dot){

    var newState = new State(id, dot.point.x, dot.point.y);
    newState.setDot(dot);

    this.states.push(newState);
    this.stateGroup.add(this.states[this.states.length-1].getObj());

  }

  StateGroup.prototype.getGroup = function(){
    return this.stateGroup;
  }

  /**
   * @memberof StateGroup
   * @param {State} obj
   */
  StateGroup.prototype.simpleAdd = function(obj) {

    var newState = new State(obj.id);
    newState.setDot(obj.dot);
    newState.addObjectFromDots();

    this.states.push(newState);
    this.stateGroup.add(newState.getObj());

  }

  return StateGroup;

});
