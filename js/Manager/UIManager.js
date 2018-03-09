/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../Storage/Canvas/Stage.js",
  "../PubSub/Subscriber.js"
], function(
  Stage,
  Subscriber
) {
  'use strict';

  /**
   * @desc Changes in the UI.
   * @class UIManager
   * @augments Subscriber
   */
  function UIManager() {

    Subscriber.apply(this, arguments);

    this.init();
  }

  UIManager.prototype = Object.create(Subscriber.prototype);

  /**
   * @memberof UIManager
   */
  UIManager.prototype.init = function() {

    this.name = 'UIManager';

    this.addCallbackFun('setpropertyview', this.setPropertyView);
    this.addCallbackFun('updateproperty', this.updateProperty);
    this.addCallbackFun('zoomworkspace', this.zoomWorkspace);
    this.addCallbackFun('addfloorplan', this.addFloorPlan, this.addFloorPlan_makeHistoryObj, this.addFloorPlan_undo);

    this.addCallbackFun('addnewfloor', this.addNewFloor);

    this.addCallbackFun('start-addnewcell', this.startAddNewCell);
    this.addCallbackFun('end-addnewcell', this.endAddNewCell, this.endAddNewCell_makeHistoryObj, this.removeObj);

    this.addCallbackFun('updaterefdata', this.updateRefProperty);

    this.addCallbackFun('activateworkspace', this.activateWorkspace);

    this.addCallbackFun('canceladdnewcell', this.cancelAddNewCell);
    this.addCallbackFun('canceladdnewcellboundary', this.cancelAddNewCellBoundary);

    this.addCallbackFun('start-addnewcellboundarybtw', this.startAddNewCellBoundaryBtw);
    this.addCallbackFun('end-addnewcellboundarybtw', this.endAddNewCellBoundaryBtw);
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

    if (reqObj.img == null) window.myhistory.undo();

    // save image to assets > floorplan
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {

        // success to save image
        log.info(">>> succeed in saving image");
        // console.log(JSON.parse(xhr.response));

        /// set background
        var backgroundLayer = window.storage.canvasContainer.stages[reqObj.id].backgroundLayer.layer;

        // clear layer before add new floorplan
        backgroundLayer.destroyChildren();

        var imageObj = new Image();

        imageObj.onload = function() {
          // log.info("on load called...");
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

        // window.open(JSON.parse(xhr.response));
        var timestamp = new Date().getTime();
        imageObj.src = JSON.parse(xhr.response) + "?" + timestamp;
      }

    }

    xhr.open("POST", "http://127.0.0.1:8080/floorplan-upload", true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    formData.append("files", reqObj.img, reqObj.id);
    xhr.send(formData);
  }

  /**
   * @memberof UIManager
   * @desc Create HistoryObj.obj for 'addfloorplan'.
   * @param {Message.reqObj} reqObj id : floor id,  img : file
   * @param {String} uuid
   */
  UIManager.prototype.addFloorPlan_makeHistoryObj = function(reqObj, uuid, manager) {

    // log.info(window.storage.canvasContainer.stages[reqObj.id].backgroundLayer.layer);

    // If there is no existing floorplan, null is returned.
    if (window.storage.canvasContainer.stages[reqObj.id].backgroundLayer.layer.children.length == 0) {

      return {
        'floor': reqObj.id,
      };

    }

    var obj = new Object();
    // save image to assets > floorplan
    var xhr = new XMLHttpRequest();
    var filename = null;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {

        window.myhistory.pushHistoryObj(uuid, manager, {
          'floor': reqObj.id,
          'filename': JSON.parse(xhr.response).result
        });
        // log.info(">>> succeed save copy image : " + JSON.parse(xhr.response).result);

      }
    }

    xhr.open("POST", "http://127.0.0.1:8080/floorplan-create-historyobj", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({
      id: reqObj.id
    }));

    return {
      'floor': reqObj.id,
      'filename': filename
    };

  }


  /**
   * @memberof UIManager
   */
  UIManager.prototype.addFloorPlan_undo = function(obj) {

    var condition = {};
    // log.info(obj);

    if (obj.filename == null) {

      window.storage.canvasContainer.stages[obj.floor].backgroundLayer.layer.destroyChildren();
      window.storage.canvasContainer.stages[obj.floor].backgroundLayer.layer.draw();
      condition['mode'] = "delete only";
      condition['floor'] = obj.floor;

      log.info(">>>>> addFloorPlan_undo");

    } else {

      condition['mode'] = "delete and rename";
      condition['floor'] = obj.floor;
      condition['filename'] = obj.filename;

    }

    var xhr = new XMLHttpRequest();
    var filename = null;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {

        if (condition.mode == "delete and rename") {

          /// set background
          var backgroundLayer = window.storage.canvasContainer.stages[obj.floor].backgroundLayer.layer;

          // clear layer before add new floorplan
          backgroundLayer.destroyChildren();

          var imageObj = new Image();

          imageObj.onload = function() {
            // log.info("on load called...");
            var floorplan = new Konva.Image({
              x: 0,
              y: 0,
              image: imageObj,
              width: window.storage.canvasContainer.stages[obj.floor].stage.attrs.width,
              height: window.storage.canvasContainer.stages[obj.floor].stage.attrs.height
            });

            // add the shape to the layer
            backgroundLayer.add(floorplan);
            backgroundLayer.draw();

          }
          var timestamp = new Date().getTime();
          imageObj.src = JSON.parse(xhr.response).filename + "?" + timestamp;

          log.info(">>>>> addFloorPlan_undo : " + JSON.parse(xhr.response).result);
        }

      }
    }

    // log.info(">>>>> send : ", condition);
    xhr.open("POST", "http://127.0.0.1:8080/floorplan-undo", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(condition));

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

    // change cell btn color
    document.getElementById('cell-btn').src = "../../assets/icon/cell_d.png";

    if (reqObj.isEmpty != null) {
      return;
    }

    // set sidebar > property
    window.uiContainer.sidebar.property.setPropertyTab('cell', reqObj.id, window.storage);

    // refresh tree view
    window.uiContainer.sidebar.treeview.addCell(reqObj.id, reqObj.floor);

  }


  /**
   * @param {Message.reqObj} reqObj id<br>floor
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewCell_makeHistoryObj = function(reqObj) {
    var obj = reqObj;
    obj['type'] = 'cell';

    return obj;
  }


  /**
   * @param {Object} undoObj id<br>floor<br>type
   * @memberof UIManager
   */
  UIManager.prototype.removeObj = function(undoObj) {

    // remove tree view content
    window.uiContainer.sidebar.treeview.reomveNode(undoObj.id);
    window.uiContainer.sidebar.property.clear();

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

  /**
   * @memberof UIManager
   * @param {Message.reqObj} reqObj floor
   */
  UIManager.prototype.addNewFloor = function(reqObj) {

    var newFloorProperty = window.storage.propertyContainer.getElementById('floor', reqObj.floor);

    // add new workspace
    window.uiContainer.workspace.addNewWorkspace(newFloorProperty.id, newFloorProperty.name);

    // add new stage
    window.storage.canvasContainer.stages[newFloorProperty.id] = new Stage(
      newFloorProperty.id,
      newFloorProperty.name,
      newFloorProperty.id,
      document.getElementById(newFloorProperty.id).clientWidth,
      document.getElementById(newFloorProperty.id).clientHeight
    );

    // bind stage click event
    window.eventHandler.stageEventBind('stage', newFloorProperty.id);

    // refresh sidebar > tree-view
    window.uiContainer.sidebar.treeview.addFloor(newFloorProperty);

    // refresh sidebar > property-view
    window.uiContainer.sidebar.property.setPropertyTab('floor', newFloorProperty.id, window.storage);

  }


  /**
   * @memberof UIManager
   * @param {Message.reqObj} reqObj id : floor id
   */
  UIManager.prototype.activateWorkspace = function(reqObj) {

    window.uiContainer.workspace.activateWorkspace(reqObj.id);

  }

  /**
   * @param {Object} reqObj type<br>floor
   * @memberof UIManager
   * @desc change floor btn color
   */
  UIManager.prototype.cancelAddNewCell = function(reqObj) {

    document.getElementById('cell-btn').src = "../../assets/icon/cell_d.png";

  }


  /**
   * @memberof UIManager
   * @param {Object} reqObj empty
   */
  UIManager.prototype.startAddNewCellBoundaryBtw = function(reqObj){

    // change floor btn color
    document.getElementById('cellboundary_btw_btn').src = "../../assets/icon/cellboundary_btw_a.png";

  }


  /**
   * @memberof UIManager
   * @param {Object} reqObj { id, floor, isEmpty }
   */
  UIManager.prototype.endAddNewCellBoundaryBtw = function(reqObj) {

    // change cellboundary_btw color
    document.getElementById('cellboundary_btw_btn').src = "../../assets/icon/cellboundary_btw_d.png";

    if(reqObj.isEmpty != null) return;

    // set sidebar > propertyContainer
    window.uiContainer.sidebar.property.setPropertyTab('cellBoundary', reqObj.id, window.storage);

    // refresh tree view
    window.uiContainer.sidebar.treeview.addCellBoundary(reqObj.id, reqObj.floor);
  }

  /**
  * @memberof UIManager
  * @param {Object} reqObj null
  */
  UIManager.prototype.cancelAddNewCellBoundary = function(reqObj){

    document.getElementById('cellboundary_btw_btn').src = "../../assets/icon/cellboundary_btw_d.png";

  }



  return UIManager;
});
