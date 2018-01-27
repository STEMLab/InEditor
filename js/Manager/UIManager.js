/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "./Manager.js"
], function(
  Manager
) {
  'use strict';

  /**
   * @desc Changes in the UI.
   * @class UIManager
   */
  function UIManager() {

    Manager.apply(this, arguments);

    this.init();
  }

  UIManager.prototype = Object.create(Manager.prototype);

  UIManager.prototype.init = function() {

    this.name = 'UIManager';

    this.addReq({
      'setpropertyview': 'single',
      'updateproperty': 'single',
      'zoomworkspace': 'single',
      'setworkspaceview': 'single'
    });

    this.addCallbackFun('setpropertyview', this.setPropertyView);
    this.addCallbackFun('updateproperty', this.updateProperty);
    this.addCallbackFun('zoomworkspace', this.zoomWorkspace);
    this.addCallbackFun('setworkspaceview', this.setWorkspaceView);
  }

  UIManager.prototype.test = function(reqObj) {

    console.log("ui-manager test success");

  }

  /**
   * @param {Message.reqObj} reqObj type, id, updateContent
   */
  UIManager.prototype.updateProperty = function(reqObj) {

    window.uiContainer.sidebar.treeview.updateTitle(reqObj.id, reqObj.updateContent.name);

  }

  /**
   * @param {Message.reqObj} reqObj type, id, storage
   */
  UIManager.prototype.setPropertyView = function(reqObj) {

    window.uiContainer.sidebar.property.setPropertyTab(reqObj.type, reqObj.id, window.storage);

  }

  /**
   * @param {Message.reqObj} reqObj id : state id<br>newScale<br>newPos
   */
  UIManager.prototype.zoomWorkspace = function(reqObj) {

    window.storage.canvasContainer.stages[reqObj.id].stage.position(reqObj.newPos);
    window.storage.canvasContainer.stages[reqObj.id].stage.scale({
      x: reqObj.newScale,
      y: reqObj.newScale
    });
    window.storage.canvasContainer.stages[reqObj.id].stage.batchDraw();

  }

  /**
   * Converts the active tab of the workspace to the selected floor.
   * @param {Message.reqObj} reqObj id : floor id
   */
  UIManager.prototype.setWorkspaceView = function(reqObj) {

  }


  return UIManager;
});
