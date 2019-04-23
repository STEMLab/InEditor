/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  function PSStair(_id) {

    require('Property').CELL_SPACE.apply(this, arguments);
    this.featureType = require('ObjectType').PSPROPERTY_TYPE.PUBLIC_SAFETY_STAIR;
    this.extend.moduleType = 'navi';
    this.extend.featureType = 'TransitionSpace';
    this.extend.attributes = {
      'function': '1120',
      'class': '1010',
      'usage': '1120'
    };
  }

  PSStair.prototype = Object.create(require('Property').CELL_SPACE.prototype);

  PSStair.prototype.copy = function(cell){
    require('PSProperty').UTIL.copyCell(cell, this);
  }


  return PSStair;
});
