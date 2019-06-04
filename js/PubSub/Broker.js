/**
 * @author suheeeee<lalune1120@hotmail.com>
 */
define(function(require) {

  let singleton = (function() {

    /**
     * @class Broker
     */
    function Broker() {

      /**
       * @desc This table stores subscribers who are subscribing to each topic.<br>Key is `message.req` and value is a subscriber object array.
       * @memberof Broker
       */
      let _topic = [];

      /**
       * @memberof Broker
       */
      let _brokerConnector;

      /**
       * @memberof Broker
       */
      let _reqSpecList = {};

      this.init = function(){
        _brokerConnector = new (require('./BrokerConnector.js'))(this);
        this.addReqs();
      }

      this.getTopic = function(){
        return _topic;
      }

      this.getBrokerConnector = function(){
        return _brokerConnector;
      }

      this.getReqSpecList = function(){
        return _reqSpecList;
      }

      /**
       * @memberof Broker
       */
      this.subscribe = function(targetTopic, obj) {
        this.addTopic(_topic, targetTopic, obj);
      }

      /**
       * @memberof Broker
       */
      this.addTopic = function(path, targetTopic, obj) {

        if (path[targetTopic] == null) {
          path[targetTopic] = new Array();
          path[targetTopic].push(obj);
        } else path[targetTopic].push(obj);

      }

      /**
       * @memberof Broker
       */
      this.publish = function(message) {
        this.publishMsg(_topic, message);
      }

      /**
       * @memberof Broker
       */
      this.publishMsg = function(path, message) {

        var _topic = message.req;
        var subscriber = path[_topic];
        var uuid = require('Conditions').getInstance().guid();

        for (var i = 0; i < subscriber.length; i++) {
          if(path[_topic][i].run(message, uuid) == false){
            if( require('History').getInstance().history.back() != undefined &&
                require('History').getInstance().history.back().msg == message ){
              require('History').getInstance().undo();
            }

            break;
          }
        }
      }

      /**
       * @memberof Broker
       */
      this.addReqs = function() {

        _reqSpecList['addnewfloor'] = require('./MessageSpec.js')('single', 'including', null, true);
        _reqSpecList['updateproperty'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['setpropertyview'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['zoomworkspace'] = require('./MessageSpec.js')('single', 'including', ['draw', 'modify'], false);
        _reqSpecList['addfloorplan'] = require('./MessageSpec.js')('single', 'including', null, true);

        _reqSpecList['start-addnewcell'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['addnewcell'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['end-addnewcell'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);

        _reqSpecList['start-addnewhole'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['addnewhole'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['end-addnewhole'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);

        _reqSpecList['updaterefdata'] = require('./MessageSpec.js')('single', 'including', null,false);
        _reqSpecList['activateworkspace'] = require('./MessageSpec.js')('single', 'excluding', ['draw'], false);

        _reqSpecList['cancel-addnewcell'] = require('./MessageSpec.js')('single', 'including', ['draw'], false);
        _reqSpecList['cancel-addnewcellboundary'] = require('./MessageSpec.js')('single', 'including', ['draw'], false);
        _reqSpecList['cancel-addnewstate'] = require('./MessageSpec.js')('single', 'including', ['draw'], false);
        _reqSpecList['cancel-addnewtransition'] = require('./MessageSpec.js')('single', 'including', ['draw'], false);
        _reqSpecList['cancel-addnewhole'] = require('./MessageSpec.js')('single', 'including', ['draw'], false);

        _reqSpecList['start-addnewcellboundary'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['addnewcellboundary'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['end-addnewcellboundary'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);

        _reqSpecList['start-addnewstate'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['addnewstate'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['end-addnewstate'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);

        _reqSpecList['start-addnewtransition'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['addnewtransition'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['end-addnewtransition'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);

        _reqSpecList['start-addnewstair'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['addnewstair'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['end-addnewstair'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);

        _reqSpecList['start-addnewslantdown'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['addnewslantdown'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['end-addnewslantdown'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);

        _reqSpecList['start-addnewslantup'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['addnewslantup'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['end-addnewslantup'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);

        _reqSpecList['start-addnewslantupdown'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['addnewslantupdown'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['end-addnewslantupdown'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);

        _reqSpecList['start-addnewinterlayerconnetction'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['addnewinterlayerconnetction'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);
        _reqSpecList['end-addnewinterlayerconnetction'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], true);

        _reqSpecList['exporttoviewer'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['exporttofactory'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['showfactoryexportmodal'] = require('./MessageSpec.js')('single', 'including', null, false);

        _reqSpecList['snapping'] = require('./MessageSpec.js')('single', 'including', ['draw'], false);
        _reqSpecList['movetooltip'] = require('./MessageSpec.js')('single', 'including', ['draw'], false);

        _reqSpecList['saveproject'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['loadproject'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['importfile'] = require('./MessageSpec.js')('single', 'including', null, false);

        _reqSpecList['modifyline'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['start-modifypoint'] = require('./MessageSpec.js')('cycle', 'including', ['modify'], false);
        _reqSpecList['modifypoint'] = require('./MessageSpec.js')('cycle', 'including', ['modify'], false);
        _reqSpecList['end-modifypoint'] = require('./MessageSpec.js')('cycle', 'including', ['modify'], false);

        _reqSpecList['deletecell'] = require('./MessageSpec.js')('single', 'including', null, true);
        _reqSpecList['deletecellboundary'] = require('./MessageSpec.js')('single', 'including', null, true);
        _reqSpecList['deletetransition'] = require('./MessageSpec.js')('single', 'including', null, true);
        _reqSpecList['deletestate'] = require('./MessageSpec.js')('single', 'including', null, true);
        _reqSpecList['deletefloor'] = require('./MessageSpec.js')('single', 'including', null, true);

        _reqSpecList['makecellselectmenu'] = require('./MessageSpec.js')('single', 'including', ['draw'], false);

        _reqSpecList['rotateslant'] = require('./MessageSpec.js')('single', 'including', null, false);

        _reqSpecList['copyfloor'] = require('./MessageSpec.js')('single', 'including', null, false);

        _reqSpecList['updatedesclist'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['adddesclist'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['deletedesclist'] = require('./MessageSpec.js')('single', 'including', null, false);

        _reqSpecList['importgml'] = require('./MessageSpec.js')('single', 'including', null, false);

        _reqSpecList['showconditionmodal'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['updateconditions'] = require('./MessageSpec.js')('single', 'including', null, false);

        _reqSpecList['addnewglobaldesc'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['addlocaldesc'] = require('./MessageSpec.js')('single', 'inclunding', null, false);
        _reqSpecList['deletelocaldesc'] = require('./MessageSpec.js')('single', 'inclunding', null, false);

        // _reqSpecList['addcellsfromgml'] = require('./MessageSpec.js')('single', 'including', null, false);
        // _reqSpecList['addcellboundariesfromgml'] = require('./MessageSpec.js')('single', 'inclunding', null, false);
        _reqSpecList['addobjectfromgml'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['addproeprtydatafromgml'] = require('./MessageSpec.js')('single', 'including', null ,false);
        _reqSpecList['shownaviattr'] = require('./MessageSpec.js')('single', 'including', null, false);

        _reqSpecList['showcodemodal'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['shownaviattr'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['showextensionattr'] = require('./MessageSpec.js')('single', 'including', null, false);

        _reqSpecList['addnewcode'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['uploadcodefile'] = require('./MessageSpec.js')('single', 'including', null, false);
        _reqSpecList['deletecode'] = require('./MessageSpec.js')('single', 'including', null, false);

        _reqSpecList['addmap'] = require('./MessageSpec.js')('single', 'including', null ,false);
        _reqSpecList['getmapcoor'] = require('./MessageSpec.js')('single', 'including', null, false);

        _reqSpecList['start-addnewhatch'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], false);
        _reqSpecList['addnewhatch'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], false);
        _reqSpecList['end-addnewhatch'] = require('./MessageSpec.js')('cycle', 'including', ['draw'], false);

        _reqSpecList['removefloorplan'] = require('./MessageSpec.js')('single', 'including', null, false);
      }

      /**
       * Check `req` can pubilsh or not.
       * @memberof Broker
       * @return {Boolean} result
       */
      this.isPublishable = function(req) {

        var previousMsg = require('History').getInstance().getPreviousMsg();

        var spec = _reqSpecList[req];
        var previousSpec = _reqSpecList[previousMsg];
        var result = false;

        if (_reqSpecList[req] == null) {

          log.warn("no math reqSpecList with " + req);
          result = false;

        } else if (previousSpec != null && previousSpec.cycle == 'single') {

          // If ths cycle of previous published message is `single`, can publish any message.
          // Actually, single type cycle message didn't save in Broker.previousMsg and Broker.previousMsg setted null.
          // So, this branch shouldn't cover.
          // If you call this line in your code, check event handler that publish previousMsg.
          result = true;

        } else if (spec.cycle == 'single') {

          if (previousMsg == null) {

            // If there is no message which published before, can publish any message.
            result = true;

          } else if (previousSpec.cycle == 'cycle') {

            // If the cycle of previous published message is `cycle` and the cycle of req is 'single',
            if (spec.including == 'including' && spec.codes != null && spec.codes.indexOf(previousSpec.codes[0]) != -1) {

              // If the including value of req is `including` and codes of spec includes code of previousMsg, can publish req.
              result = true;

            } else if (spec.including == 'excluding' && spec.codes.indexOf(previousSpec.codes[0]) == -1) {

              // If the including value of req is `excluding` and codes of spec not includes code of previousMsg, can publish req.
              result = true;

            }
          } else {

            // cancel-smt
            var splitPreReq = previousMsg.split("-");
            if(splitPreReq[0] == 'cancel') result = true;

          }

        } else if (spec.cycle == 'cycle') {

          // If the cycle of previous published message is `cycle` and the cycle of req is 'cycle',
          // only the message which included in same cycle can publish.
          var splitReq = req.split("-");
          var splitPreReq = null;

          if(previousMsg != null) splitPreReq = previousMsg.split("-");

          if (previousMsg == null && splitReq[0] == 'start') {

            result = true;

          } else if (previousMsg != null && previousSpec.cycle == 'cycle') {

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
              if (splitReq[0] == 'end' && splitPreReq[0] == splitReq[1] ) {

                result = true;

              }

            }

          }

        }

        return result;

      }

      /**
      * @memberof Broker
      */
      this.getManager = function(msg, managerName){
        var managers = _topic[msg];

        for(var key in managers){
          if(managers[key].name == managerName)
            return managers[key];
        }

        return null;
      }

    }



    let INSTANCE;

    return {
      getInstance: function(args) {
        if (INSTANCE === undefined) {
          INSTANCE = new Broker(args);
          INSTANCE.init();
        }
        return INSTANCE;
      }
    };

  })();

  return singleton;
});
