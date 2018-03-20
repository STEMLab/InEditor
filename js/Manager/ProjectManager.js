/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../PubSub/Subscriber.js",
  "../Conditions.js",
  "../Storage/Canvas/Stage.js"
], function(
  Subscriber,
  Conditions,
  Stage
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

    this.addCallbackFun('saveproject', this.saveProject);
    this.addCallbackFun('loadproject', this.loadProject);

  }

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.saveProject = function() {


    // Serialize document
    var id = window.storage.propertyContainer.projectProperty.id;
    var doc = {};
    doc[id] = {
      'geometryContainer': window.storage.geometryContainer,
      'propertyContainer': window.storage.propertyContainer,
      'dotFoolContainer': window.storage.dotFoolContainer,
      'canvasContainer': {}
    };

    for (var key in window.storage.canvasContainer.stages) {

      doc[id].canvasContainer[key] = {
        width: window.storage.canvasContainer.stages[key].stage.getAttr('width'),
        height: window.storage.canvasContainer.stages[key].stage.getAttr('height'),
        floorplanDataURL: window.storage.canvasContainer.stages[key].backgroundLayer.floorplanDataURL[0]
      };

    }

    doc['conditions'] = window.conditions;


    // send json data to viewer
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        log.info(">>>> succeed to save project");
      }
    }

    xhr.open("POST", "http://127.0.0.1:8080/save-project", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(doc));

  }

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.loadProject = function() {

    // send json data to viewer
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        var obj = JSON.parse(xhr.responseText);
        log.info(obj);

        window.conditions.load(obj.conditions);
        delete obj.conditions;

        var loadData = obj[Object.keys(obj)[0]];
        window.storage.propertyContainer.load(loadData.propertyContainer);
        window.storage.dotFoolContainer.load(loadData.dotFoolContainer);
        window.storage.geometryContainer.load(loadData.geometryContainer, window.storage.dotFoolContainer);

        window.storage.canvasContainer.clearCanvas();

        window.uiContainer.workspace.destroy();

        // add workspace and stage
        for (var key in loadData.canvasContainer) {

          var newFloorProperty = window.storage.propertyContainer.getElementById('floor', key);

          window.uiContainer.workspace.addNewWorkspace(key, newFloorProperty.name);

          window.storage.canvasContainer.stages[key] = new Stage(
            newFloorProperty.id,
            newFloorProperty.name,
            newFloorProperty.id,
            loadData.canvasContainer[key].width,
            loadData.canvasContainer[key].height
          );

          window.storage.canvasContainer.stages[key].backgroundLayer.saveFloorplanDataURL(loadData.canvasContainer[key].floorplanDataURL);
          window.storage.canvasContainer.stages[key].backgroundLayer.refresh();

          // bind stage click event
          window.eventHandler.stageEventBind('stage', newFloorProperty.id);

        }

        // add object from geometry
        window.storage.canvasContainer.addObjFromGeometries(window.storage.geometryContainer);

        // refresh tree view
        window.uiContainer.sidebar.treeview.refresh(window.storage.propertyContainer);

        log.info(">>>> succeed to load project");
      }
    }

    xhr.open("GET", "http://127.0.0.1:8080/load-project", true);
    xhr.send();

  }

  return ProjectManager;
});
