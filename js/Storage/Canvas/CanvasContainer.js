define([
  "./Stage.js"
],function(
  Stage
) {
  'use strict';

  function CanvasContainer(){
    this.stages = [];

    // one loor for test
    this.addStage('test-floor','container', document.getElementById('viewport').clientWidth, document.getElementById('viewport').clientHeight);
  }

  CanvasContainer.prototype.addStage = function(_id, _container, _width, _height){

    this.stages[_id] = new Stage(_id, _container, _width, _height);
  }

  return CanvasContainer;

});
