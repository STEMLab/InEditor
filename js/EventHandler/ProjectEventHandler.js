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

  /**
   * @memberof ProjectEventHandler
   */
  ProjectEventHandler.prototype.setHandlerBinder = function(handlerBinder) {

    handlerBinder['project-save'] = {
      'click': this.saveProject
    };

    handlerBinder['project-load'] = {
      'click': this.loadProject
    };

  }

  /**
   * @memberof ProjectEventHandler
   */
  ProjectEventHandler.prototype.saveProject = function(broker, previousMsg) {

    var result = new Result();

    if (broker.isPublishable('saveproject')) {

      // reqObj.floor will be active workspace
      broker.publish(new Message('saveproject', null));

      result = {
        'result': true,
        'msg': 'saveproject'
      };
    } else {

      result.msg = "wrong state transition : " + previousMsg + " to saveproject.";

    }

    return result;

  }

  /**
   * @memberof ProjectEventHandler
   */
  ProjectEventHandler.prototype.loadProject = function(broker, previousMsg) {

    var result = new Result();

    if (broker.isPublishable('loadproject')) {

      // reqObj.floor will be active workspace
      broker.publish(new Message('loadproject', null));

      result = {
        'result': true,
        'msg': 'loadproject'
      };
    } else {

      result.msg = "wrong state transition : " + previousMsg + " to saveproject.";

    }

    return result;

  }


  return ProjectEventHandler;
});
