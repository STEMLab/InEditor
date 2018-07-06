/**
* @author suheeeee<lalune1120@hotmail.com>
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
     * @deprecated
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
  History.prototype.getPreviousMsg = function() {

    if(this.history.empty()){
      return null;
    } else if(this.history.back().cycle_name != null){
      return this.history.back().cycle_name;
    } else {
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

    if (isStartOperation) {

      // If the msg is start-something.
      var msgarr = msg.split("-");
      var operationHistory = new OperationHistory(msgarr[1]);
      this.history.push_back(operationHistory);

    } else if (isOperation) {

      this.pushOp(uuid, manager, msg, obj, undofun);

      log.info(">>>> history : operation " + msg + " saved.");

    } else if (isEndOperation) {

      if(this.history.back().uuid != uuid) this.history.pop_back();

      var msgarr = msg.split("-");

      this.pushHistory(uuid, manager, msgarr[1], obj, undofun);

      log.info(">>>> history : " + msg + " saved.");

    } else {

      this.pushHistory(uuid, manager, msg, obj, undofun);
      log.info(">>>> history : " + msg + " saved.");

    }

    // log.trace(this.history);

  }

  /**
   * @memberof History
   */
  History.prototype.pushHistory = function(uuid, manager, msg, obj, undofun) {

    if (!this.history.empty() && this.history.back().uuid == uuid) {

      this.history.back().push(manager, obj, undofun);

    } else {

      var historyObj = new HistoryObj(uuid, msg);
      historyObj.push(manager, obj, undofun);
      this.history.push_back(historyObj);

    }

  }

  History.prototype.pushHistoryObj = function(uuid, manager, obj) {

    var historyQ = this.history.to_array();
    for (var i in historyQ) {
      if (historyQ[i].uuid == uuid)
        this.history.at(i).pushObj(manager, obj);
    }
  }

  /**
   * @memberof History
   */
  History.prototype.pushOp = function(uuid, manager, msg, obj, undofun) {

    if (!this.history.back().opq.empty() && this.history.back().opq.back().uuid == uuid) {

      // same msg, different manager
      if( !this.this.history.back().flag && this.this.history.back().opq.is_full()) this.this.history.back().flag = true;
      this.history.back().opq.back().push(manager, obj, undoFun);

    } else {

      var historyObj = new HistoryObj(uuid, msg);
      historyObj.push(manager, obj, undofun);
      this.history.back().opq.push_back(historyObj);

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

    var arr = msg.split('-');

    if (window.broker.reqSpecList[msg].cycle == 'cycle' && arr.length == 2 && arr[0] == 'start') {

      return true;

    }

    return false;

  }

  /**
   * @memberof History
   * @deprecated
   */
  History.prototype.isOperation = function(msg) {

    var arr = msg.split("-");

    if (window.broker.reqSpecList[msg].cycle == 'cycle' && arr.length == 1) {

      return true;

    }

    return false;

  }

  /**
   * @memberof History
   */
  History.prototype.isEndOperation = function(msg) {

    var arr = msg.split('-');

    if (window.broker.reqSpecList[msg].cycle == 'cycle' && arr.length == 2 && arr[0] == 'end') {

      return true

    }

    return false;

  }

  /**
   * @memberof History
   */
  History.prototype.isOverflow = function(isOperation) {

    if (isOperation && ( this.history.back().flag || this.history.back().opq.is_full())) {

      return true;

    }

    return false;

  }


  /**
   * @memberof History
   */
  History.prototype.undo = function() {

    if( this.history.empty() ) {
      log.info("history is empty...");
      return;
    }

    // Is the last element of history is operation history object?
    var isOpq = (this.history.back().cycle_name != null);

    var undo;

    if (isOpq) {
      if (this.history.back().opq.empty())
        return;
      else
        undo = this.history.back().opq.pop_back();
    } else {
      undo = this.history.pop_back();
    }

    for (var i in undo.undoObj) {

      undo.undoObj[i].undoFun(undo.undoObj[i].obj);

    }

  }

  /**
   * @memberof History
   */
  History.prototype.cancelCycle = function(cycle) {

    if( this.history.empty() ) {
      log.info("History is empty...");
      return;
    }

    if ( this.history.back().cycle_name != null ) this.history.pop_back();

  }





  return History;

});
