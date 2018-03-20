/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Feature"], function(Feature) {
  'user strict';

  /**
  * @class Transition
  * @augments Feature
  */
  function Transition(conditions) {

    Feature.apply(this, arguments);

    this.type = "Transition";
    this.geometry = {
      'type': 'LineString',
      'coordinates': [],
      'properties': {
        'id': ""
      }
    };
    this.properties = {
      'connects': ["", ""]
    };

    if (conditions.properties.name) this.properties['name'] = "";
    if (conditions.properties.description) this.properties['description'] = "";
    if (conditions.properties.duality) this.properties['duality'] = "";
    if (conditions.properties.weight) this.properties['weight'] = "";

    if (Object.keys(this.properties).length == 0) {
      delete this.properties;
    }

  }

  Transition.prototype = Object.create(Feature.prototype);

  /**
  * @memberof Transition
  */
  Transition.prototype.setWeight = function(weight){

    if (this.properties != null &&
        (this.properties.weight != null || window.conditions.exportConditions[this.type].properties.weight)) {

      this.properties['weight'] = weight;

    } else {

      log.warn("The given conditions said you don 't need to need to set name of Feature.");
    }

  }

  /**
  * @memberof Transition
  */
  Transition.prototype.setConnects = function(connects){

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if(!isArray(connects)){

      log.warn("The given parameter is not an Array type.");

    } else if(connects.lenght != 2) {

      log.warn("The given the length of parameter is now two.")

    } else{

      this.properties['connects'] = connects;

    }
  }

  return Transition;

});
