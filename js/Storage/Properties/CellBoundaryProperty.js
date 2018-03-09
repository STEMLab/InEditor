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
    this.duality = null;

    /**
    * @memberof CellBoundaryProperty
    */
    this.externalReference = [];

    /**
    * @memberof CellBoundaryProperty
    */
    this.partialboundedBy = [];
  }

  return CellBoundaryProperty;
});
