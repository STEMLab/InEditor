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

    if (!isArray(connected)) {

      log.warn("The given parameter is not an Array type.");

    } else {

      this.attributes['connected'] = connected;

    }

  }

  /**
  * @memberof State
  */
  State.prototype.addConnection = function(state){

    this.properties.connected.push(state);

  }

  State.prototype.pushCoordinatesFromDots = function(dot) {

    if(dot.point.x != undefined) this.geometry.coordinates.push([dot.point.x, dot.point.y, dot.point.z]);
    else this.geometry.coordinates.push([dot.point.x, dot.point.y, 0]);


  }

  return State;

});
