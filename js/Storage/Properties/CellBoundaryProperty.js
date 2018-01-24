define([],function() {
  'use strict';

  function CellBoundaryProperty() {
    this.id;
    this.name;
    this.description;
    this.duality;
    this.externalReference = [];
    this.partialboundedBy = [];
  }

  return CellBoundaryProperty;
});
