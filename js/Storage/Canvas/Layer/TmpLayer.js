/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "./Layer.js",
  "../Group/TmpGroup.js"
],function(
  Layer,
  TmpGroup
) {
  'use strict';

  /**
  * @class TmpLayer
  * @augments Layer
  */
  function TmpLayer(type){

    Layer.apply(this, arguments);

    this.init(type);

  }

  TmpLayer.prototype = Object.create(Layer.prototype);

  TmpLayer.prototype.init = function(type){
    this.addGroup(new TmpGroup(type));
  }

  return TmpLayer;

});
