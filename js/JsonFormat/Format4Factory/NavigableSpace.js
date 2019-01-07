/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./Feature",
  "js/JsonFormat/GeometryConverter.js"
], function(
  Feature,
  GeometryConverter
) {
  'user strict';

  /**
   * @class Fromat4Factory.NavigableSpace
   * @augments Feature
   */
  function NavigableSpace(conditions) {

      Feature.apply(this, arguments);

    this.type = "NavigableSpace";
    this.geometry = {
      'type': 'Surface',
      'coordinates': [],
      'properties': {
        'id': "",
        'height': "",
        'extrude': "",
        'type': 'geojson'
      }
    };

    this.properties = {};

    if (conditions.geometry.extrude) this.geometry.properties['extrude'] = "true";
    else this.geometry.properties['extrude'] = "false";

    if (conditions.properties.name) this.properties['name'] = "";
    if (conditions.properties.description) this.properties['description'] = "";
    if (conditions.properties.partialboundedBy) this.properties['partialboundedBy'] = [];
    if (conditions.properties.externalReference) this.properties['externalReference'] = [];
    if (conditions.properties.duality) this.properties['duality'] = "";

    if (Object.keys(this.properties).length == 0) {
      delete this.properties;
    }

    this.properties['class'] = "";
    this.properties['function'] = "";
    this.properties['usage'] = "";

  }

  NavigableSpace.prototype = Object.create(Feature.prototype);


  NavigableSpace.prototype.setClass = function(_class){
    this.properties.class = _class;
  }

  NavigableSpace.prototype.setFunction = function(_function){
    this.properties.function = _function;
  }

  NavigableSpace.prototype.setUsage = function(usage){
    this.properties.usage = usage;
  }

  NavigableSpace.prototype.setType = function(type){
    this.properties.type = type;
  }


  /**
   * @memberof Fromat4Factory.NavigableSpace
   */
  NavigableSpace.prototype.setCoor = function(coor, type) {

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (!isArray(coor)) {

      log.warn("The given parameter is not an Array type.");

    } else {

      this.geometry.coordinates = coor;

    }

    if(type == '3D') this.geometry.type = 'Solid';
    else if(type == '2D') this.geometry.type = 'Surface';

  }


  /**
   * @memberof Fromat4Factory.NavigableSpace
   * @param Array coor array of coordinates
   * @param String type 3D(Solid) or 2D(Surface)
   */
  NavigableSpace.prototype.setWKT = function(coor, type) {

    if (type == '2D') this.setWKTSurface(coor);
    else if (type == '3D') this.setWKTSolid(coor);
    else log.error('error! wrong type ' + type + ' inserted :: Format4Factory.NavigableSpace.setWKT');

  }

  /**
   * @memberof Fromat4Factory.NavigableSpace
   * @param Array coor array of coordinates
   */
  NavigableSpace.prototype.setWKTSolid = function(coor) {


    var wkt = "SOLID ((";

    for (var i = 0; i < coor.length; i++) {

      wkt += "((";

      for (var j = 0; j < coor[i].length; j++) {

        wkt += coor[i][j][0];
        wkt += " ";
        wkt += coor[i][j][1];
        wkt += " ";
        wkt += coor[i][j][2];

        if (j != coor[i].length - 1) wkt += ",";

      }



      if (i != coor.length - 1) wkt += ")),";
      else wkt += "))";

    }

    wkt += "))";

    this.geometry.type = 'Solid';
    this.geometry.coordinates = wkt;
    this.geometry.properties.type = "wkt";
    this.geometry.properties.extrude = 'false';

  }

  /**
   * @memberof Fromat4Factory.NavigableSpace
   * @param Array coor array of coordinates
   */
  NavigableSpace.prototype.setWKTSurface = function(coor) {

    var wkt = "POLYGON ((";

    for (var i = 0; i < coor.length; i++) {
      wkt += coor[i][0];
      wkt += " ";
      wkt += coor[i][1];
      wkt += " ";
      wkt += coor[i][2];

      if (i != coor.length - 1) wkt += ",";
    }

    wkt += "))";

    this.geometry.type = 'Polygon';
    this.geometry.coordinates = wkt;
    this.geometry.properties.type = "wkt";
    this.geometry.properties.extrude = 'false';

  }

  /**
   * @memberof Fromat4Factory.NavigableSpace
   */
  NavigableSpace.prototype.addHoleAsWKT = function(coor, type) {

    if ( this.geometry.properties.type != 'wkt' ) log.error('error! the type of geometry of this cell is geojson :: Format4Factory.NavigableSpace.addHoleAsWKT');
    else if (type == '2D') this.addHoleAsWKTSurface(coor);
    else if (type == '3D') this.addHoleAsWKTSolid(coor);
    else log.error('error! wrong type ' + type + ' inserted :: Format4Factory.NavigableSpace.addHoleAsWKT');

  }

  /**
   * @memberof Fromat4Factory.NavigableSpace
   * @param Array coor array of coordinates
   */
  NavigableSpace.prototype.addHoleAsWKTSolid = function(coor) {

    var wkt = this.geometry.coordinates.slice(0, this.geometry.coordinates.length - 1) + ",(";

    for (var i = 0; i < coor.length; i++) {

      wkt += "((";

      for (var j = 0; j < coor[i].length; j++) {

        wkt += coor[i][j][0];
        wkt += " ";
        wkt += coor[i][j][1];
        wkt += " ";
        wkt += coor[i][j][2];

        if (j != coor[i].length - 1) wkt += ",";

      }

      if (i != coor.length - 1) wkt += ")),";
      else wkt += "))";

    }

    wkt += "))";

    this.geometry.coordinates = wkt;
  }

  /**
   * @memberof Fromat4Factory.NavigableSpace
   * @param Array coor array of coordinates
   */
  NavigableSpace.prototype.addHoleAsWKTSurface = function(coor) {

    var wkt = this.geometry.coordinates.slice(0, this.geometry.coordinates.length - 1) + ",(";

    for (var i = 0; i < coor.length; i++) {
      wkt += coor[i][0];
      wkt += " ";
      wkt += coor[i][1];
      wkt += " ";
      wkt += coor[i][2];

      if (i != coor.length - 1) wkt += ",";
    }

    wkt += "))";

    this.geometry.coordinates = wkt;


  }


  /**
   * @memberof Fromat4Factory.NavigableSpace
   *
   */
  NavigableSpace.prototype.setPartialboundedBy = function(partialboundedBy) {

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
   * @memberof Fromat4Factory.NavigableSpace
   *
   */
  NavigableSpace.prototype.setExternalReference = function(externalReference) {

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
   * @memberof Fromat4Factory.NavigableSpace
   */
  NavigableSpace.prototype.pushCoordinatesFromDots = function(dots, transDots) {

    var polygon = [];

    if (transDots == undefined) {
      var len = dots.length;

      for (var i = 0; i < len; i++) {

        polygon.push([dots[i].point.x, dots[i].point.y, 0]);

      }

      polygon.push([dots[0].point.x, dots[0].point.y, 0]);


    } else {
      var len = dots.length;

      for (var i = 0; i < len; i++) {

        var transDot = transDots[dots[i].uuid];
        polygon.push([transDot.point.x, transDot.point.y, transDot.point.z]);

      }

      var transDot = transDots[dots[0].uuid];
      polygon.push([transDot.point.x, transDot.point.y, transDot.point.z]);
    }

    this.geometry.coordinates.push(polygon);
  }

  /**
   * @memberof Fromat4Factory.NavigableSpace
   */
  NavigableSpace.prototype.updateCoordinates = function(index, position, value) {

    if (position == 'x') {

      this.geometry.coordinates[index][0] = value;

    } else if (position == 'y') {

      this.geometry.coordinates[index][1] = value;

    } else if (position == 'z') {

      this.geometry.coordinates[index][2] = value;

    }

  }

  /**
   * @memberof Fromat4Factory.NavigableSpace
   * @return coordinates array
   */
  NavigableSpace.prototype.getCoordinates = function() {

    return this.geometry.coordinates;

  }

  /**
   * @memberof Fromat4Factory.NavigableSpace
   * @return coordinates array
   */
  NavigableSpace.prototype.getCoordinate = function(i) {

    if (this.geometry.coordinates.length > i) {
      return this.geometry.coordinates[i];
    }

  }

  /**
   * @memberof Fromat4Factory.NavigableSpace
   */
  NavigableSpace.prototype.setHeight = function(height) {

    this.geometry.properties.height = height;

  }

  /**
   * @memberof Fromat4Factory.NavigableSpace
   */
  NavigableSpace.prototype.addHole = function(surfaces, type) {

    if(type == '3D') this.addSolidHole(surfaces);
    else if(type == '2D'){

    } else {
      log.error('JsonFormat.Format4Factory.NavigableSpace.addHole :: wrong type ' + type + ' inserted.');
    }

  }

  /**
   * @memberof Fromat4Factory.NavigableSpace
   */
  NavigableSpace.prototype.addSolidHole = function(solid) {
    for(var s of solid){
      this.geometry.coordinates.push(s);
    }
  }

  /**
  * @memberof Format4Factory.NavigableSpace
  */
  NavigableSpace.prototype.convertCoor2WKT = function(){

    if(this.geometry.properties.type == 'wkt'){
      log.info('Format4Factory.NavigableSpace :: Geometry type of this object is already WKT');
      return ;
    }

    var converted = new GeometryConverter('Solid').geojson2wkt(this.getCoordinates());
    this.geometry.coordinates = converted;
    this.geometry.properties.type = 'wkt';
  }




  return NavigableSpace;

});
