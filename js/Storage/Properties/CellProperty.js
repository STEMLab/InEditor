/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([],function() {
  'use strict';

  function CellProperty(_id) {

    /**
    * @memberof CellProperty
    */
    this.id = _id;

    /**
    * @memberof CellProperty
    */
    this.name = _id;

    /**
    * @memberof CellProperty
    */
    this.description = "";

    /**
    * @memberof CellProperty
    */
    this.duality = "";

    /**
    * @memberof CellProperty
    */
    this.externalReference = [];

    /**
    * @memberof CellProperty
    */
    this.partialboundedBy = [];
  }

  return CellProperty;
});
