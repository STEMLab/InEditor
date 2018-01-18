define([
  "./Layer/CellLayer.js",
  "./Layer/CellBoundaryLayer.js",
  "./Layer/StateLayer.js",
  "./Layer/TransitionLayer.js",
  "./Layer/BackgroundLayer.js"
],function(
  CellLayer,
  CellBoundaryLayer,
  StateLayer,
  TransitionLayer,
  BackgroundLayer
) {
  'use strict';

  function Stage(_id, _container, _width, _height){
    this.id = _id;
    this.name = _id;

    this.cellLayer = new CellLayer();
    this.cellBoundaryLayer = new CellBoundaryLayer();
    this.stateLayer = new StateLayer();
    this.transitionLayer = new TransitionLayer();
    this.backgroundLayer = new BackgroundLayer();

    this.stage = new Konva.Stage({
      container: _container,
      width: _width,
      height: _height,
      id : _id
    });

    this.stage.add(this.cellLayer.getLayer());
    this.stage.add(this.cellBoundaryLayer.getLayer());
    this.stage.add(this.stateLayer.getLayer());
    this.stage.add(this.transitionLayer.getLayer());
    this.stage.add(this.backgroundLayer.getLayer());


  }

  return Stage;

});
