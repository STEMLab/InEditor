define([],function() {
  'use strict';

  function Manager(){

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

  Manager.prototype.getReqList = function(){

    return this.reqs;

  }

  Manager.prototype.addReq = function(obj){

    this.reqs = obj;

  }


  return Manager;
});
