define([
  "../../../Observer/Subject.js"
], function(
  Subject
) {
  'use strict';

  function State(_x, _y) {
    Subject.apply(this, arguments);
    this.id = null;

    this.circle = new Konva.Circle({
      radius: 5,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 1,
      x: _x,
      y: _y
    });

  }

  State.prototype = Object.create(Subject.prototype);

  return State;

});
