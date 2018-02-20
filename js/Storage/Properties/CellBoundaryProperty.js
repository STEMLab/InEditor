/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([],function() {
  'use strict';

  /**
  * @class CellBoundaryProperty
  */
  function CellBoundaryProperty() {

    /**
    * @memberof CellBoundaryProperty
    */
    this.id;

    /**
    * @memberof CellBoundaryProperty
    */
    this.name;

    /**
    * @memberof CellBoundaryProperty
    */
    this.description;

    /**
    * @memberof CellBoundaryProperty
    */
    this.duality;

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
