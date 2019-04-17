/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  function PSElevator(_id) {

    require('Property').CELL_SPACE.apply(this, arguments);
    this.featrueType = require('ObjectType').PSPROPERTY_TYPE.PUBLIC_SAFETY_ELEVATOR;
    this.extend.moduleType = 'navi';
    this.extend.featureType = 'TransitionSpace';
    this.extend.attributes = {
      'function': '',
      'class': '',
      'usage': ''
    };
  }

  PSElevator.prototype = Object.create(require('Property').CELL_SPACE.prototype);

  return PSElevator;
});
