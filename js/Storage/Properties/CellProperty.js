define([],function() {
  'use strict';

  function CellProperty(_id) {
    this.id = _id;
    this.name = _id;
    this.description = "";
    this.duality = "";
    this.externalReference = [];
    this.partialboundedBy = [];
  }

  return CellProperty;
});
