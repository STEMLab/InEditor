/**
 * @author suheeeee <lalune1120@hotmail.com>
 */

define([
  "../PubSub/Message.js",
  "./Result.js"
], function(
  Message,
  Result
) {
  'use strict';

  /**
   * @class DrawEventHandler
   */
  function DrawEventHandler() {

  }

  /**
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.setHandlerBinder = function(handlerBinder) {

    handlerBinder['floor-btn'] = {
      'click': this.clickFloorBtn
    };

    handlerBinder['cell-btn'] = {
      'click': this.clickCellBtn
    };

    handlerBinder['cellboundary-btn'] = {
      'click': this.clickCellBoundaryBtn
    }

    handlerBinder['stage'] = {
      'contentClick': this.addNewDot,
      'contentMousemove': this.snapping
    };

    handlerBinder['Escape'] = {
      'keyup': this.cancelDraw
    };

    handlerBinder['Enter'] = {
      'keyup': this.finishDraw
    }

  }

  /**
   * @desc When cell btn clicked `start-addnewcell` or `end-addnewcell` can publish.
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.clickCellBtn = function(broker, previousMsg) {

    var result = new Result();

    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);

    if (isFloorExist && broker.isPublishable('start-addnewcell')) {

      // reqObj.floor will be active workspace
      broker.publish(new Message('start-addnewcell', null));

      result = {
        'result': true,
        'msg': 'start-addnewcell'
      };

    } else if (broker.isPublishable('end-addnewcell')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewcell', {
          'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor': window.tmpObj.floor,
          'isEmpty': true
        }));

      } else {

        broker.publish(new Message('end-addnewcell', {
          'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (!isFloorExist) {

      result.msg = "There is no floor ...";

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to start-addnewcell, end-addnewcell.";

    }

    return result;

  }

  /**
   * @desc When floor btn clicked `addnewfloor` can publish.
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.clickFloorBtn = function(broker, previousMsg) {

    var result = new Result();

    if (broker.isPublishable('addnewfloor')) {

      broker.publish(new Message('addnewfloor', {
        'floor': window.conditions.pre_floor + (++window.conditions.LAST_FLOOR_ID_NUM)
      }));

      result.result = true;
      result.msg = null;

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to addnewfloor.";

    }

    return result;

  }

  /**
   * @desc This will call when stage clicked, so we need to distinguish which geometry will be added new dot by the previous run message.<br>This can publish `addnewcell`,
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.addNewDot = function(broker, previousMsg, data) {

    var result = new Result();

    if (broker.isPublishable('addnewcell')) {

      var isSameFloor = (data.currentTarget.attrs.id == window.tmpObj.floor);
      var isFirstClick = (window.tmpObj.floor == null);

      if (isFirstClick || (!isFirstClick && isSameFloor)) {

        broker.publish(new Message('addnewcell', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewcell';


      } else if (!isFirstClick && !isSameFloor) {

        result.msg = "you clicked different floor!";

      } else {

        result.msg = "wrong state transition : " + previousMsg + " to addnewfloor.";

      }


    } else if (broker.isPublishable('addnewcellboundary')) {

      var isSameFloor = (data.currentTarget.attrs.id == window.tmpObj.floor);
      var isFirstClick = (window.tmpObj.affiliatedCell == null);

      if (isFirstClick || (!isFirstClick && isSameFloor)) {

        broker.publish(new Message('addnewcellboundary', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewcellboundary';

      } else if (!isFirstClick && !isSameFloor) {

        result.msg = "you clicked different floor!";

      } else {

        result.msg = "wrong state transition : " + previousMsg + " to addnewcellboundary.";

      }

    } else {

      result.msg = "no match function.";

    }

    return result;

  }

  /**
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.cancelDraw = function(broker, previousMsg) {

    var result = new Result();

    switch (previousMsg) {
      case 'addnewcell':
        if (broker.isPublishable('cancel-addnewcell')) {
          broker.publish(new Message('cancel-addnewcell', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = 'cancel-addnewcell';
        }
        break;
      case 'addnewcellboundary':
        if (broker.isPublishable('cancel-addnewcellboundary')) {

          broker.publish(new Message('cancel-addnewcellboundary', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = 'cancel-addnewcellboundary';

        }
        break;
      case 'addnewstate':
        if (broker.isPublishable('cancel-addnewstate')) {

          broker.publish(new Message('cancel-addnewstate', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = 'cancel-addnewstate';

        }

        break;
      case 'addnewtransition':
        if(broker.isPublishable('cancel-addnewtransition')){

          broker.publish(new Message('cancel-addnewtransition', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = 'cancel-addnewtransition';

        }
        break;
      default:
        result.msg = "no match function.";
    }

    return result;
  }

  /**
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.finishDraw = function(broker, previousMsg) {

    var result = new Result();

    if (broker.isPublishable('end-addnewcell')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewcell', {
          'isEmpty': true
        }));

      } else {

        broker.publish(new Message('end-addnewcell', {
          'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (broker.isPublishable('end-addnewcellboundary')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewcellboundary', {
          'isEmpty': true
        }));

      } else {

        broker.publish(new Message('end-addnewcellboundary', {
          'id': window.conditions.pre_cellBoundary + (++window.conditions.LAST_CELLBOUNDARY_ID_NUM),
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (broker.isPublishable('end-addnewstate')) {

    } else if (broker.isPublishable('end-addnewtrasition')) {

    } else {
      result.mgs = "no match function."
    }

    return result;

  }

  /**
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.snapping = function(broker, previousMsg, data) {

    var result = new Result();
    var rect = window.storage.canvasContainer.stages[data.currentTarget.attrs.id].stage.content.getBoundingClientRect();

    if (broker.isPublishable('snapping')) {

      broker.publish(new Message('snapping', {
        'floor': data.currentTarget.attrs.id,
        'point': {
          x: data.evt.clientX - rect.left,
          y: data.evt.clientY - rect.top
        }
      }));

      result.result = true;
      result.msg = 'snapping';

    } else {

      result.msg = "no match function.";

    }


    return result;
  }

  /**
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.clickCellBoundaryBtn = function(broker, previousMsg) {

    var result = new Result();

    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);
    var isCellExist = (window.storage.propertyContainer.cellProperties.length != 0);

    if (!isFloorExist) {
      result.msg = "There is no floor ...";
    } else if (!isCellExist) {
      result.msg = "There is no cell ...";
    } else if (broker.isPublishable('start-addnewcellboundary')) {

      broker.publish(new Message('start-addnewcellboundary', null));

      result = {
        'result': true,
        'msg': 'start-addnewcellboundary'
      };

    } else if (broker.isPublishable('end-addnewcellboundary')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewcellboundary', {
          'isEmpty': true
        }));

      } else {

        broker.publish(new Message('end-addnewcellboundary', {
          'id': window.conditions.pre_cellBoundary + (++window.conditions.LAST_CELLBOUNDARY_ID_NUM),
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else {
      result.msg = "wrong c transition : " + previousMsg + " to start-addnewcellboundary, end-addnewcellboundary.";
    }

    return result;

  }

  return DrawEventHandler;
});
