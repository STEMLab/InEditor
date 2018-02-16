/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../PubSub/Subscriber.js",
  "../JsonFormat/CellFormat.js"
], function(
  Subscriber,
  CellFormat
) {
  'use strict';

  /**
   * @class ProjectManager
   * @augments Subscriber
   */
  function ProjectManager() {

    Subscriber.apply(this, arguments);

    this.init();
  }

  ProjectManager.prototype = Object.create(Subscriber.prototype);

  ProjectManager.prototype.init = function() {

    this.name = 'ProjectManager';

    this.addCallbackFun('exporttojson', this.exportToJson);

  }

  /**
   * @param {Message.reqObj} reqObj null
   * @memberof ProjectManager
   */
  ProjectManager.prototype.exportToJson = function(reqObj) {

    var manager = window.broker.getManager('exporttojson', 'ProjectManager');

    var cell = { "CellSpace" : manager.celldataToJson() };

    var xhr = new XMLHttpRequest();
    var filename = null;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        log.info(">>>> succeed to exporting json");
      }
    }

    xhr.open("POST", "http://127.0.0.1:8080/export-json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(cell));

  }

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.celldataToJson = function() {

    var result = {};

    var geometries = window.storage.geometryContainer.cellGeometry;

    for (var key in geometries) {

      var tmp = new CellFormat();
      tmp.setCoordinates(geometries[key].points);
      result[geometries[key].id] = tmp;

    }

    var properties = window.storage.propertyContainer.cellProperties;

    for (var key in properties) {

      result[properties[key].id].setName(properties[key].name);
      result[properties[key].id].setDesc(properties[key].description);

    }

    return result;

  }




  return ProjectManager;
});
