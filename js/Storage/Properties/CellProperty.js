define([],function() {
  'use strict';

  function CellProperty() {
    this.id;
    this.name;
    this.description;
    this.duality;
    this.externalReference = [];
    this.partialboundedBy = [];
  }

  return CellProperty;
});
