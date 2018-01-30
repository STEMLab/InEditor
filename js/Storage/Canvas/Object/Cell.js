define([
  "../../../Observer/Subject.js"
], function(
  Subject
) {
  'use strict';

  function Cell(id){
    Subject.apply(this, arguments);

    this.id = id;
    this.name = id;

    this.corners = new Konva.Group({x:0, y:0});
    this.poly = new Konva.Line({
          points:[],
          fill: '#00D2FF',
          stroke: 'black',
          opacity: 0.3,
          strokeWidth: 1,
          closed : true
    });
  }

  Cell.prototype = Object.create(Subject.prototype);

  Cell.prototype.addCorner = function(coor){
    var rect = new Konva.Rect({
      x: coor.x,
      y: coor.y,
      width: 5,
      height: 5,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1
    });

    this.corners.add(rect);

    this.poly.points().push(coor.x, coor.y);
  }

  Cell.prototype.getObject = function(){

    return this.corners, this.poly;

  }


  return Cell;

});
