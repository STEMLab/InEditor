/**
* @author suheeeee <lalune1120@hotmaile.com>
*/
define([
  "./ProjectProperty.js"
],function(
  ProjectProperty
) {
  'use strict';

  /**
  * @classdesc
  * @class
  */
  function PropertyContainer() {
    this.floorProperties = [];
    this.cellProperties = [];
    this.cellBoundaryProperties = [];
    this.stateProperties = [];
    this.transitionProperties = [];
    this.projectProperty = new ProjectProperty();
  }

  PropertyContainer.prototype.getElementById = function(){


  }

  return PropertyContainer;
});
