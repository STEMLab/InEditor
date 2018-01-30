/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "./Layer/CellLayer.js",
  "./Layer/CellBoundaryLayer.js",
  "./Layer/StateLayer.js",
  "./Layer/TransitionLayer.js",
  "./Layer/BackgroundLayer.js"
], function(
  CellLayer,
  CellBoundaryLayer,
  StateLayer,
  TransitionLayer,
  BackgroundLayer
) {
  'use strict';

  /**
   * @classdesc Container object of [stage]{@link https://konvajs.github.io/api/Konva.Stage.html}
   * @class Stage
   * @param {String} _id id of new stage
   * @param {String} _name name of new stage
   * @param {String} _container id of div which the new stage will be append
   * @param {String} _width width of _container
   * @param {String} _height height of _container
   */
  function Stage(_id, _name, _container, _width, _height) {

    this.id = _id;

    this.name = _name;

    this.cellLayer = new CellLayer();
    this.cellBoundaryLayer = new CellBoundaryLayer();
    this.stateLayer = new StateLayer();
    this.transitionLayer = new TransitionLayer();
    this.backgroundLayer = new BackgroundLayer();

    this.stage = new Konva.Stage({
      container: _container,
      width: _width,
      height: this.calculateHeight(_width),
      id: _id,
      draggable: true,
      dragBoundFunc: function(pos) {
        if (window.storage.canvasContainer.stages[_id].stage.attrs.scaleX > 1) return window.storage.canvasContainer.stages[_id].zoomFun(_id, pos);
      }
    });

    this.stage.add(this.backgroundLayer.getLayer());
    this.stage.add(this.cellLayer.getLayer());
    this.stage.add(this.cellBoundaryLayer.getLayer());
    this.stage.add(this.stateLayer.getLayer());
    this.stage.add(this.transitionLayer.getLayer());


  }

  /**
   * @desc Calculate the height using the aspect ratio stored in the Consitions and the input width.
   * @param {Number} _width width of container
   * @returns _width * (aspect-ratio.height / aspect-ratio.width)
   */
  Stage.prototype.calculateHeight = function(_width) {

    return _width * (window.conditions.aspectRatio.y / window.conditions.aspectRatio.x);

  }

  /**
   * @desc Zoomming function
   * @param {String} _id
   * @param {Object} pos
   * @returns {Object} { x : newX, y : newY }
   */
  Stage.prototype.zoomFun = function( _id, pos ) {

    // console.log(document.getElementById(_id));

    var divWidth = document.getElementById(_id).children[0].clientWidth;
    var divHeight = document.getElementById(_id).children[0].clientHeight;

    var stageWidth = window.storage.canvasContainer.stages[_id].stage.attrs.width * window.storage.canvasContainer.stages[_id].stage.attrs.scaleX;
    var stageHeight = window.storage.canvasContainer.stages[_id].stage.attrs.height * window.storage.canvasContainer.stages[_id].stage.attrs.scaleY;

    var up = divHeight - stageHeight;
    var down = 0;
    var left = divWidth - stageWidth;
    var right = 0;

    var newX, newY;

    if (left <= pos.x && pos.x <= right) newX = pos.x;
    else if (left > pos.x) newX = left;
    else if (right < pos.x) newX = right;

    if (up <= pos.y && pos.y <= down) newY = pos.y;
    else if (up > pos.y) newY = up;
    else if (down < pos.y) newY = down;

    // console.log(pos, newX, newY);

    return {
      x: newX,
      y: newY
    };
  }

  Stage.prototype.getAbsoluteCoor = function(floor){

    var stage;

    if( this.stage == null ){
      stage = this.stage;
    }else {
      stage = window.storage.canvasContainer.stages[floor].stage;
    }

    var x = stage.getAbsolutePosition();
    var y = stage.getAbsolutePosition();
  }

  return Stage;

});
