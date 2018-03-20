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
  GeometryContainer.prototype.load = function(values, dotFoolContainer) {

    this.loadCells(values.cellGeometry, dotFoolContainer);
    this.loadCellBoundary(values.cellBoundaryGeometry, dotFoolContainer);
    this.loadState(values.stateGeometry);
    this.loadTransition(values.transitionGeometry);

  }


  /**
   * @memberof GeometryContainer
   */
  GeometryContainer.prototype.loadCells = function(values, dotFoolContainer) {

    this.cellGeometry = [];

    for (var index in values) {

      var tmp = new CellGeometry();
      tmp.load(values[index]);

      for(var key in tmp.points){
        tmp.points[key] = dotFoolContainer.getDotById(tmp.points[key].uuid);
      }

      this.cellGeometry.push(tmp);

    }

  }

  /**
   * @memberof GeometryContainer
   */
  GeometryContainer.prototype.loadCellBoundary = function(values, dotFoolContainer) {

    this.cellBoundaryGeometry = [];

    for (var index in values) {

      var tmp = new CellBoundaryGeometry();
      tmp.load(values[index]);

      for(var key in tmp.points){
        tmp.points[key] = dotFoolContainer.getDotById(tmp.points[key].uuid);
      }

      this.cellBoundaryGeometry.push(tmp);

    }

  }

  /**
   * @memberof GeometryContainer
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
   * @memberof GeometryContainer
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
