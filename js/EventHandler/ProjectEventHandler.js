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
   * @class ProjectEventHandler
   */
  function ProjectEventHandler() {

  }

  ProjectEventHandler.prototype.setHandlerBinder = function(handlerBinder) {

    handlerBinder['project-export'] = {
      'click': this.clickProjectExport
    };

  }

  ProjectEventHandler.prototype.clickProjectExport = function(broker, previousMsg) {

    var result = new Result();

    if (broker.isPublishable('exporttojson')) {
      broker.publish(new Message('exporttojson', null));
      result.result = true;
      result.msg = null;
    } else {
      result.msg = "wrong state transition : " + previousMsg + " to exporttojson.";
    }

    return result;

  }

  return ProjectEventHandler;
});
