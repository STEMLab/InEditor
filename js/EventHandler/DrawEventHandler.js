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
    };

    handlerBinder['state-btn'] = {
      'click': this.clickStateBtn
    };

    handlerBinder['transition-btn'] = {
      'click': this.clickTransitionBtn
    }

    handlerBinder['stage'] = {
      'contentClick': this.addNewDot,
      'contentMousemove': this.moveMouse,
      'contentDblclick': this.dbclick
      // 'contentMousedown': this.mousedown
    };

    handlerBinder['Escape'] = {
      'keyup': this.cancelDraw
    };

    handlerBinder['Enter'] = {
      'keyup': this.finishDraw
    }


  }

  DrawEventHandler.prototype.dbclick = function(broker, previous, data){
    log.info('dbclick : ', data);

    return new Result();
  }

  DrawEventHandler.prototype.mousedown = function(broker, previous, data){
    log.info('mousedown : ', data);

    return new Result();
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

    } else if (broker.isPublishable('addnewtransition')) {

      broker.publish(new Message('addnewtransition', {
        'floor': data.currentTarget.attrs.id
      }));

      result.result = true;
      result.msg = 'addnewtransition';

      if(window.tmpObj.dots.length == 3){
        broker.publish(new Message('end-addnewtransition', {
          floor: data.currentTarget.attrs.id,
          id: window.conditions.pre_transition+(++window.conditions.LAST_TRANSITION_ID_NUM)
        }));
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

    } else if (broker.isPublishable('end-addnewtransition')) {

      broker.publish(new Message('end-addnewtransition', {
        'id': window.conditions.pre_transition + (++window.conditions.LAST_TRANSITION_ID_NUM),
        'floor': window.tmpObj.floor
      }));

      result.result = true;
      result.msg = null;

    } else {
      result.mgs = "no match function."
    }

    return result;

  }

  /**
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.moveMouse = function(broker, previousMsg, data) {

    var result = new Result();
    var rect = window.storage.canvasContainer.stages[data.currentTarget.attrs.id].stage.content.getBoundingClientRect();

    if (broker.isPublishable('snapping')) {

      var reqObj = {
        'floor': data.currentTarget.attrs.id,
        'point': {
          x: data.evt.clientX - rect.left,
          y: data.evt.clientY - rect.top
        }
      };

      broker.publish(new Message('snapping', reqObj));

      broker.publish(new Message('movetooltip', reqObj));

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
      result.msg = "wrong transition : " + previousMsg + " to start-addnewcellboundary, end-addnewcellboundary.";
    }

    return result;

  }

  /**
  * @memberof DrawEventHandler
  */
  DrawEventHandler.prototype.clickStateBtn = function(broker, previousMsg){

    var result = new Result();

    log.info('call click state-btn');

    return result;

  }

  /**
  * @memberof DrawEventHandler
  */
  DrawEventHandler.prototype.clickTransitionBtn = function(broker, previousMsg){

    var result = new Result();
    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);
    var isStateExist = (window.storage.propertyContainer.stateProperties.length >= 2);

    if (!isFloorExist) {

      result.msg = "There is no floor ...";

    } else if (!isStateExist){

      result.msg = "There is too few state ...";

    } else if(broker.isPublishable('start-addnewtransition')){

      broker.publish(new Message('start-addnewtransition', null));

      result.result = true;
      result.msg = 'start-addnewtransition';

    } else if(broker.isPublishable('end-addnewtransition')){

      broker.publish(new Message('start-addnewtransition', null));

      result.result = true;
      result.msg = null;

    } else {
      result.msg = "wrong transition : " + previousMsg + " to start-addnewtransition, end-addnewtransition.";
    }

    return result;

  }

  return DrawEventHandler;
});
