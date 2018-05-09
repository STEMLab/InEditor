/**
* @author suheeeee<lalune1120@hotmail.com>
*/
define([
  "./Layer.js",
  "../Group/CellBoundaryGroup.js"
],function(
  Layer,
  CellBoundaryGroup
) {
  'use strict';

  /**
  * @class CellBoundaryLayer
  * @augments Layer
  */
  function CellBoundaryLayer(){

    Layer.apply(this, arguments);

    this.init();

  }

  /**
  * @memberof CellBoundaryLayer
  */
  CellBoundaryLayer.prototype = Object.create(Layer.prototype);

  /**
  * @memberof CellBoundaryLayer
  */
  CellBoundaryLayer.prototype.init = function(){
    this.addGroup(new CellBoundaryGroup());
  }


  return CellBoundaryLayer;

});
