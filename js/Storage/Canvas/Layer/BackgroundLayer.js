define([], function() {
  'use strict';


  function BackgroundLayer() {

    this.layer = new Konva.Layer();
    this.floorPlan = new Konva.Image();
  }


  // BackgroundLayer.prototype.setFloorplan = function(img){
  // }

  BackgroundLayer.prototype.getLayer = function() {
    return this.layer;
  }

  return BackgroundLayer;

});
