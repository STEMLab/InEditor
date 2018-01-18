define([
  "./Geometries/GeometryContainer.js",
  "./Properties/PropertyContainer.js",
  "./Canvas/CanvasContainer.js"
],function(
  GeometryContainer,
  PropertyContainer,
  CanvasContainer
) {
  'use strict';

  function Storage() {
    this.geometryContainer = new GeometryContainer();
    this.propertyContainer = new PropertyContainer();
    this.canvasContainer = new CanvasContainer();
  }

  Storage.prototype.show = function(){
    console.log(this);
  }

  return Storage;
});
