/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  function CellProperty(_id) {

    require('./PropertyBase.js').apply(this, arguments);
    this.featrueType = require('ObjectType').PROPERTY_TYPE.CELL_SPACE;

    let EB = require('./ExtensionBase.js');
    this.extend = new EB();

    /**
     * @memberof CellProperty
     */
    this.externalReference = [];

    /**
     * @memberof CellProperty
     */
    this.partialboundedBy = [];

    this.storey = "";

    this.bottom = 0; // floor ~ bottom
    this.height = 0; // bottom ~ top
  }

  CellProperty.prototype = Object.create(require('./PropertyBase.js').prototype);

  /**
   * @memberof CellProperty
   */
  CellProperty.prototype.load = function(values) {

    var keys = Object.keys(values);
    for(var key of keys){
      if(this[key] != undefined) this[key] = values[key];
    }

  }

  CellProperty.prototype.setDuality = function(_duality){
    this.duality = _duality;
  }

  CellProperty.prototype.addPartialboundedBy = function(part){
    if(this.partialboundedBy.indexOf(part) == -1)
      this.partialboundedBy.push(part);
  }

  CellProperty.prototype.getAvailbleFeatureType = function(){
    let ot = require('ObjectType');
    let result = [""];

    if(this.extend.moduleType == "navi" ){
      result = result.concat(["GeneralSpace", "TransitionSpace", "ConnectionSpace", "AnchorSpace"]);
    }
    else if(this.extend.moduleType == "non-navi"){
      result.push("NonNavigableSpace");
    }

    return result;
  }

  CellProperty.prototype.getAvailbleModuleType = function(){
    return ["", "navi", "non-navi"];
  }

  return CellProperty;
});
