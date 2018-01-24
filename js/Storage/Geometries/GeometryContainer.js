define([
  "./CellGeometry.js",
  "./CellBoundaryGeometry.js",
  "./StateGeometry.js",
  "./TransitionGeometry.js"
], function(
  CellGeometry,
  CellBoundaryGeometry,
  StateGeometry,
  TransitionGeometry
) {
  'use strict';

  function GeometryContainer() {
    this.cellGeometry = new CellGeometry();
    this.cellBoundaryGeometry = new CellBoundaryGeometry();
    this.stateGeometry = new StateGeometry();
    this.transitionGeometry = new TransitionGeometry();
  }

  GeometryContainer.prototype.show = function(){
    console.log(this);
  }

  GeometryContainer.prototype.getElementById = function(){
    
  }

  return GeometryContainer;
});
