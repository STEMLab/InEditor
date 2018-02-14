/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "./Layer.js",
  "../Group/TransitionGroup.js"
],function(
  Layer,
  TransitionGroup
) {
  'use strict';

  /**
  * @class TransitionLayer
  * @augments Layer
  */
  function TransitionLayer(){

    Layer.apply(this, arguments);

    this.init();

  }

  TransitionLayer.prototype = Object.create(Layer.prototype);

  TransitionLayer.prototype.init = function(){
    this.addGroup(new TransitionGroup());
  }

  return TransitionLayer;

});
