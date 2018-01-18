define([],function() {
  'use strict';

  function PropertyContainer() {
    this.stageProperties = [];
    this.cellProperties = [];
    this.cellBoundaryProperties = [];
    this.stateProperties = [];
    this.transitionProperties = [];
  }

  return PropertyContainer;
});
