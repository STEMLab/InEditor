/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  const Geometry = {
    'CELL_SPACE': require('./CellGeometry.js'),
    'CELL_SPACE_BOUNDARY': require('./CellBoundaryGeometry.js'),
    'STATE': require('./StateGeometry.js'),
    'TRANSITION': require('./TransitionGeometry.js'),
    'HATCH': require('./HatchGeometry.js'),
    'HOLE': require('./HoleGeometry.js')
  }
  return Geometry;
});
