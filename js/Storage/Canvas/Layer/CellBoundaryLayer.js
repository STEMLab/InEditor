define([
  "./Layer.js",
  "../Group/CellBoundaryGroup.js"
],function(
  Layer,
  CellBoundaryGroup
) {
  'use strict';


  function CellBoundaryLayer(){

    Layer.apply(this, arguments);

    this.init();

  }

  CellBoundaryLayer.prototype = Object.create(Layer.prototype);

  CellBoundaryLayer.prototype.init = function(){
    this.addGroup(new CellBoundaryGroup());
  }

  return CellBoundaryLayer;

});
