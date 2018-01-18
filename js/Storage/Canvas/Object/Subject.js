define([], function() {
  'use strict';

  /**
  * In this project, one subject(object) can have only one observer(geometry).
  */
  function Subject(){
    this.observer = null;

  }

  Subject.prototype.regiterObserver = function(_observer){
    this.observer = _observer;
  }

  // Subject.prototype.unregisterObserver = function(_observer){
  //
  //  we don't need this.
  //
  // }

  Subject.prototype.notifyObserver = function( type, obj ){
    if( observer != null ){
      observer.notify(type, obj);
    }
  }


  return Subject;

});
