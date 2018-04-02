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
    this.addCallbackFun('end-addnewtransition', this.endAddNewTransition)
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
        obj.lowerCorner = reqObj.updateContent.lowerCorner;
        obj.upperCorner = reqObj.updateContent.upperCorner;
        obj.groundHeight = reqObj.updateContent.groundHeight;
        obj.celingHeight = reqObj.updateContent.celingHeight;
        obj.doorHeight = reqObj.updateContent.doorHeight;
        obj.description = reqObj.updateContent.description;
        break;
      case 'cell':
        obj.name = reqObj.updateContent.name;
        obj.description = reqObj.updateContent.description;
        break;
      case 'cellBoundary':
        obj.name = reqObj.updateContent.name;
        obj.description = reqObj.updateContent.description;
        break;
      case 'state':
        obj.name = reqObj.updateContent.name;
        obj.description = reqObj.updateContent.description;
        break;
      case 'transition':
        obj.name = reqObj.updateContent.name;
        obj.description = reqObj.updateContent.description;
        obj.weight = reqObj.updateContent.weight;
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

    if(reqObj.isEmpty != null ){
      return;
    }

    // add new cellproperty object in storage.propertyContainer
    window.storage.propertyContainer.cellProperties.push(
      new CellProperty(reqObj.id)
    );

    // add cell key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).cellKey.push(
      reqObj.id
    );

    // add state property if there if conditions.automGenerateState is true
    if(window.conditions.automGenerateState){
      var newState = new StateProperty(window.conditions.pre_state + (window.conditions.LAST_STATE_ID_NUM));
      newState.setDuality(reqObj.id);

      window.storage.propertyContainer.stateProperties.push( newState );
      window.storage.propertyContainer.getElementById('floor', reqObj.floor).stateKey.push(
        newState.id
      );
    }

    log.trace(window.storage);

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

    // remove new cellproperty object in storage.propertyContainer
    var cells = window.storage.propertyContainer.cellProperties;

    for (var key in cells) {
      if (cells.id == undoObj.id)
        cells.splice(key, 1);
    }

    // remove cell key in floor property
    var floors = window.storage.propertyContainer.floorProperties;

    for (var key in floors) {
      if (floors[key].id == undoObj.floor) {
        floors[key].cellKey.splice(floors[key].cellKey.indexOf(undoObj.id), 1);
      }
    }

    window.conditions.LAST_CELL_ID_NUM--;

  }

  /**
   * @memberof PropertyManager
   */
  PropertyManager.prototype.endAddNewCellBoundary = function(reqObj) {
    log.info('PropertyManager.endAddNewCellBoundary called');
  }

  /**
  * @memberof GeometryManager
  * @param {Object} reqObj { id, floor, isEmpty }
  */
  PropertyManager.prototype.endAddNewCellBoundary = function(reqObj){

    if(reqObj.isEmpty != null ){ return; }

    // add new cellspace boundary property(=CellBoundaryProperty) in stage.propertyContainer
    window.storage.propertyContainer.cellBoundaryProperties.push(
      new CellBoundaryProperty(reqObj.id)
    );

    // add key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).cellBoundaryKey.push(
      reqObj.id
    );

    // log.trace(window.storage.propertyContainer);
  }

  /**
  * @memberof PropertyManager
  */
  PropertyManager.prototype.endAddNewCellBoundary_undo = function(undoObj){

    // remove new cellboundary object in storage.propertyContainer
    var cellBoundaries = window.storage.propertyContainer.cellBoundaryProperties;

    var i = 0;
    for(i = cellBoundaries.length - i - 1 ; i > -1 ; i++ ){

      if(cellBoundaries[i].id == undoObj.id){
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
  PropertyManager.prototype.endAddNewTransition = function(reqObj){

    if(reqObj.isEmpty != null) return;

    var canvasObj = window.storage.canvasContainer.stages[reqObj.floor].transitionLayer.group.getLastTransition();
    var newProperty = new TransitionProperty(reqObj.id);
    var connects = canvasObj.getConnection()
    newProperty.setConnects(connects);
    newProperty.setDuality(canvasObj.getDuality());

    // add connects to state
    window.storage.propertyContainer.getElementById('state', connects[0]).addConnects(connects[1]);
    window.storage.propertyContainer.getElementById('state', connects[1]).addConnects(connects[0]);

    // add new transition object in storage.propertyContainer
    window.storage.propertyContainer.transitionProperties.push(newProperty);

    // add transition key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).transitionKey.push(
      reqObj.id
    );

  }

  return PropertyManager;
});
