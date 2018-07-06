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
    this.addCallbackFun('cancel-addnewtransition', this.cancelAddNewTransition);

    this.addCallbackFun('start-addnewcellboundary', this.startAddNewCellBoundary);
    this.addCallbackFun('end-addnewcellboundary', this.endAddNewCellBoundary, this.endAddNewCellBoundary_makeHistoryObj, this.removeObj);

    this.addCallbackFun('showfactoryexportmodal', this.showFactoryExportModal);

    this.addCallbackFun('movetooltip', this.moveTooltip);

    this.addCallbackFun('start-addnewtransition', this.startAddNewTransition);
    this.addCallbackFun('end-addnewtransition', this.endAddNewTransition, this.endAddNewTransition_makeHistoryObj, this.removeObj);

    this.addCallbackFun('start-addnewstair', this.startAddNewStair, function() {}, function() {});
    this.addCallbackFun('end-addnewstair', this.endAddNewStair, function() {}, function() {});

  }

  /**
   * @memberof
   */
  UIManager.prototype.showFactoryExportModal = function() {

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

    window.conditions.realSnappingThreshold = window.conditions.snappingThreshold / reqObj.newScale;
    window.conditions.realCoordinateThreshold = window.conditions.coordinateThreshold / reqObj.newScale;

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
        var imageSize = {
          width: imageObj.width,
          height: imageObj.height
        };
        var stageSize = {
          width: document.getElementById(reqObj.id).clientWidth,
          height: document.getElementById(reqObj.id).clientHeight
        };
        var imageRatio = (imageSize.width > imageSize.height) ? {
          width: imageSize.width / imageSize.height,
          height: 1
        } : {
          width: 1,
          height: imageSize.height / imageSize.width
        };
        var stageRatio = (stageSize.width > stageSize.height) ? {
          width: stageSize.width / stageSize.height,
          height: 1
        } : {
          width: 1,
          height: stageSize.height / stageSize.width
        };

        if (imageSize.width <= stageSize.width && imageSize.height <= stageSize.width) {

        } else if (imageRatio.height == 1) {
          imageSize = {
            width: stageSize.width,
            height: stageSize.width / imageRatio.width
          }
        } else {
          if (stageSize.height / imageRatio.height > stageSize.width) {
            imageSize = {
              width: stageSize.width,
              height: stageSize.width * imageRatio.height
            }
          } else {
            imageSize = {
              width: stageSize.height / imageRatio.height,
              height: stageSize.height
            }
          }
        }

        window.storage.canvasContainer.stages[reqObj.id].stage.width(imageSize.width);
        window.storage.canvasContainer.stages[reqObj.id].stage.height(imageSize.height);

        var floorplan = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj,
          width: imageSize.width,
          height: imageSize.height
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

    if (undoObj.dataURL == null) {

      backgroundLayer.layer.destroyChildren();
      backgroundLayer.setGrid(backgroundLayer.layer.width(), backgroundLayer.layer.height());

    } else {

      if (backgroundLayer.layer.children.length == 0 || backgroundLayer.layer.children[0].className != 'Image') {
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
   */
  UIManager.prototype.startAddNewCell = function(reqObj) {

    // change floor btn color
    document.getElementById('cell-btn').src = "../../assets/icon/cell_a.png";

    // window.broker.getManager('start-addnewcell', 'UIManager').setTooltipText({text: 'Add corner for cell by clicking canvas \(^0^)/'});

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

    if (window.conditions.automGenerateState)
      window.uiContainer.sidebar.treeview.addState(window.conditions.pre_state + (window.conditions.LAST_STATE_ID_NUM), reqObj.floor);

    // set tooltip
    window.broker.getManager('start-addnewcell', 'UIManager').setTooltipText({
      floor: reqObj.floor,
      text: ''
    });

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
    var newStage = new Stage(
      newFloorProperty.id,
      newFloorProperty.name,
      newFloorProperty.id,
      document.getElementById(newFloorProperty.id).clientWidth,
      document.getElementById(newFloorProperty.id).clientHeight
    );

    window.storage.canvasContainer.stages[newFloorProperty.id] = newStage;

    // bind stage click event
    window.eventHandler.canvasObjectEventBind('stage', newStage.stage);

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

  /**
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewCellBoundary_makeHistoryObj = function(reqObj) {

    var obj = reqObj;
    obj['type'] = 'cellBoundary';

    return obj;
  }


  /**
   * @memberof UIManager
   * @param {Object} reqObj floor, point
   */
  UIManager.prototype.moveTooltip = function(reqObj) {

    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.moveTooltip(reqObj.point.x + 8, reqObj.point.y);

  }

  /**
   * @memberof UIManager
   * @param {Object} reqObj : floor, text
   */
  UIManager.prototype.setTooltipText = function(reqObj) {

    if (reqObj.floor == undefined) {
      var stages = window.storage.canvasContainer.stages;
      for (var key in stages) {

        if (reqObj.text == '') {
          stages[key].tmpLayer.group.setTooltipText(reqObj.text);
          stages[key].tmpLayer.group.hideTooltip();
        } else {
          stages[key].tmpLayer.group.setTooltipText(reqObj.text);
          stages[key].tmpLayer.group.showTooltip();
        }

        stages[key].tmpLayer.layer.draw();

      }
    } else {

      if (reqObj.text == '') {
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.setTooltipText(reqObj.text);
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.hideTooltip();
      } else {
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.setTooltipText(reqObj.text);
        window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.showTooltip();
      }

      window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

    }
  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewTransition = function() {

    // change cell btn color
    document.getElementById('transition-btn').src = "../../assets/icon/transition_a.png";

    var manager = window.broker.getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: 'select state'
    });

  }

  /**
   * @memberof UIManager
   * @param {Object} reqObj { id, floor, isEmpty }
   */
  UIManager.prototype.endAddNewTransition = function(reqObj) {

    // change transition btn color
    document.getElementById('transition-btn').src = "../../assets/icon/transition_d.png";

    if (reqObj.isEmpty != null) return;

    // set sidebar > propertyContainer
    window.uiContainer.sidebar.property.setPropertyTab('transition', reqObj.id, window.storage);

    // refresh tree view
    window.uiContainer.sidebar.treeview.addTransition(reqObj.id, reqObj.floor);

    // delete tooltip
    var manager = window.broker.getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: ''
    });
    ``

  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewTransition_makeHistoryObj = function(reqObj) {

    var obj = reqObj;
    obj['type'] = 'transition';

    return obj;
  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.cancelAddNewTransition = function(reqObj) {

    document.getElementById('transition-btn').src = "../../assets/icon/transition_d.png";

    var manager = window.broker.getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: ''
    });

  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewStair = function() {

    // change cell btn color
    document.getElementById('stair-btn').src = "../../assets/icon/stair_a.png";

    var manager = window.broker.getManager('start-addnewstair', 'UIManager');
    manager.setTooltipText({
      text: 'select state'
    });

  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewStair = function(reqObj) {

    // change cell btn color
    document.getElementById('stair-btn').src = "../../assets/icon/stair_d.png";

    if (reqObj.isEmpty != null) return;

    // set sidebar > propertyContainer
    window.uiContainer.sidebar.property.setPropertyTab('transition', reqObj.id, window.storage);

    // refresh tree view
    window.uiContainer.sidebar.treeview.addTransition(reqObj.id, reqObj.floor);

    // delete tooltip
    var manager = window.broker.getManager('end-addnewstair', 'UIManager');
    manager.setTooltipText({
      text: ''
    });

  }

  /**
   * @memberof UIManager
   * @param reqObj object { msg }
   */
  UIManager.prototype.showSnackBar = function(reqObj) {

    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerHTML = reqObj.msg;

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);

  }



  return UIManager;
});
