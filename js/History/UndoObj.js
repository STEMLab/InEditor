/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

 define([], function(){

   'use strict';

   /**
   * @class UndoObj
   */
   function UndoObj(obj, fun){

     /**
     * @desc Some messages are subscribed by several Manager, so the object required by undo function can be multiple.
     * @memberof UndoObj
     */
     this.obj = obj;

     /**
     * @desc Some messages are subscribed by several Manager, so undo function can be multiple.
     * @memberof UndoObj
     */
     this.undoFun = fun;

   }

   return UndoObj;

 });
