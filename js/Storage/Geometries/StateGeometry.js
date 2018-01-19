define([
  "../../Observer/Observer.js"
], function(
  Observer
) {
  'use strict';

  function StateGeometry() {
    Observer.apply(this, arguments);

    this.id;
    this.points = new Array(2);
  }

  StateGeometry.prototype = Object.create(Observer.prototype);

  return StateGeometry;
});
