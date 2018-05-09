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
      'click': this.clickLoadProjectBtn
    }

    handlerBinder['project-load-file'] = {
      'change': this.loadProject
    };

    handlerBinder['project-saveas-file'] = {
      'change': this.saveProjectToNewPath
    }

    handlerBinder['project-saveas'] = {
      'click': this.clickSaveAsProjectBtn
    }

    handlerBinder['s'] = {
      'keydown': this.saveProject
    }

  }

  /**
  * @memberof ProjectEventHandler
  */
  ProjectEventHandler.prototype.clickSaveAsProjectBtn = function(broker, previousMsg){

    window.document.getElementById("project-saveas-file").addEventListener("change", function(e) {
      window.eventHandler.callHandler('html', e);
    });

    $('#project-saveas-file').click();

    return {
      'result': true,
      'msg': null
    }

  }

  /**
  * @memberof ProjectEventHandler
  */
  ProjectEventHandler.prototype.saveProjectToNewPath = function(broker, previousMsg, data){

    var result = new Result();

    log.info(data.target);

    return result;
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
  ProjectEventHandler.prototype.clickLoadProjectBtn = function(broker, previousMsg) {

    window.document.getElementById("project-load-file").addEventListener("change", function(e) {
      window.eventHandler.callHandler('html', e);
    });

    $('#project-load-file').click();

    return {
      'result': true,
      'msg': null
    }

  }

  /**
   * @memberof ProjectEventHandler
   */
  ProjectEventHandler.prototype.loadProject = function(broker, previousMsg, data) {

    var result = new Result();

    if (broker.isPublishable('loadproject') && document.getElementById(data.target.id).value != "") {

      // reqObj.floor will be active workspace
      broker.publish(new Message('loadproject', {
        file : document.getElementById(data.target.id).files[0]
      }));

       document.getElementById(data.target.id).value = '';

      result = {
        'result': true,
        'msg': 'loadproject'
      };
    } else if (document.getElementById(data.target.id).value == "") {

      result.msg = "clear file input ...";

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to saveproject.";

    }

    return result;

  }



  return ProjectEventHandler;
});
