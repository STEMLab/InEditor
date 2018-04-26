/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Feature"], function(Feature) {
  'user strict';

  /**
   * @class CellSpaceBoundary
   * @augments Feature
   */
  function CellSpaceBoundary(conditions) {

    Feature.apply(this, arguments);

    this.type = "CellSpaceBoundary";
    this.geometry = {
      'type': 'LineString',
      'coordinates': [],
      'properties': {
        'id': "",
        'height': "",
        'type': 'geojson'
      }
    };

    this.properties = {};

    if (conditions.geometry.extrude) this.geometry.properties.extrude = "true";
    else this.geometry.properties.extrude = "false";

    if (conditions.properties.name) this.properties['name'] = "";
    if (conditions.properties.description) this.properties['description'] = "";
    if (conditions.properties.externalReference) this.properties['externalReference'] = [];
    if (conditions.properties.duality) this.properties['duality'] = "";

    if (Object.keys(this.properties).length == 0) {
      delete this.properties;
    }

  }

  CellSpaceBoundary.prototype = Object.create(Feature.prototype);

  CellSpaceBoundary.prototype.setWKT = function(coor) {

    var wkt = "POLYGON ((";

    for (var i = 0; i < coor.length; i++) {

      wkt += coor[i][0];
      wkt += " ";
      wkt += coor[i][1];
      wkt += " ";
      wkt += coor[i][2];

      if (i != coor.length - 1) wkt += ", ";

    }

    wkt += "))";

    this.geometry.type = 'Surface';
    this.geometry.coordinates = wkt;
    this.geometry.properties.type = "wkt";
    this.geometry.properties.extrude = 'false';

  }

  /**
   * @memberof CellSpaceBoundary
   *
   */
  CellSpaceBoundary.prototype.setExternalReference = function(externalReference) {

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (this.properties == null || this.properties.externalReference == null) {

      log.warn("The given conditions said you don't need to need to set externalReference.");

    } else {

      if (!isArray(externalReference)) {

        log.warn("The given parameter is not an Array type.");

      } else {

        this.properties.externalReference = externalReference;

      }

    }

  }

  /**
   * @memberof CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.pushCoordinatesFromDots = function(dots, transDots) {

    if (transDots == undefined) {

      var len = dots.length;

      for (var i = 0; i < len; i++) {

        this.geometry.coordinates.push([dots[i].point.x, dots[i].point.y, 0]);

      }

    }
    else {

      var len = dots.length;

      for (var i = 0; i < len; i++) {

        var transDot = transDots[dots[i].uuid];
        this.geometry.coordinates.push([transDot.point.x, transDot.point.y, transDot.point.z]);

      }

    }

  }

  /**
   * @memberof CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.updateCoordinates = function(index, position, value) {

    if (position == 'x') {

      this.geometry.coordinates[index][0] = value;

    } else if (position == 'y') {

      this.geometry.coordinates[index][1] = value;

    } else if (position == 'z') {

      this.geometry.coordinates[index][2] = value;

    }

  }

  /**
   * @memberof CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.setHeight = function(height) {

    this.geometry.properties.height = height;

  }

  /**
   * @memberof CellSpaceBoundary
   * @return coordinates array
   */
  CellSpaceBoundary.prototype.getCoordinates = function() {

    return this.geometry.coordinates;

  }

  /**
   * @memberof CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.reverseCoor = function() {

    var len = this.geometry.coordinates.length;

    for (var i = 0; i < len / 2; i++) {
      var tmp = this.geometry.coordinates[len - 1 - i];
      this.geometry.coordinates[len - 1 - i] = this.geometry.coordinates[i];
      this.geometry.coordinates[i] = tmp;
    }

  }

  /**
   * @memberof CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.copy = function(obj) {

    if (this.properties.name != null) this.properties.name = obj.properties.name;
    if (this.properties.description != null) this.properties.description = obj.properties.description;
    if (this.properties.externalReference != null) this.properties.externalReference = obj.properties.externalReference;
    if (this.properties.duality != null) this.properties.duality = obj.properties.duality;

    this.docId = obj.docId;
    this.parentId = obj.parentId;
    this.id = obj.id;
    this.copyCoordinates(obj.geometry.coordinates);
    this.geometry.properties.id = obj.geometry.properties.id;
    this.geometry.properties.height = obj.geometry.properties.height;
  }

  /**
   * @memberof CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.copyCoordinates = function(coordinates) {

    for (var i = 0; i < coordinates.length; i++) {
      this.geometry.coordinates.push(JSON.parse(JSON.stringify(coordinates[i])));
    }
  }

  return CellSpaceBoundary;

});
