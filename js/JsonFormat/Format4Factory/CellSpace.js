/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./Feature",
  "js/JsonFormat/GeometryConverter.js",
  "js/Storage/Dot/DotMath.js"
], function(Feature, GeometryConverter, DotMath) {
  "user strict";

  /**
   * @class Fromat4Factory.CellSpace
   * @augments Feature
   */
  function CellSpace(conditions) {
    Feature.apply(this, arguments);

    this.type = "CellSpace";
    this.geometry = {
      type: "Surface",
      coordinates: [],
      properties: {
        id: "",
        type: "geojson"
      }
    };

    this.properties = {};

    if (conditions.geometry.extrude)
      this.geometry.properties["extrude"] = "true";
    else this.geometry.properties["extrude"] = "false";

    if (conditions.properties.name) this.properties["name"] = "";
    if (conditions.properties.description) this.properties["description"] = "";
    if (conditions.properties.partialboundedBy)
      this.properties["partialboundedBy"] = [];
    if (conditions.properties.externalReference)
      this.properties["externalReference"] = [];
    if (conditions.properties.duality) this.properties["duality"] = "";

    if (Object.keys(this.properties).length == 0) {
      delete this.properties;
    }
  }

  CellSpace.prototype = Object.create(Feature.prototype);

  /**
   * @memberof Fromat4Factory.CellSpace
   */
  CellSpace.prototype.setCoor = function(coor, type) {
    function isArray(o) {
      return Object.prototype.toString.call(o) === "[object Array]";
    }

    if (!isArray(coor)) {
      log.warn("The given parameter is not an Array type.");
    } else {
      this.geometry.coordinates = coor;
    }

    if (type == "3D") this.geometry.type = "Solid";
    else if (type == "2D") this.geometry.type = "Surface";
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   * @param Array coor array of coordinates
   * @param String type 3D(Solid) or 2D(Surface)
   */
  CellSpace.prototype.setWKT = function(coor, type) {
    if (type == "2D") this.setWKTSurface(coor);
    else if (type == "3D") this.setWKTSolid(coor);
    else
      log.error(
        "error! wrong type " +
          type +
          " inserted :: Format4Factory.CellSpace.setWKT"
      );
  };

  CellSpace.prototype.getWKT = function(type) {
    var coor = this.geometry.coordinates[0];
    var wkt = "POLYGON ((";

    for (var i = 0; i < coor.length; i++) {
      wkt += coor[i][0] + " " + coor[i][1] + " " + coor[i][2];

      if (i != coor.length - 1) wkt += ",";
    }

    wkt += coor[0][0] + " " + coor[0][1] + " " + coor[0][2] + "))";
    return wkt;
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   * @param Array coor array of coordinates
   */
  CellSpace.prototype.setWKTSolid = function(coor) {
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

    this.geometry.type = "Solid";
    this.geometry.coordinates = wkt;
    this.geometry.properties.type = "wkt";
    this.geometry.properties.extrude = "false";
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   * @param Array coor array of coordinates
   */
  CellSpace.prototype.setWKTSurface = function(coor) {
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

    this.geometry.type = "Polygon";
    this.geometry.coordinates = wkt;
    this.geometry.properties.type = "wkt";
    this.geometry.properties.extrude = "false";
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   */
  CellSpace.prototype.addHoleAsWKT = function(coor, type) {
    if (this.geometry.properties.type != "wkt")
      log.error(
        "error! the type of geometry of this cell is geojson :: Format4Factory.CellSpace.addHoleAsWKT"
      );
    else if (type == "2D") this.addHoleAsWKTSurface(coor);
    else if (type == "3D") this.addHoleAsWKTSolid(coor);
    else
      log.error(
        "error! wrong type " +
          type +
          " inserted :: Format4Factory.CellSpace.addHoleAsWKT"
      );
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   * @param Array coor array of coordinates
   */
  CellSpace.prototype.addHoleAsWKTSolid = function(coor) {
    var wkt =
      this.geometry.coordinates.slice(0, this.geometry.coordinates.length - 1) +
      ",(";

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
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   * @param Array coor array of coordinates
   */
  CellSpace.prototype.addHoleAsWKTSurface = function(coor) {
    var wkt =
      this.geometry.coordinates.slice(0, this.geometry.coordinates.length - 1) +
      ",(";

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
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   *
   */
  CellSpace.prototype.setPartialboundedBy = function(
    partialboundedBy,
    direction
  ) {
    function isArray(o) {
      return Object.prototype.toString.call(o) === "[object Array]";
    }

    if (this.properties == null || this.properties.partialboundedBy == null) {
      log.warn(
        "The given conditions said you don't need to need to set partialboundedBy of Cell."
      );
    } else {
      if (!isArray(partialboundedBy)) {
        log.warn("The given parameter is not an Array type.");
      } else {
        var geometryContainer = require("Storage")
          .getInstance()
          .getGeometryContainer();
        var cellGeo = geometryContainer.getElementById("cell", this.id).points;

        for (var key of partialboundedBy) {
          var obj = geometryContainer.getElementById("cellBoundary", key);
          if (obj == null) {
            if (key.indexOf("HATCH") != -1) {
              if (key.indexOf("UP") != -1)
                this.properties.partialboundedBy.push(key + "-REVERSE");
              else this.properties.partialboundedBy.push(key);
            }
            continue;
          }
          var boundaryGeo = [...obj.points];
          var flag = false;

          // remove part of transition
          var index = 0;
          for (var p of boundaryGeo) {
            if (Object.values(p.memberOf).indexOf("transition") > -1) {
              boundaryGeo.splice(index, 1);
              index--;
            }
            index++;
          }

          var flag = false;
          var dots = [
            ...require("Storage")
              .getInstance()
              .getCanvasContainer()
              .getElementById("cell", this.id).dots
          ];
          var DotMath = require("DotMath");
          var boundVector = DotMath.getVector(
            boundaryGeo[0],
            boundaryGeo[boundaryGeo.length - 1]
          );
          var boundNormal = DotMath.normalize(boundVector);
          var threshold = 0.0000001;

          var tmp = [];
          dots.map(function(d) {
            if (Object.values(d.memberOf).indexOf("transition") === -1)
              tmp.push(d);
          });
          dots = [...tmp];

          var lines = [];
          for (var dotkey = 0; dotkey < dots.length; dotkey++) {
            if (dotkey == dots.length - 1) {
              lines.push({
                dot1: dots[dotkey],
                dot2: dots[0]
              });
            } else {
              lines.push({
                dot1: dots[dotkey],
                dot2: dots[dotkey + 1]
              });
            }
          }

          for (var line of lines) {
            var isLineContainBoundary =
              DotMath.isLineContainDot(line, boundaryGeo[0]) &&
              DotMath.isLineContainDot(
                line,
                boundaryGeo[boundaryGeo.length - 1]
              );
            if (!isLineContainBoundary) continue;

            var vector = DotMath.getVector(line.dot1, line.dot2);
            var unit = DotMath.normalize(vector);
            var dotProduct = DotMath.dotProduct(boundNormal, unit);
            log.info(
              dotProduct,
              1 - threshold <= dotProduct && dotProduct <= 1 + threshold
            );
            if (1 - threshold <= dotProduct && dotProduct <= 1 + threshold)
              flag = true;
          }

          if (!flag) this.properties.partialboundedBy.push(key);
          else this.properties.partialboundedBy.push(key + "-REVERSE");
        }
      }
    }
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   *
   */
  CellSpace.prototype.setExternalReference = function(externalReference) {
    function isArray(o) {
      return Object.prototype.toString.call(o) === "[object Array]";
    }

    if (this.properties == null || this.properties.externalReference == null) {
      log.warn(
        "The given conditions said you don't need to need to set externalReference of Cell."
      );
    } else {
      if (!isArray(externalReference)) {
        log.warn("The given parameter is not an Array type.");
      } else {
        this.properties.externalReference = externalReference;
      }
    }
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   */
  CellSpace.prototype.pushCoordinatesFromDots = function(dots, transDots) {
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
        if (transDot == undefined) {
          log.info(this);
          log.info(transDot);
        } else if (transDot.point == undefined) {
          log.info(this);
          log.info(transDot);
        } else {
          polygon.push([transDot.point.x, transDot.point.y, transDot.point.z]);
        }
      }

      var transDot = transDots[dots[0].uuid];
      if (transDot == undefined) {
        console.log(this);
      }
      polygon.push([transDot.point.x, transDot.point.y, transDot.point.z]);
    }

    this.geometry.coordinates.push(polygon);
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   */
  CellSpace.prototype.updateCoordinates = function(index, position, value) {
    if (position == "x") {
      this.geometry.coordinates[index][0] = value;
    } else if (position == "y") {
      this.geometry.coordinates[index][1] = value;
    } else if (position == "z") {
      this.geometry.coordinates[index][2] = value;
    }
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   * @return coordinates array
   */
  CellSpace.prototype.getCoordinates = function() {
    return this.geometry.coordinates;
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   * @return coordinates array
   */
  CellSpace.prototype.getCoordinate = function(i) {
    if (this.geometry.coordinates.length > i) {
      return this.geometry.coordinates[i];
    }
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   */
  CellSpace.prototype.addHole = function(surfaces, type) {
    if (type == "3D") this.addSolidHole(surfaces);
    else if (type == "2D") this.addSurfaceHole(surfaces);
    else {
      log.error(
        "JsonFormat.Format4Factory.CellSpace.addHole :: wrong type " +
          type +
          " inserted."
      );
    }
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   */
  CellSpace.prototype.addSolidHole = function(solid) {
    for(let i in solid[0]){
      if( i == 0 )
        this.geometry.coordinates[0][i] = this.geometry.coordinates[0][i].concat(solid[0][i]);
      else if ( i == solid[0].length - 1 )
        this.geometry.coordinates[0][this.geometry.coordinates[0].length-1].push(solid[0][i][0])
      else
        this.geometry.coordinates[0].splice(this.geometry.coordinates[0].length-1, 0, solid[0][i])
    }
  };

  /**
   * @memberof Fromat4Factory.CellSpace
   */
  CellSpace.prototype.addSurfaceHole = function(surface) {
    this.geometry.coordinates.push(surface);
  };

  /**
   * @memberof Format4Factory.CellSpace
   */
  CellSpace.prototype.convertCoor2WKT = function() {
    if (this.geometry.properties.type == "wkt") {
      log.info(
        "Format4Factory.CellSpace :: Geometry type of this object is already WKT"
      );
      return;
    }

    var converted;
    if (this.geometry.type == "Surface")
      converted = new GeometryConverter("Surface").geojson2wkt(
        this.getCoordinates()
      );
    else
      converted = new GeometryConverter("Solid").geojson2wkt(
        this.getCoordinates()
      );

    this.geometry.coordinates = converted;
    this.geometry.properties.type = "wkt";
  };

  CellSpace.prototype.setType = function(type) {
    this["type"] = type;
  };

  CellSpace.prototype.addProperty = function(key, value) {
    if (value != undefined) this.properties[key] = value;

    if (key == "bottom") {
      var updated =
        JSON.parse(JSON.stringify(this.geometry.coordinates[0][0][2])) +
        value * 1;
      for (var s of this.geometry.coordinates) for (var c of s) c[2] = updated;
    }
  };

  CellSpace.prototype.reduceCoordinates = function(key, value) {
    var line = [0, 2];
    var mid = 1;
    var reduced = [],
      visited = [];
    var coors = this.geometry.coordinates[0].slice(
      0,
      this.geometry.coordinates[0].length - 1
    );

    function getDot(coor) {
      if (coor === undefined) {
        console.log(this);
      }
      return {point: {x: coor[0], y: coor[1]}};
    }

    function getLine(d1, d2) {
      return {dot1: d1, dot2: d2};
    }

    while (visited.indexOf(line[0]) == -1) {
      var v1 = getDot(coors[line[0]]);
      var v3 = getDot(coors[line[1]]);
      var v2 = getDot(coors[mid]);
      if (DotMath.isLineContainDot(getLine(v1, v3), v2)) {
        line[1] = line[1] + 1 == coors.length ? 0 : line[1] + 1;
        mid = mid + 1 == coors.length ? 0 : mid + 1;
      } else {
        reduced.push(mid);
        visited.push(line[0]);
        line[0] = mid;
        line[1] = line[0] + 1 == coors.length ? 0 : line[0] + 1;
        line[1] = line[1] + 1 == coors.length ? 0 : line[1] + 1;
        mid = line[0] + 1 == coors.length ? 0 : line[0] + 1;
      }
    }

    var reducedCoor = [];
    for (var i of reduced) reducedCoor.push(coors[i]);
    this.geometry.coordinates[0] = reducedCoor.sort(function(a, b) {
      return a - b;
    });
    this.geometry.coordinates[0].push(this.geometry.coordinates[0][0]);
  };

  return CellSpace;
});
