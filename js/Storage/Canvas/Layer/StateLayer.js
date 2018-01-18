define([
  "./Layer.js",
  "../Group/StateGroup.js"
],function(
  Layer,
  StateGroup
) {
  'use strict';


  function StateLayer(){

    Layer.apply(this, arguments);

    this.init();

  }

  StateLayer.prototype = Object.create(Layer.prototype);

  StateLayer.prototype.init = function(){
    this.addGroup(new StateGroup());
  }

  return StateLayer;

});
