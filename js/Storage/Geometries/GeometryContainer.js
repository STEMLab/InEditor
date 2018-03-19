/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

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

  /**
   * @memberof GeometryContainer
   */
  GeometryContainer.prototype.load = function(values) {

    this.loadCells(values.cellGeometry);
    this.loadCellBoundary(values.cellBoundaryGeometry);
    this.loadState(values.stateGeometry);
    this.loadTransition(values.transitionGeometry);

  }


  /**
   * @memberof PropertyContainer
   */
  GeometryContainer.prototype.loadCells = function(values) {

    this.cellGeometry = [];

    for (var index in values) {

      var tmp = new CellGeometry();
      tmp.load(values[index]);
      this.cellGeometry.push(tmp);

    }

  }

  /**
   * @memberof PropertyContainer
   */
  GeometryContainer.prototype.loadCellBoundary = function(values) {

    this.cellBoundaryGeometry = [];

    for (var index in values) {

      var tmp = new CellBoundaryGeometry();
      tmp.load(values[index]);
      this.cellBoundaryGeometry.push(tmp);

    }

  }

  /**
   * @memberof PropertyContainer
   */
  GeometryContainer.prototype.loadState = function(values) {

    this.stateGeometry = [];

    for (var index in values) {

      var tmp = new StateGeometry();
      tmp.load(values[index]);
      this.stateGeometry.push(tmp);

    }

  }

  /**
   * @memberof PropertyContainer
   */
  GeometryContainer.prototype.loadTransition = function(values) {

    this.transitionGeometry = [];

    for (var index in values) {

      var tmp = new TransitionGeometry();
      tmp.load(values[index]);
      this.transitionGeometry.push(tmp);

    }

  }



  return GeometryContainer;
});
