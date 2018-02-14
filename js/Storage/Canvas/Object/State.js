/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class State
  */
  function State(_x, _y) {
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

  return State;

});
