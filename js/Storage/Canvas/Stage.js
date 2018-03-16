/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./Layer/CellLayer.js",
  "./Layer/CellBoundaryLayer.js",
  "./Layer/StateLayer.js",
  "./Layer/TransitionLayer.js",
  "./Layer/BackgroundLayer.js",
  "./Layer/TmpLayer.js"
], function(
  CellLayer,
  CellBoundaryLayer,
  StateLayer,
  TransitionLayer,
  BackgroundLayer,
  TmpLayer
) {
  'use strict';

  /**
   * @class Stage
   * @desc Container object of [stage]{@link https://konvajs.github.io/api/Konva.Stage.html}
   * @class Stage
   * @param {String} _id id of new stage
   * @param {String} _name name of new stage
   * @param {String} _container id of div which the new stage will be append
   * @param {String} _width width of _container
   * @param {String} _height height of _container
   */
  function Stage(_id, _name, _container, _width, _height) {

    /**
     * @memberof Stage
     */
    this.id = _id;

    /**
     * @memberof Stage
     */
    this.name = _name;

    /**
     * @memberof Stage
     */
    this.backgroundLayer = new BackgroundLayer();
    /**
     * @memberof Stage
     */
    this.cellLayer = new CellLayer();
    /**
     * @memberof Stage
     */
    this.cellBoundaryLayer = new CellBoundaryLayer();
    /**
     * @memberof Stage
     */
    this.stateLayer = new StateLayer();
    /**
     * @memberof Stage
     */
    this.transitionLayer = new TransitionLayer();
    /**
     * @memberof Stage
     */
    this.tmpLayer = new TmpLayer();

    var calculatedHeight = this.calculateHeight(_width);

    /**
     * @memberof Stage
     */
    this.stage = new Konva.Stage({
      container: _container,
      width: _width,
      height: calculatedHeight,
      id: _id,
      draggable: true,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      dragBoundFunc: function(pos) {
        if (window.storage.canvasContainer.stages[_id].stage.attrs.scaleX > 1)
          return window.storage.canvasContainer.stages[_id].zoomFun(_id, pos);
        return pos;
      }
    });

    this.stage.add(this.backgroundLayer.getLayer());
    this.stage.add(this.cellLayer.getLayer());
    this.stage.add(this.cellBoundaryLayer.getLayer());
    this.stage.add(this.stateLayer.getLayer());
    this.stage.add(this.transitionLayer.getLayer());
    this.stage.add(this.tmpLayer.getLayer());

  }

  /**
   * @desc Calculate the height using the aspect ratio stored in the Consitions and the input width.
   * @memberof Stage
   * @param {Number} _width width of container
   * @returns _width * (aspect-ratio.height / aspect-ratio.width)
   */
  Stage.prototype.calculateHeight = function(_width) {

    return _width * (window.conditions.aspectRatio.y / window.conditions.aspectRatio.x);

  }

  /**
   * @desc Zoomming function
   * @memberof Stage
   * @param {String} _id
   * @param {Object} pos
   * @returns {Object} { x : newX, y : newY }
   */
  Stage.prototype.zoomFun = function(_id, pos) {

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

  /**
   * @memberof Stage
   */
  Stage.prototype.getAbsoluteCoor = function(floor) {

    var stage;

    if (this.stage == null) {
      stage = this.stage;
    } else {
      stage = window.storage.canvasContainer.stages[floor].stage;
    }

    var x = stage.getAbsolutePosition();
    var y = stage.getAbsolutePosition();
  }

  /**
   * @memberof Stage
   * @deprecated
   */
  Stage.prototype.addTmpObj = function(type) {

    this.tmpLayer = new TmpLayer(type);
    this.stage.add(this.tmpLayer.getLayer());

  }

  /**
   * @memberof Stage
   */
  Stage.prototype.removeTmpObj = function(type) {

    this.tmpLayer.getLayer().destroy();
    this.tmpLayer = null;
    this.stage.draw();

  }

  /**
   * @memberof Stage
   */
  Stage.prototype.getConnection = function() {
    var cellConnection = this.cellLayer.getConnection();
    var cellBoundaryConnection = this.cellBoundaryLayer.getConnection();
    // state is only dot
    // transition should not be snapping target

    var connection = cellConnection.concat(cellBoundaryConnection);

    var reduced = [];

    var reduced = connection.reduce(function(a, b) {
      if (a.indexOf({'dot1':b.dot2, 'dot2':b.dot1}) > -1 ) {
        // do nothing
      }
      else if (a.indexOf(b) < 0){
        a.push(b);
      }
      return a;
    }, []);

    return reduced;
  }

  /**
  * @memberof Stage
  * @return {Array} Object array. key of attribute is connection { dot1, dot2 }, value of attribute is array of cell id which is contain the line consisting of key.
  */
  Stage.prototype.getCellConnectionWithID = function(){
    var cellConnections = this.cellLayer.getBoundaries();
    return cellConnections;
  }

  return Stage;

});
