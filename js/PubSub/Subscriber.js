
/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([], function() {
  'use strict';


  /**
  * Subscriber for pub-sub model.
  */
  function Subscriber(_broker){

    this.broker =_broker;
    this.callbackFunctions = [];

  }

  Subscriber.prototype.subscribe = function(_topic){

    // Plz, make sure that `this` value refer Subscriber object.
    this.broker.subscribe(_topic, this);

  }

  Subscriber.prototype.run = function(_message){

    this.callbackFunctions[_message.req](_message.reqObj, window.storage);

  }

  Subscriber.prototype.addCallbackFun = function(_req, _fun){

    this.callbackFunctions[_req] = _fun;

  }

  return Subscriber;

});
