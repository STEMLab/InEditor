/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class BackgroundLayer
   */
  function BackgroundLayer(_width, _height) {

    this.layer = new Konva.Layer();

    this.setGrid(_width, _height);

  }

  /**
   * @memberof BackgroundLayer
   */
  BackgroundLayer.prototype.setGrid = function(_width, _height) {

    this.layer.destroyChildren()

    var padding = 20;
    for (var i = 0; i < (_width / padding); i++) {
      this.layer.add(new Konva.Line({
        points: [Math.round(i * padding) + 0.5, 0,  Math.round(i * padding) + 0.5, _height],
        stroke: '#ddd',
        strokeWidth: 1,
      }));
    }

    for (var j = 0; j < _height / padding; j++) {
      this.layer.add(new Konva.Line({
        points: [0, Math.round(j * padding), _width, Math.round(j * padding)],
        stroke: '#ddd',
        strokeWidth: 0.5,
      }));
    }
  }

  BackgroundLayer.prototype.getLayer = function() {

    return this.layer;

  }

  return BackgroundLayer;

});
