/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "../Object/CellBoundary.js"
],function(
  CellBoundary
) {
  'use strict';

  /**
  * @class CellBoundaryGroup
  */
  function CellBoundaryGroup(){

    /**
    * @memberof CellBoundaryGroup
    */
    this.cellBoundaryGroup = new Konva.Group({ x: 0, y: 0 });

    /**
    * @memberof CellBoundaryGroup
    */
    this.cellBoundaries = []; // CellBoundary array

  }

  /**
  * @memberof CellBoundaryGroup
  * @param {CellBoundary} obj
  */
  CellBoundaryGroup.prototype.add = function(obj){

    var newCB = new CellBoundary(obj.id);

    this.copyDots(newCB, obj.dots);

    newCB.addObjectFromDots();

    this.cellBoundaries.push(newCB);

    this.cellBoundaryGroup.add(newCB.getCornersObject());
    this.cellBoundaryGroup.add(newCB.getLineObject());

  }

  /**
  * @memberof CellBoundaryGroup
  */
  CellBoundaryGroup.prototype.getGroup = function(){
    return this.cellBoundaryGroup;
  }

  /**
  * @memberof CellBoundaryGroup
  */
  CellBoundaryGroup.prototype.getConnection = function(){
    /**
    * need to develop
    */
    return [];
  }


  /**
  * @memberof CellBoundaryGroup
  */
  CellBoundaryGroup.prototype.copyDots = function(cb, dots){

    // direction : false - counterclockwise, true - clockwise
    var direction = false;

    if (dots.length >= 3) {
      var p = dots[0].getCoor();
      var q = dots[1].getCoor();
      var r = dots[2].getCoor();

      var pq = [q.x - p.x, q.y - p.y, 0];
      var qr = [r.x - q.x, r.y - q.y, 0];
      var cross = [pq[1] * qr[2] - pq[2] * qr[1], pq[2] * qr[0] - pq[0] * qr[2], pq[0] * qr[1] - pq[1] * qr[0]];

      if (cross < 0) direction = true;
    }

    var len = dots.length;

    if(direction){

      for(var i = 0 ; i < len ; i++) cb.addNewDot(dots[i]);

    } else {

      cb.addNewDot(dots[0]);

      for(var i = 1 ; i < len ; i++) cb.addNewDot(dots[len-i]);

    }
  }

  return CellBoundaryGroup;

});
