/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Feature", "js/JsonFormat/GeometryConverter.js", "js/Storage/Dot/DotMath.js"], function(Feature, GeometryConverter, DotMath) {
  'user strict';

  /**
   * @class Fromat4Factory.CellSpaceBoundary
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

  /**
   * @memberof Fromat4Factory.CellSpaceBoundary
   * @param Array coor array of coordinates
   * @param String type 3D(Surface) or 2D(LineString)
   */
  CellSpaceBoundary.prototype.setWKT = function(coor, type) {

    if (type == '2D') this.setWKTLineString(coor);
    else if (type == '3D') this.setWKTSurface(coor);
    else log.error('error! wrong type ' + type + ' inserted :: Format4Factory.CellSpaceBoundary.setWKT');

  }

  /**
   * @memberof Fromat4Factory.CellSpaceBoundary
   * @param Array coor array of coordinates
   */
  CellSpaceBoundary.prototype.setWKTSurface = function(coor) {

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
   * @memberof Fromat4Factory.CellSpaceBoundary
   * @param Array coor array of coordinates
   */
  CellSpaceBoundary.prototype.setWKTLineString = function(coor) {

    var wkt = "LINESTRING (";

    for (var i = 0; i < coor.length; i++) {

      wkt += coor[i][0];
      wkt += " ";
      wkt += coor[i][1];
      wkt += " ";
      wkt += coor[i][2];

      if (i != coor.length - 1) wkt += ", ";

    }

    wkt += ")";

    this.geometry.type = 'LineString';
    this.geometry.coordinates = wkt;
    this.geometry.properties.type = "wkt";
    this.geometry.properties.extrude = 'false';

  }

  /**
   * @memberof Fromat4Factory.CellSpaceBoundary
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
   * @memberof Fromat4Factory.CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.pushCoordinatesFromDots = function(dots, transDots) {

    if (transDots == undefined) {

      var len = dots.length;

      for (var i = 0; i < len; i++) {

        this.geometry.coordinates.push([dots[i].point.x, dots[i].point.y, 0]);

      }

    } else {

      var len = dots.length;

      for (var i = 0; i < len; i++) {

        var transDot = transDots[dots[i].uuid];
        this.geometry.coordinates.push([transDot.point.x, transDot.point.y, transDot.point.z]);

      }

    }

  }

  /**
   * @memberof Fromat4Factory.CellSpaceBoundary
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
   * @memberof Fromat4Factory.CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.setHeight = function(height) {

    this.geometry.properties.height = height;

  }

  /**
   * @memberof Fromat4Factory.CellSpaceBoundary
   * @return coordinates array
   */
  CellSpaceBoundary.prototype.getCoordinates = function() {

    return this.geometry.coordinates;

  }

  /**
   * @memberof Fromat4Factory.CellSpaceBoundary
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
   * @memberof Fromat4Factory.CellSpaceBoundary
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
   * @memberof Fromat4Factory.CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.copyCoordinates = function(coordinates) {

    for (var i = 0; i < coordinates.length; i++) {
      this.geometry.coordinates.push(JSON.parse(JSON.stringify(coordinates[i])));
    }
  }


  /**
   * @memberof Format4Factory.CellSpace
   */
  CellSpaceBoundary.prototype.convertCoor2WKT = function() {

    if (this.geometry.properties.type == 'wkt') {
      log.info('Format4Factory.CellSpaceBoundary :: Geometry type of this object is already WKT');
      return;
    }

    var converted = new GeometryConverter('Surface').geojson2wkt(this.getCoordinates());
    this.geometry.coordinates = converted;
    this.geometry.properties.type = 'wkt';
  }


  /**
   * @memberof CellSpaceBoundary
   */
  CellSpaceBoundary.prototype.setDuality = function(duality) {

    if (this.properties != null &&
      (this.properties.duality != null || window.conditions.exportConditions[this.type].properties.duality)) {

      if (duality == null || duality == "") delete this.properties['duality'];
      else {

        var transitionGeo = window.storage.geometryContainer.getElementById('transition', duality);
        var startPoint = transitionGeo.points[0];
        var endPoint;

        for(var i = 1 ; i < transitionGeo.points.length; i++){
          if(transitionGeo.points[i].isPartOfCellBoundary()){
            endPoint = transitionGeo.points[i];
            break;
          } else{
            startPoint = transitionGeo.points[i];
          }
        }

        var result = DotMath.crossProduct(
          DotMath.getVector(
            {'point' : { x:startPoint.point.x, y:startPoint.point.y  , z:0 }},
            {'point' : { x:endPoint.point.x,   y:endPoint.point.y ,   z:0 }}
          ),
          DotMath.getVector(
            {'point':{ x:this.geometry.coordinates[0][0], y:this.geometry.coordinates[0][1], z:0 }},
            {'point':{ x:this.geometry.coordinates[1][0], y:this.geometry.coordinates[1][1], z:0 }}
          )
        );

        if(result.z > 0) this.properties['duality'] = duality;
        else             this.properties['duality'] = duality+'-REVERSE';
      }

    } else {

      log.warn("The given conditions said you don 't need to need to set duality of Feature.");
    }

  }


  CellSpaceBoundary.prototype.reverseDuality = function() {
    if(this.properties.duality != "" && this.properties.duality != undefined && this.properties.duality != null){
      var word = this.properties.duality.split("-");
      if(word.length == 1) this.properties.duality = word[0]+'-REVERSE';
      else this.properties.duality = word[0];
    }
  }

  CellSpaceBoundary.prototype.addProperty = function(key, value){
    if(value != undefined) this.properties[key] = value;

    if(key == 'bottom'){
      for(var c of this.geometry.coordinates)
        c[2] += value * 1;
    }
  }

  CellSpaceBoundary.prototype.setType = function(type) {
    this['type'] = type;
  }


  return CellSpaceBoundary;

});
