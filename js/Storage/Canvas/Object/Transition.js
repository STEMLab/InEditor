define([
  "./Subject.js"
], function(
  Subject
) {
  'use strict';

  function Transition(x1, y1, x2, y2) {
    Subject.apply(this, arguments);

    this.id = null;
    this.name = null;

    this.line = new Konva.Line({
      points: [x1, y1, x2, y2],
      stroke: 'black',
      strokeWidth: 5,
      lineCap: 'round',
    });

  }

  Transition.prototype = Object.create(Subject.prototype);

  return Transition;

});
