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

    handlerBinder['cell-btn'] = {
      'click': this.clickCellBtn
    };

    handlerBinder['floor-btn'] = {
      'click': this.clickFloorBtn
    };

    handlerBinder['stage'] = {
      'contentClick': this.addNewDot
    };

    handlerBinder['Escape'] = {
      'keyup' : this.cancelDraw
    };

    handlerBinder['Enter'] = {
      'keyup' : this.finishDraw
    }

  }

  /**
   * @desc When cell btn clicked `start-addnewcell` or `end-addnewcell` can publish.
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.clickCellBtn = function(broker, previousMsg) {

    var result = new Result();

    var isFloorExist = (window.storage.propertyContainer.floorProperties.length!=0);

    if (isFloorExist && broker.isPublishable('start-addnewcell')) {

      // reqObj.floor will be active workspace
      broker.publish(new Message('start-addnewcell', null));

      result = {
        'result': true,
        'msg': 'start-addnewcell'
      };

    } else if (broker.isPublishable('end-addnewcell')) {

      broker.publish(new Message('end-addnewcell', {
        'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
        'floor': window.tmpObj.floor
      }));

      result.result = true;
      result.msg = null;

    } else if(!isFloorExist){

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

      broker.publish(new Message('addnewfloor', null));
      result = {
        'result': true,
        'msg': null
      };


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

    // The results of the broker.isPublishable function are the same in all cases,
    // because addnewcell, addnewcellboundary, addnewstate, and addnewtransition all belong to the `draw` code.
    // Therefore, proceed to the isPublishable test for any one msg(canceladdnewcell).

    if (broker.isPublishable('canceladdnewcell')) {
      switch (previousMsg) {
        case 'addnewcell':
          broker.publish(new Message('canceladdnewcell', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = 'canceladdnewcell';
          break;
        case 'addnewcellboundary':
          broker.publish(new Message('canceladdnewcellboundary', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = 'canceladdnewcellboundary';
          break;
        case 'addnewstate':
          broker.publish(new Message('canceladdnewstate', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = 'canceladdnewstate';
          break;
        case 'addnewtransition':
          broker.publish(new Message('canceladdnewtransition', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = 'canceladdnewtransition';
          break;
        default:
          result.msg = "no match function.";
      }
    } else {
      result.msg = "wrong state transition : " + previousMsg + " to canceladdnewcell, canceladdnewcellboundary, canceladdnewtransition or canceladdnewtransition.";
    }

    return result;

  }

  /**
   * @memberof DrawEventHandler
   */
   DrawEventHandler.prototype.finishDraw = function(broker, previousMsg){

     var result = new Result();

     if(broker.isPublishable('end-addnewcell')){

       broker.publish(new Message('end-addnewcell', {
         'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
         'floor': window.tmpObj.floor
       }));

       result.result = true;
       result.msg = null;

     } else if(broker.isPublishable('end-addnewcellboundary')){

     } else if(broker.isPublishable('end-addnewstate')){

     } else if(broker.isPublishable('end-addnewtrasition')){

     } else{
       result.mgs = "no match function."
     }

     return result;

   }



  return DrawEventHandler;
});
