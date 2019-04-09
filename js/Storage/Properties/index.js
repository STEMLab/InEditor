/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  const Properties = {
    'CONTAINER': require('./PropertyContainer.js'),
    'CELL_SPACE': require('./CellProperty.js'),
    'CELL_SPACE_BOUNDARY': require('./CellBoundaryProperty.js'),
    'STATE': require('./StateProperty.js'),
    'TRANSITION': require('./TransitionProperty.js'),
    'PROJECT': require('./projectProperty.js'),
    'FLOOR': require('./FloorProperty.js'),
    'INTERLAYER_CONNECTION': require('./InterLayerConnectionProperty.js'),
    'CODE_LIST': require('./CodeList.js'),
    'BASE': require('./PropertyBase.js'),
    'EXTEND_BASE': require('./ExtensionBase.js')
  }
 return Properties;
});
