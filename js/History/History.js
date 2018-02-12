/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "./Deque.js",
  "./HistoryObj.js",
  "./OperationHistory.js"
], function(
  Deque,
  HistoryObj,
  OperationHistory
) {

  'use strict';

  /**
   * @class History
   */
  function History() {

    /**
     * HistoryObj [container]{@link HistoryObj}. key is time and value is HistoryObj
     * @memberof History
     */
    this.history = new Deque();

    /**
     * @memberof History
     */
    this.operationQueue = {
      cycle_name: null,
      opq: null,
      flag: false
    };


    /**
     * Key is msg and value is undoFunction
     * @memberof History
     */
    this.callbackFunctions = {};

  }

  /**
   * @memberof History
   */
  History.prototype.addCallBackFun = function(req, fun) {

    this.callbackFunctions[req] = fun;

  }

  /**
   * @memberof History
   */
   History.prototype.getPreviousMsg = function(){

     if(this.operationQueue.cycle_name != null){
       return cycle_name;
     }
     else{
       return null;
     }

   }


  /**
   * @memberof History
   * @param {String} msg : pubilshed msg
   * @param {Objct} obj : data which role as parameter of undo function
   * @param {Funciton} undofun
   */
  History.prototype.push = function(uuid, manager, msg, obj, undofun) {

    // log.info(msg, obj, undofun);

    var isStartOperation = this.isStartOperation(msg);
    var isOperation = this.isOperation(msg);
    var isEndOperation = this.isEndOperation(msg);
    var isOverflow = this.isOverflow();

    if (isStartOperation) {

      var msgarr = msg.split();

      this.operationQueue.opq = new Deque();
      this.operationQueue.cycle_name = msgarr[1];

    } else if (isOperation && isOverflow) {

      this.operationQueue.flag = true;
      this.pushOp(uuid, msg, obj, undofun);

      log.info(">>>> history : operation " + msg + " saved.");

    } else if (isOperation) {

      this.pushOp(uuid, msg, obj, undoun);

      log.info(">>>> history : operation " + msg + " saved.");

    } else if (isEndOperation) {

      this.operationQueue.opq = null;
      this.operationQueue.flas = false;

      var msgarr = msg.split();

      this.pushHistory(uuid, manager, msgarr[1], obj, undofun);

      log.info(">>>> history : " + msg + " saved.");

    } else {

      this.pushHistory(uuid, manager, msg, obj, undofun);
      log.info(">>>> history : " + msg + " saved.");

    }

  }

  /**
   * @memberof History
   */
  History.prototype.pushHistory = function(uuid, manager, msg, obj, undofun) {

    if (!this.history.empty() && this.history.back().uuid == uuid) {

      this.history.back().push(obj, undoFun);

    } else {

      var historyObj = new HistoryObj(uuid, msg);
      historyObj.push(manager, obj, undofun);
      this.history.push_back(historyObj);

    }

  }

  History.prototype.pushHistoryObj = function(uuid, manager, obj){

    var historyQ = this.history.to_array();
    for(var i in historyQ){
      if(historyQ[i].uuid == uuid)
        this.history.at(i).pushObj(manager, obj);
    }
  }

  /**
   * @memberof History
   */
  History.prototype.pushOp = function(uuid, msg, obj, undofun) {

    if( !this.operationQueue.opq.empty() && this.operationQueue.opq.back().uuid == uuid){
      this.operationQueue.opq.back().push(obj, undoFun);
    } else {
      var historyObj = new HistoryObj(uuid, msg);
      historyObj.push(obj, undofun);
      this.operationQueue.opq.push_back(historyObj);
    }

  }


  /**
   * @memberof History
   * @deprecated
   */
  History.prototype.isMaintainable = function(msg) {

    var isMaintainable = false;

    if (this.maintainMsg.length > this.ignoreMsg.length) {
      if (this.ignoreMsg.indexOf(msg) == -1) {

        // check whether save or not using ignoreMsg[]
        isMaintainable = true;

      }
    } else {
      if (this.maintainMsg.indexOf(msg) != -1) {

        // check whether save or not using maintainMsg[]
        isMaintainable = true;

      }
    }

    return isMaintainable;

  }

  /**
   * @memberof History
   */
  History.prototype.isStartOperation = function(msg) {

    var arr = msg.split(msg);

    if (window.broker.reqSpecList[msg].cycle == 'cycle' && arr.length == 2 && arr[1] == 'start') {

      return true;

    }

    return false;

  }

  /**
   * @memberof History
   */
  History.prototype.isOperation = function(msg) {

    var arr = msg.split(msg);

    if (window.broker.reqSpecList[msg].cycle == 'cycle' && arr.length == 1) {

      return true

    }

    return false;

  }

  /**
   * @memberof History
   */
  History.prototype.isEndOperation = function(msg) {

    var arr = msg.split(msg);

    if (window.broker.reqSpecList[msg].cycle == 'cycle' && arr.length == 2 && arr[1] == 'end') {

      return true

    }

    return false;

  }

  /**
   * @memberof History
   */
  History.prototype.isOverflow = function(isOperation) {

    if (isOperation && operationQueue.opq.is_full()) {

      return true;

    }

    return false;

  }


  /**
   * @memberof History
   */
  History.prototype.undo = function() {

    var undo = this.history.pop_back();

    for (var i in undo.undoObj) {

      undo.undoObj[i].undoFun(undo.undoObj[i].obj);

    }

    log.trace(this);

  }



  return History;

});
