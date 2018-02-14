/**
* @author suheeeee<lalune1120@hotmail.com>
*/

 define(["./UndoObj.js"], function(UndoObj){

   'use strict';

   /**
   * @class HistoryObj
   */
   function HistoryObj(_uuid, _msg){

     this.uuid = _uuid;

     /**
     * @memberof HistoryObj
     */
     this.msg = _msg;

     /**
     * @memberof UndoObj
     */
     this.undoObj = {};

   }

   /**
   * @memberof HistoryObj
   */
   HistoryObj.prototype.push = function(manager, obj, fun){

     this.undoObj[manager] = new UndoObj(obj, fun);

   }

   HistoryObj.prototype.pushObj = function(manager, obj){

     this.undoObj[manager].obj = obj;
     console.info(window.myhistory);

   }

   /**
   * @memberof HistoryObj
   */
   History.prototype.undo = function(){

     for(var i in this.undoObj){

       this.undoObj[i].undoFun(this.undoObj[i].obj);

     }
   }

   return HistoryObj;

 });
