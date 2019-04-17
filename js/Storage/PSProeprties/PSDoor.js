/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  function PSDoor(_id) {

    require('Property').CELL_SPACE_BOUNDARY.apply(this, arguments);
    this.featrueType = require('ObjectType').PSPROPERTY_TYPE.PUBLIC_SAFETY_DOOR;
    this.extend.moduleType = 'navi';
    this.extend.featureType = 'ConnectionBoundary';
    this.extend.attributes = {
        'doorHandling': '', // Left, Right
        'doorSwing': '', // Outswing, Inswing, INWARDS, OUTWARDS, SLIDE
        'fireEscape': '',
        'lockType': '',
        'material': '',
        'sizeHeight': '',
        'sizeWidth': ''
    };
  }

  PSDoor.prototype = Object.create(require('Property').CELL_SPACE_BOUNDARY.prototype);

  return PSDoor;
});
