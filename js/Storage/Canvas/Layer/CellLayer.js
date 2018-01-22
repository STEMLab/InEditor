define([
  "./Layer.js",
  "../Group/CellGroup.js"
],function(
  Layer,
  CellGroup
) {
  'use strict';


  function CellLayer(){

    Layer.apply(this, arguments);

    this.init();

  }

  CellLayer.prototype = Object.create(Layer.prototype);

  CellLayer.prototype.init = function(){
    // this.addGroup(new CellGroup());
    this.group = new CellGroup();
  }

  return CellLayer;

});
