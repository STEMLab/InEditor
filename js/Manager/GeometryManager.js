/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "../Storage/Canvas/Object/Cell.js",
  "../Storage/Geometries/CellGeometry.js",
  "../PubSub/Subscriber.js",
  "../Storage/Dot/Dot.js"
],function(
  Cell,
  CellGeometry,
  Subscriber,
  Dot
) {
  'use strict';

  /**
  * @class GeometryManager
  * @augments Subscriber
  */
  function GeometryManager() {

    Subscriber.apply(this, arguments);

    this.init();
  }

  GeometryManager.prototype = Object.create(Subscriber.prototype);

  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.init = function(){

    /**
    * @memberof GeometryManager
    */
    this.name = 'GeometryManager';

    this.addCallbackFun('start-addnewcell', this.startAddNewCell, function(){}, function(){} );
    this.addCallbackFun('addnewcell', this.addNewCell, this.addNewCell_makeHistoryObj, this.addNewCell_undo );
    this.addCallbackFun('end-addnewcell', this.endAddNewCell, this.endAddNewCell_makeHistoryObj, this.endAddNewCell_undo );
    this.addCallbackFun('canceladdnewcell', this.cancelAddNewCell);

  }


  /**
   * @memberof GeometryManager
   */
  GeometryManager.prototype.startAddNewCell = function(reqobj){

    var tmpObj = new Cell('tmpObj');
    tmpObj.type = 'cell';
    window.tmpObj = tmpObj;

  }

  /**
   * @memberof GeometryManager
   * @param {Object} reqObj floor: floor id
   */
  GeometryManager.prototype.addNewCell0 = function(reqObj){

    // if tmpObj havn't floor data, add floor data in it.
    if( window.tmpObj.floor == null ){

      window.tmpObj.floor = reqObj.floor;
      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.destroyChildren();
      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.add(window.tmpObj.poly, window.tmpObj.corners);

    }

    // add corner
    var point = window.storage.canvasContainer.stages[reqObj.floor].stage.getPointerPosition();
    point.x = point.x - window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.x;
    point.x = point.x / window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleX;

    point.y = point.y - window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.y;
    point.y = point.y / window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleY;

    window.tmpObj.addCorner( point );

    // draw group
    window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.draw();

  }

  /**
   * @memberof GeometryManager
   * @param {Object} reqObj floor: floor id
   */
  GeometryManager.prototype.addNewCell = function(reqObj){

    // If this is the first `addnewcell` msg for this cycle, set TmpLayer in stage.
    if( window.storage.canvasContainer.stages[reqObj.floor].tmpLayer == null ){

      window.storage.canvasContainer.stages[reqObj.floor].addTmpObj('cell');
      window.tmpObj.floor = reqObj.floor;

    }

    // add corner
    var point = window.storage.canvasContainer.stages[reqObj.floor].stage.getPointerPosition();
    point.x = point.x - window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.x;
    point.x = point.x / window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleX;

    point.y = point.y - window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.y;
    point.y = point.y / window.storage.canvasContainer.stages[reqObj.floor].stage.attrs.scaleY;

    var newDot = new Dot(reqObj.floor, point.x, point.y);
    window.storage.dotFoolContainer.addNewDot(newDot);

    window.tmpObj.addCorner( newDot.uuid );

    // draw group
    window.storage.canvasContainer.stages[reqObj.floor].tmpLayer.group.tmpGroup.draw();

  }

  /**
   * @memberof GeometryManager
   */
   GeometryManager.prototype.addNewCell_makeHistoryObj = function(reqObj){

     return reqObj;

   }

  /**
   * @memberof GeometryManager
   */
   GeometryManager.prototype.addNewCell_undo = function(undoObj){

     window.tmpObj.deleteLastCorner();
     window.tmpObj.deleteLastPolyLine();
     window.storage.canvasContainer.stages[undoObj.floor].cellLayer.layer.draw();

   }


  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof GeometryManager
   * @desc draw new cell object in canvas
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

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof GeometryManager
   * @return cell id
   */
   GeometryManager.prototype.endAddNewCell_makeHistoryObj = function(reqObj){

     return reqObj;

   }

   /**
    * @param {Object} undoObj id<br>floor: floor id
    * @memberof GeometryManager
    * @desc Remove cell object in canvasContainer which id is undoObj.id
    */
    GeometryManager.prototype.endAddNewCell_undo = function(undoObj){

      // remove  cell in canvasContainer
      var cells = window.storage.canvasContainer.stages[undoObj.floor].cellLayer.group.cells;

      for(var key in cells){
        if(cells[key].id == undoObj.id){
          cells[key].corners.destroy();
          cells[key].poly.destroy();
          window.storage.canvasContainer.stages[undoObj.floor].cellLayer.layer.draw();
          cells.splice(key,1);
        }
      }

      // remove cell in geometryContainer
      cells = window.storage.geometryContainer.cellGeometry;
      for(var key in cells){
        if(cells[key].id == undoObj.id){
          cells.splice(key,1);
        }
      }

    }

    /**
    * @param {Object} reqObj floor
    * @memberof GeometryManager
    * @desc set tmpObj to null
    */
    GeometryManager.prototype.cancelAddNewCell = function(reqObj){

      window.tmpObj = null;
      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.group.tmpGroup.destroyChildren();
      window.storage.canvasContainer.stages[reqObj.floor].cellLayer.layer.draw();

      window.myhistory.history.pop_back();

    }


  return GeometryManager;
});
