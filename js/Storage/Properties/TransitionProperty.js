define([],function() {
  'use strict';

  function TransitionProperty() {
    this.id;
    this.name;
    this.weight;
    this.connects = new Array(2);
    this.duality; // CellSpaceBoundary
  }

  return TransitionProperty;
});
