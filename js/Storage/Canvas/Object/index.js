/**
 * @author suheeeee<lalune1120@hotmail.com>
 */
define(function(require) {
  const CanvasObjects = {
    'CELL_SPACE': require('./Cell.js'),
    'CELL_SPACE_BOUNDARY': require('./CellBoundary.js'),
    'STATE': require('./State.js'),
    'TRANSITION': require('./Transition.js'),
    'CURSOR': require('./Cursor.js'),
    'HATCH': require('./Hatch.js'),
    'HOLE': require('./Hole.js')
  }
  return CanvasObjects;
});
