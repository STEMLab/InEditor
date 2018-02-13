/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([], function(){

  function Queue() {

    this.queue = [];

  }

  Queue.prototype.isEmpty = function() {
    return this.queue.length == 0 ? true : false;
  }

  Queue.prototype.length = function() {
    return this.queue.length;
  }

  Queue.prototype.push = function(element) {

    if(this.length == window.conditions.maxHistoryLen){
      this.dequeue();
    }

    this.queue.push(element);
  }

  Queue.prototype.dequeue = function() {
    element = this.peek();
    this.queue.shift();
    return element;
  }

  Queue.prototype.peek = function() {
    element = this.queue[0] == undefined ? null : this.queue[0];
    return element;
  }

  Queue.prototype.toArray = function() {
    return this.queue;
  }

  Queue.prototype.delAll = function() {
    this.queue = [];
  }

  Queue.prototype.getElementByUUID = function(uuid){

    for(var i in this.queue ){
      if(this.queue[i].uuid == uuid) return this.queue[i];
    }

    log.warn(uuid + " doen't exist in queue.");

  }

  return Queue;


});
