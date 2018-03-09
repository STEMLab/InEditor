/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "./Layer.js",
  "../Group/CellGroup.js"
],function(
  Layer,
  CellGroup
) {
  'use strict';


  /**
  * @class CellLayer
  * @augments Layer
  */
  function CellLayer(){

    Layer.apply(this, arguments);

    this.init();

  }

  CellLayer.prototype = Object.create(Layer.prototype);

  CellLayer.prototype.init = function(){

    // this.addGroup(new CellGroup());
    this.group = new CellGroup();

    this.layer.add(this.group.getCellGroup());
    this.layer.add(this.group.getTmpGroup());

  }

  CellLayer.prototype.getConnection = function(){
    return this.group.getConnection();
  }

  CellLayer.prototype.getBoundaries = function(){
    return this.group.getBoundaries();
  }

  return CellLayer;

});
