/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([],function() {
  'use strict';

  /**
  * @class CellBoundaryProperty
  */
  function CellBoundaryProperty(id) {

    /**
    * @memberof CellBoundaryProperty
    */
    this.id = id;

    /**
    * @memberof CellBoundaryProperty
    */
    this.name = id;

    /**
    * @memberof CellBoundaryProperty
    */
    this.description = "";

    /**
    * @memberof CellBoundaryProperty
    */
    this.duality = "";

    /**
    * @memberof CellBoundaryProperty
    */
    this.externalReference = [];

  }

  return CellBoundaryProperty;
});
