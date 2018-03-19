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

  CanvasContainer.prototype.addStage = function(_id, _container, _width, _height){

    this.stages[_id] = new Stage(_id,_id,_container, _width, _height);
  }


  /**
   * @desc Find object in container.
   * @param _type type of object that want to find. type must be 'cell', 'cellBoundary', 'transition', 'state' or 'stage'.
   * @param _id id of object that want to find.
   */
  CanvasContainer.prototype.getElementById = function(_type, _id) {

    var stageID = null;

    var len = window.storage.propertyContainer.floorProperties.length;
    var result = null;

    if (_type == 'stage'){
      stageID = _id;
    }

    // find stage id
    for (var i = 0; i < len && stageID == null; i++) {

      var clen = window.storage.propertyContainer.floorProperties[i].cellKey.length;
      var blen = window.storage.propertyContainer.floorProperties[i].cellBoundaryKey.length;
      var slen = window.storage.propertyContainer.floorProperties[i].stateKey.length;
      var tlen = window.storage.propertyContainer.floorProperties[i].transitionKey.length;

      switch (_type) {
        case 'cell':
          for (var j = 0; j < clen && stageID == null; j++) {
            if (window.storage.propertyContainer.floorProperties[i].cellKey[j] == _id) {
              stageID = window.storage.propertyContainer.floorProperties[i].id;
              break;
            }
          }
          break;
        case 'cellBoundary':
          for (var j = 0; j < blen && stageID == null; j++) {
            if (window.storage.propertyContainer.floorProperties[i].cellBoundaryKey[j] == _id) {
              stageID = window.storage.propertyContainer.floorProperties[i].id;
              break;
            }
          }
          break;
        case 'state':
          for (var j = 0; j < slen && stageID == null; j++) {
            if (window.storage.propertyContainer.floorProperties[i].stateKey[j] == _id) {
              stageID = window.storage.propertyContainer.floorProperties[i].id;
              break;
            }
          }
          break;
        case 'transition':
          for (var j = 0; j < tlen && stageID == null; j++) {
            if (window.storage.propertyContainer.floorProperties[i].transitionKey[j] == _id) {
              stageID = window.storage.propertyContainer.floorProperties[i].id;
              break;
            }
          }
          break;
        default:

      }
    }

    switch (_type) {
      case 'cell':
        var cells = window.storage.canvasContainer.stages[stageID].cellLayer.group.cells;
        for (var key in cells) {
          if (cells[key].id == _id) {
            result = cells[key];
            break;
          }
        }
        break;
      case 'cellboundary':
        var cellboundaries = window.storage.canvasContainer.stages[stageID].cellBoundaryLayer.group.cellBoundaries;
        for (var key in cellboundaries) {
          if (cellboundaries[key].id == _id) {
            result = cellboundaries[key];
            break;
          }
        }
        break;
      case 'state':
        var states = window.storage.canvasContainer.stages[stageID].stateLayer.group.states;
        for (var key in states) {
          if (states[key].id == _id) {
            result = states[key];
            break;
          }
        }
        break;
      case 'transition':
        var transitions = window.storage.canvasContainer.stages[stageID].transitionLayer.group.transitions;
        for (var key in transitions) {
          if (transitions[key].id == _id) {
            result = transitions[key];
            break;
          }
        }
        break;
      case 'stage':
        result = window.storage.canvasContainer.stages[stageID];
        break;
      default:
    }

    return result;
  }

  /**
  * @memberof CanvasContainer
  */
  CanvasContainer.prototype.clearCanvas = function(){

    for(var key in this.stages){
      this.stages[key].stage.destroyChildren();
      this.stages[key].stage.destroy();
    }

    this.stages = [];

  }


  /**
  * @memberof CanvasContainer
  */
  CanvasContainer.prototype.addObjFromGeometries = function(geometryContainer){

    log.info(window.storage.dotFoolContainer);

    // add cell
    var cells = geometryContainer.cellGeometry;
    for ( var index in cells ){
      var floor = window.storage.propertyContainer.getFloorById('cell', cells[index].id);
      this.stages[floor].cellLayer.group.simpleAdd({
        id : cells[index].id,
        dots : cells[index].points
      });
    }

    // add cellBoundary
    var cellBoundary = geometryContainer.cellBoundaryGeometry;
    for ( var index in cellBoundary ){
      var floor = window.storage.propertyContainer.getFloorById('cellBoundary', cellBoundary[index].id);
      this.stages[floor].cellBoundaryLayer.group.simpleAdd({
        id : cellBoundary[index].id,
        dots : cellBoundary[index].points
      });
    }

    // add state

    // add transition

    for(var index in this.stages){
      this.stages[index].stage.draw();
    }
  }

  return CanvasContainer;

});
