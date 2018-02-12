/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "../PubSub/Message.js",
  "../PubSub/Result.js"
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

  }

  /**
   * @desc When cell btn clicked `start-addnewcell` or `end-addnewcell` can publish.
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.clickCellBtn = function(broker, previousMsg) {

    var result = {
      'result': false,
      'msg': null
    };

    var result = new Result();

    if (broker.isPublishable('start-addnewcell')) {

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

    var result = {
      'result': false,
      'msg': null
    };

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

    var result = {
      'result': false,
      'msg': null
    };

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




  return DrawEventHandler;
});
