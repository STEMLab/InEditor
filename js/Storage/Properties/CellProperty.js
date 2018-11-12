/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
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
    this.description = {};
    var list = window.conditions.descList;
    for (var l of list) {
      this.description[l] = "";
    }


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

    /**
     * @memberof CellProperty
     * @desc  NavigableSpace, GeneralSpace, TransferSpace, TransitionSpace, ConnectionSpace, AnchorSpace
     */
    this.naviType = "";

    this.navi = {
      class: "",
      function: "",
      usage: ""
    }
  }

  /**
   * @memberof CellProperty
   */
  CellProperty.prototype.load = function(values) {

    this.id = values.id;
    this.name = values.name;
    this.description = values.description;
    this.duality = values.duality;
    this.externalReference = values.externalReference;
    this.partialboundedBy = values.partialboundedBy;

  }

  return CellProperty;
});
