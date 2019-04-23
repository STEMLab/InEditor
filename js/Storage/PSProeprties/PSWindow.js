/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  function PSWindow(_id) {

    require('Property').CELL_SPACE_BOUNDARY.apply(this, arguments);
    this.featrueType = require('ObjectType').PSPROPERTY_TYPE.PUBLIC_SAFETY_WINDOW;
    this.extend.moduleType = 'navi';
    this.extend.featureType = 'ConnectionBoundary';
    this.extend.attributes = {
        'fireEscape': '', // true, false
        'lockType': '',
        'material': '',
        'openable': '', // boolean
        'sizeHeight': '',
        'sizeWidth': '',
        'windowHandling': ''
    };
  }

  PSWindow.prototype = Object.create(require('Property').CELL_SPACE_BOUNDARY.prototype);

  PSWindow.prototype.getDoorHandlingEnum = function(){
    return ['Left', 'Right'];
  }

  return PSWindow;
});
