/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */
define([
  "./ProjectProperty.js"
], function(
  ProjectProperty
) {
  'use strict';

  /**
   * @exports PropertyContainer
   */
  function PropertyContainer() {
    this.floorProperties = [];
    this.cellProperties = [];
    this.cellBoundaryProperties = [];
    this.stateProperties = [];
    this.transitionProperties = [];
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
      floorObj.folder = true;

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
        floorObj.children.push(cellObj);
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
        floorObj.children.push(cellBoundaryObj);
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
        floorObj.children.push(stateObj);
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

          transitionObj.children.push(obj);
        }
        floorObj.children.push(transitionObj);
      }

      result.childen.push(floorObj);
    }

    return result;
  }

  return PropertyContainer;
});
