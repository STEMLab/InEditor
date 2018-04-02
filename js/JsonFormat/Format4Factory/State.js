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
        'id': "",
        'type' : 'geojson'
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
  State.prototype.setConnects = function(connects){

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (!isArray(connects)) {

      log.warn("The given parameter is not an Array type.");

    } else if (this.properties != null &&
        (this.properties.connects != null || window.conditions.exportConditions[this.type].properties.connects)) {

      this.properties['connects'] = connects;

    } else {

      log.warn("The given conditions said you don't need to need to set connects value.");

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

  /**
  * @memberof State
  */
  State.prototype.getCoordinate = function(state){

    return this.geometry.coordinates[0];

  }

  /**
   * @memberof State
   */
  State.prototype.pushCoordinatesFromDots = function(dot) {

    this.geometry.coordinates.push([dot.point.x, dot.point.y, 0]);

  }

  /**
  * @memberof State
  */
  State.prototype.setWKT = function(coor){

    if(coor == undefined ) this.geometry.coordinates = this.makeWKT(this.geometry.coordinates);
    else this.geometry.coordinates = this.makeWKT(coor);

    this.geometry.properties.type = 'wkt';

  }

  /**
  * @memberof State
  * @param {Array} coor GeoJson form coordinates
  */
  State.prototype.makeWKT = function(coor){

    return "POINT ("+coor[0][0]+" "+coor[0][1]+" "+coor[0][2]+")";

  }

  /**
   * @memberof CellSpace
   */
  State.prototype.updateCoordinates = function(position, value){

    if (position == 'x') {

      this.geometry.coordinates[0][0] = value;

    } else if (position == 'y') {

      this.geometry.coordinates[0][1] = value;

    } else if (position == 'z') {

      this.geometry.coordinates[0][2] = value;

    }

  }


  return State;

});
