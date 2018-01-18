define([
  "../Object/Transition.js"
],function(
  Transition
) {
  'use strict';

  function TransitionGroup(){

    this.transitionGroup = new Konva.Group({ x: 0, y: 0 });
    this.transitions = []; // states array

  }

  TransitionGroup.prototype.addTransition = function(x1, y1, x2, y2){

    transitions.push(new Transition(x1, y1, x2, y2));
    transitionGroup.add(transitions[transitions.lenght-1].line);
    console.log("add transition complete : ", this);
  }

  TransitionGroup.prototype.getGroup = function(){
    return this.transitionGroup;
  }

  return TransitionGroup;

});
