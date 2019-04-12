/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../Object/Cell.js",
  "../Object/Hole.js",
  "../Object/Hatch.js"
], function(
  Cell,
  Hole,
  Hatch
) {
  'use strict';

  /**
   * @class CellGroup
   */
  function CellGroup() {

    /**
     * @memberof CellGroup
     */
    this.cellGroup = new Konva.Group({
      x: 0,
      y: 0
    });

    /**
     * @memberof CellGroup
     */
    this.holeGroup = new Konva.Group({
      x: 0,
      y: 0
    })

    /**
     * @memberof CellGroup
     */
    this.hatchGroup = new Konva.Group({
      x: 0,
      y: 0
    })

    /**
     * @memberof CellGroup
     */
    this.cells = []; // Cell array

    /**
     * @memberof CellGroup
     */
    this.holes = [];

    this.hatchs = [];


  }

  /**
   * @memberof CellGroup
   * @param {Cell} obj
   */
  CellGroup.prototype.add = function(obj) {

    var newCell = new Cell(obj.id);
    newCell.corners.visible(false);
    newCell.setFillColor(obj.poly.fill());

    this.copyDots(newCell, obj.dots);

    // add corner and poly in new cell
    newCell.addObjectFromDots();

    this.cells.push(newCell);

    this.cellGroup.add(this.cells[this.cells.length - 1].getPolyObject());
    this.cellGroup.add(this.cells[this.cells.length - 1].getCornersObject());

  }

  /**
   * @memberof CellGroup
   * @param {Cell} obj
   */
  CellGroup.prototype.simpleAdd = function(obj) {

    var newCell = new Cell(obj.id);
    newCell.dots = obj.dots;
    newCell.addObjectFromDots();
    newCell.corners.visible(false);
    if(obj.slant != null) newCell.setSlant(obj.slant.direction);


    this.cells.push(newCell);

    this.cellGroup.add(this.cells[this.cells.length - 1].getPolyObject());
    this.cellGroup.add(this.cells[this.cells.length - 1].getCornersObject());

  }

  /**
   * @memberof CellGroup
   */
  CellGroup.prototype.addHole = function(obj) {
    log.info('cell-group : addHole ', obj);

    var newHole = new Hole(obj.id);
    newHole.corners.visible(false);

    if(obj.poly == undefined) newHole.setFillColor('#FFFFFF');
    else                      newHole.setFillColor(obj.poly.fill());

    newHole.setHoleOf(obj.holeOf);

    if     (obj.dots != undefined && obj.points == undefined) this.copyDots(newHole, obj.dots);
    else if(obj.dots == undefined && obj.points != undefined) this.copyDots(newHole, obj.points );

    // add corner and poly in new cell
    newHole.addObjectFromDots();

    this.holes.push(newHole);

    this.holeGroup.add(this.holes[this.holes.length - 1].getPolyObject());
    this.holeGroup.add(this.holes[this.holes.length - 1].getCornersObject());

  }

    /**
     * @memberof CellGroup
     */
    CellGroup.prototype.addHatch = function(obj) {
      log.info('cell-group : addHatch ', obj);

      var newHatch = new Hatch(obj.id);
      newHatch.corners.visible(false);

      if(obj.poly == undefined) newHatch.setFillColor('#FFFFFF');
      else                      newHatch.setFillColor(obj.poly.fill());

      newHatch.setHatchOf(obj.hatchOf);

      if     (obj.dots != undefined && obj.points == undefined) this.copyDots(newHatch, obj.dots);
      else if(obj.dots == undefined && obj.points != undefined) this.copyDots(newHatch, obj.points );

      // add corner and poly in new cell
      newHatch.addObjectFromDots();

      this.hatchs.push(newHatch);

      this.hatchGroup.add(this.hatchs[this.hatchs.length - 1].getPolyObject());
      this.hatchGroup.add(this.hatchs[this.hatchs.length - 1].getCornersObject());

    }

  /**
   * @memberof CellGroup
   * @desc Copy the value of dotList and save it in newCell.dots.
   * @param {Cell} cell
   * @param {Array} dotList
   */
  CellGroup.prototype.copyDots = function(newCell, dots) {

    // false : counterclockwise, true : clockwise
    var direction = false;

    if (dots.length >= 3) {
      var p = dots[0].getCoor();
      var q = dots[1].getCoor();
      var r = dots[2].getCoor();

      var pq = [q.x - p.x, q.y - p.y, 0];
      var qr = [r.x - q.x, r.y - q.y, 0];
      var cross = [pq[1] * qr[2] - pq[2] * qr[1], pq[2] * qr[0] - pq[0] * qr[2], pq[0] * qr[1] - pq[1] * qr[0]];

      if (cross < 0) direction = false;
    }

    var len = dots.length;

    if (direction) {

      for (var i = 0; i < len; i++) newCell.addNewDot(dots[i]);

    } else {

      newCell.addNewDot(dots[0]);

      for (var i = 1; i < len; i++) newCell.addNewDot(dots[len - i]);

    }

  }

  /**
   * @memberof CellGroup
   * @desc copy obj to myobj.
   * @param {Konva.Group} obj
   */
  CellGroup.prototype.copyCorner = function(obj, myobj) {

    var direction = 'counterclockwise';


    // Checks whether the object is drawn clockwise.
    if (obj.children.length >= 3) {
      var p = [obj.children[0].attrs.x, obj.children[0].attrs.y, 0];
      var q = [obj.children[1].attrs.x, obj.children[1].attrs.y, 0];
      var r = [obj.children[2].attrs.x, obj.children[2].attrs.y, 0];

      var pq = [q[0] - p[0], q[1] - p[1], 0];
      var qr = [r[0] - q[0], r[1] - q[1], 0];
      var cross = [pq[1] * qr[2] - pq[2] * qr[1], pq[2] * qr[0] - pq[0] * qr[2], pq[0] * qr[1] - pq[1] * qr[0]];

      if (cross < 0) direction = 'clockwise';

    }

    var len = obj.children.length;

    if (direction == 'counterclockwise') {
      // If the object is drawn counterclockwise, copy the object as it is.

      for (var i = 0; i < len; i++) {
        myobj.addCorner({
          x: obj.children[i].attrs.x,
          y: obj.children[i].attrs.y
        });
      }

    } else {

      myobj.addCorner({
        x: obj.children[0].attrs.x,
        y: obj.children[0].attrs.y
      });

      for (var i = 1; i < len; i++) {
        myobj.addCorner({
          x: obj.children[len - i].attrs.x,
          y: obj.children[len - i].attrs.y
        });
      }

    }

  }

  /**
   * @memberof CellGroup
   */
  CellGroup.prototype.getCellGroup = function() {
    return this.cellGroup;
  }

  /**
   * @memberof CellGroup
   */
  CellGroup.prototype.getHoleGroup = function() {
    return this.holeGroup;
  }

  /**
   * @memberof CellGroup
   */
  CellGroup.prototype.getHatchGroup = function() {
    return this.hatchGroup;
  }



  /**
   * @memberof CellGroup
   */
  CellGroup.prototype.getConnection = function() {
    var result = [];

    for (var key in this.cells) {
      for (var dotkey = 0; dotkey < this.cells[key].dots.length; dotkey++) {
        var newConnection;
        if (dotkey == this.cells[key].dots.length - 1) {
          newConnection = {
            'dot1': this.cells[key].dots[dotkey],
            'dot2': this.cells[key].dots[0]
          };
        } else {
          newConnection = {
            'dot1': this.cells[key].dots[dotkey],
            'dot2': this.cells[key].dots[dotkey + 1]
          };
        }

        if (result.indexOf({
            'dot1': newConnection.dot2,
            'dot2': newConnection.dot1
          }) == -1) {
          result.push(newConnection);
        }
      }
    }

    return result;
  }

  /**
   * @memberof CellGroup
   */
  CellGroup.prototype.getBoundaries = function() {

    var result = [];

    for (var key in this.cells) {
      var oneCell = {
        'cell': this.cells[key].id,
        'connection': []
      };

      for (var dotkey in this.cells) {

        var newConnection;

        if (dotkey == this.cells[key].dots.length - 1) {
          newConnection = {
            'dot1': this.cells[key].dots[dotkey],
            'dot2': this.cells[key].dots[0]
          };
        } else {
          newConnection = {
            'dot1': this.cells[key].dots[dotkey],
            'dot2': this.cells[key].dots[dotkey + 1]
          };
        }

        oneCell[connection].push(newConnection);
        result.push(newConnection);

      }
    }

    return result;

  }

  /**
   * @memberof CellGroup
   */
  CellGroup.prototype.getCells = function() {
    return this.cells;
  }

  /**
   * @memberof CellGroup
   */
  CellGroup.prototype.getHoles = function() {
    return this.holes;
  }

  /**
   * @memberof CellGroup
   */
   CellGroup.prototype.delete = function(id, floor){
     for(var i in this.cells){
       if(this.cells[i].id == id){

         if(floor != undefined){
           var dotFool = window.storage.dotFoolContainer.getDotFool(floor);
           for(var j in this.cells[i].dots){
             dotFool.deleteDotFromObj(this.cells[i].dots[j].uuid, this.cells[i].id);
           }
         } else {
           log.warn('CellGroup.delete:: there is no floor data for cell, you need to free dots of', id, 'manually.');
         }

         this.cells[i].destroy();
         this.cells.splice(i, 1);
         break;
       }
     }
   }

  return CellGroup;

});
