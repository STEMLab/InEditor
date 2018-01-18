define([], function() {
  'use strict';

  function DrawEventHandler() {

  }

  DrawEventHandler.prototype.setHandlerBinder = function(handlerBinder) {

    handlerBinder['cell-btn'] = {
      'click': this.clickCellBtn
    };
    handlerBinder['test-floor'] = {
      'contentClick': this.addNewDot
    };
  }


  /**
   * @desc run-message : 'start-geotest'.<br>previous-message : null
   */
  DrawEventHandler.prototype.clickCellBtn = function(managerController, previousMsg) {

    var result = {
      'result': false,
      'msg': 'null'
    };

    switch (previousMsg) {

      case null:
        managerController.run({
          'request': 'start-geotest',
          'requestObj': null
        });

        result = {
          'result': true,
          'msg': 'start-geotest'
        };
        break;

      case 'start-geotest':
        managerController.run({
          'request': 'end-geotest',
          'requestObj': null
        });

        result.result = true;
        result.msg = 'end-geotest';
        break;

      case 'geotest':

        managerController.run({
          'request': 'end-geotest',
          'requestObj': null
        });

        result.result = true;
        result.msg = null;
        break;

      default:
        result.msg = "wrong previous state : " + previousMsg;
        break;
    }

    return result;

  }

  /**
   * This will call when stage clicked, so we need to distinguish which geometry will be added new dot by the previous run message.
   */
  DrawEventHandler.prototype.addNewDot = function(managerController, previousMsg) {

    var result = {
      'result': false,
      'msg': 'null'
    };

    switch (previousMsg) {
      case 'start-geotest':

        managerController.run({
          'request': 'geotest',
          'requestObj': null
        });

        result = {
          'result': true,
          'msg': 'geotest'
        };

        break;

      case 'geotest':

        managerController.run({
          'request': 'geotest',
          'requestObj': null
        })

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
