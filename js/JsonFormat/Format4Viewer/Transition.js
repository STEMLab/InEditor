/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Feature"], function(Feature) {
  'user strict';

  /**
  * @class Transition
  * @augments Feature
  */
  function Transition(){

    Feature.apply(this, arguments);

    this.type = "Transition";

    this.attributes = {
      'name': "",
      'description': "",
      'weight': "",
      'connects': [],
      'duality': ""
    };

    this.geometry = {
      'type': 'LineString',
      'coordinates': [],
      'properties': {
        'id': ""
      }
    };

  }

  Transition.prototype = Object.create(Feature.prototype);

  /**
  * @memberof Transition
  */
  Transition.prototype.setWeight = function(weight){

    if (this.properties != null &&
        (this.properties.weight != null || require('Conditions').getInstance().exportConditions[this.type].properties.weight)) {

      this.properties['weight'] = weight;

    } else {

      log.warn("The given conditions said you don't need to set name of Feature.");
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

    } else if(connects.length != 2) {

      log.warn("The given the length of parameter is now two.")

    } else{

      this.attributes['connects'] = connects;

    }
  }

  /**
  * @memberof Transition
  */
  Transition.prototype.pushCoordinatesFromDots = function(dots, transDots){

    if( transDots == undefined) {

      for( var i = 0 ; i < dots.length; i++ ){
        this.geometry.coordinates.push([dots[i].point.x, dots[i].point.y, 0]);
      }

    }
    else {

      for( var i = 0 ; i < dots.length; i++ ){
        var transDot = transDots[dots[i].uuid];
        this.geometry.coordinates.push([transDot.point.x, transDot.point.y, transDot.point.z]);
      }

    }


  }

  return Transition;

});
