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

    handlerBinder['project-import'] = {
      'click': this.clickImporttBtn
    }

    handlerBinder['project-import-file'] = {
      'change': this.importGML
    };

    handlerBinder['project-save-as-btn'] = {
      'click': this.saveProjectToNewPath
    };

    handlerBinder['project-saveas'] = {
      'click': this.clickSaveAsProjectBtn
    };

    handlerBinder['project-import-modal-btn'] = {
      'click': this.importFile
    };

    handlerBinder['s'] = {
      'keydown': this.saveProject
    };

    handlerBinder['setting-conditions'] = {
      'click': this.clickSettingConditions
    };

    handlerBinder['setting-conditions-modal-btn'] = {
      'click': this.updateConditions
    };


  }

  /**
   * @memberof ProjectEventHandler
   */
  ProjectEventHandler.prototype.clickSaveAsProjectBtn = function(broker, previousMsg) {

    window.document.getElementById("project-save-as-file-name").value = window.conditions.saveName;
    window.document.getElementById("project-save-as-file-path").value = window.conditions.savePath;

    return {
      'result': true,
      'msg': null
    };

  }

  /**
   * @memberof ProjectEventHandler
   */
  ProjectEventHandler.prototype.saveProjectToNewPath = function(broker, previousMsg, data) {

    var result = new Result();

    var path = window.document.getElementById('project-save-as-file-path').value;
    var name = window.document.getElementById('project-save-as-file-name').value;
    log.info('new path:', path, ', new name:', name);

    if (broker.isPublishable('saveproject')) {

      window.conditions.saveName = name;
      window.conditions.savePath = path;

      // reqObj.floor will be active workspace
      broker.publish(new Message('saveproject', null));

      result = {
        'result': true,
        'msg': 'saveproject'
      };

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to saveproject.";

    }

    $('#project-save-as-modal').modal('hide');
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
  ProjectEventHandler.prototype.clickImporttBtn = function(broker, previousMsg) {

    window.document.getElementById("project-import-file").addEventListener("change", function(e) {
      window.eventHandler.callHandler('html', e);
    });

    $('#project-import-file').click();

    return {
      'result': true,
      'msg': null
    }

  }

  /**
   * @memberof ProjectEventHandler
   */
  ProjectEventHandler.prototype.loadProject = function(broker, previousMsg, data) {
    console.log(document.getElementById(data.target.id).files)
    var result = new Result();

    if (broker.isPublishable('loadproject') && document.getElementById(data.target.id).value != "") {

      // reqObj.floor will be active workspace
      broker.publish(new Message('loadproject', {
        file: document.getElementById(data.target.id).files[0]
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

  /**
   * @memberof ProjectEventHandler
   */
  ProjectEventHandler.prototype.importGML = function(broker, previousMsg, data) {
    console.log(document.getElementById(data.target.id).files)
    var result = new Result();

    if (broker.isPublishable('importgml') && document.getElementById(data.target.id).value != "") {

      // reqObj.floor will be active workspace
      broker.publish(new Message('importgml', {
        file: document.getElementById(data.target.id).files[0]
      }));

      document.getElementById(data.target.id).value = '';

      result = {
        'result': true,
        'msg': 'importgml'
      };
    } else if (document.getElementById(data.target.id).value == "") {

      result.msg = "clear file input ...";

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to saveproject.";

    }

    return result;

  }

  /**
   * @memberof ProjectEventHandler
   */
  ProjectEventHandler.prototype.changeImportFileLabel = function(broker, previousMsg, data) {

    log.info(data);

    return {
      'result': true,
      'msg': null
    }

  }

  /**
   * @memberof ProjectEventHandler
   */
  ProjectEventHandler.prototype.importFile = function(broker, previousMsg, data) {

    var result = new Result();

    if (broker.isPublishable('importfile') && document.getElementById('project-import-file').value != "") {
      var importOn = document.getElementById('project-import-option-new-project').checked;
      var realCoor = document.getElementById('project-import-option-boundingbox').checked;

      broker.publish(new Message('importfile', {
        file: document.getElementById('project-import-file').files[0],
        importOn: importOn ? 'new-project' : window.uiContainer.workspace.getActivatedWorkspace(),
        coordinate: realCoor ? {
          type: 'boundingBox',
          data: null
        } : {
          type: 'center',
          data: {
            x: document.getElementById('project-import-option-center-x').value,
            y: document.getElementById('project-import-option-center-y').value,
            rotation: document.getElementById('project-import-option-center-rotation').value,
          }
        },
        significant: document.getElementById('project-import-option-significant-figures').value
      }));

      document.getElementById(data.target.id).value = '';

      result = {
        'result': true,
        'msg': 'importfile'
      };
    } else if (document.getElementById(data.target.id).value == "") {

      result.msg = "clear file input ...";

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to importfile.";

    }

    return result;

  }

  ProjectEventHandler.prototype.clickSettingConditions = function(broker, previousMsg, data) {

    var conditions = window.conditions;

    window.document.getElementById('setting-conditions-pre-cell').value = conditions.pre_cell;
    window.document.getElementById('setting-conditions-pre-cellBoundary').value = conditions.pre_cellBoundary;
    window.document.getElementById('setting-conditions-pre-state').value = conditions.pre_state;
    window.document.getElementById('setting-conditions-pre-transition').value = conditions.pre_transition;

    window.document.getElementById('setting-conditions-aspect-ratio').value = conditions.aspectRatio.x + ' : ' + conditions.aspectRatio.y;
    window.document.getElementById('setting-conditions-scale-factor').value = conditions.scaleFactor;
    window.document.getElementById('setting-conditions-scale-max').value = conditions.scaleMax;

    return {
      'result': true,
      'msg': null
    }

  };

  ProjectEventHandler.prototype.updateConditions = function(broker, previousMsg, data){

    if(window.broker.isPublishable('updateconditions')){
      broker.publish(new Message('updateconditions', {
        prefix :{
          cell : $('#setting-conditions-pre-cell').val(),
          cellboundary : $('#setting-conditions-pre-cellBoundary').val(),
          state : $('#setting-conditions-pre-state').val(),
          trnsition : $('#setting-conditions-pre-transition').val()
        },
        canvas:{
          aspectRatio : $('#setting-conditions-aspect-ratio').val(),
          scaleFactor : $('#setting-conditions-scale-factor').val(),
          scaleMax : $('#setting-conditions-scale-max').val(),
          automGenerateState: $('#setting-conditions-auto-create-state').is(":checked") == true ? true : false
        }
      }));

    }

    return {
      'result': true,
      'msg': null
    }
  }



  return ProjectEventHandler;
});
