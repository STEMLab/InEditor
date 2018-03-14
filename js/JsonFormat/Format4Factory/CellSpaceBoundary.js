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
        'height': ""
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
  CellSpaceBoundary.prototype.pushCoordinatesFromDots = function(dots) {

    var len = dots.length;

    for (var i = 0; i < len; i++) {

      this.geometry.coordinates.push([dots[i].point.x, dots[i].point.y, 0]);

    }

  }

  /**
   * @memberof CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.updateCoordinates = function(index, position, value){

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


  return CellSpaceBoundary;

});
