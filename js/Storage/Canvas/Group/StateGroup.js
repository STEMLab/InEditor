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

  /**
   * @memberof StateGroup
   */
   StateGroup.prototype.delete = function(id, floor){
     var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();

     for(var i in this.states){
       if(this.states[i].id == id){

         if(floor != undefined){
           var dotPool = dotPoolContainer.getDotPool(floor);
           dotPool.deleteDotFromObj(this.states[i].dot.uuid, this.states[i].id);
         } else {
           log.warn('StateGroup.delete:: there is no floor data for state, you need to free dots of', id, 'manually.');
         }

         this.states[i].destroy();
         this.states.splice(i, 1);
         break;
       }
     }


   }

  return StateGroup;

});
