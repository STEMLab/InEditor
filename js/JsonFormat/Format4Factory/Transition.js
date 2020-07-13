/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Feature", "js/Storage/Dot/DotMath.js"], function(Feature, DotMath) {
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
  Transition.prototype.setWeight = function(weight) {

    if (this.properties != null &&
      (this.properties.weight != null || require('Conditions').getInstance().exportConditions[this.type].properties.weight)) {

      this.properties['weight'] = weight;

    } else {

      log.warn("The given conditions said you don 't need to need to set name of Feature.");
    }

  }

  /**
   * @memberof Transition
   */
  Transition.prototype.setConnects = function(connects) {

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (!isArray(connects)) {

      log.warn("The given parameter is not an Array type.");

    } else if (connects.length != 2) {

      log.warn("The given the length of parameter is now two.")

    } else {

      this.properties['connects'] = connects;

    }
  }

  /**
   * @memberof Transition
   */
  Transition.prototype.setCoordinates = function(connects) {

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (!isArray(connects)) {

      log.warn("The given parameter is not an Array type.");

    } else if (connects.lenght != 2) {

      log.warn("The given the length of parameter is now two.")

    } else {

      this.properties['connects'] = connects;

    }
  }

  /**
   * @memberof Transition
   */
  Transition.prototype.getCoordinates = function() {
    return this.geometry.coordinates;
  }

  /**
   * @memberof Transition
   */
  Transition.prototype.setWKT = function(coor) {
    if (coor == undefined) this.geometry.coordinates = this.getWKT(this.geometry.coordinates);
    else this.geometry.coordinates = this.getWKT(coor);

    this.geometry.properties.type = 'wkt';
  }

  /**
   * @memberof Transition
   */
  Transition.prototype.getWKT = function(coor) {
    var result = 'LINESTRING (';

    for (var i = 0; i < coor.length; i++) {
      result += coor[i][0] + ' ' + coor[i][1] + ' ' + coor[i][2];
      if (i != coor.length - 1) result += ', ';
    }

    result += ')';

    return result;
  }

  /**
   * @memberof Transition
   */
  Transition.prototype.pushCoordinatesFromDots = function(dots, transDots) {

    if (transDots == undefined) {

      for (var i = 0; i < dots.length; i++) {
        this.geometry.coordinates.push([dots[i].point.x, dots[i].point.y, 0]);
      }

    } else {

      for (var i = 0; i < dots.length; i++) {
        var transDot = transDots[dots[i].uuid];
        this.geometry.coordinates.push([transDot.point.x, transDot.point.y, transDot.point.z]);
      }

    }


  }

  /**
   * @memberof Transition
   */
  Transition.prototype.updateCoordinates = function(index, position, value) {

    if (position == 'x') {

      this.geometry.coordinates[index][0] = value;

    } else if (position == 'y') {

      this.geometry.coordinates[index][1] = value;

    } else if (position == 'z') {

      this.geometry.coordinates[index][2] = value;

    }

  }

  Transition.prototype.copy = function(obj) {

    if (this.properties.name != null) this.properties.name = obj.properties.name;
    if (this.properties.description != null) this.properties.description = obj.properties.description;
    if (this.properties.duality != null) this.properties.duality = obj.properties.duality;
    if (this.properties.weight != null) this.properties.weight = obj.properties.weight;
    this.properties.connects[0] = obj.properties.connects[1];
    this.properties.connects[1] = obj.properties.connects[0];

    this.docId = obj.docId;
    this.parentId = obj.parentId;
    this.id = obj.id;
    this.copyCoordinates(obj.geometry.coordinates);
    this.geometry.properties.id = obj.geometry.properties.id;
    this.geometry.properties.height = obj.geometry.properties.height;


  }

  /**
   * @memberof Fromat4Factory.Transition
   */
  Transition.prototype.copyCoordinates = function(coordinates) {

    for (var i = 0; i < coordinates.length; i++) {
      this.geometry.coordinates.push(JSON.parse(JSON.stringify(coordinates[i])));
    }

  }

  /**
   * @memberof Fromat4Factory.CellSpaceBoundary
   */
  Transition.prototype.reverseCoor = function() {

    var len = this.geometry.coordinates.length;

    for (var i = 0; i < len / 2; i++) {
      var tmp = this.geometry.coordinates[len - 1 - i];
      this.geometry.coordinates[len - 1 - i] = this.geometry.coordinates[i];
      this.geometry.coordinates[i] = tmp;
    }

  }

  Transition.prototype.reverseDuality = function() {
    if (this.properties.duality != "" && this.properties.duality != undefined && this.properties.duality != null) {
      //var word = this.properties.duality.split("-");
      if (this.properties.duality.indexOf('-REVERSE') === -1) this.properties.duality = this.properties.duality + '-REVERSE'
      else this.properties.duality = this.properties.duality.substring(0, this.properties.duality.indexOf('-REVERSE'))  ;
    }
  }


  /**
   * @memberof CellSpaceBoundary
   */
  Transition.prototype.setDuality = function(duality) {

    if (this.properties != null &&
      (this.properties.duality != null || require('Conditions').getInstance().exportConditions[this.type].properties.duality)) {

      if (duality == null || duality == "") delete this.properties['duality'];
      else {

        var boundaryGeo = require('Storage').getInstance().getGeometryContainer().getElementById('cellBoundary', duality);
        var startPoint = boundaryGeo.points[0];
        var endPoint = boundaryGeo.points[1];

        var result = DotMath.crossProduct(
          DotMath.getVector({
            'point': {
              x: startPoint.point.x,
              y: startPoint.point.y,
              z: 0
            }
          }, {
            'point': {
              x: endPoint.point.x,
              y: endPoint.point.y,
              z: 0
            }
          }),
          DotMath.getVector({
            'point': {
              x: this.geometry.coordinates[0][0],
              y: this.geometry.coordinates[0][1],
              z: 0
            }
          }, {
            'point': {
              x: this.geometry.coordinates[1][0],
              y: this.geometry.coordinates[1][1],
              z: 0
            }
          })
        );

        if (result.z > 0) this.properties['duality'] = duality;
        else this.properties['duality'] = duality + '-REVERSE';
      }

    } else {

      log.warn("The given conditions said you don 't need to need to set duality of Feature.");
    }

  }

  return Transition;

});
