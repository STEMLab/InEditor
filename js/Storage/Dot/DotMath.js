/**
 * @author suheeeee<lalune1120@hotmail.com>
 * @module DotMath
 */

define([], function() {
  'user strict';

  return {

    /**
     * @desc dot product of two vector
     */
    dotProduct: function(A, B) {
      return (A.x * B.x) + (A.y * B.y);
    },

    /**
     * @desc distance between two vector
     */
    distanceTo: function(A, B) {
      return Math.sqrt(Math.pow(Math.abs(A.x - B.x), 2) + Math.pow(Math.abs(A.y - B.y), 2));
    },

    /**
     * @desc cross product of two vector
     */
    crossProduct: function(A, B) {
      return {
        x: A.y * B.z - A.z * B.y,
        y: A.z * B.x - A.x * B.z,
        z: A.x * B.y - A.y * B.x
      };
    },

    /**
     * @desc check the given
     */
    isClockWise: function(dot1, dot2, dot3){
      var A = this.getVector(dot1, dot2);
      var B = this.getVector(dot2, dot3);

      A['z'] = 0; B['z'] = 0;
      var cross = this.crossProduct(A, B);
      if(cross.z > 0 ) return 1; // counterclockwise
      else if(cross.z < 0) return -1; // clockwise
      else return 0;
    },

    /**
     * @desc return vector(dot1 -> dot2)
     */
    getVector: function(dot1, dot2) {
      return {
        x: dot2.point.x - dot1.point.x,
        y: dot2.point.y - dot1.point.y
      };
    },

    getUnitVector: function(V){
      var u = Math.sqrt(Math.pow(V.point.x, 2) + Math.pow(V.point.y, 2));

      return {
        x: V.x / u,
        y: V.y / u
      };
    },

    getFootOfPerpendicularDistance: function(V1, V2, V2D) {

      var crossP = this.crossProduct({
        x: V1.x,
        y: V1.y,
        z: 0
      }, {
        x: V2.x,
        y: V2.y,
        z: 0
      });
      var A = Math.sqrt(Math.pow(crossP.x, 2) + Math.pow(crossP.y, 2) + Math.pow(crossP.z, 2));
      var d = A / V2D;

      return d;

    },

    getFootOfPerpendicular: function(P, A, B) {

      var u = Math.pow(distanceTo(A.point, B.point), 2);

      var V = this.getVector(A, B);

      var VUnit = {
        x: V.x / u,
        y: V.y / u
      };

      var dotP = this.dotProduct(this.getVector(A, P), V);

      return minimum_point = {
        x: A.point.x + VUnit.x * dotP,
        y: A.point.y + VUnit.y * dotP
      };

    },

    /**
     * @desc Return the foot of perpendicular to the nearest line.
     * @param {Array} connections data of line. This value is array of Object and it's form is { dot1, dot2 }.
     * @param {Object} point { x : coordinate of x, y : coordinate of y }
     * @param {Number} threshold The maximum distance between the input point and the foot of perpendicular to be returned. If this value is `null`, function refers to this value of [coordinateThreshold]{@link Conditions}.
     * @return {Object} { x : coordinate of x, y : coordinate of y } or null
     */
    getNearestFootOfPerpendicular: function(connections, point, minimum_d) {

      function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
      }

      function isObject(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
      }

      // exception handler for parameter
      if (connections == null) {
        log.error("DotMath.getFootOfPerpendicular : There is no parameter!");
        return null;
      }

      if (!isArray(connections)) {
        log.error("DotMath.getFootOfPerpendicular : The parameter `connections` is not Array!");
        return null;
      }

      if (!isObject(point)) {
        log.error("DotMath.getFootOfPerpendicular : The parameter `point` is not Object!");
        return null;
      }

      if (point == null) {
        log.error("DotMath.getFootOfPerpendicular : There is no point !");
        return null;
      }

      if (minimum_d == null) {
        minimum_d = require('Conditions').getInstance().coordinateThreshold;
      }

      for (var i = 0; connections.length > i; i++) {

        // v1 : dot1 -> point
        // v2 : dot2 -> point
        // v3 : dot1 -> dot2
        var V1 = this.getVector(connections[i].dot1, point);
        var V2 = this.getVector(connections[i].dot2, point);
        var V3 = this.getVector(connections[i].dot1, connections[i].dot2);

        var V1DotV3 = this.dotProduct(V1, V3);
        var V2DotV3 = this.dotProduct(V2, V3);

        if (V1DotV3 * V2DotV3 <= 0) {

          var d = this.getFootOfPerpendicularDistance(V1, V3, this.distanceTo(connections[i].dot1.point, connections[i].dot2.point));

          if (minimum_d > d) {
            this.getFootOfPerpendicular(point, connections[i].dot1, connections[i].dot2);
            minimum_connection = connections[i];
          }
        }
      }
    },

    /**
    * @desc Check the line contains the dot.
    * @param {Object} line { dot1 : point{ x ,y }, dot2 : point{ x, y } }
    * @param {Object} dot { point{ x, y } }
    */
    isLineContainDot: function(line, dot){

      // line.dot1 -> line.dot2
      var V1 = {
        x: line.dot2.point.x - line.dot1.point.x,
        y: line.dot2.point.y - line.dot1.point.y
      }

      // line.dot1 -> point
      var V2 = {
        x: dot.point.x - line.dot1.point.x,
        y: dot.point.y - line.dot1.point.y
      }

      // V2 projection
      var V2prj = this.dotProduct(V1, V2) / this.dotProduct(V1,V1);
      // log.info('V2prj : ', V2prj);
      if ( V2prj == 0 ) return true;
      // else if( V2prj < 0 || 1 < V2prj ) return false;
      if( V2prj < 0 || 1 < V2prj ) return false;

      var cos = (V1.x * V2.x + V1.y * V2.y) /
                ( Math.sqrt(Math.pow(V1.x, 2) + Math.pow(V1.y, 2))
                  * Math.sqrt(Math.pow(V2.x, 2) + Math.pow(V2.y, 2)));
      var threshold = 0.0000001;

      if( ( 1 - threshold <= cos && cos <= 1 + threshold ) || ((-1) - threshold <= cos && cos <= (-1) + threshold ))
        return true;
      else
        return false;
    },

    /**
    * @desc Check that the two given points are same within the threshold(=[coordinateThreshold]{@link Conditions}) range.
    */
    isSameDot: function(dot1, dot2){

      this.threshold = window.conditins.coordinateThreshold;

      var x = (dot1.point.x - threshold <= dot2.point.x && dot2.point.x <= dot1.point.x + threshold);
      var y = (dot1.point.y - threshold <= dot2.point.y && dot2.point.y <= dot1.point.y + threshold);

      return x && y;

    },

    /**
    * @desc Check the inclusion relationship between two input line.
    * @param {Object} line1 { dot1, dot2 }
    * @param {Object} line2 { dot1, dot2 }
    * @return {Object} { result, infomation }<br>If line1 and line2 is same, returns { 0 }. <br>If line1 contain line2, returns { 1 }.<br> If line2 contain line1, returns { 2 }.<br>If two line cross at one dot, return  { 3, crossing point }.<br>If one line contains a portion of another line, it returns { 4 , An array of the order of points, e.g [line1.dot1, line2.dot2, line2.dot1, line1.dot2]}<br>If the two lines are parallel, returns { 5 }.<br>If it does not belong to any of the above cases, returns { -1 }.
    */
    getRelationOfTwoLine: function(line1, line2){

      // 0. line1 and line2 is same
      // 1. two lines are parallel
      // 2. line1 contain line2
      // 3. line2 contain line1
      // 4. two line cross at one dot
      // 5. one line contains a portion of another line
      // -1. it does not belong to any of the above cases, returns { -1 }.

      // 0. line1 and line2 is same
      this.threshold = window.conditins.coordinateThreshold;

      if( (this.isSameDot(line1.dot1, line2.dot1) && this.isSameDot(line1.dot2, line2.dot2)) ||
          (this.isSameDot(line1.dot1, line2.dot2) && this.isSameDot(line1.dot2, line2.dot1)) )
          return { result : 0 };

      // 1. If the two lines are parallel
      // V(line1)·V(line2) = ±|V(line1)||V(line2)|
      var V1 = this.getVector(line1.dot1, line1.dot2);
      var V2 = this.getVector(line2.dot1, line2.dot2);
      var V1DotV2 = this.dotProduct(V1, V2);
      var DV1 = this.distanceTo(line1.dot1.point, line1.dot2.point);
      var DV2 = this.distanceTo(line2.dot1.point, line2.dot2.point);

      if(Math.pow(V1DotV2, 2) == Math.pow(DV1*DV2,2))
        return { result : 1 };

      // 2. line1 contain line2
      if(this.isLineContainDot(line1, line2.dot1) && this.isLineContainDot(line1, line2.dot2)){
        var DL1D12L2D1 = this.distanceTo(line1.dot1.point, line2.dot1.point);
        var DL1D12L2D2 = this.distanceTo(line1.dot1.point, line2.dot2.point);

        if( DL1D12L2D1 < DL1D12L2D2 )
          return { result: 2, infomation: [line1.dot1, line2.dot1, line2.dot2, line1.dot2]};
        else
          return { result: 2, infomation: [line1.dot1, line2.dot2, line2.dot1, line1.dot2]};
      }

      // 3. line2 contain line1
      if(this.isLineContainDot(line2, line1.dot1) && this.isLineContainDot(line2, line1.dot2)){
        var DL2D12L1D1 = this.distanceTo(line2.dot1.point, line1.dot1.point);
        var DL2D12L1D2 = this.distanceTo(line2.dot1.point, line1.dot2.point);

        if( DL2D12L1D1 < DL2D12L1D2 )
          return { result: 3, infomation: [line2.dot1, line1.dot1, line1.dot2, line2.dot2]};
        else
          return { result: 3, infomation: [line2.dot1, line1.dot2, line1.dot1, line2.dot2]};
      }

      // 4. two line cross at one dot
      // when two line({(x1,y1), (x2,y2)}, {(x3,y3), (x4,y4)}) are crossed,
      // the coordinate of crossing point is ( x1 + s(x2-x1), y1 + s(y2-y1) ).
      // s = {(x2-x1)(y1-y3)-(x1-x3)(y2-y1)} / {(y4-y3)(x2-x1)-(x4-x3)(y2-y1)}
      // if denominator == 0, two line is parallel
      // if
      var denominator = (line2.dot2.point.y-line2.dot1.point.y)*(line1.dot2.point.x-line1.dot1.point.x)
                    - (line2.dot2.point.x-line2.dot1.point.x)*(line1.dot2.point.y-line1.dot1.point.y);
      var numerator = 0;

    },

    isCCWByDots : function(dots){
      let wkt = "POLYGON ((";

      for(let dot of dots){
        wkt += dot.point.x + " " + dot.point.y + " 0, ";
      }

      wkt += dots[0].point.x + " " + dots[0].point.y + " 0))";
      // log.info(wkt);

      var reader = new jsts.io.WKTReader();
      var c = reader.read(wkt);

      return jsts.algorithm.Orientation.isCCW(c.getCoordinates());
    },

    isCCWByArr : function(arr){
      var wkt = "POLYGON ((";

      for (var i = 0; i < arr.length; i++) {
        wkt += arr[i][0] + " " + arr[i][1] + " " + arr[i][2];

        if (i != arr.length - 1) wkt += ",";
      }

      wkt += arr[0][0] + " " + arr[0][1] + " " + arr[0][2] + "))";

      var reader = new jsts.io.WKTReader();
      var c = reader.read(wkt);

      return jsts.algorithm.Orientation.isCCW(c.getCoordinates());
    }


  };
});
