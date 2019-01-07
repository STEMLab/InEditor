/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "./Geometries/GeometryContainer.js",
  "./Properties/PropertyContainer.js",
  "./Canvas/CanvasContainer.js",
  "./Dot/DotFoolContainer.js"
],function(
  GeometryContainer,
  PropertyContainer,
  CanvasContainer,
  DotFoolContainer
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

    /**
    * @memberof Storage
    * @see DotFoolContainer
    */
    this.dotFoolContainer = new DotFoolContainer();

  }

  Storage.prototype.show = function(){
    log.info(this);
  }

  Storage.prototype.clear = function(){
    this.geometryContainer.clear();
    this.propertyContainer.clear();
    this.canvasContainer.clear();
    this.dotFoolContainer.clear();
  }

  return Storage;
});
