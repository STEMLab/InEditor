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
    this.addCallbackFun('importfile', this.importFile);
    this.addCallbackFun('importgml', this.importGML);

    this.addCallbackFun('updateconditions', this.updateConditions);

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

        window.broker.getManager('setpropertyview', 'UIManager').showSnackBar({msg: 'Project saved successfully ('+window.conditions.savePath+'/'+window.conditions.saveName+'.bson)'});

      } else if( xhr.status == 500){

        window.broker.getManager('setpropertyview', 'UIManager').showSnackBar({msg: xhr.statusText + '! '+ xhr.responseText});

      }
    }

    xhr.open("POST", "http://127.0.0.1:8080/save-project", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({doc : doc, path : window.conditions.savePath+'/'+window.conditions.saveName+'.bson'}));

  }

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.loadProject = function(reqObj) {

    var reader = new FileReader();
    reader.readAsBinaryString(reqObj.file);
    reader.onload = function(e) {

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200) {
          var obj = JSON.parse(xhr.responseText);
          log.info(obj);

          window.conditions.load(obj.conditions);
          delete obj.conditions;

          // manager가 load를 하도록  function move
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
              loadData.canvasContainer[key].height,
              'force'
            );

            window.storage.canvasContainer.stages[key].backgroundLayer.saveFloorplanDataURL(loadData.canvasContainer[key].floorplanDataURL);
            window.storage.canvasContainer.stages[key].backgroundLayer.refresh();

            // bind stage click event
            window.eventHandler.canvasObjectEventBind('stage',
              window.storage.canvasContainer.stages[newFloorProperty.id].stage);

          }

          // add object from geometry
          window.storage.canvasContainer.addObjFromGeometries(window.storage.geometryContainer);

          // refresh tree view
          window.uiContainer.sidebar.treeview.refresh(window.storage.propertyContainer);

        }

      }

      xhr.open("POST", "http://127.0.0.1:8080/convert-bson-to-json", true);
      xhr.send(reader.result);

    }

  }

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.importGML = function(reqObj) {

    var reader = new FileReader();
    reader.readAsText(reqObj.file);

    reader.onload=function(){

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200) {
          var manager = window.broker.getManager('importgml', 'ProjectManager');
          var indoor = JSON.parse(manager.xmlToJson('./output/TMP.gml'));
          var obj = manager.parseJson(indoor);
        }
      }

      xhr.open("POST", "http://localhost:8080/save-gml/TMP", false);
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(reader.result);
    }
  }

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.xmlToJson = function(path){
    var xhr = new XMLHttpRequest();
    var result;
    xhr.onreadystatechange = function() {

      if (xhr.readyState == 4 && xhr.status == 200) {
        result = xhr.response;
      }
    }

    xhr.open("POST", "http://localhost:8080/xml-to-json", false);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.send(path);

    return result;
  }

  /**
   * @memberof ProjectManager
   */
   ProjectManager.prototype.parseJson = function(json){
     log.info(json);
     /// need to develop
   }


  /**
   * @memberof ProjectManager
   */
   ProjectManager.prototype.importFile = function(reqObj) {
     var reader = new FileReader();
     reader.readAsText(reqObj.file);
     reader.onload = function(e) {
       var geojson = JSON.parse(e.target.result);


       if(reqObj.option == 'new-project'){
         /* need to develop */
       } else if(reqObj.importOn.length == 0){
         log.warn('there is no target floor')
         return -1;
       } else {
         window.broker.getManager('addnewfloor', 'GeometryManager').addObjectFromGeojson({'geojson': geojson, 'floor': reqObj.importOn, coor: reqObj.coordinate, condition:{ significant: reqObj.significant}});
       }

     }

   }

   ProjectManager.prototype.updateConditions = function(reqObj){
     var conditions = window.conditions;
     conditions.pre_cell = reqObj.prefix.cell;
     conditions.pre_cellBoundary = reqObj.prefix.cellboundary;
     conditions.pre_state = reqObj.prefix.state;
     conditions.pre_transition  = reqObj.prefix.trnsition;

     // conditions.aspectRatio = reqObj.aspectRatio;
     conditions.scaleFactor = reqObj.canvas.scaleFactor;
     conditions.scaleMax = reqObj.canvas.scaleMax;
     conditions.automGenerateState = reqObj.canvas.automGenerateState;

     $('#setting-conditions-modal').modal('hide');
   }

  return ProjectManager;
});
