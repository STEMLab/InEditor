
/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([
  "../PubSub/Subscriber.js"
],function(
  Subscriber
) {
  'use strict';

  function Manager(){

    Subscriber.apply(this, arguments);
    this.reqs = {};
    this.callbackFunctions = [];

  }

  Manager.prototype = Object.create(Subscriber.prototype);

  Manager.prototype.init = function(){

  }

  Manager.prototype.addCallbackFun = function(req, callback){

    this.callbackFunctions[req] = callback;

  }


  Manager.prototype.addReq = function(obj){

    this.reqs = obj;

  }


  return Manager;
});
