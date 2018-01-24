/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([], function() {
  'use strict';

  /**
  * @classdesc Subscriber for pub-sub model.
  * @class
  */
  function Subscriber(_broker){

    // thanks for brokerConnector, subscriber don't need to maintains subscribe function and broker.
    // this.broker =_broker;
    this.name;

  }

  // Subscriber.prototype.subscribe = function(_topic){
  //
  //   // Plz, make sure that `this` value refer Subscriber object.
  //   this.broker.subscribe(_topic, this);
  //
  // }

  Subscriber.prototype.run = function(_message){

    this.callbackFunctions[_message.req](_message.reqObj, window.storage);

  }


  return Subscriber;

});
