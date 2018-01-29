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
      'setworkspaceview': 'single',
      'addfloorplan': 'single'
    });

    this.addCallbackFun('setpropertyview', this.setPropertyView);
    this.addCallbackFun('updateproperty', this.updateProperty);
    this.addCallbackFun('zoomworkspace', this.zoomWorkspace);
    this.addCallbackFun('setworkspaceview', this.setWorkspaceView);
    this.addCallbackFun('addfloorplan', this.addFloorPlan);
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

  /**
   * @param {Message.reqObj} reqObj id : floor id,  img :
   */
  UIManager.prototype.addFloorPlan = function(reqObj) {

    // save image to assets > floorplan
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {

        // success to save image
        console.log(">>> succeed in saving image");
        console.log(JSON.parse(xhr.response));

        /// set background
        var backgroundLayer = window.storage.canvasContainer.stages[reqObj.id].backgroundLayer.layer;

        // clear layer before add new floorplan
        backgroundLayer.clear();

        var imageObj = new Image();
        imageObj.onload = function() {

          var floorplan = new Konva.Image({
            x: 0,
            y: 0,
            image: imageObj,
            width: window.storage.canvasContainer.stages[reqObj.id].stage.attrs.width,
            height: window.storage.canvasContainer.stages[reqObj.id].stage.attrs.height
          });

          // add the shape to the layer
          backgroundLayer.add(floorplan);
          backgroundLayer.draw();

        };
        imageObj.src = JSON.parse(xhr.response);
      }
    }

    xhr.open("POST", "http://127.0.0.1:8080/floorplan-upload", true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    formData.append("files", reqObj.img, reqObj.id);
    xhr.send(formData);
  }


  return UIManager;
});
