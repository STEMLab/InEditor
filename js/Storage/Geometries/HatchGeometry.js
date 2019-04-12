/**
* @author suheeeee<lalune1120@hotmail.com>
*/
define([
  "./CellGeometry.js",
],function(
  CellGeometry
) {
  'use strict';

  /**
  * @class HatchGeometry
  * @augments HatchGeometry
  */
  function HatchGeometry(_id, _points, _hatchOf){

    CellGeometry.apply(this, arguments);

    /**
     * @memberof HatchGeometry
     */
     this.hatchOf =  _hatchOf;

     this.direction = "up"; // or down

     if(_id.indexOf("UP") != -1) this.direction = "up"; // or down
     else this.direction = "down";

  }

  HatchGeometry.prototype = Object.create(CellGeometry.prototype);



  /**
  * @memberof HatchGeometry
  */
  HatchGeometry.prototype.setHatchOf = function(cellId){
    this.hatchOf = cellId;
  }

  /**
  * @memberof CellGeometry
  */
  HatchGeometry.prototype.load = function(values){
    this.id = values.id;
    this.points = values.points;
    this.hatchOf = values.hatchOf;
  }

  /**
  * @memberof HatchGeometry
  */
  HatchGeometry.prototype.getCoordinates = function(){
    var coordinates = [];
    for(var key in this.points){
      coordinates.push(this.points[key].getCoor());
    }
    return coordinates;
  }



  return HatchGeometry;

});
