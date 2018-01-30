/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([
  "./Manager.js",
  "../Storage/Canvas/Object/Cell.js"
],function(
  Manager,
  Cell
) {
  'use strict';

  /**
  * @class GeometryManager
  * @augments Manager
  */
  function GeometryManager() {

    Manager.apply(this, arguments);

    var currentObj = null;

    this.init();
  }

  GeometryManager.prototype = Object.create(Manager.prototype);

  /**
  * @override Manager
  */
  GeometryManager.prototype.init = function(){

    this.name = 'GeometryManager';

    this.addReq({
      'start-geotest' : 'cycle',
      'geotest' : 'cycle',
      'end-geotest' : 'cycle',
      'singletest' : 'single',
      'start-addnewcell' : 'cycle',
      'addnewcell' : 'cycle',
      'end-addnewcell' : 'cycle'
    });

    this.addCallbackFun('start-geotest', this.startGeotest );
    this.addCallbackFun('geotest', this.geotest );
    this.addCallbackFun('end-geotest', this.endGeotest );
    this.addCallbackFun('singletest', this.singletest );
    this.addCallbackFun('start-addnewcell', this.startAddNewCell );
    this.addCallbackFun('addnewcell', this.addNewCell );
    this.addCallbackFun('end-addnewcell', this.endAddNewCell );

  }


  GeometryManager.prototype.startGeotest = function(reqObj, storage){

    console.log("startGeotest success", storage);

  }

  GeometryManager.prototype.geotest = function(reqObj, storage){

    console.log("geotest success", storage);

  }

  GeometryManager.prototype.endGeotest = function(reqObj, storage){

    console.log("endGeotest success", storage);

  }

  GeometryManager.prototype.singletest = function(reqObj, storage){

    console.log("singletest success", storage);

  }


  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.startAddNewCell = function(){

    var tmpObj = new Cell('tmpObj');
    window.tmpObj = tmpObj;

  }

  /**
   * @memberof GeometryManager
   * @param {Object} reqObj floor: floor id
   */
  GeometryManager.prototype.addNewCell = function(reqObj){

    // if tmpObj havn't floor data, add floor data in it.
    if( window.tmpObj.floor == null ){

      window.tmpObj.floor = reqObj.floor;
      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.destroyChildren();
      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.add(window.tmpObj.poly, window.tmpObj.corners);

    }

    // add corner
    window.tmpObj.addCorner( window.storage.canvasContainer.stages[reqObj.floor].stage.getPointerPosition());

    // draw group
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.draw();

  }

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof GeometryManager
   */
  GeometryManager.prototype.endAddNewCell = function(reqObj){

    // destroy tmpGroup children
    var tmpObj = window.tmpObj;
    window.tmpObj = null;
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.destroyChildren();

    tmpObj.id = reqObj.id;
    tmpObj.name = reqObj.id;

    // add cell using tmpObj
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.addNewCell(tmpObj);

    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.layer.draw();

    // add state

  }

  return GeometryManager;
});
