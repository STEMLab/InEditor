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

    this.corners = Konva.Group({x:0, y:0});
    this.poly = new Konva.Line({
          points:[],
          fill: '#00D2FF',
          stroke: 'black',
          strokeWidth: 1,
          closed : true
    });
  }

  Cell.prototype = Object.create(Subject.prototype);

  Cell.prototype.addCorner = function(_x, _y){
    var rect = new Konva.Rect({
      x: _x,
      y: _y,
      width: 5,
      height: 5,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1
    });

    this.corners.add(rect);

    this.poly.points().push(_x, _y);
  }


  return Cell;

});
