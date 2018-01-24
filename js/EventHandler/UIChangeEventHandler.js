/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([
  "../PubSub/Message.js"
],function(
  Message
) {
  'use strict';

  /**
  * @desc This handler deal with events which request change ui.<br>e.g. click tree view content.
  * @exports UIChangeEventHandler
  */
  function UIChangeEventHandler() {

  }

  UIChangeEventHandler.prototype.setHandlerBinder = function(handlerBinder){

    handlerBinder['tree-view'] = {'fancytreeclick' : this.clickTreeView };

  }

  UIChangeEventHandler.prototype.clickTreeView = function(broker, previousMsg, data){

    var result = {
      'result': false,
      'msg': null
    };

    switch (previousMsg) {

      case null:
        broker.publish(new Message('setpropertyview', {'type' : data.node.type, 'id' : data.node.key, 'storage':window.storage}));
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

  return UIChangeEventHandler;
});
