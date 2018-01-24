/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "./Manager.js",
  "../Storage/Properties/FloorProperty.js",
  "../Storage/Canvas/Stage.js"
], function(
  Manager,
  FloorProperty,
  Stage
) {
  'use strict';

  /**
   * @exports Manager/PropertyManager
   */
  function PropertyManager() {

    Manager.apply(this, arguments);

    this.init();

  }

  PropertyManager.prototype = Object.create(Manager.prototype);

  PropertyManager.prototype.init = function() {

    this.name = 'PropertyManager';

    this.addReq({
      'start-proptest': 'cycle',
      'proptest': 'cycle',
      'end-proptest': 'cycle',
      'addnewfloor': 'single',
      'updateproperty': 'single'
    });

    this.addCallbackFun('start-proptest', this.test);
    this.addCallbackFun('proptest', this.test);
    this.addCallbackFun('end-proptest', this.test);
    this.addCallbackFun('addnewfloor', this.addNewFloor);
    this.addCallbackFun('updateproperty', this.updateProperty);

  }

  /**
   * @param reqObj null
   */
  PropertyManager.prototype.test = function(reqObj) {

    console.log("property-manager test success");

  }

  /**
   * @param {Message.reqObj} reqObj null
   */
  PropertyManager.prototype.addNewFloor = function(reqObj) {

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

    // refresh sidebar > tree-view
    window.uiContainer.sidebar.treeview.addFloor(newFloorProperty);

    // refresh sidebar > property-view
    window.uiContainer.sidebar.property.setPropertyTab('floor', newFloorProperty.id, window.storage);

    console.log(window);
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
        console.log("PropertyManager >>> wrong reqObj.type("+reqObj.type+")");
    }

  }

  return PropertyManager;
});
