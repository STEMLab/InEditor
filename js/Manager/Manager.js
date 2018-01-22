
/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([],function() {
  'use strict';

  /**
  * @deprecated
  */
  function Manager(){

    this.name;
    this.reqs = {};
    this.callbackFunctions = [];

  }

  Manager.prototype.init = function(){

  }

  Manager.prototype.run = function(message, storage){

    var req = message.request;
    var reqObj = message.requestObj;

    this.callbackFunctions[req](reqObj, storage);
  }

  Manager.prototype.addCallbackFun = function(req, callback){

    this.callbackFunctions[req] = callback;

  }


  Manager.prototype.addReq = function(obj){

    this.reqs = obj;

  }


  return Manager;
});
