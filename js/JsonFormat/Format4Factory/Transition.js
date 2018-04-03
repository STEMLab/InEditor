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
        'id': "",
        'type': 'geojson'
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

    } else if(connects.length != 2) {

      log.warn("The given the length of parameter is now two.")

    } else{

      this.properties['connects'] = connects;

    }
  }

  /**
  * @memberof Transition
  */
  Transition.prototype.setCoordinates = function(connects){

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

  /**
  * @memberof Transition
  */
  Transition.prototype.getCoordinates = function(){
    return this.geometry.coordinates;
  }

  /**
  * @memberof Transition
  */
  Transition.prototype.setWKT = function(coor){
    if(coor == undefined) this.geometry.coordinates = this.getWKT(this.geometry.coordinates);
    else this.geometry.coordinates = this.getWKT(coor);

    this.geometry.properties.type = 'wkt';
  }

  /**
  * @memberof Transition
  */
  Transition.prototype.getWKT = function(coor){
    var result = 'LINESTRING (';

    for(var i = 0 ; i < coor.length; i++){
      result += coor[i][0] + ' ' + coor[i][1] + ' ' + coor[i][2];
      if(i != coor.length - 1 ) result += ', ';
    }

    result += ')';

    return result;
  }

  /**
  * @memberof Transition
  */
  Transition.prototype.pushCoordinatesFromDots = function(dots){

    for( var i = 0 ; i < dots.length; i++ ){
      this.geometry.coordinates.push([dots[i].point.x, dots[i].point.y, 0]);
    }

  }

  /**
   * @memberof Transition
   */
  Transition.prototype.updateCoordinates = function(index, position, value){

    if (position == 'x') {

      this.geometry.coordinates[index][0] = value;

    } else if (position == 'y') {

      this.geometry.coordinates[index][1] = value;

    } else if (position == 'z') {

      this.geometry.coordinates[index][2] = value;

    }

  }

  return Transition;

});
