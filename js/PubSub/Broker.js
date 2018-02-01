/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "./BrokerConnector.js",
  "./MessageSpec.js"
], function(
  BrokerConnector,
  MessageSpec
) {
  'use strict';

  /**
   * @desc Broker for pub-sub model. The difference from typical Broker is that this maintains message which just published before. The resason for this is descried in {@link Message}.
   * @class Broker
   */
  function Broker() {

    /**
     * @desc This table stores subscribers who are subscribing to each topic.<br>Key is `message.req` and value is a subscriber object array.
     * @memberof Broker
     */
    this.topic = [];

    /**
     * @desc Save previous runned message for controll request cycle.<br>For example, if 'start-test' runned before next message must be 'test' or 'end-test'.
     * @memberof Broker
     */
    this.previousMsg = null;

    /**
     * @memberof Broker
     */
    this.brokerConnector = new BrokerConnector(this);

    /**
     * @memberof Broker
     */
    this.reqSpecList = {};

    this.addReqs();

  }

  /**
   * @memberof Broker
   */
  Broker.prototype.subscribe = function(_topic, _obj) {

    if (this.topic == null) {
      window.broker.addTopic(window.broker.topic, _topic, _obj);
    } else {
      this.addTopic(this.topic, _topic, _obj);
    }

  }

  /**
   * @memberof Broker
   */
  Broker.prototype.addTopic = function(_path, _topic, _obj) {

    if (_path[_topic] == null) {
      _path[_topic] = new Array();
      _path[_topic].push(_obj);
    } else _path[_topic].push(_obj);

  }

  /**
   * @memberof Broker
   */
  Broker.prototype.publish = function(_message) {

    console.log(">> " + _message.req + " published");

    if (this.topic == null) {
      window.broker.publishMsg(window.broker.topic, _message);
    } else {
      this.publishMsg(this.topic, _message);
    }

  }

  /**
   * @memberof Broker
   */
  Broker.prototype.publishMsg = function(_path, _message) {

    var _topic = _message.req;
    var subscriber = _path[_topic];

    for (var i = 0; i < subscriber.length; i++) {

      _path[_topic][i].run(_message);

    }

  }

  /**
   * @memberof Broker
   */
  Broker.prototype.addReqs = function() {

    this.reqSpecList['addnewfloor'] = new MessageSpec('single', 'including', null);
    this.reqSpecList['updateproperty'] = new MessageSpec('single', 'including', null);
    this.reqSpecList['setpropertyview'] = new MessageSpec('single', 'including', null);
    this.reqSpecList['zoomworkspace'] = new MessageSpec('single', 'including', ['draw']);
    this.reqSpecList['addfloorplan'] = new MessageSpec('single', 'including', null);
    this.reqSpecList['start-addnewcell'] = new MessageSpec('cycle', 'including', ['draw']);
    this.reqSpecList['addnewcell'] = new MessageSpec('cycle', 'including', ['draw']);
    this.reqSpecList['end-addnewcell'] = new MessageSpec('cycle', 'including', ['draw']);
    this.reqSpecList['updaterefdata'] = new MessageSpec('single', 'including', null);

  }

  /**
   * Check `req` can pubilsh or not.
   * @memberof Broker
   * @return {Boolean} result
   */
  Broker.prototype.isPublishable = function(req) {

    var spec = this.reqSpecList[req];
    var previousSpec = this.reqSpecList[this.previousMsg];
    var result = false;

    if (this.previousMsg == null) {

      // If there is no message which published before, can publish any message.
      result = true;

    } else if (previousSpec.cycle == 'single') {

      // If ths cycle of previous published message is `single`, can publish any message.
      // Actually, single type cycle message didn't save in Broker.previousMsg and Broker.previousMsg setted null.
      // So, this branch shouldn't cover.
      // If you call this line in your code, check event handler that publish previousMsg.
      result = true;

    } else if (previousSpec.cycle == 'cycle' && spec.cycle == 'single') {

      // If the cycle of previous published message is `cycle` and the cycle of req is 'single',
      if (spec.including == 'including' && spec.codes.indexOf(previousSpec.codes) != -1) {

        // If the including value of req is `including` and codes of spec includes code of previousMsg, can publish req.
        result = true;

      } else if (spec.including == 'excluding' && spec.codes.indexOf(previousSpec.codes) == -1) {

        // If the including value of req is `excluding` and codes of spec not includes code of previousMsg, can publish req.
        result = true;

      }
    } else if (previousSpec.cycle == 'cycle' && spec.cycle == 'cycle') {

      // If the cycle of previous published message is `cycle` and the cycle of req is 'cycle',
      // only the message which included in same cycle can publish.
      var splitReq = req.split("-");
      var splitPreReq = this.previousMsg.split("-");

      if (splitPreReq.length == 2 && splitReq.length == 2) {

        // start-somemsg -> end-somemsg
        if (splitReq[0] == 'start' && splitPreReq[0] == 'end' && splitPreReq[1] == splitReq[1]) {

          result = true;

        }

      } else if (splitPreReq.length == 2 && splitReq.length == 1) {

        // start-somemsg -> somemsg
        if (splitPreReq[0] == 'start' && splitPreReq[1] == splitReq[0]) {

          result = true;

        }

      } else if (splitPreReq.length == 1 && splitReq.length == 1) {

        // somemsg -> somemsg
        if (splitPreReq[0] == splitReq[0]) {

          result = true;

        }

      } else if (splitPreReq.length == 1 && splitReq.length == 2) {

        // somemsg -> end-somemsg
        if (splitReq[0] == 'end' && splitPreReq[0] == splitReq[1]) {

          result = true;

        }

      }


    }

    return result;

  }


  return Broker;

});
