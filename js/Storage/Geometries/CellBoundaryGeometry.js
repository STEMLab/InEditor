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

  return CellBoundaryGeometry;
});
