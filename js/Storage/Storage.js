/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "./Geometries/GeometryContainer.js",
  "./Properties/PropertyContainer.js",
  "./Canvas/CanvasContainer.js"
],function(
  GeometryContainer,
  PropertyContainer,
  CanvasContainer
) {
  'use strict';

  /**
  * @class Storage
  */
  function Storage() {

    /**
    * @memberof Storage
    * @see GeometryContainer
    */
    this.geometryContainer = new GeometryContainer();

    /**
    * @memberof Storage
    * @see PropertyContainer
    */
    this.propertyContainer = new PropertyContainer();

    /**
    * @memberof Storage
    * @see CanvasContainer
    */
    this.canvasContainer = new CanvasContainer();
  }

  Storage.prototype.show = function(){
    console.log(this);
  }

  return Storage;
});
