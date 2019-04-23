/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  const PSProperties = {
    'PUBLIC_SAFETY_DOOR': require('./PSDoor.js'),
    'PUBLIC_SAFETY_WINDOW': require('./PSWindow.js'),
    'PUBLIC_SAFETY_HATCH': require('./PSHatch.js'),
    'PUBLIC_SAFETY_ROOM': require('./PSRoom.js'),
    'PUBLIC_SAFETY_ELEVATOR': require('./PSElevator.js'),
    'PUBLIC_SAFETY_STAIR': require('./PSStair.js'),
    'PUBLIC_SAFETY_INSTALLATION': require('./PSINstallation.js'),
    'UTIL': require('./util.js')
  }
  return PSProperties;
});
