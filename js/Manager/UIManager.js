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
    this.addCallbackFun('cancel-addnewstate', this.cancelAddNewState);
    this.addCallbackFun('cancel-addnewstair', this.cancelAddNewStair);
    this.addCallbackFun('cancel-addnewhole', this.cancelAddNewHole);
    this.addCallbackFun("cancel-addnewinterlayerconnetction", this.cancelAddNewInterLayerConnection);
    this.addCallbackFun('cancel-addnewslantdown', this.cancelAddNewSlantDown);
    this.addCallbackFun('cancel-addnewslantup', this.cancelAddNewSlantUp);
    this.addCallbackFun('cancel-addnewslantupdown', this.cancelAddNewSlantUpDown);
    this.addCallbackFun('cancel-addnewhatch', this.cancelAddNewHatch);

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

    this.addCallbackFun('start-addnewstate', this.startAddNewState);
    this.addCallbackFun('end-addnewstate', this.endAddNewState);

    this.addCallbackFun('start-addnewtransition', this.startAddNewTransition);
    this.addCallbackFun('end-addnewtransition', this.endAddNewTransition, this.endAddNewTransition_makeHistoryObj, this.removeObj);

    this.addCallbackFun('start-addnewstair', this.startAddNewStair);
    this.addCallbackFun('end-addnewstair', this.endAddNewStair);

    this.addCallbackFun('start-addnewinterlayerconnetction', this.startAddNewInterConnetction);
    this.addCallbackFun('end-addnewinterlayerconnetction', this.endAddNewInterConnetction);

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

    this.addCallbackFun('removefloorplan', this.removeFLoorplan);


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
      require('UI').getInstance().treeView.updateTitle(reqObj.id, reqObj.updateContent.name);



    if (reqObj.type == 'floor') {
      var root = require('UI').getInstance().workspace.workspaceLayout.root;
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

    require('UI').getInstance().propertyTab.setPropertyTab(reqObj.type, reqObj.id, require('Storage').getInstance());

  }


  /**
   * @memberof UIManager
   * @param {Message.reqObj} reqObj id :floor id<br>newScale<br>newPos
   */
  UIManager.prototype.zoomWorkspace = function(reqObj) {
    var canvasContainer = require('Storage').getInstance().getCanvasContainer();

    canvasContainer.stages[reqObj.id].stage.position(reqObj.newPos);

    canvasContainer.stages[reqObj.id].stage.scale({
      x: reqObj.newScale,
      y: reqObj.newScale
    });

    canvasContainer.stages[reqObj.id].tmpLayer.group.cursor.cursor.scale({
      x: 1 / reqObj.newScale,
      y: 1 / reqObj.newScale
    });

    canvasContainer.stages[reqObj.id].stage.batchDraw();

    require('Conditions').getInstance().realSnappingThreshold = require('Conditions').getInstance().snappingThreshold / reqObj.newScale;
    require('Conditions').getInstance().realCoordinateThreshold = require('Conditions').getInstance().coordinateThreshold / reqObj.newScale;

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
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var backgroundLayer = canvasContainer.stages[reqObj.id].backgroundLayer;
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

        canvasContainer.stages[reqObj.id].stage.width(imageSize.width);
        canvasContainer.stages[reqObj.id].stage.height(imageSize.height);

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

    var backgroundLayer = require('Storage').getInstance().getCanvasContainer().stages[reqObj.id].backgroundLayer;

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

    var backgroundLayer = require('Storage').getInstance().getCanvasContainer().stages[undoObj.floor].backgroundLayer;

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
    document.getElementById('btn__cellSpace').src = "../../assets/icon/cell_a.png";

    // require('Broker').getInstance().getManager('start-addnewcell', 'UIManager').setTooltipText({text: 'Add corner for cell by clicking canvas \(^0^)/'});

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
    document.getElementById('btn__cellSpace').src = "../../assets/icon/cell_d.png";

    if (reqObj.isEmpty != null) {
      return;
    }

    // set sidebar > property
    require('UI').getInstance().propertyTab.setPropertyTab('cell', reqObj.id, require('Storage').getInstance());

    // refresh tree view
    require('UI').getInstance().treeView.addNode(reqObj.id, reqObj.id, 'CELL_SPACE', reqObj.floor);

    if (require('Conditions').getInstance().automGenerateState) {
      var id = require('Conditions').getInstance().pre_state + (require('Conditions').getInstance().LAST_STATE_ID_NUM);
      require('UI').getInstance().treeView.addNode(id, id, 'STATE', reqObj.floor);
    }

    // set tooltip
    require('Broker').getInstance().getManager('start-addnewcell', 'UIManager').setTooltipText({
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
    require('UI').getInstance().treeView.removeNode(undoObj.id);
    require('UI').getInstance().propertyTab.clear();

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

    var newFloorProperty = require('Storage').getInstance().getPropertyContainer().getElementById('floor', reqObj.floor);

    // add new workspace
    require('UI').getInstance().workspace.addNewWorkspace(newFloorProperty.id, newFloorProperty.name);

    // add require('../Storage/Canvas/Stage.js')
    var Stage = require('../Storage/Canvas/Stage.js');
    var newStage = new Stage(
      newFloorProperty.id,
      newFloorProperty.name,
      newFloorProperty.id,
      document.getElementById(newFloorProperty.id).clientWidth,
      document.getElementById(newFloorProperty.id).clientHeight
    );

    require('Storage').getInstance().getCanvasContainer().stages[newFloorProperty.id] = newStage;

    // bind stage click event
    require('EventHandler').getInstance().canvasObjectEventBind('stage', newStage.stage);


    // bind right click event
    require("@UI/ContextMenu.js").bindContextMenu(newFloorProperty.id);


    // refresh sidebar > tree-view
    require('UI').getInstance().treeView.addFloor(newFloorProperty);

    // refresh sidebar > property-view
    require('UI').getInstance().propertyTab.setPropertyTab('floor', newFloorProperty.id, require('Storage').getInstance());

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

    require('UI').getInstance().workspace.activateWorkspace(reqObj.id);

  }


  /**
   * @memberof UIManager
   * @param {Object} reqObj empty
   */
  UIManager.prototype.startAddNewCellBoundary = function(reqObj) {

    // change floor btn color
    document.getElementById('btn__cellSpaceBoundary').src = "../../assets/icon/cellboundary_a.png";

  }


  /**
   * @memberof UIManager
   * @param {Object} reqObj { id, floor, isEmpty }
   */
  UIManager.prototype.endAddNewCellBoundary = function(reqObj) {

    // change cellboundary_btw color
    document.getElementById('btn__cellSpaceBoundary').src = "../../assets/icon/cellboundary_d.png";

    if (reqObj.isEmpty != null) return;

    // set sidebar > propertyContainer
    require('UI').getInstance().propertyTab.setPropertyTab('cellBoundary', reqObj.id, require('Storage').getInstance());

    // refresh tree view
    require('UI').getInstance().treeView.addNode(reqObj.id, reqObj.id, 'CELL_SPACE_BOUNDARY', reqObj.floor);
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

    require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor].tmpLayer.group.moveTooltip(reqObj.point.x + 8, reqObj.point.y);

  }

  /**
   * @memberof UIManager
   * @param {Object} reqObj : floor, text
   */
  UIManager.prototype.setTooltipText = function(reqObj) {

    if (reqObj.floor == undefined) {
      var stages = require('Storage').getInstance().getCanvasContainer().stages;
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

      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      if (reqObj.text == '') {
        canvasContainer.stages[reqObj.floor].tmpLayer.group.setTooltipText(reqObj.text);
        canvasContainer.stages[reqObj.floor].tmpLayer.group.hideTooltip();
      } else {
        canvasContainer.stages[reqObj.floor].tmpLayer.group.setTooltipText(reqObj.text);
        canvasContainer.stages[reqObj.floor].tmpLayer.group.showTooltip();
      }

      canvasContainer.stages[reqObj.floor].tmpLayer.layer.draw();

    }
  }


  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewHole = function() {

    // change cell btn color
    document.getElementById('btn__hole').src = "../../assets/icon/hole_a.png";

    var manager = require('Broker').getInstance().getManager('start-addnewtransition', 'UIManager');
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
    document.getElementById('btn__hole').src = "../../assets/icon/hole_d.png";

    if (reqObj.isEmpty != null) return;

    // delete tooltip
    var manager = require('Broker').getInstance().getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: ''
    });

  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewTransition = function() {

    // change cell btn color
    document.getElementById('btn__transition').src = "../../assets/icon/transition_a.png";

    var manager = require('Broker').getInstance().getManager('start-addnewtransition', 'UIManager');
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
    document.getElementById('btn__transition').src = "../../assets/icon/transition_d.png";

    if (reqObj.isEmpty != null) return;

    // set sidebar > propertyContainer
    require('UI').getInstance().propertyTab.setPropertyTab('transition', reqObj.id, require('Storage').getInstance());

    // refresh tree view
    require('UI').getInstance().treeView.addNode(reqObj.id, reqObj.id, 'TRANSITION', reqObj.floor);

    // delete tooltip
    var manager = require('Broker').getInstance().getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: ''
    });

  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewState = function() {

    // change state btn color
    document.getElementById('btn__state').src = "../../assets/icon/state_a.png";

    // var manager = require('Broker').getInstance().getManager('start-addnewtransition', 'UIManager');
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
    document.getElementById('btn__state').src = "../../assets/icon/state_d.png";

    if (reqObj.isEmpty != null) return;

    // set sidebar > propertyContainer
    require('UI').getInstance().propertyTab.setPropertyTab('state', reqObj.id, require('Storage').getInstance());

    // refresh tree view
    require('UI').getInstance().treeView.addNode(reqObj.id, reqObj.id, 'STATE', reqObj.floor);

  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewTransition_makeHistoryObj = function(reqObj) {

    var obj = reqObj;
    obj['type'] = 'transition';

    return obj;
  }

  UIManager.prototype.cancelDrawObject = function(type) {
    var id = 'btn__' + type,
      src;

    switch (type) {
      case 'cellSpace':
        src = '../../assets/icon/cell_d.png';
        break;
      case 'cellSpaceBoundary':
        src = '../../assets/icon/cellboundary_d.png';
        break;
      case 'state':
        src = '../../assets/icon/state_d.png';
        break;
      case 'transition':
        src = '../../assets/icon/transition_d.png';
        break;
      case 'stair':
        src = '../../assets/icon/stair_d.png';
        break;
      case 'hole':
        src = '../../assets/icon/hole_d.png';
        break;
      case 'interlayerConnection':
        src = '../../assets/icon/inter_d.png';
        break;
      case 'slant_up':
        src = '../../assets/icon/slant_up_d.png';
        break;
      case 'slant_down':
        src = '../../assets/icon/slant_down_d.png';
        break;
      case 'slant_up_down':
        src = '../../assets/icon/slant_up_down_d.png';
        break;
      case 'hatch':
        src = '../../assets/icon/hatch_d.png';
        break;
      case 'interlayerconnection':
        src = '../../assets/icon/inter_d.png';
        break;
      default:

    }

    if (document.getElementById(id) != null)
      document.getElementById(id).src = src;

    if (type === 'transition' || type === 'stair' || type === 'hole' || type === 'interlayerconnection' || type === 'hatch') {
      var manager = require('Broker').getInstance().getManager('start-addnewtransition', 'UIManager');
      manager.setTooltipText({
        text: ''
      });
    }

  }

  /**
   * @memberof UIManager
   * @desc change floor btn color
   */
  UIManager.prototype.cancelAddNewCell = function(reqObj) {
    require('Broker').getInstance().getManager('addmap', 'UIManager').cancelDrawObject('cellSpace');
  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.cancelAddNewCellBoundary = function(reqObj) {
    require('Broker').getInstance().getManager('addmap', 'UIManager').cancelDrawObject('cellSpaceBoundary');
  }

  /**
   * @memberof UIManager
   * @param {Object} reqObj null
   */
  UIManager.prototype.cancelAddNewState = function(reqObj) {
    require('Broker').getInstance().getManager('addmap', 'UIManager').cancelDrawObject('state');
  }


  /**
   * @memberof UIManager
   */
  UIManager.prototype.cancelAddNewTransition = function(reqObj) {
    require('Broker').getInstance().getManager('addmap', 'UIManager').cancelDrawObject('transition');
  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.cancelAddNewStair = function(reqObj) {
    require('Broker').getInstance().getManager('addmap', 'UIManager').cancelDrawObject('stair');
  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.cancelAddNewHole = function(reqObj) {
    require('Broker').getInstance().getManager('addmap', 'UIManager').cancelDrawObject('hole');
  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.cancelAddNewInterLayerConnection = function(reqObj) {
    require('Broker').getInstance().getManager('addmap', 'UIManager').cancelDrawObject('interlayerconnection');

    if (reqObj.interConnects.length > 0) {
      var canvasContainer = require('Storage').getInstance().getCanvasContainer();
      var propertyContainer = require('Storage').getInstance().getPropertyContainer();
      reqObj.interConnects.forEach(state => {
        if(state != undefined){
          var floor = propertyContainer.getFloorById('state', state);
          var canvasObj = canvasContainer.stages[floor].getElementById("state", state);
          canvasObj.setColor('yellow');
          canvasObj.getObj().draw();
        }
      })
    }
  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.cancelAddNewSlantUp = function(reqObj) {
    require('Broker').getInstance().getManager('addmap', 'UIManager').cancelDrawObject('slant_up');
  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.cancelAddNewSlantDown = function(reqObj) {
    require('Broker').getInstance().getManager('addmap', 'UIManager').cancelDrawObject('slant_down');
  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.cancelAddNewSlantUpDown = function(reqObj) {
    require('Broker').getInstance().getManager('addmap', 'UIManager').cancelDrawObject('slant_up_down');
  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.cancelAddNewHatch = function(reqObj) {
    require('Broker').getInstance().getManager('addmap', 'UIManager').cancelDrawObject('hatch');
  }



  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewStair = function() {

    // change cell btn color
    document.getElementById('btn__stair').src = "../../assets/icon/stair_a.png";

    var manager = require('Broker').getInstance().getManager('start-addnewstair', 'UIManager');
    manager.setTooltipText({
      text: 'select state'
    });

  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewStair = function(reqObj) {

    // change cell btn color
    document.getElementById('btn__stair').src = "../../assets/icon/stair_d.png";

    if (reqObj.isEmpty != null) return;

    // set sidebar > propertyContainer
    require('UI').getInstance().propertyTab.setPropertyTab('transition', reqObj.id, require('Storage').getInstance());

    // refresh tree view
    require('UI').getInstance().treeView.addNode(reqObj.id, reqObj.id, 'TRANSITION', reqObj.floor);

    // delete tooltip
    var manager = require('Broker').getInstance().getManager('end-addnewstair', 'UIManager');
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
    document.getElementById('btn__slant_down').src = "../../assets/icon/slant_down_a.png";
  }


  /**
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewSlantDown = function(reqObj) {

    // change cell btn color
    document.getElementById('btn__slant_down').src = "../../assets/icon/slant_down_d.png";

    if (reqObj.isEmpty != null) {
      return;
    }

    // set sidebar > property
    require('UI').getInstance().propertyTab.setPropertyTab('cell', reqObj.id, require('Storage').getInstance());

    // refresh tree view
    require('UI').getInstance().treeView.addNode(reqObj.id, reqObj.id, 'CELL_SPACE', reqObj.floor);

    if (require('Conditions').getInstance().automGenerateState) {
      var id = require('Conditions').getInstance().pre_state + (require('Conditions').getInstance().LAST_STATE_ID_NUM);
      require('UI').getInstance().treeView.addNode(id, id, 'STATE', reqObj.floor);
    }

    // set tooltip
    require('Broker').getInstance().getManager('start-addnewslantdown', 'UIManager').setTooltipText({
      floor: reqObj.floor,
      text: ''
    });

  }



  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewSlantUp = function(reqObj) {

    // change floor btn color
    document.getElementById('btn__slant_up').src = "../../assets/icon/slant_up_a.png";
  }

  /**
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewSlantUp = function(reqObj) {

    // change cell btn color
    document.getElementById('btn__slant_up').src = "../../assets/icon/slant_up_d.png";

    if (reqObj.isEmpty != null) {
      return;
    }

    // set sidebar > property
    require('UI').getInstance().propertyTab.setPropertyTab('cell', reqObj.id, require('Storage').getInstance());

    // refresh tree view
    require('UI').getInstance().treeView.addNode(reqObj.id, reqObj.id, 'CELL_SPACE', reqObj.floor);

    if (require('Conditions').getInstance().automGenerateState) {
      var id = require('Conditions').getInstance().pre_state + (require('Conditions').getInstance().LAST_STATE_ID_NUM);
      require('UI').getInstance().treeView.addNode(id, id, 'STATE', reqObj.floor);
    }

    // set tooltip
    require('Broker').getInstance().getManager('start-addnewslantdown', 'UIManager').setTooltipText({
      floor: reqObj.floor,
      text: ''
    });

  }



  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewSlantUpDown = function(reqObj) {

    // change floor btn color
    document.getElementById('btn__slant_up_down').src = "../../assets/icon/slant_up_down_a.png";
  }


  /**
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewSlantUpDown = function(reqObj) {

    // change cell btn color
    document.getElementById('btn__slant_up_down').src = "../../assets/icon/slant_up_down_d.png";

    if (reqObj.isEmpty != null) {
      return;
    }

    // set sidebar > property
    require('UI').getInstance().propertyTab.setPropertyTab('cell', reqObj.id, require('Storage').getInstance());
    require('UI').getInstance().propertyTab.setPropertyTab('cell', require('Conditions').getInstance().pre_cell + (require('Conditions').getInstance().LAST_CELL_ID_NUM), require('Storage').getInstance());

    // refresh tree view
    require('UI').getInstance().treeView.addNode(reqObj.id, reqObj.id, 'CELL_SPACE', reqObj.floor);

    var nextId = require('Conditions').getInstance().pre_cell + (require('Conditions').getInstance().LAST_CELL_ID_NUM);
    require('UI').getInstance().treeView.addNode(nextId, nextId, 'CELL_SPACE', reqObj.floor);

    if (require('Conditions').getInstance().automGenerateState) {
      var stateId1 = require('Conditions').getInstance().pre_state + (require('Conditions').getInstance().LAST_STATE_ID_NUM - 1);
      var stateId2 = require('Conditions').getInstance().pre_state + (require('Conditions').getInstance().LAST_STATE_ID_NUM);

      require('UI').getInstance().treeView.addNode(stateId1, stateId1, 'State', reqObj.floor);
      require('UI').getInstance().treeView.addNode(stateId2, stateId2, 'State', reqObj.floor);
    }

    // set tooltip
    require('Broker').getInstance().getManager('start-addnewslantdown', 'UIManager').setTooltipText({
      floor: reqObj.floor,
      text: ''
    });

  }


  /**
   * @memberof UIManager
   * @param {Message.reqObj} reqObj floor, targetFloor
   */
  UIManager.prototype.copyFloor = function(reqObj) {

    var canvasContainer = require('Storage').getInstance().getCanvasContainer();
    var copyCanvas = canvasContainer.stages[reqObj.targetFloor];

    // set size
    var stage = canvasContainer.stages[reqObj.floor].stage;
    var width = copyCanvas.stage.width();
    var height = copyCanvas.stage.height()

    stage.setWidth(width);
    stage.setHeight(height);



    var backgroundLayer = canvasContainer.stages[reqObj.floor].backgroundLayer;
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


    ////////////////// test code  //////////////////
    ////////////////// copy state //////////////////
    var propertyContainer = require('Storage').getInstance().getPropertyContainer();
    let targetStates = propertyContainer.getElementById('floor', reqObj.targetFloor).stateKey;
    let canvasConstructure = require('../Storage/Canvas/Object/State.js');
    let geometryConstructure = require('../Storage/Geometries/StateGeometry.js');
    let propertyConstructure = require('Property').STATE;
    let dotConstructure = require('../Storage/Dot/Dot.js');
    let interConstructure = require('Property').INTERLAYER_CONNECTION;

    let dotPool = require('Storage').getInstance().getDotPoolContainer().getDotPool(reqObj.floor);
    let stateGroup = canvasContainer.stages[reqObj.floor].stateLayer.group;
    var peopertyContainer = propertyContainer.getElementById('floor', reqObj.floor);
    let layers = [propertyContainer.getElementById('floor', reqObj.targetFloor).layer,
      propertyContainer.getElementById('floor', reqObj.floor).layer
    ]

    let geometryContainer = require('Storage').getInstance().getGeometryContainer();
    for (let state of targetStates) {
      let newId = require('Conditions').getInstance().pre_state + ++require('Conditions').getInstance().LAST_STATE_ID_NUM;
      let targetGeo = geometryContainer.getElementById('state', state);

      // canvas
      let newDot = new dotConstructure(targetGeo.point.point.x, targetGeo.point.point.y);
      dotPool.push(newDot);
      stateGroup.makeNewStateAndAdd(newId, newDot);

      // geometry
      geometryContainer.stateGeometry.push(new geometryConstructure(newId, newDot));

      // prpoerty
      let newStateProperty = new propertyConstructure(newId);
      propertyContainer.stateProperties.push(newStateProperty);
      peopertyContainer.stateKey.push(newId);

      // interlayer connection
      let newInterId = require('Conditions').getInstance().pre_inter + ++require('Conditions').getInstance().LAST_INTER_ID_NUM;
      let newInter = new interConstructure(newInterId);
      newInter.interConnects = [state, newId];
      newInter.connectedLayer = [...layers];
      propertyContainer.interlayerConnections.push(newInter);

      require('UI').getInstance().treeView.addNode(newId, newId, 'State', reqObj.floor);
      require('UI').getInstance().treeView.addNode(newInterId, newInterId, 'INTERLAYER_CONNECTION', reqObj.floor);
    }

    canvasContainer.stages[reqObj.floor].stateLayer.layer.draw();
  }


  /**
   * @memberof UIManager
   */
  UIManager.prototype.startAddNewInterConnetction = function(reqObj) {

    document.getElementById('btn__interlayerconnection').src = "../../assets/icon/inter_a.png";

    var manager = require('Broker').getInstance().getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: 'select state'
    });

  }

  /**
   * @memberof UIManager
   */
  UIManager.prototype.endAddNewInterConnetction = function(reqObj) {

    // toolbar btn
    document.getElementById('btn__interlayerconnection').src = "../../assets/icon/inter_d.png";

    // tooltip
    var propertyContainer = require('Storage').getInstance().getPropertyContainer()
    var floors = propertyContainer.floorProperties;
    floors.forEach(fp => {
      require('Broker').getInstance().getManager(
        "start-addnewinterlayerconnetction", "UIManager"
      ).setTooltipText({
        floor: fp.id,
        text: ''
      })
    })

    // state color
    var inter = propertyContainer.getElementById('interlayerConnection', reqObj.id);
    var canvasContainer = require('Storage').getInstance().getCanvasContainer();
    inter.interConnects.forEach(stateId => {
      var floor = propertyContainer.getFloorById('state', stateId);
      var canvasObj = canvasContainer.stages[floor].getElementById('state', stateId);
      canvasObj.setColor('yellow');
      canvasObj.getObj().draw();
    })


    // set sidebar > propertyContainer
    require('UI').getInstance().propertyTab.setPropertyTab('interlayerConnection', reqObj.id, require('Storage').getInstance());

    // refresh tree view
    require('UI').getInstance().treeView.addNode(reqObj.id, reqObj.id, 'INTERLAYER_CONNECTION', reqObj.floor);

  }

  UIManager.prototype.updateDescList = function() {
    var container = document.getElementById('setting-desc-modal-list-container');
    $("#setting-desc-modal-list-container").empty();

    var manager = require('Broker').getInstance().getManager(
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

    var descs = require('Conditions').getInstance().descList;
    for (var desc of descs) {
      var i = item(desc);
      container.appendChild(i);

      document.getElementById(desc).addEventListener('click', function(event) {
        if (require('Broker').getInstance().isPublishable('deletedesclist'))
          require('Broker').getInstance().publish({
            req: 'deletedesclist',
            reqObj: event.currentTarget.id
          });
      });
    }
  }

  UIManager.prototype.showConditionModal = function() {

    $('#setting-conditions-modal').modal('show');
    var conditions = require('Conditions').getInstance();
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
    require('Broker').getInstance().getManager("updatedesclist", "UIManager").updateDescList();

    // update property tab
    require('UI').getInstance().propertyTab.setPropertyTab($('#property-table').data('type'), $('#id-text').val(), require('Storage').getInstance());
  }

  UIManager.prototype.deleteDescList = function(reqObj) {
    require('Broker').getInstance().getManager("updatedesclist", "UIManager").updateDescList();

    // update property tab
    require('UI').getInstance().propertyTab.setPropertyTab($('#property-table').data('type'), $('#id-text').val(), require('Storage').getInstance());
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
          require('EventHandler').getInstance().callHandler('code-modal-trash', event)
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
          require('EventHandler').getInstance().callHandler('code-modal-trash', event)
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
      bottomTr.innerHTML = require('UI').getInstance().propertyTab.getBasicTr('bottom', 'bottom', property.bottom, false);
      var heightTr = document.createElement("tr");
      heightTr.innerHTML = require('UI').getInstance().propertyTab.getBasicTr('height', 'height', property.height, false);

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
      obstacleTr.innerHTML = require('UI').getInstance().propertyTab.getCodeListTr([reqObj.selected], 'obstacle-text', 'obstacle');
      reqObj.table.appendChild(obstacleTr);
    } else if (reqObj.selected != "") {
      var classTr = document.createElement('tr');
      classTr.innerHTML = require('UI').getInstance().propertyTab.getCodeListTr([reqObj.selected, 'class'], 'class-text', 'class');
      var functionTr = document.createElement("tr");
      functionTr.innerHTML = require('UI').getInstance().propertyTab.getCodeListTr([reqObj.selected, 'function'], 'function-text', 'function');
      var usageTr = document.createElement("tr");
      usageTr.innerHTML = require('UI').getInstance().propertyTab.getCodeListTr([reqObj.selected, 'function'], 'usage-text', 'function');

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
        featureTr = require('UI').getInstance().propertyTab.getOneDropTr(
          'feature\ntype',
          'feature-type-text',
          ["", "GeneralSpace", "TransitionSpace", "ConnectionSpace", "AnchorSpace"]);
      } else if (reqObj.selected == 'navi' && document.getElementById('property-table').dataset.type == "cellBoundary") {
        featureTr = require('UI').getInstance().propertyTab.getOneDropTr(
          'feature\ntype',
          'feature-type-text',
          ["", "ConnectionBoundary", "AnchorBoundary"]);
      } else if (reqObj.selected == 'non-navi') {
        featureTr = require('UI').getInstance().propertyTab.getOneDropTr(
          'feature\ntype',
          'feature-type-text',
          ["", "NonNavigableSpace"]);
      }

      reqObj.table.appendChild(featureTr);
      document.getElementById('feature-type-text').addEventListener('change', function(event) {
        require('EventHandler').getInstance().callHandler('html', event);
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
      if (reqObj.moduleType == "navi" && document.getElementById('property-table').dataset.type == "cell") {
        reqObj.table.appendChild(require('UI').getInstance().propertyTab.getOneCodeListTr([...reqObj.path, 'class'], 'class-text', 'class'));
        reqObj.table.appendChild(require('UI').getInstance().propertyTab.getOneCodeListTr([...reqObj.path, 'function'], 'function-text', 'function'));
        reqObj.table.appendChild(require('UI').getInstance().propertyTab.getOneCodeListTr([...reqObj.path, 'function'], 'usage-text', 'usage'));
      } else if (reqObj.moduleType == 'non-navi') {
        reqObj.table.appendChild(require('UI').getInstance().propertyTab.getOneCodeListTr(
          ['NonNavigableSpace'],
          'obstacle-type-text',
          'obtacle'
        ))
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
    require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor].addMap(reqObj.coor);
  }

  UIManager.prototype.startAddNewHatch = function(reqObj) {
    // change btn color
    document.getElementById('btn__hatch').src = "../../assets/icon/hatch_a.png";

    var manager = require('Broker').getInstance().getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: 'select cell'
    });
  }

  UIManager.prototype.endAddNewHatch = function(reqObj) {

    // change transition btn color
    document.getElementById('btn__hatch').src = "../../assets/icon/hatch_d.png";

    if (reqObj.isEmpty != null) return;

    // delete tooltip
    var manager = require('Broker').getInstance().getManager('start-addnewtransition', 'UIManager');
    manager.setTooltipText({
      text: ''
    });

  }

  UIManager.prototype.removeFLoorplan = function(reqObj) {
    var canvasContainer = require('Storage').getInstance().getCanvasContainer();
    let stage = canvasContainer.stages[reqObj.floor].stage;
    canvasContainer.stages[reqObj.floor].backgroundLayer.setGrid(stage.width(), stage.height());
    canvasContainer.stages[reqObj.floor].backgroundLayer.floorplanDataURL = [];
    stage.draw();
  }

  return UIManager;
});
