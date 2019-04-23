/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  /**
   * @desc Changes in the UI.
   * @class UIManager
   * @augments Subscriber
   */
  function UIManager() {

    require('../PubSub/Subscriber.js').apply(this, arguments);

    this.init();
  }

  UIManager.prototype = Object.create(require('../PubSub/Subscriber.js').prototype);

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

    this.addCallbackFun('start-addnewhole', this.startAddNewHole);
    this.addCallbackFun('end-addnewhole', this.endAddNewHole, this.endAddNewCell_makeHistoryObj, this.removeObj);

    this.addCallbackFun('updaterefdata', this.updateRefProperty);

    this.addCallbackFun('activateworkspace', this.activateWorkspace);

    this.addCallbackFun('cancel-addnewcell', this.cancelAddNewCell);
    this.addCallbackFun('cancel-addnewcellboundary', this.cancelAddNewCellBoundary);
    this.addCallbackFun('cancel-addnewtransition', this.cancelAddNewTransition);
    this.addCallbackFun('cancel-addnewhole', this.endAddNewHole);

    this.addCallbackFun('start-addnewcellboundary', this.startAddNewCellBoundary);
    this.addCallbackFun('end-addnewcellboundary', this.endAddNewCellBoundary, this.endAddNewCellBoundary_makeHistoryObj, this.removeObj);

    this.addCallbackFun('start-addnewslantdown', this.startAddNewSlantDown);
    this.addCallbackFun('end-addnewslantdown', this.endAddNewSlantDown, this.endAddNewCell_makeHistoryObj, this.removeObj);

    this.addCallbackFun('start-addnewslantup', this.startAddNewSlantUp);
    this.addCallbackFun('end-addnewslantup', this.endAddNewSlantUp, this.endAddNewCell_makeHistoryObj, this.removeObj);

    this.addCallbackFun('start-addnewslantupdown', this.startAddNewSlantUpDown);
    this.addCallbackFun('end-addnewslantupdown', this.endAddNewSlantUpDown, this.endAddNewCell_makeHistoryObj, this.removeObj);

    this.addCallbackFun('showfactoryexportmodal', this.showFactoryExportModal);

    this.addCallbackFun('movetooltip', this.moveTooltip);

    this.addCallbackFun('start-addnewstate', this.startAddNewState, function() {}, function() {});
    this.addCallbackFun('end-addnewstate', this.endAddNewState, function() {}, function() {});

    this.addCallbackFun('start-addnewtransition', this.startAddNewTransition);
    this.addCallbackFun('end-addnewtransition', this.endAddNewTransition, this.endAddNewTransition_makeHistoryObj, this.removeObj);

    this.addCallbackFun('start-addnewstair', this.startAddNewStair, function() {}, function() {});
    this.addCallbackFun('end-addnewstair', this.endAddNewStair, function() {}, function() {});

    this.addCallbackFun('start-addnewinterlayerconnetction', this.startAddNewInterConnetction, function() {}, function() {});
    this.addCallbackFun('end-addnewinterlayerconnetction', this.endAddNewInterConnetction, function() {}, function() {});

    this.addCallbackFun('deletecell', this.removeObj);
    this.addCallbackFun('deletecellboundary', this.removeObj);
    this.addCallbackFun('deletestate', this.removeObj);
    this.addCallbackFun('deletetransition', this.removeObj);

    this.addCallbackFun('makecellselectmenu', this.makeCellSelectMenu);

    this.addCallbackFun('copyfloor', this.copyFloor);

    this.addCallbackFun('updatedesclist', this.updateDescList);
    this.addCallbackFun('addnewglobaldesc', this.addDescList);

    this.addCallbackFun('showconditionmodal', this.showConditionModal);
    this.addCallbackFun('showcodemodal', this.showCodeModal);

    this.addCallbackFun('deletedesclist', this.deleteDescList);
    this.addCallbackFun('addlocaldesc', this.setPropertyView);
    this.addCallbackFun('deletelocaldesc', this.setPropertyView);

    this.addCallbackFun('shownaviattr', this.showFeatureTypeAttr);
    this.addCallbackFun('showextensionattr', this.showExtensionAttr);
    this.addCallbackFun('addnewcode', this.addNewCode);

    this.addCallbackFun('addmap', this.addMap);

    this.addCallbackFun('start-addnewhatch', this.startAddNewHatch);
    this.addCallbackFun('end-addnewhatch', this.endAddNewHatch, this.endAddNewCell_makeHistoryObj, this.removeObj);


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

    if (reqObj.updateContent.name != undefined)
      window.uiContainer.sidebar.treeview.updateTitle(reqObj.id, reqObj.updateContent.name);



    if (reqObj.type == 'floor') {
      var root = window.uiContainer.workspace.workspaceLayout.root;
      var items = [];

      function getComponent(item) {
        if (item.isComponent == true) {
          items.push(item);
        } else {
          for (var next of item.contentItems) {
            getComponent(next);
          }
        }
      }

      getComponent(root);

      for (var item of items) {
        if (item.config.id == reqObj.id) item.setTitle(reqObj.updateContent.name);
      }
    }
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
        floorplan.moveToBottom();
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

    // add require('../Storage/Canvas/Stage.js')
    var Stage = require('../Storage/Canvas/Stage.js');
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


    // bind right click event
    require('../UI/ContextMenu.js').bindContextMenu(newFloorProperty.id);


    // refresh sidebar > tree-view
    window.uiContainer.sidebar.treeview.addFloor(newFloorProperty);

    // refresh sidebar > property-view
    window.uiContainer.sidebar.property.setPropertyTab('floor', newFloorProperty.id, window.storage);

  }

  /**
   * @memberof UIManager
   * @param {Message.reqObj} reqObj floor, cells
   */
  UIManager.prototype.makeCellSelectMenu = function(reqObj) {

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
  UIManager.prototype.startAddNewHole = function() {

    // change cell btn color
    document.getElementById('hole-btn').src = "../../assets/icon/hole_a.png";

    var manager = window.broker.getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: 'select cell'
    });

  }

  /**
   * @memberof UIManager
   * @param {Object} reqObj { id, floor, isEmpty }
   */
  UIManager.prototype.endAddNewHole = function(reqObj) {

    // change transition btn color
    document.getElementById('hole-btn').src = "../../assets/icon/hole_d.png";

    if (reqObj.isEmpty != null) return;

    // delete tooltip
    var manager = window.broker.getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: ''
    });

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

  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewState = function() {

    // change state btn color
    document.getElementById('state-btn').src = "../../assets/icon/state_a.png";

    // var manager = window.broker.getManager('start-addnewtransition', 'UIManager');
    // manager.setTooltipText({
    //   text: 'select cell'
    // });

  }


  /**
   * @memberof UIManager
   * @param {Object} reqObj { id, floor, isEmpty }
   */
  UIManager.prototype.endAddNewState = function(reqObj) {

    // change state btn color
    document.getElementById('state-btn').src = "../../assets/icon/state_d.png";

    if (reqObj.isEmpty != null) return;

    // set sidebar > propertyContainer
    window.uiContainer.sidebar.property.setPropertyTab('state', reqObj.id, window.storage);

    // refresh tree view
    window.uiContainer.sidebar.treeview.addState(reqObj.id, reqObj.floor);

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
  UIManager.prototype.cancelAddNewHole = function(reqObj) {

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
   * @param reqObj object { head, msg }
   */
  UIManager.prototype.showSnackBar = function(reqObj) {

    $.uiAlert({
      textHead: reqObj.head,
      text: reqObj.msg,
      bgcolor: '#19c3aa',
      textcolor: '#fff',
      position: 'bottom-center', // top And bottom ||  left / center / right
      icon: 'checkmark box',
      time: 2
    });


  }


  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewSlantDown = function(reqObj) {

    // change floor btn color
    document.getElementById('slant-down-btn').src = "../../assets/icon/slant_down_a.png";
  }


  /**
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewSlantDown = function(reqObj) {

    // change cell btn color
    document.getElementById('slant-down-btn').src = "../../assets/icon/slant_down_d.png";

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
    window.broker.getManager('start-addnewslantdown', 'UIManager').setTooltipText({
      floor: reqObj.floor,
      text: ''
    });

  }



  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewSlantUp = function(reqObj) {

    // change floor btn color
    document.getElementById('slant-up-btn').src = "../../assets/icon/slant_up_a.png";
  }

  /**
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewSlantUp = function(reqObj) {

    // change cell btn color
    document.getElementById('slant-up-btn').src = "../../assets/icon/slant_up_d.png";

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
    window.broker.getManager('start-addnewslantdown', 'UIManager').setTooltipText({
      floor: reqObj.floor,
      text: ''
    });

  }



  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewSlantUpDown = function(reqObj) {

    // change floor btn color
    document.getElementById('slant-up-down-btn').src = "../../assets/icon/slant_up_down_a.png";
  }


  /**
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewSlantUpDown = function(reqObj) {

    // change cell btn color
    document.getElementById('slant-up-down-btn').src = "../../assets/icon/slant_up_down_d.png";

    if (reqObj.isEmpty != null) {
      return;
    }

    // set sidebar > property
    window.uiContainer.sidebar.property.setPropertyTab('cell', reqObj.id, window.storage);
    window.uiContainer.sidebar.property.setPropertyTab('cell', window.conditions.pre_cell + (window.conditions.LAST_CELL_ID_NUM), window.storage);

    // refresh tree view
    window.uiContainer.sidebar.treeview.addCell(reqObj.id, reqObj.floor);
    window.uiContainer.sidebar.treeview.addCell(window.conditions.pre_cell + (window.conditions.LAST_CELL_ID_NUM), reqObj.floor);

    if (window.conditions.automGenerateState) {
      window.uiContainer.sidebar.treeview.addState(window.conditions.pre_state + (window.conditions.LAST_STATE_ID_NUM - 1), reqObj.floor);
      window.uiContainer.sidebar.treeview.addState(window.conditions.pre_state + (window.conditions.LAST_STATE_ID_NUM), reqObj.floor);
    }

    // set tooltip
    window.broker.getManager('start-addnewslantdown', 'UIManager').setTooltipText({
      floor: reqObj.floor,
      text: ''
    });

  }


  /**
   * @memberof UIManager
   * @param {Message.reqObj} reqObj floor, targetFloor
   */
  UIManager.prototype.copyFloor = function(reqObj) {

    var copyCanvas = window.storage.canvasContainer.stages[reqObj.targetFloor];

    // set size
    var stage = window.storage.canvasContainer.stages[reqObj.floor].stage;
    var width = copyCanvas.stage.width();
    var height = copyCanvas.stage.height()

    stage.setWidth(width);
    stage.setHeight(height);



    var backgroundLayer = window.storage.canvasContainer.stages[reqObj.floor].backgroundLayer;
    backgroundLayer.layer.destroyChildren();

    // copy floor plan
    if (copyCanvas.backgroundLayer.floorplanDataURL.length == 0) backgroundLayer.setGrid(width, height);
    else {
      var floorplan = copyCanvas.backgroundLayer.floorplanDataURL[0];
      backgroundLayer.saveFloorplanDataURL(floorplan);

      var childrens = copyCanvas.backgroundLayer.layer.children;
      var copyIMG = null;
      for (var child of childrens) {
        if (child.className == 'Image') {
          copyIMG = child.clone();
        }

        if (copyIMG != null) break;
      }
      backgroundLayer.layer.add(copyIMG);
    }

    // copy obj
    var copyCG = copyCanvas.cellLayer.group.cellGroup.clone();
    var copyCHG = copyCanvas.cellLayer.group.holeGroup.clone();
    var copyCBG = copyCanvas.cellBoundaryLayer.group.cellBoundaryGroup.clone();
    backgroundLayer.layer.add(copyCG);
    backgroundLayer.layer.add(copyCHG);
    backgroundLayer.layer.add(copyCBG);

    backgroundLayer.layer.draw();

  }


  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewInterConnetction = function(reqObj) {

    document.getElementById('interlayerconnection-btn').src = "../../assets/icon/inter_a.png";

    var manager = window.broker.getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: ''
    });

  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewInterConnetction = function(reqObj) {

    // change cellboundary_btw color
    document.getElementById('interlayerconnection-btn').src = "../../assets/icon/inter_d.png";

    // set sidebar > propertyContainer
    window.uiContainer.sidebar.property.setPropertyTab('interlayerConnection', reqObj.id, window.storage);

    // refresh tree view
    window.uiContainer.sidebar.treeview.addInterLayerConnection(reqObj.id);

  }

  UIManager.prototype.updateDescList = function() {
    var container = document.getElementById('setting-desc-modal-list-container');
    $("#setting-desc-modal-list-container").empty();

    var manager = window.broker.getManager(
      "deletedesclist",
      "PropertyManager"
    );

    function addClass(element, classArr) {
      for (var c of classArr) {
        element.classList.add(c);
      }
    }

    function item(data) {
      var item = document.createElement("div");
      item.classList.add("item");
      item.style.padding = '0.5rem';

      var iconContiner = document.createElement("div");
      addClass(iconContiner, ["col-2", "right", "floated", "content"]);

      var icon = document.createElement("i");
      icon.id = data;

      addClass(icon, ["right", "trash", "icon"]);

      var name = document.createElement("div");
      addClass(name, ["col-7", "content"]);
      name.style.marginLeft = '2rem';
      name.innerHTML = data;

      iconContiner.appendChild(icon);
      item.appendChild(iconContiner);
      item.appendChild(name);

      return item;
    }

    var descs = window.conditions.descList;
    for (var desc of descs) {
      var i = item(desc);
      container.appendChild(i);

      document.getElementById(desc).addEventListener('click', function(event) {
        if (window.broker.isPublishable('deletedesclist'))
          window.broker.publish({
            req: 'deletedesclist',
            reqObj: event.currentTarget.id
          });
      });
    }
  }

  UIManager.prototype.showConditionModal = function() {

    $('#setting-conditions-modal').modal('show');
    var conditions = window.conditions;
    $('#setting-conditions-pre-cell').val(conditions.pre_cell);
    $('#setting-conditions-pre-cellBoundary').val(conditions.pre_cellBoundary);
    $('#setting-conditions-pre-state').val(conditions.pre_state);
    $('#setting-conditions-pre-transition').val(conditions.pre_transition);

    $('#setting-conditions-aspect-ratio').val(conditions.aspectRatio.x + " : " + conditions.aspectRatio.y);
    $('#setting-conditions-scale-factor').val(conditions.scaleFactor);
    $('#setting-conditions-scale-max').val(conditions.scaleMax);

    if (conditions.automGenerateState) $('#setting-conditions-auto-create-state').prop("checked", true);
    else $('#setting-conditions-auto-create-state').prop("checked", false);

  }

  UIManager.prototype.addDescList = function(reqObj) {

    // update modal ui
    window.broker.getManager("updatedesclist", "UIManager").updateDescList();

    // update property tab
    window.uiContainer.sidebar.property.setPropertyTab($('#property-table').data('type'), $('#id-text').val(), window.storage);
  }

  UIManager.prototype.deleteDescList = function(reqObj) {
    window.broker.getManager("updatedesclist", "UIManager").updateDescList();

    // update property tab
    window.uiContainer.sidebar.property.setPropertyTab($('#property-table').data('type'), $('#id-text').val(), window.storage);
  }

  UIManager.prototype.showCodeModal = function(reqObj) {
    $('#setting-code-modal').modal('show');

    function getTr() {
      var tr = document.createElement('tr');
      tr.id = arguments[1] + "-" + arguments[2] + "-" + arguments[3] + "-" + arguments[4];

      for (var i = 1; i < arguments.length; i++) {
        var td = document.createElement(arguments[0]);
        td.innerHTML = arguments[i];
        tr.appendChild(td);
      }

      if (arguments[0] == 'td') {
        var td = document.createElement(arguments[0]);
        var i = document.createElement('i');
        i.classList.add('trash');
        i.classList.add('icon');
        i.id = 'delete-' + arguments[1] + "-" + arguments[2] + "-" + arguments[3] + "-" + arguments[4];
        td.appendChild(i);
        tr.appendChild(td);

        i.addEventListener('click', function(event) {
          window.eventHandler.callHandler('code-modal-trash', event)
        });
      }

      return tr;
    }

    var thead = document.getElementById('code-table-head');
    while (thead.hasChildNodes()) {
      thead.removeChild(thead.firstChild);
    }
    thead.appendChild(getTr('th', 'Object Type', 'Code Type', 'Code Number', 'Code desc', ''));
    thead.children[0].children[0].classList.add('four');
    thead.children[0].children[0].classList.add('wide');
    thead.children[0].children[1].classList.add('three');
    thead.children[0].children[1].classList.add('wide');
    thead.children[0].children[2].classList.add('three');
    thead.children[0].children[2].classList.add('wide');
    thead.children[0].children[3].classList.add('five');
    thead.children[0].children[3].classList.add('wide');

    var tbody = document.getElementById('code-table-body');
    while (tbody.hasChildNodes()) {
      tbody.removeChild(tbody.firstChild);
    }

    var list = require('CodeList').getInstance().getList();
    for (var ot in list) {
      if (ot == 'NonNavigableSpace') {
        var otl = list[ot];
        for (var cn in otl) {
          if (document.getElementById(ot + "--" + otl[cn]) == null)
            tbody.appendChild(getTr('td', ot, '', cn, otl[cn]));
        }
      } else {
        var c = list[ot].class;
        var f = list[ot].function;

        for (var cn in c) {
          if (document.getElementById(ot + "-class-" + cn + "-" + c[cn]) == null)
            tbody.appendChild(getTr('td', ot, 'class', cn, c[cn]));
        }


        for (var cn in f)
          if (document.getElementById(ot + "-function-" + cn + "-" + f[cn]) == null)
            tbody.appendChild(getTr('td', ot, 'function', cn, f[cn]));
      }
    }


    $('#code-table').excelTableFilter({
      columnSelector: '.wide'
    });


  }

  UIManager.prototype.addNewCode = function(reqObj) {
    function getTr() {
      var tr = document.createElement('tr');
      tr.id = arguments[1] + "-" + arguments[2] + "-" + arguments[3] + "-" + arguments[4];

      for (var i = 1; i < arguments.length; i++) {
        var td = document.createElement(arguments[0]);
        td.innerHTML = arguments[i];
        tr.appendChild(td);
      }

      if (arguments[0] == 'td') {
        var td = document.createElement(arguments[0]);
        var i = document.createElement('i');
        i.classList.add('trash');
        i.classList.add('icon');
        i.id = 'delete-' + arguments[1] + "-" + arguments[2] + "-" + arguments[3] + "-" + arguments[4];
        td.appendChild(i);
        tr.appendChild(td);

        i.addEventListener('click', function(event) {
          window.eventHandler.callHandler('code-modal-trash', event)
        });
      }

      return tr;
    }


    var cl = require('CodeList').getInstance().getList();
    if (reqObj.path[0] == 'NonNavigableSpace' &&
      cl[reqObj.path[0]][reqObj.cn] == reqObj.cd &&
      document.getElementById(reqObj.path[0] + "--" + reqObj.cn + "-" + reqObj.cd) == null) {
      var tr = getTr('td', reqObj.path[0], '', reqObj.cn, reqObj.cd);
      document.getElementById('code-table-body').appendChild(tr);
    } else if (reqObj.path.length >= 2 &&
      document.getElementById(reqObj.path[0] + "-" + reqObj.path[1] + reqObj.cn + "-" + reqObj.cd) == null) {
      var tr = getTr('td', reqObj.path[0], reqObj.path[1], reqObj.cn, reqObj.cd);
      document.getElementById('code-table-body').appendChild(tr);
    }


  }

  UIManager.prototype.showNonNaviAttr = function(reqObj) {

    var len = reqObj.table.childNodes.length;
    while (reqObj.table.childNodes.length > 1) {
      reqObj.table.removeChild(reqObj.table.childNodes[1]);
    }

    if (reqObj.selected != "") {
      var bottomTr = document.createElement('tr');
      bottomTr.innerHTML = window.uiContainer.sidebar.property.getBasicTr('bottom', 'bottom', property.bottom, false);
      var heightTr = document.createElement("tr");
      heightTr.innerHTML = window.uiContainer.sidebar.property.getBasicTr('height', 'height', property.height, false);

      reqObj.table.appendChild(bottomTr);
      reqObj.table.appendChild(heightTr);
      document.getElementById("obstacle-text").dataset.pre = reqObj.selected;

      $('.ui.dropdown').dropdown({
        direction: 'auto',
        duration: 100
      });

    } else {
      document.getElementById("obstacle-text").dataset.pre = "";
    }
  }

  UIManager.prototype.showNaviAttr = function(reqObj) {
    log.info(reqObj);

    var len = reqObj.table.childNodes.length;
    while (reqObj.table.childNodes.length > 1) {
      reqObj.table.removeChild(reqObj.table.childNodes[1]);
    }

    if (reqObj.selected == 'NonNavigableSpace') {
      var obstacleTr = document.createElement('tr');
      obstacleTr.innerHTML = window.uiContainer.sidebar.property.getCodeListTr([reqObj.selected], 'obstacle-text', 'obstacle');
      reqObj.table.appendChild(obstacleTr);
    } else if (reqObj.selected != "") {
      var classTr = document.createElement('tr');
      classTr.innerHTML = window.uiContainer.sidebar.property.getCodeListTr([reqObj.selected, 'class'], 'class-text', 'class');
      var functionTr = document.createElement("tr");
      functionTr.innerHTML = window.uiContainer.sidebar.property.getCodeListTr([reqObj.selected, 'function'], 'function-text', 'function');
      var usageTr = document.createElement("tr");
      usageTr.innerHTML = window.uiContainer.sidebar.property.getCodeListTr([reqObj.selected, 'function'], 'usage-text', 'function');

      reqObj.table.appendChild(classTr);
      reqObj.table.appendChild(functionTr);
      reqObj.table.appendChild(usageTr);
      document.getElementById("type-text").dataset.pre = reqObj.selected;
    } else {
      document.getElementById("type-text").dataset.pre = "";
    }

    $('.ui.dropdown').dropdown({
      direction: 'down',
      duration: 100
    });

  }

  UIManager.prototype.showFeatureTypeAttr = function(reqObj) {

    let len = reqObj.table.childNodes.length;
    while (reqObj.table.childNodes.length > 1) {
      reqObj.table.removeChild(reqObj.table.childNodes[1]);
    }

    if (reqObj.selected != "" && reqObj.selected != undefined) {
      let featureTr;

      if (reqObj.selected == 'navi' && document.getElementById('property-table').dataset.type == "cell") {
        featureTr = window.uiContainer.sidebar.property.getOneDropTr(
          'feature\ntype',
          'feature-type-text',
          ["", "GeneralSpace", "TransitionSpace", "ConnectionSpace", "AnchorSpace", "PublicSafetyRoom", "PublicSafetyElevator", "PublicSafetyStair"]);
      } else if (reqObj.selected == 'navi' && document.getElementById('property-table').dataset.type == "cellBoundary") {
        featureTr = window.uiContainer.sidebar.property.getOneDropTr(
          'feature\ntype',
          'feature-type-text',
          ["", "ConnectionBoundary", "AnchorBoundary", "PublicSafetyDoor", "PublicSafetyWindow", "PublicSafetyHatch"]);
      } else if (reqObj.selected == 'non-navi') {
        featureTr = window.uiContainer.sidebar.property.getOneDropTr(
          'feature\ntype',
          'feature-type-text',
          ["", "NonNavigableSpace"]);
      }

      reqObj.table.appendChild(featureTr);
      document.getElementById('feature-type-text').addEventListener('change', function(event) {
        window.eventHandler.callHandler('html', event);
      });
    } else {
      document.getElementById("type-text").dataset.pre = "";
    }

    $('.ui.dropdown').dropdown({
      direction: 'down',
      duration: 100
    });
  }

  UIManager.prototype.showExtensionAttr = function(reqObj) {
    let len = reqObj.table.childNodes.length;

    while (reqObj.table.childNodes.length > 2) {
      reqObj.table.removeChild(reqObj.table.childNodes[2]);
    }

    if (reqObj.selected != "" && reqObj.selected != undefined) {

      if (reqObj.selected == 'PublicSafetyRoom') reqObj.path[0] = 'GeneralSpace';
      else if (reqObj.selected == 'PublicSafetyElevator' || reqObj.selected == 'PublicSafetyStair') reqObj.path[0] = 'TransitionSpace';

      if (reqObj.moduleType == "navi" && document.getElementById('property-table').dataset.type == "cell") {
        if(reqObj.selected == 'PublicSafetyElevator'){
          reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneCodeListTr([...reqObj.path, 'class'], 'class-text', 'class', '1010'));
          reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneCodeListTr([...reqObj.path, 'function'], 'function-text', 'function', '1110'));
          reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneCodeListTr([...reqObj.path, 'function'], 'usage-text', 'usage', '1110'));
        }
        else if(reqObj.selected == 'PublicSafetyStair'){
          reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneCodeListTr([...reqObj.path, 'class'], 'class-text', 'class', '1010'));
          reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneCodeListTr([...reqObj.path, 'function'], 'function-text', 'function', '1120'));
          reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneCodeListTr([...reqObj.path, 'function'], 'usage-text', 'usage', '1120'));
        }
        else {
          reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneCodeListTr([...reqObj.path, 'class'], 'class-text', 'class'));
          reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneCodeListTr([...reqObj.path, 'function'], 'function-text', 'function'));
          reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneCodeListTr([...reqObj.path, 'function'], 'usage-text', 'usage'));
        }
      } else if (reqObj.moduleType == 'non-navi') {
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneCodeListTr(
          ['NonNavigableSpace'],
          'obstacle-type-text',
          'obtacle'
        ))
      }

      if (reqObj.selected == 'PublicSafetyRoom')
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getDropDownTrByElement('roomtype-text', 'room<br>type', ['', 'Medical', 'Security'], 'Select room type'));
      else if(reqObj.selected == 'PublicSafetyDoor'){
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getDropDownTrByElement('doorhandling-text', 'door<br>handling', ['', 'Left', 'Right'], 'Select door handling type'));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getDropDownTrByElement('doorswing-text', 'door<br>swing', ['', 'Outswing', 'Inswing', 'INWARDS', 'OUTWARDS', 'SLIDE'], 'Select door swing type'));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getToggleTrElement('fireescape-text', 'fire<br>escape'));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('lock<br>type', 'locktype-text', ''));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('material', 'material-text', ''));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('size<br>height', 'sizeheight-text', ''));
        let input = reqObj.table.children[reqObj.table.children.length-1].children[1].children[0].children[0];
        input.type =  'number';
        input.step = '0.1';

        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('size<br>width', 'sizewidth-text', ''));
        input = reqObj.table.children[reqObj.table.children.length-1].children[1].children[0].children[0];
        input.type =  'number';
        input.step = '0.1';
      }
      else if(reqObj.selected == 'PublicSafetyWindow'){
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getToggleTrElement('fireescape-text', 'fire<br>escape'));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('lock<br>type', 'locktype-text', ''));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('material', 'material-text', ''));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getToggleTrElement('openable-text', 'openable'));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('size<br>height', 'sizeheight-text', ''));
        let input = reqObj.table.children[reqObj.table.children.length-1].children[1].children[0].children[0];
        input.type =  'number';
        input.step = '0.1';

        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('size<br>width', 'sizewidth-text', ''));
        input = reqObj.table.children[reqObj.table.children.length-1].children[1].children[0].children[0];
        input.type =  'number';
        input.step = '0.1';

        reqObj.table.appendChild(window.uiContainer.sidebar.property.getDropDownTrByElement('windowhandling-text', 'window<br>handling', ['', 'Left', 'Right'], 'Select window handling type'));
      }
      else if(reqObj.selected == 'PublicSafetyHatch'){
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getToggleTrElement('fireescape-text', 'fire<br>escape'));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('hatch<br>location', 'hatchlocation-text', ''));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('lock<br>type', 'locktype-text', ''));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('material', 'material-text', ''));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getToggleTrElement('openable-text', 'openable'));
        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('size<br>height', 'sizeheight-text', ''));
        let input = reqObj.table.children[reqObj.table.children.length-1].children[1].children[0].children[0];
        input.type =  'number';
        input.step = '0.1';

        reqObj.table.appendChild(window.uiContainer.sidebar.property.getOneTextTr('size<br>width', 'sizewidth-text', ''));
        input = reqObj.table.children[reqObj.table.children.length-1].children[1].children[0].children[0];
        input.type =  'number';
        input.step = '0.1';
      }
    } else {
      document.getElementById("type-text").dataset.pre = "";
    }

    $('.ui.dropdown').dropdown({
      direction: 'down',
      duration: 100
    });
  }

  UIManager.prototype.addMap = function(reqObj) {
    window.storage.canvasContainer.stages[reqObj.floor].addMap(reqObj.coor);
  }

  UIManager.prototype.startAddNewHatch = function(reqObj) {
    // change btn color
    document.getElementById('hatch-btn').src = "../../assets/icon/hatch_a.png";

    var manager = window.broker.getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: 'select cell'
    });
  }

  UIManager.prototype.endAddNewHatch = function(reqObj) {

    // change transition btn color
    document.getElementById('hatch-btn').src = "../../assets/icon/hatch_d.png";

    if (reqObj.isEmpty != null) return;

    // delete tooltip
    var manager = window.broker.getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: ''
    });

  }

  return UIManager;
});
