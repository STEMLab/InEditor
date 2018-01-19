define([
  "../../Observer/Observer.js"
], function(
  Observer
) {
  'use strict';

  function CellBoundaryGeometry() {
    Observer.apply(this, arguments);

    this.id;
    this.cellRef; // id of CellGeometry
    this.index;
  }

  CellBoundaryGeometry.prototype = Object.create(Observer.prototype);

  return CellBoundaryGeometry;
});
