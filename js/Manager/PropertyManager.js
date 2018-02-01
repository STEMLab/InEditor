/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "./Manager.js",
  "../Storage/Properties/FloorProperty.js",
  "../Storage/Canvas/Stage.js",
  "../Storage/Properties/CellProperty.js"
], function(
  Manager,
  FloorProperty,
  Stage,
  CellProperty
) {
  'use strict';

  /**
   * @class PropertyManager
   * @augments Manager
   */
  function PropertyManager() {

    Manager.apply(this, arguments);

    this.init();

  }

  PropertyManager.prototype = Object.create(Manager.prototype);

  /**
   * @override
   */
  PropertyManager.prototype.init = function() {

    this.name = 'PropertyManager';

    this.addReq({
      'addnewfloor' : null,
      'updateproperty' : null,
      'end-addnewcell' : null,
      'updaterefdata' : null
    });

    this.addCallbackFun('addnewfloor', this.addNewFloor);
    this.addCallbackFun('updateproperty', this.updateProperty);
    this.addCallbackFun('end-addnewcell', this.endAddNewCell);
    this.addCallbackFun('updaterefdata', this.updateRefProperty);

  }

  /**
   * @param {Message.reqObj} reqObj null
   */
  PropertyManager.prototype.addNewFloor = function(reqObj) {

    /*********************************************************************************************
     ******* move funciton after `add new property` to UIManager *********************************
     *********************************************************************************************/

    var newFloorProperty = new FloorProperty();

    // add new property
    window.storage.propertyContainer.floorProperties.push(newFloorProperty);

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
   * @param {Message.reqObj} reqObj type, id, updateContent
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

    // add new cellproperty object in storage.propertyContainer
    window.storage.propertyContainer.cellProperties.push(
      new CellProperty(reqObj.id)
    );

    // add cell key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).cellKey.push(
      reqObj.id
    );

  }



  return PropertyManager;
});
