/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "./Layer.js",
  "../Group/StateGroup.js"
],function(
  Layer,
  StateGroup
) {
  'use strict';

  /**
  * @class StateLayer
  * @augments Layer
  */
  function StateLayer(){

    Layer.apply(this, arguments);

    this.init();

  }

  StateLayer.prototype = Object.create(Layer.prototype);

  StateLayer.prototype.init = function(){
    this.addGroup(new StateGroup());
  }

  return StateLayer;

});
