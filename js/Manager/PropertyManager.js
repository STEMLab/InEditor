/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../Storage/Properties/FloorProperty.js",
  "../Storage/Canvas/Stage.js",
  "../Storage/Properties/CellProperty.js",
  "../PubSub/Subscriber.js",
  "../Storage/Properties/CellBoundaryProperty.js",
  "../Storage/Properties/StateProperty.js",
  "../Storage/Properties/TransitionProperty.js"
], function(
  FloorProperty,
  Stage,
  CellProperty,
  Subscriber,
  CellBoundaryProperty,
  StateProperty,
  TransitionProperty
) {
  'use strict';

  /**
   * @class PropertyManager
   * @augments Subscriber
   */
  function PropertyManager() {

    Subscriber.apply(this, arguments);

    this.init();

  }

  PropertyManager.prototype = Object.create(Subscriber.prototype);

  /**
   * @memberof PropertyManager
   */
  PropertyManager.prototype.init = function() {

    this.name = 'PropertyManager';

    this.addCallbackFun('addnewfloor', this.addNewFloor);
    this.addCallbackFun('updateproperty', this.updateProperty);
    this.addCallbackFun('end-addnewcell', this.endAddNewCell, this.makeSimpleHistoryObj, this.endAddNewCell_undo);
    this.addCallbackFun('updaterefdata', this.updateRefProperty);

    this.addCallbackFun('end-addnewcellboundary', this.endAddNewCellBoundary, this.makeSimpleHistoryObj, this.endAddNewCellBoundary_undo);
    this.addCallbackFun('end-addnewtransition', this.endAddNewTransition, this.makeSimpleHistoryObj, this.endAddNewTransition_undo);
    this.addCallbackFun('end-addnewstate', this.endAddNewState, this.makeSimpleHistoryObj, this.endAddNewState_undo);
    this.addCallbackFun('end-addnewstair', this.endAddNewStair, function() {}, function() {});
    this.addCallbackFun('end-addnewslantdown', this.endAddNewCell, this.makeSimpleHistoryObj, this.endAddNewCell_undo);
    this.addCallbackFun('end-addnewslantupdown', this.endAddNewSlantUpDown, this.makeSimpleHistoryObj, this.endAddNewCell_undo);

    this.addCallbackFun('deletecell', this.deleteCell);
    this.addCallbackFun('deletestate', this.deleteState);
    this.addCallbackFun('deletedesclist', this.deleteDescList);
    this.addCallbackFun('adddesclist', this.addDescList);

  }

  /**
   * @param {Message.reqObj} reqObj floor
   * @memberof PropertyManager
   */
  PropertyManager.prototype.addNewFloor = function(reqObj) {

    var newFloorProperty = new FloorProperty(reqObj.floor);

    // add new property
    window.storage.propertyContainer.floorProperties.push(newFloorProperty);

  }



  /**
   * @param {Message.reqObj} reqObj type, id, updateContent
   * @memberof PropertyManager
   */
  PropertyManager.prototype.updateProperty = function(reqObj) {

    var obj = window.storage.propertyContainer.getElementById(reqObj.type, reqObj.id);

    switch (reqObj.type) {
      case 'project':
        obj.name = reqObj.updateContent.name;
        obj.author = reqObj.updateContent.author;
        obj.description = reqObj.updateContent.description;
        break;
      case 'floor':
        obj.name = reqObj.updateContent.name;
        obj.level = reqObj.updateContent.level;
        obj.layer = reqObj.updateContent.layer;
        obj.lowerCorner = reqObj.updateContent.lowerCorner;
        obj.upperCorner = reqObj.updateContent.upperCorner;
        obj.groundHeight = reqObj.updateContent.groundHeight;
        obj.celingHeight = reqObj.updateContent.celingHeight;
        obj.doorHeight = reqObj.updateContent.doorHeight;
        obj.description = reqObj.updateContent.description;
        break;
      case 'cell':
        if(reqObj.updateContent.name == undefined){
          obj.naviType = reqObj.updateContent.naviType;
          obj.navi = reqObj.updateContent.navi;
        }
        else {
          obj.name = reqObj.updateContent.name;
          obj.description = reqObj.updateContent.description;
        }
        break;
      case 'cellBoundary':
        obj.name = reqObj.updateContent.name;
        obj.description = reqObj.updateContent.description;
        obj.naviType = reqObj.updateContent.naviType;
        break;
      case 'state':
        obj.name = reqObj.updateContent.name;
        obj.description = reqObj.updateContent.description;
        obj.height = reqObj.updateContent.height;
        break;
      case 'transition':
        obj.name = reqObj.updateContent.name;
        obj.description = reqObj.updateContent.description;
        obj.weight = reqObj.updateContent.weight;
        break;
      case 'interlayerConnection':
        obj.typeOfTopoExpression = reqObj.updateContent.typeOfTopoExpression;
        obj.commnet = reqObj.updateContent.commnet;
        break;
      default:
        console.log("PropertyManager >>> wrong reqObj.type(" + reqObj.type + ")");
    }

  }

  /**
   * @param {Message.reqObj} reqObj type, id, updateContent
   * @memberof PropertyManager
   */
  PropertyManager.prototype.updateRefProperty = function(reqObj) {

    var obj = window.storage.propertyContainer.getElementById(reqObj.type, reqObj.id);
    obj.externalReference.push(reqObj.updateContent.externalRef);

  }


  /**
   * @memberof PropertyManager
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewCell = function(reqObj) {

    if (reqObj.isEmpty != null) {
      return;
    }

    // add new cellproperty object in storage.propertyContainer
    var newCellProperty = new CellProperty(reqObj.id);
    window.storage.propertyContainer.cellProperties.push(newCellProperty);

    // add cell key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).cellKey.push(
      reqObj.id
    );

    // add state property if there if conditions.automGenerateState is true
    if (window.conditions.automGenerateState) {
      var newState = new StateProperty(window.conditions.pre_state + (window.conditions.LAST_STATE_ID_NUM));
      newState.setDuality(reqObj.id);

      window.storage.propertyContainer.stateProperties.push(newState);
      window.storage.propertyContainer.getElementById('floor', reqObj.floor).stateKey.push(
        newState.id
      );

      newCellProperty.setDuality(newState.id);
    }

    // log.trace(window.storage);

  }

  /**
   * @memberof PropertyManager
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewState = function(reqObj) {

    if (reqObj.isEmpty != null) {
      return;
    }

    // log.trace(window.storage);
    var newState = new StateProperty(window.conditions.pre_state + (window.conditions.LAST_STATE_ID_NUM));
    if (reqObj.duality) {
      newState.setDuality(reqObj.duality);
    }

    window.storage.propertyContainer.stateProperties.push(newState);
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).stateKey.push(
      newState.id
    );

    if(newState.duality != "" && newState.duality != ""){
      window.storage.propertyContainer.getElementById('cell', newState.duality).setDuality(newState.id);
    }

  }

  /**
   * @memberof PropertyManager
   * @desc just return input parameter(reqObj)
   */
  PropertyManager.prototype.makeSimpleHistoryObj = function(reqObj) {
    return reqObj;
  }

  /**
   * @param {Object} undoObj id<br>floor: floor id
   * @memberof PropertyManager
   * @return cell id
   */
  PropertyManager.prototype.endAddNewCell_undo = function(undoObj) {

    window.broker.getManager('end-addnewcell', 'PropertyManager').deleteCell(undoObj);

    window.conditions.LAST_CELL_ID_NUM--;

  }

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof PropertyManager
   * @return cell id
   */
  PropertyManager.prototype.deleteCell = function(reqObj) {

    // remove new cellproperty object in storage.propertyContainer
    var cells = window.storage.propertyContainer.cellProperties;
    var duality = null;

    for (var key in cells) {
      if (cells[key].id == reqObj.id){
        duality = cells[key].duality;
        cells.splice(key, 1);
        break;
      }
    }

    // finde state
    if(duality != null){
      var state = window.storage.propertyContainer.getElementById('state', duality);
      if( state.duality == reqObj.id ) state.duality = "";
    }

    // remove cell key in floor property
    var floors = window.storage.propertyContainer.floorProperties;

    for (var key in floors) {
      if (floors[key].id == reqObj.floor) {
        floors[key].cellKey.splice(floors[key].cellKey.indexOf(reqObj.id), 1);
      }
    }

  }

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof PropertyManager
   */
  PropertyManager.prototype.deleteState = function(reqObj) {

    // remove new stateproperty object in storage.propertyContainer
    var states = window.storage.propertyContainer.stateProperties;

    for (var key in states) {
      if (states[key].id == reqObj.id)
        states.splice(key, 1);
    }

    // remove cell key in floor property
    var floors = window.storage.propertyContainer.floorProperties;

    for (var key in floors) {
      if (floors[key].id == reqObj.floor) {
        floors[key].stateKey.splice(floors[key].stateKey.indexOf(reqObj.id), 1);
      }
    }

  }

  /**
   * @memberof GeometryManager
   * @param {Object} reqObj { id, floor, isEmpty }
   */
  PropertyManager.prototype.endAddNewCellBoundary = function(reqObj) {

    if (reqObj.isEmpty != null) {
      return;
    }

    // add new cellspace boundary property(=CellBoundaryProperty) in stage.propertyContainer
    var property = new CellBoundaryProperty(reqObj.id);
    window.storage.propertyContainer.cellBoundaryProperties.push(property);

    // add key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).cellBoundaryKey.push(
      reqObj.id
    );

    var associationCells = window.tmpObj.associationCell;
    for(var key in associationCells){
      window.storage.propertyContainer.getElementById('cell', key).addPartialboundedBy(reqObj.id);
    }

    window.tmpObj = null;
  }

  /**
   * @memberof PropertyManager
   */
  PropertyManager.prototype.endAddNewCellBoundary_undo = function(undoObj) {

    // remove new cellboundary object in storage.propertyContainer
    var cellBoundaries = window.storage.propertyContainer.cellBoundaryProperties;

    var i = 0;
    for (i = cellBoundaries.length - i - 1; i > -1; i++) {

      if (cellBoundaries[i].id == undoObj.id) {
        cellBoundaries.splice(i, 1);
        break;
      }

    }

    // remove cell key in floor property
    var floors = window.storage.propertyContainer.floorProperties;

    for (var key in floors) {
      if (floors[key].id == undoObj.floor) {
        floors[key].cellBoundaryKey.splice(floors[key].cellBoundaryKey.indexOf(undoObj.id), 1);
      }
    }

    window.conditions.LAST_CELLBOUNDARY_ID_NUM--;

    log.trace(window.storage);

  }

  /**
   * @memberof PropertyManager
   * @param {Message.reqObj} reqObj id : if of new object<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewTransition = function(reqObj) {

    if (reqObj.isEmpty != null) return;

    var canvasObj = window.storage.canvasContainer.stages[reqObj.floor].transitionLayer.group.getLastTransition();
    var newProperty = new TransitionProperty(reqObj.id);
    var connects = canvasObj.getConnection()
    newProperty.setConnects(connects);
    newProperty.setDuality(canvasObj.getDuality());

    // add connects to state
    window.storage.propertyContainer.getElementById('state', connects[0]).addConnects(newProperty.id);
    window.storage.propertyContainer.getElementById('state', connects[1]).addConnects(newProperty.id);

    // add new transition object in storage.propertyContainer
    window.storage.propertyContainer.transitionProperties.push(newProperty);

    // add transition key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).transitionKey.push(
      reqObj.id
    );

    if(newProperty.duality != "" && newProperty.duality != "" && newProperty.duality != null && newProperty.duality != null)
      window.storage.propertyContainer.getElementById('cellBoundary', newProperty.duality).setDuality(newProperty.id);

  }

  /**
   * @memberof PropertyManager
   * @param {Object} undoObj id : if of new object<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewTransition_undo = function(undoObj) {

    // remove new transition object in storage.propertyContainer
    var propertyObj = window.storage.propertyContainer.getElementById('transition', undoObj.id);
    window.storage.propertyContainer.transitionProperties.splice(
      window.storage.propertyContainer.transitionProperties.indexOf(propertyObj), 1
    );

    // remove cell key in floor property
    var floor = window.storage.propertyContainer.getElementById('floor', undoObj.floor);
    var index = floor.transitionKey.indexOf(undoObj.id);
    floor.transitionKey.splice(index, 1);

    window.conditions.LAST_TRANSITION_ID_NUM--;

  }

  /**
   * @memberof PropertyManager
   * @param {Message.reqObj} reqObj id : if of new object<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewStair = function(reqObj) {

    if (reqObj.isEmpty != null) return;

    var geometryObj = window.storage.geometryContainer.getElementById('transition', reqObj.id);
    var newProperty = new TransitionProperty(reqObj.id);
    var connects = geometryObj.getConnects();
    newProperty.setConnects(connects);
    newProperty.setDuality(geometryObj.getDuality());

    var startFloor = window.storage.propertyContainer.getFloorById('state', connects[0]);
    var endFloor = window.storage.propertyContainer.getFloorById('state', connects[1]);
    newProperty.setStair([startFloor, endFloor]);

    // add connects to state
    window.storage.propertyContainer.getElementById('state', connects[0]).addConnects(newProperty.id);
    window.storage.propertyContainer.getElementById('state', connects[1]).addConnects(newProperty.id);

    // add new transition object in storage.propertyContainer
    window.storage.propertyContainer.transitionProperties.push(newProperty);

    // add transition key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).transitionKey.push(
      reqObj.id
    );

    // log.info(window.storage.propertyContainer);

  }

  /**
   * @memberof PropertyManager
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewSlantUpDown = function(reqObj) {

    if (reqObj.isEmpty != null) {
      return;
    }

    log.info(window.conditions.LAST_STATE_ID_NUM);
    window.conditions.LAST_STATE_ID_NUM--;
    window.broker.getManager('end-addnewcell', 'PropertyManager').endAddNewCell(reqObj);
    window.conditions.LAST_STATE_ID_NUM++;
    window.broker.getManager('end-addnewcell', 'PropertyManager').endAddNewCell({
      floor: reqObj.floor,
      id: window.conditions.pre_cell + window.conditions.LAST_CELL_ID_NUM
    });

  }

  PropertyManager.prototype.deleteDescList = function(reqObj){
    var index = window.conditions.descList.indexOf(reqObj);
    if( index != -1){
       window.conditions.descList.splice(index, 1);
    }

    window.broker.getManager(
      "updatedesclist",
      "UIManager"
    ).updateDescList();
  }

  PropertyManager.prototype.addDescList = function(reqObj){
    if(reqObj.data != "" && window.conditions.descList.indexOf(reqObj.data) == -1){
       window.conditions.descList.push(reqObj.data);
    }

    window.broker.getManager(
      "updatedesclist",
      "UIManager"
    ).updateDescList();


  }


  return PropertyManager;
});
