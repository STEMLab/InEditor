define([], function() {
  'use strict';

  /**
  * In this project, one subject(object) can have only one observer(geometry).
  */
  function Subject(){
    this.observerCollection = [];
  }

  Subject.prototype.registerObserver = function(observer){
    this.observerCollection.add(observer);
  }

  Subject.prototype.unregisterObserver = function(observer){
    this.observerCollection.splice(this.observerCollection.indexOf(observer), 1);
  }

  Subject.prototype.notifyObservers = function(){

    for( key in this.observerCollection ){

      this.observerCollection[key].notify();

    }

  }

  return Subject;

});
