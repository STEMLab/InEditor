/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./Result.js",
  "../PubSub/Message.js"
], function(
  Result,
  Message
) {
  'use strict';

  /**
   * @class ExportEventHandler
   */
  function ExportEventHandler() {

  }

  ExportEventHandler.prototype.setHandlerBinder = function(handlerBinder) {

    handlerBinder['viewer-btn'] = {
      'click': this.exportToViewer
    };

  }

  ExportEventHandler.prototype.exportToViewer = function(broker, previousMsg) {

    var result = new Result();

    if (broker.isPublishable('exporttoviewer')) {
      broker.publish(new Message('exporttoviewer', null));
      result.result = true;
      result.msg = null;
    } else {
      result.msg = "wrong state transition : " + previousMsg + " to exporttojson.";
    }

    return result;

  }

  return ExportEventHandler;
});
