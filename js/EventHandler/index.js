/**
 * @author suheeeee<lalune1120@hotmail.com>
 */
define(function(require) {
  const Eventhandlers = {
    'DRAW': require('./DrawEventHandler.js'),
    'EXPORT': require('./ExportEventHandler.js'),
    'PROJECT': require('./ProjectEventHandler.js'),
    'PROPERTY': require('./PropertyEventHandler.js'),
    'UICHANGE': require('./UIChangeEventHandler.js')
  }
  return Eventhandlers;
});
