define([], function() {
  'use strict';

  /**
  * In this project, one subject(object) can have only one observer(geometry).
  */
  function Observer(){

  }

  Observer.prototype.notify = function(type, obj){
    // need to overiding in each geometry
  }

  return Observer;

});
