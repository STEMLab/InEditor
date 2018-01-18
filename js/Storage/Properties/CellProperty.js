define([],function() {
  'use strict';

  function CellProperty() {
    this.id;
    this.name;
    this.duality;
    this.externalReference = [];
    this.partialboundedBy = [];
  }

  return CellProperty;
});
