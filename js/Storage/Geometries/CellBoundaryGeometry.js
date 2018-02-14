/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class CellBoundaryGeometry
  */
  function CellBoundaryGeometry() {

    /**
    * @memberof CellBoundaryGeometry
    */
    this.id;

    /**
    * @memberof CellBoundaryGeometry
    */
    this.cellRef; // id of CellGeometry

    /**
    * @memberof CellBoundaryGeometry
    */
    this.index;
  }

  return CellBoundaryGeometry;
});
