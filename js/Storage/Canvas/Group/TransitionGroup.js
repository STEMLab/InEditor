/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "../Object/Transition.js"
],function(
  Transition
) {
  'use strict';

  /**
  * @class TransitionGroup
  */
  function TransitionGroup(){

    this.transitionGroup = new Konva.Group({ x: 0, y: 0 });
    this.transitions = []; // transition array

  }

  TransitionGroup.prototype.addTransition = function(x1, y1, x2, y2){

    transitions.push(new Transition(x1, y1, x2, y2));
    transitionGroup.add(transitions[transitions.lenght-1].line);
    console.log("add transition complete : ", this);
  }

  TransitionGroup.prototype.getGroup = function(){
    return this.transitionGroup;
  }

  /**
  * @memberof TransitionGroup
  * @param {Transition} obj
  */
  TransitionGroup.prototype.add = function(obj){

    var newTransition = new Transition(obj.id);

    this.copyDots(newTransition, obj.dots);
    newTransition.addObjectFromDots();

    this.transitions.push(newTransition);
    this.transitionGroup.add(newTransition.getLineObject());

  }

  /**
  * @memberof TransitionGroup
  */
  TransitionGroup.prototype.copyDots = function(newTransition, dots){

    newTransition.addState(dots[0]);
    newTransition.addState(dots[dots.length - 1]);

    if(dots.length > 2){

      var len = dots.length - 2;
      for(var i = 0 ; i < len; i++){

        newTransition.insertDot( 1 + i, dots[1 + i] );

      }

    }

  }

  /**
  * @memberof TransitionGroup
  */
  TransitionGroup.prototype.getLastTransition = function(){
    return this.transitions[this.transitions.length-1];
  }

  /**
  * @memberof TransitionGroup
  */
  TransitionGroup.prototype.getConnection = function(){
    var result = [];

    for (var key in this.transitions) {
      for(var dotkey = 0; dotkey < this.transitions[key].dots.length- 1; dotkey++){
        var newConnection = {
          dot1: this.transitions[key].dots[dotkey],
          dot2: this.transitions[key].dots[dotkey + 1]
        };

        if (result.indexOf({
            'dot1': newConnection.dot2,
            'dot2': newConnection.dot1
          }) == -1) {
          result.push(newConnection);
        }
      }
    }

    return result;
  }

  /**
  * @memberof TransitionGroup
  */
  TransitionGroup.prototype.simpleAdd = function(obj){

    var newTransition = new Transition(obj.id);
    newTransition.dots = obj.points;
    newTransition.addObjectFromDots();

    this.transitions.push(newTransition);
    this.transitionGroup.add(newTransition.getLineObject());

  }

  TransitionGroup.prototype.getObjects = function(){
    return this.transitions;
  }



  return TransitionGroup;

});
