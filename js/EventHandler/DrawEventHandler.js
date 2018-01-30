/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "../PubSub/Message.js"
], function(
  Message
) {
  'use strict';

  /**
   * @exports DrawEventHandler
   */
  function DrawEventHandler() {

  }

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


  DrawEventHandler.prototype.clickCellBtn = function(broker, previousMsg) {

    var result = {
      'result': false,
      'msg': null
    };

    switch (previousMsg) {

      case null:

        // reqObj.floor will be active workspace
        broker.publish(new Message('start-addnewcell', null));

        result = {
          'result': true,
          'msg': 'start-addnewcell'
        };
        break;

      case 'start-addnewcell':

        broker.publish(new Message('end-addnewcell', {
          'id' : window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor' : window.tmpObj.floor
        }));

        result.result = true;
        result.msg = null;
        break;

      case 'addnewcell':

      broker.publish(new Message('end-addnewcell', {
        'id' : window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
        'floor' : window.tmpObj.floor
      }));

      result.result = true;
      result.msg = null;
      break;

      default:
        result.msg = "wrong previous state : " + previousMsg;
        break;
    }

    return result;

  }

  DrawEventHandler.prototype.clickFloorBtn = function(broker, previousMsg) {

    var result = {
      'result': false,
      'msg': null
    };

    switch (previousMsg) {

      case null:
        broker.publish(new Message('addnewfloor', null));
        result = {
          'result': true,
          'msg': null
        };
        break;

      default:
        result.msg = "wrong previous state : " + previousMsg;
        break;
    }

    return result;

  }

  /**
   * @desc This will call when stage clicked, so we need to distinguish which geometry will be added new dot by the previous run message.
   */
  DrawEventHandler.prototype.addNewDot = function(broker, previousMsg, data) {

    var result = {
      'result': false,
      'msg': null
    };

    console.log(data);

    switch (previousMsg) {
      case 'start-addnewcell':

        if (data.currentTarget.attrs.id != window.tmpObj.floor && window.tmpObj.floor != null) {

          result = {
            'result': false,
            'msg': 'you clicked different floor!'
          };

          break;
        }

        broker.publish(new Message('addnewcell', {
          'floor': data.currentTarget.attrs.id
        }));

        result = {
          'result': true,
          'msg': 'addnewcell'
        };

        break;

      case 'addnewcell':

        if (data.currentTarget.attrs.id != window.tmpObj.floor) {

          result = {
            'result': false,
            'msg': 'you clicked different floor!'
          };

          break;
        }

        broker.publish(new Message('addnewcell', {
          'floor': data.currentTarget.attrs.id
        }));

        result = {
          'result': true,
          'msg': 'addnewcell'
        };

        break;

      default:
        result = {
          'resutl': false,
          'msg': 'no match function !'
        };

        break;


    }

    return result;

  }




  return DrawEventHandler;
});
