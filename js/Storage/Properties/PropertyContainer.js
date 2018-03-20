/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./ProjectProperty.js",
  "./FloorProperty.js",
  "./CellProperty.js",
  "./CellBoundaryProperty.js",
  "./StateProperty.js",
  "./TransitionProperty.js"
], function(
  ProjectProperty,
  FloorProperty,
  CellProperty,
  CellBoundaryProperty,
  StateProperty,
  TransitionProperty
) {
  'use strict';

  /**
   * @class PropertyContainer
   */
  function PropertyContainer() {

    /**
     * @memberof PropertyContainer
     */
    this.floorProperties = [];

    /**
     * @memberof PropertyContainer
     */
    this.cellProperties = [];

    /**
     * @memberof PropertyContainer
     */
    this.cellBoundaryProperties = [];

    /**
     * @memberof PropertyContainer
     */
    this.stateProperties = [];

    /**
     * @memberof PropertyContainer
     */
    this.transitionProperties = [];

    /**
     * @memberof PropertyContainer
     */
    // this.projectProperty = null;
    this.projectProperty = new ProjectProperty();
  }

  /**
   * @param {String} _type
   * @param {String} _id
   * @returns {Ojbect}
   */
  PropertyContainer.prototype.getElementById = function(_type, _id) {

    var path;
    var result = null;

    if (this.projectProperty == null) path = window.storage.propertyContainer;
    else path = this;

    switch (_type) {
      case 'project':
        result = path.projectProperty;
        break;
      case 'floor':
        for (var i = 0; i < path.floorProperties.length && result == null; i++) {
          if (path.floorProperties[i].id == _id) result = path.floorProperties[i];
        }
        break;
      case 'cell':
        for (var i = 0; i < path.cellProperties.length && result == null; i++) {
          if (path.cellProperties[i].id == _id) result = path.cellProperties[i];
        }
        break;
      case 'cellBoundary':
        for (var i = 0; i < path.cellBoundaryProperties.length && result == null; i++) {
          if (path.cellBoundaryProperties[i].id == _id) result = path.cellBoundaryProperties[i];
        }
        break;
      case 'state':
        for (var i = 0; i < path.stateProperties.length && result == null; i++) {
          if (path.stateProperties[i].id == _id) result = path.stateProperties[i];
        }
        break;
      case 'transition':
        for (var i = 0; i < path.transitionProperties.length && result == null; i++) {
          if (path.transitionProperties[i].id == _id) result = path.transitionProperties[i];
        }
        break;
      default:
        console.log("wrong param " + _type + ", " + _id);
    }

    return result;
  }


  /**
   * @param {String} _type
   * @param {String} _id
   * @returns {String} floor id or null
   */
  PropertyContainer.prototype.getFloorById = function(_type, _id) {

    for (var key in this.floorProperties) {

      switch (_type) {
        case 'cell':
          if (this.floorProperties[key].cellKey.indexOf(_id) != -1) return this.floorProperties[key].id;
          break;
        case 'cellBoundary':
          if (this.floorProperties[key].cellBoundaryKey.indexOf(_id) != -1) return this.floorProperties[key].id;
          break;
        case 'state':
          if (this.floorProperties[key].stateKey.indexOf(_id) != -1) return this.floorProperties[key].id;
          break;
        case 'transition':
          if (this.floorProperties[key].transitionKey.indexOf(_id) != -1) return this.floorProperties[key].id;
          break;
        default:

      }
    }

    log.warn("There is no object which id is " + _id + " !");

    return null;
  }

  /**
   * @desc Converts information of stored object to json for tree view and returns it.
   * @returns {json} json object for tree view.
   */
  PropertyContainer.prototype.toJson = function() {
    var result = new Object;

    if (this.floorProperties == null) {
      result.title = window.storage.projectProperty.name;
      result.key = window.storage.projectProperty.id;
      result.type = "project";
      result.folder = true;
    } else {
      result.title = this.projectProperty.id;
      result.key = this.projectProperty.id;
      result.type = "project";
      result.folder = true;
    }

    result.childen = new Array();

    var path;

    if (this.floorProperties == null) path = window.storage.propertyContainer.floorProperties;
    else path = this.floorProperties;

    for (var i = 0; i < path.length; i++) {
      var floorObj = new Object;
      floorObj.title = path[i].name;
      floorObj.key = path[i].id;
      floorObj.children = new Array();
      floorObj.type = "floor";
      floorObj.icon = '../../assets/tree-icon/floor.png'
      floorObj.folder = true;

      floorObj.children.push({
        "title": "Cell",
        "key": floorObj.key + "-cell",
        "folder": true,
        "type": "cellFolder"
      });
      floorObj.children.push({
        "title": "CellBoundary",
        "key": floorObj.key + "-cellBoundary",
        "folder": true,
        "type": "cellBoundaryFolder"
      });
      floorObj.children.push({
        "title": "State",
        "key": floorObj.key + "-state",
        "folder": true,
        "type": "stateFolder"
      });
      floorObj.children.push({
        "title": "Transition",
        "key": floorObj.key + "-transition",
        "folder": true,
        "type": "transtitionFolder"
      });

      if (path[i].cellKey.length != 0) {
        var cellObj = new Object;
        cellObj.title = "Cell";
        cellObj.key = "";
        cellObj.children = new Array();
        cellObj.folder = true;

        for (var j = 0; j < path[i].cellKey.length; i++) {
          var obj = new Object;
          obj.title = path[i].cellKey[j];
          obj.key = path[i].cellKey[j];

          cellObj.children.push(obj);
        }
        floorObj.children[0].push(cellObj);
      }

      if (path[i].cellBoundaryKey.length != 0) {
        var cellBoundaryObj = new Object;
        cellBoundaryObj.title = "Cell Boundary";
        cellBoundaryObj.key = "";
        cellBoundaryObj.children = new Array();
        cellBoundaryObj.folder = true;

        for (var j = 0; j < path[i].cellBoundaryKey.length; i++) {
          var obj = new Object;
          obj.title = path[i].cellBoundaryKey[j];
          obj.key = path[i].cellBoundaryKey[j];

          cellBoundaryObj.children.push(obj);
        }
        floorObj.children[1].push(cellBoundaryObj);
      }


      if (path[i].stateKey.length != 0) {
        var stateObj = new Object;
        stateObj.title = "Cell Boundary";
        stateObj.key = "";
        stateObj.children = new Array();
        stateObj.folder = true;

        for (var j = 0; j < path[i].stateKey.length; i++) {
          var obj = new Object;
          obj.title = path[i].stateKey[j];
          obj.key = path[i].stateKey[j];

          stateObj.children.push(obj);
        }
        floorObj.children[2].push(stateObj);
      }

      if (path[i].transitionKey.length != 0) {
        var transitionObj = new Object;
        transitionObj.title = "Cell Boundary";
        transitionObj.key = "";
        transitionObj.children = new Array();
        transitionObj.folder = true;

        for (var j = 0; j < path[i].transitionKey.length; i++) {
          var obj = new Object;
          obj.title = path[i].transitionKey[j];
          obj.key = path[i].transitionKey[j];

          transitionObj[3].children.push(obj);
        }
        floorObj.children.push(transitionObj);
      }

      result.childen.push(floorObj);
    }

    return result;
  }

  /**
   * @memberof PropertyContainer
   */
  PropertyContainer.prototype.load = function(values) {

    this.projectProperty.load(values.projectProperty);
    this.loadFloors(values.floorProperties);
    this.loadCells(values.cellProperties);
    this.loadCellBoundary(values.cellBoundaryProperties);
    this.loadState(values.stateProperties);
    this.loadTransition(values.transitionProperties);

  }

  /**
   * @memberof PropertyContainer
   */
  PropertyContainer.prototype.loadFloors = function(values) {

    this.floorProperties = [];

    for (var index in values) {

      var tmp = new FloorProperty(values[index].id);
      tmp.load(values[index]);
      this.floorProperties.push(tmp);

    }

  }

  /**
   * @memberof PropertyContainer
   */
  PropertyContainer.prototype.loadCells = function(values) {

    this.cellProperties = [];

    for (var index in values) {

      var tmp = new CellProperty();
      tmp.load(values[index]);
      this.cellProperties.push(tmp);

    }

  }

  /**
   * @memberof PropertyContainer
   */
  PropertyContainer.prototype.loadCellBoundary = function(values) {

    this.cellBoundaryProperties = [];

    for (var index in values) {

      var tmp = new CellBoundaryProperty();
      tmp.load(values[index]);
      this.cellBoundaryProperties.push(tmp);

    }

  }

  /**
   * @memberof PropertyContainer
   */
  PropertyContainer.prototype.loadState = function(values) {

    this.stateProperties = [];

    for (var index in values) {

      var tmp = new StateProperty();
      tmp.load(values[index]);
      this.stateProperties.push(tmp);

    }

  }

  /**
   * @memberof PropertyContainer
   */
  PropertyContainer.prototype.loadTransition = function(values) {

    this.transitionProperties = [];

    for (var index in values) {

      var tmp = new TransitionProperty();
      tmp.load(values[index]);
      this.transitionProperties.push(tmp);

    }

  }


  return PropertyContainer;
});
