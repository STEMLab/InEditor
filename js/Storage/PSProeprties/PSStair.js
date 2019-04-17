/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  function PSStair(_id) {

    require('Property').CELL_SPACE.apply(this, arguments);
    this.featrueType = require('ObjectType').PSPROPERTY_TYPE.PUBLIC_SAFETY_STAIR;
    this.extend.moduleType = 'navi';
    this.extend.featureType = 'TransitionSpace';
    this.extend.attributes = {
      'function': '',
      'class': '',
      'usage': ''
    };
  }

  PSStair.prototype = Object.create(require('Property').CELL_SPACE.prototype);

  return PSStair;
});
