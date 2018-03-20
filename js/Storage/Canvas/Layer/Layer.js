/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class Layer
   */
  function Layer(_width, _height) {
    this.layer = new Konva.Layer();
    this.group = null;

    this.layer.clearBeforeDraw(true);

  }

  Layer.prototype.getLayer = function() {
    return this.layer;
  }

  Layer.prototype.addGroup = function(_group) {
    this.group = _group;
    this.layer.add(_group.getGroup());
  }


  return Layer;
});
