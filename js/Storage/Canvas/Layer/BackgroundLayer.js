define([], function() {
  'use strict';

  /**
  * @class BackgroundLayer
  */
  function BackgroundLayer() {

    this.layer = new Konva.Layer();

  }

  BackgroundLayer.prototype.getLayer = function() {

    return this.layer;

  }

  return BackgroundLayer;

});
