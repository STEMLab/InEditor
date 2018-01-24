/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([
  "./Manager.js",
  "../Storage/Properties/FloorProperty.js",
  "../Storage/Canvas/Stage.js"
],function(
  Manager,
  FloorProperty,
  Stage
) {
  'use strict';

  /**
  * @classdesc
  * @class
  */
  function PropertyManager() {

    Manager.apply(this, arguments);

    this.init();

  }

  PropertyManager.prototype = Object.create(Manager.prototype);

  PropertyManager.prototype.init = function(){

    this.name = 'PropertyManager';

    this.addReq({
      'start-proptest' : 'cycle',
      'proptest' : 'cycle',
      'end-proptest' : 'cycle',
      'addnewfloor' : 'single'
    });

    this.addCallbackFun('start-proptest', this.test );
    this.addCallbackFun('proptest', this.test );
    this.addCallbackFun('end-proptest', this.test );
    this.addCallbackFun('addnewfloor', this.addNewFloor );

  }

  /**
  * @param reqObj null
  */
  PropertyManager.prototype.test = function(reqObj){

    console.log("property-manager test success");

  }

  /**
  * @param reqObj null
  */
  PropertyManager.prototype.addNewFloor = function(reqObj){

    var newFloorProperty = new FloorProperty();

    // add new property
    window.storage.propertyContainer.floorProperties.push(newFloorProperty);

    // add new stage
    window.storage.canvasContainer.stages[newFloorProperty.id] = new Stage(
      newFloorProperty.id,
      newFloorProperty.name,
      'container',
      document.getElementById('viewport').clientWidth,
      document.getElementById('viewport').clientHeight
    );

    // add new workspace

    // refresh sidebar > tree-view

    // refresh sidebar > property-view

    console.log(window);
  }



  return PropertyManager;
});
