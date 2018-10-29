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
  * @class HoleGeometry
  * @augments HoleGeometry
  */
  function HoleGeometry(_id, _points, _holeOf){

    CellGeometry.apply(this, arguments);

    /**
     * @memberof HoleGeometry
     */
     this.holeOf =  _holeOf;

  }

  HoleGeometry.prototype = Object.create(CellGeometry.prototype);

  /**
  * @memberof HoleGeometry
  */
  HoleGeometry.prototype.setHoleOf = function(cellId){
    this.holeOf = cellId;
  }

  /**
  * @memberof HoleGeometry
  */
  HoleGeometry.prototype.getCoordinates = function(){
    var coordinates = [];
    for(var key in this.points){
      coordinates.push(this.points[key].getCoor());
    }
    return coordinates;
  }



  return HoleGeometry;

});
