/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

 define(function(require) {
  'use strict';

  /**
   * @class CellBoundaryProperty
   */
  function CellBoundaryProperty(id) {

    require('./PropertyBase.js').apply(this, arguments);
    this.featrueType = require('ObjectType').PROPERTY_TYPE.CELL_SPACE_BOUNDARY;

    let EB = require('./ExtensionBase.js');
    this.extend = new EB();

    /**
     * @memberof CellBoundaryProperty
     */
    this.externalReference = [];

    this.storey = "";

     this.bottom = 0; // floor ~ bottom
     this.height = 0; // bottom ~ top
  }

  /**
   * @memberof CellBoundaryProperty
   */
  CellBoundaryProperty.prototype.load = function(values) {

    var keys = Object.keys(values);
    for(var key of keys){
      if(this[key] != undefined) this[key] = values[key];
    }


  }

  CellBoundaryProperty.prototype.setDuality = function(_duality){
    this.duality = _duality;
  }

  CellBoundaryProperty.prototype.getAvailbleFeatureType = function(){
    let ot = require('ObjectType');
    let result = [""];

    if(this.extend.moduleType == "navi" ){
      result = result.concat(["ConnectionBoundary", "AnchorBoundary"]);
    }

    return result;
  }

  CellBoundaryProperty.prototype.getAvailbleModuleType = function(){
    return ["", "navi"];
  }

  return CellBoundaryProperty;
});
