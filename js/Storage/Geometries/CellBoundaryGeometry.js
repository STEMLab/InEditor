/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class CellBoundaryGeometry
  */
  function CellBoundaryGeometry(id, points) {

    /**
    * @memberof CellBoundaryGeometry
    */
    this.id = id;

    /**
    * @memberof CellBoundaryGeometry
    */
    this.points = points;

  }

  /**
  * @memberof CellBoundaryGeometry
  */
  CellBoundaryGeometry.prototype.load = function(values){
    this.id = values.id;
    this.points = values.points;
  }

  return CellBoundaryGeometry;
});
