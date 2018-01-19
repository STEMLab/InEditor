define([
  "../../Observer/Observer.js"
], function(
  Observer
) {
  'use strict';

  function TransitionGeometry() {
    Observer.apply(this, arguments);

    this.id;
    this.connects = new Array(2); // id of stateGeometry
  }

  TransitionGeometry.prototype = Object.create(Observer.prototype);

  return TransitionGeometry;
});
