/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([], function() {
  'use strict';

  /**
   * @desc Subscriber for pub-sub model.
   * @exports Manager
   */
  function Subscriber() {

    // thanks for brokerConnector, subscriber don't need to maintains subscribe function and broker.
    // this.broker =_broker;
    this.name;

    /**
    *  call back function, key : req, value : function
    */
    this.callbackFunctions = [];
  }

  // Subscriber.prototype.subscribe = function(_topic){
  //
  //   // Plz, make sure that `this` value refer Subscriber object.
  //   this.broker.subscribe(_topic, this);
  //
  // }

  Subscriber.prototype.run = function(_message) {

    this.callbackFunctions[_message.req](_message.reqObj, window.storage);

  }

  Subscriber.prototype.addCallbackFun = function(req, callback){

    this.callbackFunctions[req] = callback;

  }


  return Subscriber;

});
