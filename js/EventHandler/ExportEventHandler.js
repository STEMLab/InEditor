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

    handlerBinder['viewer-modal-btn'] = {
      'click': this.exportToViewer
    };

    handlerBinder['project-export'] = {
      'click': this.exportToFactory
    };

  }

  ExportEventHandler.prototype.exportToViewer = function(broker, previousMsg) {

    var result = new Result();

    if (broker.isPublishable('exporttoviewer')) {
      broker.publish(new Message('exporttoviewer', {
        'port': document.getElementById("viewer-portNum").value,
        'uri': document.getElementById("viewer-uri").value
      }));
      result.result = true;
      result.msg = null;
    } else {
      result.msg = "wrong state transition : " + previousMsg + " to exporttojson.";
    }

    return result;

  }

  ExportEventHandler.prototype.exportToFactory = function(broker, previousMsg) {

    var result = new Result();

    if (broker.isPublishable('exporttofactory')) {
      broker.publish(new Message('exporttofactory', null));
      result.result = true;
      result.msg = null;
    } else {
      result.msg = "wrong state transition : " + previousMsg + " to exporttojson.";
    }

    return result;

  }

  return ExportEventHandler;
});
