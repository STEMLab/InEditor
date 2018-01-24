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

    handlerBinder['test-floor'] = {
      'contentClick': this.addNewDot
    };

    handlerBinder['floor-btn'] = {
      'click': this.clickFloorBtn
    };

  }


  DrawEventHandler.prototype.clickCellBtn = function(broker, previousMsg) {

    var result = {
      'result': false,
      'msg': null
    };

    switch (previousMsg) {

      case null:
        broker.publish(new Message('start-geotest', null));

        result = {
          'result': true,
          'msg': 'start-geotest'
        };
        break;

      case 'start-geotest':

        broker.publish(new Message('end-geotest', null));

        result.result = true;
        result.msg = null;
        break;

      case 'geotest':

        broker.publish(new Message('end-geotest', null));

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
  DrawEventHandler.prototype.addNewDot = function(broker, previousMsg) {

    var result = {
      'result': false,
      'msg': null
    };

    switch (previousMsg) {
      case 'start-geotest':

        broker.publish(new Message('geotest', null));

        result = {
          'result': true,
          'msg': 'geotest'
        };

        break;

      case 'geotest':

        broker.publish(new Message('geotest', null));

        result = {
          'result': true,
          'msg': 'geotest'
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
