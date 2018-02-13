define([
  "./CellGeometry.js",
  "./CellBoundaryGeometry.js",
  "./StateGeometry.js",
  "./TransitionGeometry.js"
], function(
  CellGeometry,
  CellBoundaryGeometry,
  StateGeometry,
  TransitionGeometry
) {
  'use strict';

  /**
   * @class GeometryContainer
   */
  function GeometryContainer() {
    this.cellGeometry = [];
    this.cellBoundaryGeometry = [];
    this.stateGeometry = [];
    this.transitionGeometry = [];
  }

  /**
   * @memberof GeometryContainer
   */
  GeometryContainer.prototype.show = function() {
    console.log(this);
  }

  /**
   * @param {String} _type
   * @param {String} _id
   * @memberof GeometryContainer
   * @returns {Ojbect}
   */
  GeometryContainer.prototype.getElementById = function(_type, _id) {

    var result = null;

    switch (_type) {
      case 'cell':
        for (var key in this.cellGeometry) {
          if (this.cellGeometry[key].id == _id) result = this.cellGeometry[key];
        }
        break;
      case 'cellBoundary':
        for (var key in this.cellBoundaryGeometry) {
          if (this.cellBoundaryGeometry[key].id == _id) result = this.cellBoundaryGeometry[key];
        }
        break;
      case 'state':
        for (var key in this.stateGeometry) {
          if (this.stateGeometry[key].id == _id) result = this.stateGeometry[key];
        }
        break;
      case 'transition':
        for (var key in this.transitionGeometry) {
          if (this.transitionGeometry[key].id == _id) result = this.transitionGeometry[key];
        }
        break;
      default:

    }

    return result;
  }

  return GeometryContainer;
});
