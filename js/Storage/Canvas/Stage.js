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
  function Stage(_id, _name, _container, _width, _height, _size_type) {

    var calculatedWH = { width : _width, height : _height };
    if(_size_type != 'force')
    calculatedWH = this.calculateWH(_width, _height);
    // var calculatedHeight = this.calculateHeight(_width);

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
    this.backgroundLayer = new BackgroundLayer(calculatedWH.width, calculatedWH.height);
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

    /**
     * @memberof Stage
     */
    this.stage = new Konva.Stage({
      container: _container,
      width: calculatedWH.width,
      height: calculatedWH.height,
      id: _id,
      draggable: true,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      dragBoundFunc: function(pos) {
        return window.storage.canvasContainer.stages[_id].zoomFun(_id, pos);
      }
    });

    this.stage.add(this.backgroundLayer.getLayer());
    this.stage.add(this.cellLayer.getLayer());
    this.stage.add(this.cellBoundaryLayer.getLayer());
    this.stage.add(this.transitionLayer.getLayer());
    this.stage.add(this.stateLayer.getLayer());
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

  Stage.prototype.calculateWH = function(_width, _height) {

    var calH = _width * (window.conditions.aspectRatio.y / window.conditions.aspectRatio.x);
    if( calH < _height ) return { width : _width, height : calH };
    else return { width :  _height * (window.conditions.aspectRatio.x / window.conditions.aspectRatio.y), height : _height };

  }

  /**
   * @desc Zoomming function
   * @memberof Stage
   * @param {String} _id
   * @param {Object} pos
   * @returns {Object} { x : newX, y : newY }
   */
  Stage.prototype.zoomFun = function(_id, pos) {

    if(window.storage.canvasContainer.stages[_id].stage.attrs.scaleX <= 1){
      return {x: 0, y: 0};
    }

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
    var transitionConnection = this.transitionLayer.getConnection();

    var connection = cellConnection.concat(cellBoundaryConnection);
    connection = connection.concat(transitionConnection);

    var reduced = [];

    var reduced = connection.reduce(function(a, b) {
      if (a.indexOf({dot1:b.dot2, dot2:b.dot1}) > -1 ) {
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

  /**
  * @memberof Stage
  */
  Stage.prototype.getElementById = function(_type, _id){

    var result = null;

    switch (_type) {
      case 'cell':
        var cells = this.cellLayer.group.cells;
        for (var key in cells) {
          if (cells[key].id == _id) {
            result = cells[key];
            break;
          }
        }
        break;
      case 'cellboundary':
        var cellboundaries = this.cellBoundaryLayer.group.cellBoundaries;
        for (var key in cellboundaries) {
          if (cellboundaries[key].id == _id) {
            result = cellboundaries[key];
            break;
          }
        }
        break;
      case 'state':
        var states = this.stateLayer.group.states;
        for (var key in states) {
          if (states[key].id == _id) {
            result = states[key];
            break;
          }
        }
        break;
      case 'transition':
        var transitions = this.transitionLayer.group.transitions;
        for (var key in transitions) {
          if (transitions[key].id == _id) {
            result = transitions[key];
            break;
          }
        }
        break;
      case 'stage':
        result = this;
        break;
      default:
    }

    return result;

  }

  return Stage;

});
