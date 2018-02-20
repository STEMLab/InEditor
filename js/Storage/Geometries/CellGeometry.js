/**
* @author suheeeee<lalune1120@hotmail.com>
*/
define([], function() {
  'use strict';

  /**
  * @class CellGeometry
  */
  function CellGeometry(_id, _points) {

    /**
    * @memberof CellGeometry
    */
    this.id = _id;

    /**
    * @memberof CellGeometry
    */
    this.points = _points;

  }

  return CellGeometry;
});
