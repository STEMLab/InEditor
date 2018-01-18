define([
  "../Object/State.js"
],function(
  State
) {
  'use strict';

  function StateGroup(){

    this.stateGroup = new Konva.Group({ x: 0, y: 0 });
    this.states = []; // states array

  }

  StateGroup.prototype.addState = function( _x, _y ){

    states.push(new State(_x, _y));
    stateGroup.add(states[states.lenght-1].circle);
    console.log("add state complete : ", this);
  }

  StateGroup.prototype.getGroup = function(){
    return this.stateGroup;
  }

  return StateGroup;

});
