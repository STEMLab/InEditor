/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  function PSHatch(_id) {

    require('Property').CELL_SPACE_BOUNDARY.apply(this, arguments);
    this.featrueType = require('ObjectType').PSPROPERTY_TYPE.PUBLIC_SAFETY_HATCH;
    this.extend.moduleType = 'navi';
    this.extend.featureType = 'ConnectionBoundary';
    this.extend.attributes = {
        'fireEscape': '',
        'hatchLocation': '',
        'lockType': '',
        'material': '',
        'openable': '',
        'sizeLength': '',
        'sizeWidth': ''
    };
  }

  PSHatch.prototype = Object.create(require('Property').CELL_SPACE_BOUNDARY.prototype);

  return PSHatch;
});
