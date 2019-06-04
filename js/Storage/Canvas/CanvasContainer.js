/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./Stage.js"
], function(
  Stage
) {
  'use strict';

  /**
   * @class CanvasContainer
   */
  function CanvasContainer() {
    this.stages = [];

  }

  CanvasContainer.prototype.addStage = function(_id, _container, _width, _height) {

    this.stages[_id] = new Stage(_id, _id, _container, _width, _height);
  }


  /**
   * @desc Find object in container.
   * @param _type type of object that want to find. type must be 'cell', 'cellBoundary', 'transition', 'state' or 'stage'.
   * @param _id id of object that want to find.
   */
  CanvasContainer.prototype.getElementById = function(_type, _id) {

    var stageID = null;
    var propertyContainer = require('Storage').getInstance().getPropertyContainer();

    var len = propertyContainer.floorProperties.length;
    var result = null;

    if (_type == 'stage') {
      stageID = _id;
    }

    // find stage id
    for (var i = 0; i < len && stageID == null; i++) {

      var clen = propertyContainer.floorProperties[i].cellKey.length;
      var blen = propertyContainer.floorProperties[i].cellBoundaryKey.length;
      var slen = propertyContainer.floorProperties[i].stateKey.length;
      var tlen = propertyContainer.floorProperties[i].transitionKey.length;

      switch (_type) {
        case 'cell':
          for (var j = 0; j < clen && stageID == null; j++) {
            if (propertyContainer.floorProperties[i].cellKey[j] == _id) {
              stageID = propertyContainer.floorProperties[i].id;
              break;
            }
          }
          break;
        case 'cellBoundary':
          for (var j = 0; j < blen && stageID == null; j++) {
            if (propertyContainer.floorProperties[i].cellBoundaryKey[j] == _id) {
              stageID = propertyContainer.floorProperties[i].id;
              break;
            }
          }
          break;
        case 'state':
          for (var j = 0; j < slen && stageID == null; j++) {
            if (propertyContainer.floorProperties[i].stateKey[j] == _id) {
              stageID = propertyContainer.floorProperties[i].id;
              break;
            }
          }
          break;
        case 'transition':
          for (var j = 0; j < tlen && stageID == null; j++) {
            if (propertyContainer.floorProperties[i].transitionKey[j] == _id) {
              stageID = propertyContainer.floorProperties[i].id;
              break;
            }
          }
          break;
        default:

      }
    }

    return require('Storage').getInstance().getCanvasContainer().stages[stageID].getElementById(_type, _id);

  }

  /**
   * @memberof CanvasContainer
   */
  CanvasContainer.prototype.clearCanvas = function() {

    for (var key in this.stages) {
      this.stages[key].stage.destroyChildren();
      this.stages[key].stage.destroy();
    }

    this.stages = [];

  }

  /**
   * @memberof CanvasContainer
   */
  CanvasContainer.prototype.clear = function() {

    for (var key in this.stages) {
      this.stages[key].stage.destroyChildren();
      this.stages[key].stage.destroy();
    }

    this.stages = [];

  }


  /**
   * @memberof CanvasContainer
   */
  CanvasContainer.prototype.addObjFromGeometries = function(geometryContainer) {
    var propertyContainer = require('Storage').getInstance().getPropertyContainer();
    var geometryContainer = require('Storage').getInstance().getGeometryContainer();

    // add cell
    var cells = geometryContainer.cellGeometry;
    for (var index in cells) {
      var floor = propertyContainer.getFloorById('cell', cells[index].id);
      this.stages[floor].cellLayer.group.simpleAdd({
        id: cells[index].id,
        dots: cells[index].points,
        slant: cells[index].slant
      });
    }

    // add cellBou==ndary
    var cellBoundary = geometryContainer.cellBoundaryGeometry;
    for (var index in cellBoundary) {
      var floor = propertyContainer.getFloorById('cellBoundary', cellBoundary[index].id);
      this.stages[floor].cellBoundaryLayer.group.simpleAdd({
        id: cellBoundary[index].id,
        dots: cellBoundary[index].points
      });
    }

    // add state
    var state = geometryContainer.stateGeometry;
    for(var index in state){
      var floor = propertyContainer.getFloorById('state', state[index].id);
      this.stages[floor].stateLayer.group.simpleAdd({
        id: state[index].id,
        dot: state[index].point
      });
    }

    // add transition
    var transition = geometryContainer.transitionGeometry;
    for(var index in transition){
      var floor = propertyContainer.getFloorById('transition', transition[index].id);
      this.stages[floor].transitionLayer.group.simpleAdd({
        id: transition[index].id,
        points: transition[index].points
      });
    }

    // add hole
    var hole = geometryContainer.holeGeometry;
    for(var index in hole){
      var floor = propertyContainer.getFloorById('cell', hole[index].holeOf);
      this.stages[floor].cellLayer.group.addHole(hole[index]);
    }

    for (var index in this.stages) {
      this.stages[index].stage.draw();
    }
  }

  return CanvasContainer;

});
