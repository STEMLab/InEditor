/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Feature"], function(Feature) {
  'user strict';

  /**
  * @class State
  * @augments Feature
  */
  function State() {

    Feature.apply(this, arguments);

    this.type = "State";

    this.attributes = {
      'name': "",
      'description': "",
      'connected': [],
      'duality': ""
    };

    this.geometry = {
      'type': 'Point',
      'coordinates': [],
      'properties': {
        'id': ""
      }
    };

  }

  State.prototype = Object.create(Feature.prototype);

  /**
  * @memberof State
  */
  State.prototype.setConnected = function(connected){

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (!isArray(coor)) {

      log.warn("The given parameter is not an Array type.");

    } else {

      this.properties['connected'] = name;

    }

  }

  /**
  * @memberof State
  */
  State.prototype.addConnection = function(state){

    this.properties.connected.push(state);

  }

  return State;

});
