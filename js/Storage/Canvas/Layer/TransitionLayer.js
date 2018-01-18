define([
  "./Layer.js",
  "../Group/TransitionGroup.js"
],function(
  Layer,
  TransitionGroup
) {
  'use strict';


  function TransitionLayer(){

    Layer.apply(this, arguments);

    this.init();

  }

  TransitionLayer.prototype = Object.create(Layer.prototype);

  TransitionLayer.prototype.init = function(){
    this.addGroup(new TransitionGroup());
  }

  return TransitionLayer;

});
