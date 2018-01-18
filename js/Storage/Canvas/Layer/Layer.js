define([],function() {
  'use strict';

  function Layer(){
    this.layer = new Konva.Layer();
    this.group = null;

  }

  Layer.prototype.getLayer = function(){
    return this.layer;
  }

  Layer.prototype.addGroup = function(_group){
    this.group = _group;
    this.layer.add(_group.getGroup());
  }




  return Layer;
});
