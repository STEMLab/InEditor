/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Feature"], function(Feature) {
  'user strict';

  /**
  * @class CellSpace
  * @augments Feature
  */
  function CellSpace(conditions) {

    Feature.apply(this, arguments);

    this.type = "CellSpace";
    this.geometry = {
      'type': 'Surface',
      'coordinates': [],
      'properties': {
        'id': "",
        'height': "",
        'extrude' : ""
      }
    };

    this.properties = {};

    if (conditions.geometry.extrude) this.geometry.properties['extrude'] = "true";
    else tthis.geometry.properties['extrude'] = "false";

    if (conditions.properties.name) this.properties['name'] = "";
    if (conditions.properties.description) this.properties['description'] = "";
    if (conditions.properties.partialboundedBy) this.properties['partialboundedBy'] = [];
    if (conditions.properties.externalReference) this.properties['externalReference'] = [];
    if (conditions.properties.duality) this.properties['duality'] = "";

    if (Object.keys(this.properties).length == 0) {
      delete this.properties;
    }

  }

  CellSpace.prototype = Object.create(Feature.prototype);

  /**
   * @memberof CellSpace
   *
   */
  CellSpace.prototype.setPartialboundedBy = function(partialboundedBy) {

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (this.properties == null || this.properties.partialboundedBy == null) {

      log.warn("The given conditions said you don't need to need to set partialboundedBy of Cell.");

    } else {

      if (!isArray(partialboundedBy)) {

        log.warn("The given parameter is not an Array type.");

      } else {

        this.properties.partialboundedBy = partialboundedBy;

      }

    }

  }

  /**
   * @memberof CellSpace
   *
   */
  CellSpace.prototype.setExternalReference = function(externalReference) {

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (this.properties == null || this.properties.externalReference == null) {

      log.warn("The given conditions said you don't need to need to set externalReference of Cell.");

    } else {

      if (!isArray(externalReference)) {

        log.warn("The given parameter is not an Array type.");

      } else {

        this.properties.externalReference = externalReference;

      }

    }

  }

  /**
   * @memberof CellSpace
   */
  CellSpace.prototype.pushCoordinatesFromDots = function(dots) {

    var len = dots.length;

    for (var i = 0; i < len; i++) {

      this.geometry.coordinates.push([dots[i].point.x, dots[i].point.y, 0]);

    }

    this.geometry.coordinates.push([dots[0].point.x, dots[0].point.y, 0]);

  }

  /**
   * @memberof CellSpace
   */
  CellSpace.prototype.updateCoordinates = function(index, position, value){

    if (position == 'x') {

      this.geometry.coordinates[index][0] = value;

    } else if (position == 'y') {

      this.geometry.coordinates[index][1] = value;

    } else if (position == 'z') {

      this.geometry.coordinates[index][2] = value;

    }

  }

  /**
   * @memberof CellSpace
   * @return coordinates array
   */
  CellSpace.prototype.getCoordinates = function() {

    return this.geometry.coordinates;

  }

  /**
   * @memberof CellSpace
   * @return coordinates array
   */
  CellSpace.prototype.getCoordinate = function(i) {

    if(this.geometry.coordinates.length > i){
      return this.geometry.coordinates[i];
    }

  }

  /**
   * @memberof CellSpace
   */
  CellSpace.prototype.setHeight = function(height) {

    this.geometry.properties.height = height;

  }



  return CellSpace;

});
