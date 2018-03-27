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

    this.addCallbackFun('cancel-addnewcell', this.cancelAddNewCell);
    this.addCallbackFun('cancel-addnewcellboundary', this.cancelAddNewCellBoundary);

    this.addCallbackFun('start-addnewcellboundary', this.startAddNewCellBoundary);
    this.addCallbackFun('end-addnewcellboundary', this.endAddNewCellBoundary, this.endAddNewCellBoundary_makeHistoryObj, this.removeObj);

    this.addCallbackFun('showfactoryexportmodal', this.showFactoryExportModal);
  }

  /**
  * @memberof
  */
  UIManager.prototype.showFactoryExportModal = function(){

    $('#go-factory-modal').modal('show');
    $('#go-factory-modal-body-to-footer-before').removeClass('d-none');
    $('#go-factory-modal-body-to-footer-loading').addClass('d-none');
    $('#go-factory-modal-body-to-footer-down').addClass('d-none');

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
   * @param {Message.reqObj} reqObj id :floor id<br>newScale<br>newPos
   */
  UIManager.prototype.zoomWorkspace = function(reqObj) {

    window.storage.canvasContainer.stages[reqObj.id].stage.position(reqObj.newPos);
    window.storage.canvasContainer.stages[reqObj.id].stage.scale({
      x: reqObj.newScale,
      y: reqObj.newScale
    });
    window.storage.canvasContainer.stages[reqObj.id].tmpLayer.group.cursor.cursor.scale({
      x: 1 / reqObj.newScale,
      y: 1 / reqObj.newScale
    });
    window.storage.canvasContainer.stages[reqObj.id].stage.batchDraw();

  }


  /**
   * @memberof UIManager
   * @param {Message.reqObj} reqObj id : floor id,  img : file
   */
  UIManager.prototype.addFloorPlan = function(reqObj) {

    var reader = new FileReader();
    reader.onload = function(e) {
      var src = e.target.result;

      /// set background
      var backgroundLayer = window.storage.canvasContainer.stages[reqObj.id].backgroundLayer;
      var layer = backgroundLayer.layer;

      // clear layer before add new floorplan
      layer.destroyChildren();

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
        layer.add(floorplan);
        layer.draw();
      };

      // window.open(JSON.parse(xhr.response));
      imageObj.src = src;
      backgroundLayer.saveFloorplanDataURL(src);
      // log.info(backgroundLayer.floorplanDataURL);
    }

    reader.readAsDataURL(reqObj.img);

  }

  /**
   * @memberof UIManager
   * @desc Create HistoryObj.obj for 'addfloorplan'.
   * @param {Message.reqObj} reqObj id : floor id,  img : file
   * @param {String} uuid
   */
  UIManager.prototype.addFloorPlan_makeHistoryObj = function(reqObj, uuid, manager) {

    var backgroundLayer = window.storage.canvasContainer.stages[reqObj.id].backgroundLayer;

    return {
      'floor': reqObj.id,
      'dataURL': backgroundLayer.removeOldFloorplanDataURL()
    };

  }


  /**
   * @memberof UIManager
   * @param {Object} undoObj { floor, dataURL }
   */
  UIManager.prototype.addFloorPlan_undo = function(undoObj) {

    var backgroundLayer = window.storage.canvasContainer.stages[undoObj.floor].backgroundLayer;

    if ( undoObj.dataURL == null ){

      backgroundLayer.layer.destroyChildren();
      backgroundLayer.setGrid(backgroundLayer.layer.width(), backgroundLayer.layer.height());

    } else {

      if(backgroundLayer.layer.children.length == 0 || backgroundLayer.layer.children[0].className != 'Image'){
        log.error('wrong access to backgorund layer');
        return;
      }

      backgroundLayer.layer.children[0].attrs.image.src = undoObj.dataURL;
      backgroundLayer.saveFloorplanDataURL(undoObj.dataURL);

    }


    backgroundLayer.removeOldFloorplanDataURL();
    backgroundLayer.layer.draw();


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
  UIManager.prototype.startAddNewCellBoundary = function(reqObj) {

    // change floor btn color
    document.getElementById('cellboundary-btn').src = "../../assets/icon/cellboundary_a.png";

  }


  /**
   * @memberof UIManager
   * @param {Object} reqObj { id, floor, isEmpty }
   */
  UIManager.prototype.endAddNewCellBoundary = function(reqObj) {

    // change cellboundary_btw color
    document.getElementById('cellboundary-btn').src = "../../assets/icon/cellboundary_d.png";

    if (reqObj.isEmpty != null) return;

    // set sidebar > propertyContainer
    window.uiContainer.sidebar.property.setPropertyTab('cellBoundary', reqObj.id, window.storage);

    // refresh tree view
    window.uiContainer.sidebar.treeview.addCellBoundary(reqObj.id, reqObj.floor);
  }

  /**
   * @memberof UIManager
   * @param {Object} reqObj null
   */
  UIManager.prototype.cancelAddNewCellBoundary = function(reqObj) {

    document.getElementById('cellboundary-btn').src = "../../assets/icon/cellboundary_d.png";

  }

  UIManager.prototype.endAddNewCellBoundary_makeHistoryObj = function(reqObj){

    var obj = reqObj;
    obj['type'] = 'cellBoundary';

    return obj;
  }

  return UIManager;
});
