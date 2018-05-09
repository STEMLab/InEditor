/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["../../Dot/DotMath.js"], function(DotMath) {
  "use strict";

  /**
   * @class Cell
   */
  function Cell(id) {
    /**
     * @memberof Cell
     */
    this.id = id;

    /**
     * @memberof Cell
     */
    this.corners = new Konva.Group({
      x: 0,
      y: 0
    });

    /**
     * @memberof Cell
     */
    this.poly = new Konva.Line({
      points: [],
      fill: Konva.Util.getRandomColor(),
      stroke: "black",
      opacity: 0.3,
      strokeWidth: 1,
      closed: true
    });

    /**
     * @memberof Cell
     */
    this.dots = [];
  }

  /**
   * @memberof Cell
   * @param {Dot} dot
   */
  Cell.prototype.addCorner = function(dot) {
    this.addNewDot(dot);

    // Modify the connect value of the input dot if there is a point added just before it.
    this.addCornerObj(dot.uuid, dot.getCoor());
  };

  /**
   * @memberof Cell
   * @param {Object} cor x, y
   * @param String uuid of dot
   */
  Cell.prototype.addCornerObj = function(uuid, coor) {
    var rect = new Konva.Rect({
      x: coor.x,
      y: coor.y,
      width: 5,
      height: 5,
      fill: "white",
      stroke: "black",
      strokeWidth: 1
    });

    rect.uuid = uuid;

    this.corners.add(rect);

    this.poly.points().push(coor.x, coor.y);
  };

  /**
   * @memberof Cell
   * @param {Object} cor x, y
   * @param String uuid of dot
   */
  Cell.prototype.addCornerObjFromDot = function(dot) {
    var rect = new Konva.Rect({
      x: dot.point.x,
      y: dot.point.y,
      width: 5,
      height: 5,
      fill: "white",
      stroke: "black",
      strokeWidth: 1
    });

    rect.uuid = dot.uuid;

    this.corners.add(rect);

    this.poly.points().push(dot.point.x, dot.point.y);
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.deleteLastCorner = function() {
    this.dots.splice(this.dots.length - 1, 1);
    this.corners.children[this.corners.children.length - 1].destroy();
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.deleteLastPolyLine = function() {
    this.poly.attrs.points = this.poly.attrs.points.slice(
      0,
      this.poly.attrs.points.length - 2
    );
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.getLastDot = function() {
    return this.dots[this.dots.length - 1];
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.getCornersObject = function() {
    return this.corners;
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.getPolyObject = function() {
    return this.poly;
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.getPointsOfCorners = function() {
    var points = [];
    var len = this.corners.children.length;

    for (var i = 0; i < len; i++) {
      points.push(this.corners.children[i].attrs.x);
      points.push(this.corners.children[i].attrs.y);
    }

    return points;
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.destroy = function(floor) {
    this.corners.destroy();
    this.poly.destroy();
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.addNewDot = function(dot) {
    dot.participateObj(this.id, "cell");

    this.dots.push(dot);
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.addObjectFromDots = function() {
    this.corners.destroyChildren();
    this.poly.attrs.points = [];

    for (var key in this.dots) {
      // this.addCornerObj(this.dots[key].uuid, this.dots[key].getCoor());
      this.addCornerObjFromDot(this.dots[key]);
    }
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.getDots = function() {
    return this.dots;
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.getDotIndex = function(uuid) {
    for (var key in this.dots) {
      if (this.dots[key].uuid == uuid) return key;
    }

    return -1;
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.isEmpty = function() {
    if (this.dots.length == 0) return true;

    return false;
  };

  /**
   * @memberof Cell
   * @param {Object} point1
   * @param {Object} point2
   * @desc Plz sure that inputed values are already snapping.
   */
  Cell.prototype.isPartOf = function(point1, point2) {
    var len = this.dots.length;
    var result = [];
    var lines = this.getLines();

    for(var key in lines){

      if(point2 == null){

        var tf = DotMath.isLineContainDot(lines[key], {
          point: point1
        });

        if (tf) {
          result.push(lines[key]);
        }

      }else {

        var tf1 = DotMath.isLineContainDot(lines[key], {
          point: point1
        });
        var tf2 = DotMath.isLineContainDot(lines[key], {
          point: point2
        });

        if (tf1 && tf2) {
          // if point1 is part of this line.
          result.push(lines[key]);
        }

      }

    }

    return result;
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.insertDotIntoLine = function(line, point) {
    var indexOfDot1 = this.getDotIndex(line.dot1.uuid);
    var indexOfDot2 = this.getDotIndex(line.dot2.uuid);

    if (indexOfDot1 == -1 || indexOfDot2 == -1) {
      log.warn(
        "Cell.insertDotIntoLine : inserted line is not part of " + this.id
      );
      return;
    }

    if (
      (indexOfDot1 == 0 && indexOfDot2 == this.dots.length - 1) ||
      (indexOfDot2 == 0 && indexOfDot1 == this.dots.length - 1)
    )
      this.dots.push(point);
    else if (indexOfDot1 < indexOfDot2) this.dots.splice(indexOfDot2, 0, point);
    else this.dots.splice(indexOfDot1, 0, point);

    this.addObjectFromDots();

    point.participateObj(this.id, "cell");
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.insertDot = function(dot) {
    var lines = this.getLines();

    for (var i in lines) {
      if (DotMath.isLineContainDot(lines[i], dot.point)) this.insertDotIntoLine(lines[i], dot);
    }

  };

  /**
  * @memberof Cell
  */
  Cell.prototype.insertLineIntoLine = function(line, dots){

    var indexOfDot1 = this.getDotIndex(line.dot1.uuid);
    var indexOfDot2 = this.getDotIndex(line.dot2.uuid);

    if (indexOfDot1 == -1 || indexOfDot2 == -1) {
      log.warn(
        "Cell.insertLineIntoLine : inserted line is not part of " + this.id
      );
      return;
    }

    var VD1D2 = DotMath.getVector(line.dot1, line.dot2);
    var V = DotMath.getVector(dots[0], dots[1]);

    var cos = (V.x * VD1D2.x + V.y * VD1D2.y) /
              ( Math.sqrt(Math.pow(V.x, 2) + Math.pow(V.y, 2))
                * Math.sqrt(Math.pow(VD1D2.x, 2) + Math.pow(VD1D2.y, 2)));

    var threshold = 0.0000001;

    if( (-1) - threshold <= cos && cos <= (-1) + threshold ){
      dots.reverse();
    }

    // var dToDot1 = DotMath.distanceTo(line.dot1.point, dots[0].point);
    // var dToDto2 = DotMath.distanceTo(line.dot2.point, dots[0].point);

    // if(dToDot1 > dToDto2) dots.reverse();

    function insertArrayToArray(array1, array2, index){
      return array1.slice(0, index).concat(array2, array1.slice(index, array1.length));
    }

    if (
      (indexOfDot1 == 0 && indexOfDot2 == this.dots.length - 1) ||
      (indexOfDot2 == 0 && indexOfDot1 == this.dots.length - 1)
    ){

      this.dots.concat(dots);
    }
    else this.dots = insertArrayToArray(this.dots, dots, indexOfDot2);

    // else if (indexOfDot1 < indexOfDot2) this.dots = insertArrayToArray(this.dots, dots, indexOfDot2);

    this.addObjectFromDots();

    for(var key in dots)
      dots[key].participateObj(this.id, 'cell');

  }

  /**
   * @memberof Cell
   */
  Cell.prototype.getLines = function() {
    var result = [];

    for (var dotkey = 0; dotkey < this.dots.length; dotkey++) {
      var newConnection;
      if (dotkey == this.dots.length - 1) {
        result.push({
          dot1: this.dots[dotkey],
          dot2: this.dots[0]
        });

      } else {
        result.push({
          dot1: this.dots[dotkey],
          dot2: this.dots[dotkey + 1]
        });
      }
    }

    return result;
  };

  /**
   * @memberof Cell
   */
  Cell.prototype.getWKT = function() {
    var wkt = "POLYGON ((";

    for (var i = 0; i < this.dots.length; i++) {
      wkt += this.dots[i].point.x + " " + this.dots[i].point.y + ", ";
    }

    wkt += this.dots[0].point.x + " " + this.dots[0].point.y + "))";

    return wkt;
  };

  return Cell;
});
