/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Feature"], function(Feature) {
  'user strict';

  /**
  * @class State
  * @augments Feature
  */
  function State(conditions) {

    Feature.apply(this, arguments);

    this.type = "State";
    this.geometry = {
      'type': 'Point',
      'coordinates': [],
      'properties': {
        'id': ""
      }
    };

    this.properties = {};

    if (conditions.properties.name) this.properties['name'] = "";
    if (conditions.properties.description) this.properties['description'] = "";
    if (conditions.properties.duality) this.properties['duality'] = "";
    if (conditions.properties.connected) this.properties['connected'] = [];

    if (Object.keys(this.properties).length == 0) {
      delete this.properties;
    }

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

    } else if (this.properties != null &&
        (this.properties.connected != null || window.conditions.exportConditions[this.type].properties.connected)) {

      this.properties['connected'] = name;

    } else {

      log.warn("The given conditions said you don't need to need to set connected value.");

    }

  }

  /**
  * @memberof State
  */
  State.prototype.addConnection = function(state){

    if(this.properties != null &&
       this.properties.connected == null &&
       window.conditions.exportConditions[this.type].properties.connected){

      this.properties['connected'] = [state];

    } else if(thiks.properties != null && this.this.properties.connected != null){

      this.properties.connected.push(state);

    } else {

      log.warn("The given conditions said you don't need to need to set connected value.");

    }

  }

  return State;

});
