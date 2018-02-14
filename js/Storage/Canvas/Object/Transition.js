/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class Transition
  */
  function Transition(x1, y1, x2, y2) {
    this.id = null;
    this.name = null;

    this.line = new Konva.Line({
      points: [x1, y1, x2, y2],
      stroke: 'black',
      strokeWidth: 5,
      lineCap: 'round',
    });

  }

  return Transition;

});
