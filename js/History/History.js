/**
 * @author suheeeee<lalune1120@hotmail.com>
 */
define(function(require) {

  let singleton = (function() {

    /**
     * @class History
     */
    function History() {

      /**
       * HistoryObj [container]{@link HistoryObj}. key is time and value is HistoryObj
       * @memberof History
       */
      let _history = new (require('./Deque.js'))();


      /**
       * Key is msg and value is undoFunction
       * @memberof History
       */
      let _callbackFunctions = {};

      /**
       * @memberof History
       */
      this.addCallBackFun = function(req, fun) {
        _callbackFunctions[req] = fun;
      }

      /**
       * @memberof History
       */
      this.getPreviousMsg = function() {
        if (_history.empty()) return null;
        else if (_history.back().cycle_name != null) return _history.back().cycle_name;
        else return null;
      }


      /**
       * @memberof History
       * @param {String} msg : pubilshed msg
       * @param {Objct} obj : data which role as parameter of undo function
       * @param {Funciton} undofun
       */
      this.push = function(uuid, manager, msg, obj, undofun) {

        // log.info(msg, obj, undofun);

        let isStartOperation = this.isStartOperation(msg);
        let isOperation = this.isOperation(msg);
        let isEndOperation = this.isEndOperation(msg);

        if (isStartOperation) {

          // If the msg is start-something.
          let msgarr = msg.split("-");
          let operationHistory = new (require('./OperationHistory.js'))(msgarr[1]);
          _history.push_back(operationHistory);

        } else if (isOperation) {

          this.pushOp(uuid, manager, msg, obj, undofun);

          log.info(">>>> history : operation " + msg + " saved.");

        } else if (isEndOperation) {

          if (_history.back().uuid != uuid) _history.pop_back();

          let msgarr = msg.split("-");

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
      this.pushHistory = function(uuid, manager, msg, obj, undofun) {

        if (!_history.empty() && _history.back().uuid == uuid) {

          _history.back().push(manager, obj, undofun);

        } else {

          let historyObj = new (require('./HistoryObj.js'))(uuid, msg);
          historyObj.push(manager, obj, undofun);
          _history.push_back(historyObj);

        }

      }

      this.pushHistoryObj = function(uuid, manager, obj) {

        let historyQ = _history.to_array();
        for (let i in historyQ) {
          if (historyQ[i].uuid == uuid)
            _history.at(i).pushObj(manager, obj);
        }
      }

      /**
       * @memberof History
       */
      this.pushOp = function(uuid, manager, msg, obj, undofun) {

        if (!_history.back().opq.empty() && _history.back().opq.back().uuid == uuid) {

          // same msg, different manager
          if (!this._history.back().flag && this._history.back().opq.is_full()) this._history.back().flag = true;
          _history.back().opq.back().push(manager, obj, undoFun);

        } else {

          let historyObj = new (require('./HistoryObj.js'))(uuid, msg);
          historyObj.push(manager, obj, undofun);
          _history.back().opq.push_back(historyObj);

        }

      }


      /**
       * @memberof History
       * @deprecated
       */
      this.isMaintainable = function(msg) {

        let isMaintainable = false;

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
      this.isStartOperation = function(msg) {

        let arr = msg.split('-');

        if (require('Broker').getInstance().getReqSpecList()[msg].cycle == 'cycle' && arr.length == 2 && arr[0] == 'start') {

          return true;

        }

        return false;

      }

      /**
       * @memberof History
       * @deprecated
       */
      this.isOperation = function(msg) {

        let arr = msg.split("-");

        if (require('Broker').getInstance().getReqSpecList()[msg].cycle == 'cycle' && arr.length == 1) {

          return true;

        }

        return false;

      }

      /**
       * @memberof History
       */
      this.isEndOperation = function(msg) {

        let arr = msg.split('-');

        if (require('Broker').getInstance().getReqSpecList()[msg].cycle == 'cycle' && arr.length == 2 && arr[0] == 'end') {

          return true

        }

        return false;

      }

      /**
       * @memberof History
       */
      this.isOverflow = function(isOperation) {

        if (isOperation && (_history.back().flag || _history.back().opq.is_full())) {

          return true;

        }

        return false;

      }


      /**
       * @memberof History
       */
      this.undo = function() {

        if (_history.empty()) {
          log.info("history is empty...");
          return;
        }

        // Is the last element of history is operation history object?
        let isOpq = (_history.back().cycle_name != null);

        let undo;

        if (isOpq) {
          if (_history.back().opq.empty())
            return;
          else
            undo = _history.back().opq.pop_back();
        } else {
          undo = _history.pop_back();
        }

        for (let i in undo.undoObj) undo.undoObj[i].undoFun(undo.undoObj[i].obj);
      }

      /**
       * @memberof History
       */
      this.cancelCycle = function(cycle) {
        if (_history.empty()) {
          log.info("History is empty...");
          return;
        }
        if (_history.back().cycle_name != null) _history.pop_back();
      }
    }

    let INSTANCE;

    return {
      getInstance: function(args) {
        if (INSTANCE === undefined) {
          INSTANCE = new History(args);
        }
        return INSTANCE;
      }
    };

  })();

  return singleton;
});
