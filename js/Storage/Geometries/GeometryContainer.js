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
    this.cellGeometry = [];
    this.cellBoundaryGeometry = [];
    this.stateGeometry = [];
    this.transitionGeometry = [];
  }

  GeometryContainer.prototype.show = function(){
    console.log(this);
  }

  GeometryContainer.prototype.getElementById = function(){

  }

  return GeometryContainer;
});
