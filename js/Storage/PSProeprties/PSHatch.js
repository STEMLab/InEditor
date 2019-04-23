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
        'fireEscape': '', // true, false
        'hatchLocation': '', // string
        'lockType': '',  // string
        'material': '',  // string
        'openable': '',  // true, false
        'sizeLength': '',  //float
        'sizeWidth': '' //float
    };
  }

  PSHatch.prototype = Object.create(require('Property').CELL_SPACE_BOUNDARY.prototype);

  return PSHatch;
});
