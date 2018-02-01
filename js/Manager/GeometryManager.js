/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([
  "./Manager.js",
  "../Storage/Canvas/Object/Cell.js",
  "../Storage/Geometries/CellGeometry.js"
],function(
  Manager,
  Cell,
  CellGeometry
) {
  'use strict';

  /**
  * @class GeometryManager
  * @augments Manager
  */
  function GeometryManager() {

    Manager.apply(this, arguments);

    this.init();
  }

  GeometryManager.prototype = Object.create(Manager.prototype);

  /**
  * @override Manager
  */
  GeometryManager.prototype.init = function(){

    this.name = 'GeometryManager';

    this.addReq({
      'start-addnewcell' : null,
      'addnewcell' : null,
      'end-addnewcell' : null
    });

    this.addCallbackFun('start-addnewcell', this.startAddNewCell );
    this.addCallbackFun('addnewcell', this.addNewCell );
    this.addCallbackFun('end-addnewcell', this.endAddNewCell );

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

    var tmpObj = window.tmpObj;
    window.tmpObj = null;

    tmpObj.id = reqObj.id;
    tmpObj.name = reqObj.id;

    // add cell using tmpObj
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.addNewCell(tmpObj);

    // destroy tmpGroup children
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.destroyChildren();

    // set corner to invisible
    var obj = window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.cells[window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.cells.length - 1];
    obj.corners.visible(false);

    // redraw cellLayer
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.layer.draw();

    //add cell data in geometry canvasContainer
    window.storage.geometryContainer.cellGeometry.push(new CellGeometry(reqObj.id, obj.getPointsOfCorners()));

    // add state

  }


  return GeometryManager;
});
