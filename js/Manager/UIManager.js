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
   * @augments Manager
   */
  function UIManager() {

    Manager.apply(this, arguments);

    this.init();
  }

  UIManager.prototype = Object.create(Manager.prototype);

  /**
   * @memberof UIManager
   * @override
   */
  UIManager.prototype.init = function() {

    this.name = 'UIManager';

    this.addReq({
      'setpropertyview' : null,
      'updateproperty' : null,
      'zoomworkspace' : null,
      'addfloorplan' : null,
      'start-addnewcell' : null,
      'addnewcell' : null,
      'end-addnewcell' : null,
      'updaterefdata' : null
    });

    this.addCallbackFun('setpropertyview', this.setPropertyView);
    this.addCallbackFun('updateproperty', this.updateProperty);
    this.addCallbackFun('zoomworkspace', this.zoomWorkspace);
    this.addCallbackFun('addfloorplan', this.addFloorPlan);

    this.addCallbackFun('start-addnewcell', this.startAddNewCell);
    this.addCallbackFun('addnewcell', this.addNewCell);
    this.addCallbackFun('end-addnewcell', this.endAddNewCell);

    this.addCallbackFun('updaterefdata', this.updateRefProperty);
  }

  UIManager.prototype.test = function(reqObj) {

    console.log("ui-manager test success");

  }

  /**
   * @desc Change title of node in tree view which representing reqObj.id
   * @memberof UIManager
   * @param {Message.reqObj} reqObj type, id, updateContent
   */
  UIManager.prototype.updateProperty = function(reqObj) {

    window.uiContainer.sidebar.treeview.updateTitle(reqObj.id, reqObj.updateContent.name);

  }

  /**
   * @memberof UIManager
   * @param {Message.reqObj} reqObj type, id, storage
   */
  UIManager.prototype.setPropertyView = function(reqObj) {

    window.uiContainer.sidebar.property.setPropertyTab(reqObj.type, reqObj.id, window.storage);

  }


  /**
   * @memberof UIManager
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
   * @memberof UIManager
   * @param {Message.reqObj} reqObj id : floor id,  img : file
   */
  UIManager.prototype.addFloorPlan = function(reqObj) {

    // save image to assets > floorplan
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {

        // success to save image
        console.log(">>> succeed in saving image");
        // console.log(JSON.parse(xhr.response));

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


  /**
   * @memberof UIManager
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   */
  UIManager.prototype.startAddNewCell = function(reqObj) {

    // change floor btn color
    document.getElementById('cell-btn').src = "../../assets/icon/cell_a.png";

  }


  /**
   * @memberof UIManager
   */
  UIManager.prototype.addNewCell = function(reqObj) {

    console.log("UIManager.addNewCell called ... ");

  }


  /**
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewCell = function(reqObj) {

    // set sidebar > property
    window.uiContainer.sidebar.property.setPropertyTab('cell', reqObj.id, window.storage);

    // change floor btn color
    document.getElementById('cell-btn').src = "../../assets/icon/cell_d.png";

    // refresh tree view
    window.uiContainer.sidebar.treeview.addCell(reqObj.id, reqObj.floor);

  }


  /**
   * @memberof UIManager
   * @param {Message.reqObj} reqObj type<br>id<br>updateContent: externalRef
   */
  UIManager.prototype.updateRefProperty = function(reqObj) {

    // $('externalRef-text').append("<option value=" + reqObj.updateContent.externalRef + "></option>");

    var option = document.createElement("option");
    option.text = reqObj.updateContent.externalRef;
    option.value = reqObj.updateContent.externalRef;
    var select = document.getElementById("externalRef-text");
    select.appendChild(option);

  }


  return UIManager;
});
