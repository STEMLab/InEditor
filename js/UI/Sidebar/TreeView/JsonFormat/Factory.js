/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  var format = {
    'PROJECT': require('./Project.js'),
    'FLOOR': require('./Floor.js'),
    'CELL_SPACE': require('./Node.js'),
    'CELL_SPACE_BOUNDARY': require('./Node.js'),
    'STATE': require('./Node.js'),
    'TRANSITION': require('./Node.js'),
    'INTERLAYER_CONNECTION': require('./Node.js')
  };

  return function(type, id, name) {
    try {
      return new format[type](id, name, type);
    } catch (error) {
      throw new Error('Unknown jsonformat type : ' + type + ' specified.');
    }
  }
});
