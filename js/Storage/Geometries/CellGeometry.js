define([
  "./Observer.js"
], function(
  Observer
) {
  'use strict';

  function CellGeometry() {
    Observer.apply(this, arguments);

    this.id;
    this.points = [];
  }

  CellGeometry.prototype = Object.create(Observer.prototype);

  return CellGeometry;
});
