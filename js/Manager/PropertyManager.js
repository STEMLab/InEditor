/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "../Storage/Properties/FloorProperty.js",
  "../Storage/Canvas/Stage.js",
  "../Storage/Properties/CellProperty.js",
  "../PubSub/Subscriber.js"
], function(
  FloorProperty,
  Stage,
  CellProperty,
  Subscriber
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

    // this.addReq({
    //   'addnewfloor' : null,
    //   'updateproperty' : null,
    //   'end-addnewcell' : null,
    //   'updaterefdata' : null
    // });

    this.addCallbackFun('addnewfloor', this.addNewFloor);
    this.addCallbackFun('updateproperty', this.updateProperty);
    this.addCallbackFun('end-addnewcell', this.endAddNewCell, this.endAddNewCell_makeHistoryObj, this.endAddNewCell_undo);
    this.addCallbackFun('updaterefdata', this.updateRefProperty);

  }

  /**
   * @param {Message.reqObj} reqObj null
   * @memberof PropertyManager
   */
  PropertyManager.prototype.addNewFloor = function(reqObj) {

    var newFloorProperty = new FloorProperty();

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

    // add new cellproperty object in storage.propertyContainer
    window.storage.propertyContainer.cellProperties.push(
      new CellProperty(reqObj.id)
    );

    // add cell key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).cellKey.push(
      reqObj.id
    );

  }

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof PropertyManager
   * @return cell id
   */
   PropertyManager.prototype.endAddNewCell_makeHistoryObj = function(reqObj){

     return reqObj;

   }

   /**
    * @param {Object} undoObj id<br>floor: floor id
    * @memberof PropertyManager
    * @return cell id
    */
    PropertyManager.prototype.endAddNewCell_undo = function(undoObj){

      // remove new cellproperty object in storage.propertyContainer
      var cells = window.storage.propertyContainer.cellProperites;

      for(var key in cells){
        if(cells.id == undoObj.id)
          cells.splice(key,1);
      }

      // add cell key in floor property
      var floors = window.storage.propertyContainer.floorProperties;

      for(var key in floors){
        if(floors[key].id == undoObj.floor){
          floors[key].cellKey.splice(floors[key].cellKey.indexOf(undoObj.id), 1);
        }
      }

    }




  return PropertyManager;
});
