/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "./RequestFunctions.js"
], function(
  RequestFunctions
) {
  'use strict';

  /**
   * @desc Subscriber for pub-sub model.
   * @class Subscriber
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

  Subscriber.prototype.run = function(_message, uuid) {

    this.callbackFunctions[_message.req].run(_message.reqObj, window.storage);

    if( this.callbackFunctions[_message.req].undo != undefined ){

      window.myhistory.push(
        uuid,
        this.name,
        _message.req, this.callbackFunctions[_message.req].createHistoryObjData(_message.reqObj, uuid, this.name),
        this.callbackFunctions[_message.req].undo
      );

    }

  }

  Subscriber.prototype.addCallbackFun = function(req, publish, createHistoryObjData, undo){

    // this.callbackFunctions[req] = callback;
    this.callbackFunctions[req] = new RequestFunctions(publish, createHistoryObjData, undo);

  }


  return Subscriber;

});
