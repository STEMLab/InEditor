/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Feature"], function(Feature) {
  'user strict';

  /**
   * @class CellSpaceBoundary
   * @augments Feature
   */
  function CellSpaceBoundary() {

    Feature.apply(this, arguments);

    this.type = "CellSpaceBoundary";

    this.attributes = {
      'name': "",
      'description': "",
      'externalReference': [],
      'duality': ""
    };

    this.geometry = {
      'type': 'LineString',
      'coordinates': [],
      'properties': {
        'id': "",
        'height': "",
        'extrude': "true"
      }
    };

  }

  CellSpaceBoundary.prototype = Object.create(Feature.prototype);

  /**
   * @memberof CellSpaceBoundary
   *
   */
  CellSpaceBoundary.prototype.setExternalReference = function(externalReference) {

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (!isArray(externalReference)) {

      log.warn("The given parameter is not an Array type.");

    } else {

      this.attributes.externalReference = externalReference;

    }

  }

  /**
   * @memberof CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.pushCoordinatesFromDots = function(dots) {

    var len = dots.length;

    for (var i = 0; i < len; i++) {

      this.geometry.coordinates.push([dots[i].point.x, dots[i].point.y, 0]);

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


  return CellSpaceBoundary;

});
