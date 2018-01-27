/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([
  "./BrokerConnector.js"
], function(
  BrokerConnector
) {
  'use strict';

  /**
  * @desc Broker for pub-sub model. The difference from typical Broker is that this maintains message which just published before. The resason for this is descried in {@link Message}.
  * @exports Broker
  */
  function Broker(){

    /**
    * @desc This table stores subscribers who are subscribing to each topic.<br>Key is `message.req` and value is a subscriber object array.
    */
    this.topic = [];

    /**
     * @desc Save previous runned message for controll request cycle.<br>For example, if 'start-test' runned before next message must be 'test' or 'end-test'.
     */
    this.previousMsg = null;

    this.brokerConnector = new BrokerConnector(this);

  }

  Broker.prototype.subscribe = function(_topic, _obj){

    if( this.topic == null){
      window.broker.addTopic(window.broker.topic, _topic, _obj);
    }
    else{
      this.addTopic(this.topic, _topic, _obj);
    }

  }

  Broker.prototype.addTopic = function(_path, _topic, _obj){

    if( _path[_topic] == null ){
      _path[_topic] = new Array();
      _path[_topic].push(_obj);
    }
    else _path[_topic].push(_obj);

  }

  Broker.prototype.publish = function(_message){

    console.log( ">> " + _message.req + " published" );

    if( this.topic == null ){
      window.broker.publishMsg(window.broker.topic, _message);
    }
    else{
      this.publishMsg(this.topic, _message);
    }

  }

  Broker.prototype.publishMsg = function(_path, _message){

    var _topic = _message.req;
    var subscriber = _path[_topic];

    for(var i = 0 ; i < subscriber.length; i++){

      _path[_topic][i].run(_message);

    }

  }


  return Broker;

});
