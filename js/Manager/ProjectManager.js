/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  /**
   * @class ProjectManager
   * @augments Subscriber
   */
  function ProjectManager() {

    require('Subscriber').apply(this, arguments);

    this.init();
  }

  ProjectManager.prototype = Object.create(require('Subscriber').prototype);

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
    var canvasContainer = require('Storage').getInstance().getCanvasContainer();
    var geometryContainer = require('Storage').getInstance().getGeometryContainer();
    var dotPoolContainer = require('Storage').getInstance().getDotPoolContainer();
    var propertyContainer = require('Storage').getInstance().getPropertyContainer();

    // Serialize document
    var id = propertyContainer.projectProperty.id;
    var doc = {};
    doc[id] = {
      'geometryContainer': geometryContainer,
      'propertyContainer': propertyContainer,
      'dotPoolContainer': dotPoolContainer,
      'canvasContainer': {}
    };

    for (var key in canvasContainer.stages) {

      doc[id].canvasContainer[key] = {
        width: canvasContainer.stages[key].stage.getAttr('width'),
        height: canvasContainer.stages[key].stage.getAttr('height'),
        floorplanDataURL: canvasContainer.stages[key].backgroundLayer.floorplanDataURL[0]
      };

    }

    doc['conditions'] = require('Conditions').getInstance();
    doc['codeList'] = require('Property').CODE_LIST.getInstance().getList();

    var filename = doc.conditions.savePath + '/' + require('Conditions').getInstance().saveName
    filename += doc.conditions.saveWithTimeStamp ? '-' + new Date().getTime() : '';
    filename += '.bson';


    // send json data to viewer
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        require('Popup')('success', 'Project saved successfully', filename);
      } else if (xhr.status == 500) {
        require('Popup')('error', xhr.statusText, xhr.responseText);
      }
    }

    xhr.open("POST", "http://127.0.0.1:5757/save-project", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({
      doc: doc,
      path: filename
    }));

  }

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.loadProject = function(reqObj) {

    $('#loading-modal')[0].children[0].innerHTML = "Load Project";
    $('#loading-modal').modal("show");


    var reader = new FileReader();
    reader.readAsBinaryString(reqObj.file);
    reader.onload = function(e) {

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200) {
          var obj = JSON.parse(xhr.responseText);

          require('Conditions').getInstance().load(obj.conditions);
          delete obj.conditions;

          if(obj.codeList != undefined){
            require('Property').CODE_LIST.getInstance().load(obj.codeList);
            delete obj.codeList;
          }


          // manager가 load를 하도록  function move
          var storage = require('Storage').getInstance();
          var loadData = obj[Object.keys(obj)[0]];
          var propertyContainer = storage.getPropertyContainer();

          propertyContainer.load(loadData.propertyContainer);

          if(loadData.dotPoolContainer == undefined && loadData.dotFoolContainer != undefined){
            loadData['dotPoolContainer'] = JSON.parse(JSON.stringify(loadData['dotFoolContainer']));
            loadData.dotPoolContainer['dotPool'] = JSON.parse(JSON.stringify(loadData.dotPoolContainer.dotFool))
          }

          storage.getDotPoolContainer().load(loadData.dotPoolContainer);
          storage.getGeometryContainer().load(loadData.geometryContainer, storage.getDotPoolContainer());

          storage.getCanvasContainer().clearCanvas();

          require('UI').getInstance().workspace.destroy();

          var manager = require('Broker').getInstance().getManager('loadproject', 'ProjectManager');

          // add workspace and stage
          for (var key in loadData.canvasContainer) {

            var newFloorProperty = propertyContainer.getElementById('floor', key);
            manager.loadStage(
              key,
              newFloorProperty, {
                width: loadData.canvasContainer[key].width,
                height: loadData.canvasContainer[key].height,
                dataURL: loadData.canvasContainer[key].floorplanDataURL
              }

            );
          }

          // add object from geometry
          storage.getCanvasContainer().addObjFromGeometries(
            storage.getGeometryContainer());

          // refresh tree view
          require('UI').getInstance().treeView.refresh(storage.getPropertyContainer());

          $('#loading-modal').modal("hide");
        }

      }

      xhr.open("POST", "http://127.0.0.1:5757/convert-bson-to-json", true);
      xhr.send(reader.result);

    }

  }

  ProjectManager.prototype.loadStage = function(key, newFloorProperty, canvasProperty) {


    require('UI').getInstance().workspace.addNewWorkspace(key, newFloorProperty.name);
    var Stage = require('../Storage/Canvas/Stage.js');
    var canvasContainer = require('Storage').getInstance().getCanvasContainer();

    canvasContainer.stages[key] = new Stage(
      newFloorProperty.id,
      newFloorProperty.name,
      newFloorProperty.id,
      canvasProperty.width,
      canvasProperty.height,
      'force'
    );

    canvasContainer.stages[key].backgroundLayer.saveFloorplanDataURL(canvasProperty.dataURL);
    canvasContainer.stages[key].backgroundLayer.refresh();

    // bind stage click event
    require('EventHandler').getInstance().canvasObjectEventBind(
      'stage',
      canvasContainer.stages[newFloorProperty.id].stage);

    var floorId = newFloorProperty.id;

    // bind right click event
    // require("@UI/ContextMenu.js").bindContextMenu(floorId);

  }

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.importGML = function(reqObj) {
    $('#loading-modal')[0].children[0].innerHTML = "Import IndoorGML file";
    $('#loading-modal').modal("show");

    var reader = new FileReader();
    reader.readAsText(reqObj.file);

    reader.onload = function() {

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200) {
          var manager = require('Broker').getInstance().getManager('importgml', 'ProjectManager');
          var indoor = JSON.parse(manager.xmlToJson('./output/TMP.gml'));
          var parsed = require("../Utils/GMLHelper.js").parse(indoor);
          manager.makeObj(parsed);
        }

        $('#loading-modal').modal("hide");
      }

      xhr.open("POST", "http://localhost:5757/save-gml/TMP", false);
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(reader.result);
    }
  }

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.xmlToJson = function(path) {
    var xhr = new XMLHttpRequest();
    var result;
    xhr.onreadystatechange = function() {

      if (xhr.readyState == 4 && xhr.status == 200) {
        result = xhr.response;
      }
    }

    xhr.open("POST", "http://localhost:5757/xml-to-json", false);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.send(path);

    return result;
  }

  ProjectManager.prototype.makeObj = function(data) {
    require('Storage').getInstance().clear();
    require('UI').getInstance().workspace.destroy();
    require('UI').getInstance().treeView.init();
    require('Conditions').getInstance().automGenerateState = false;
    require('Conditions').getInstance().LAST_FLOOR_ID_NUM = 0;
    require('Conditions').getInstance().coordinateThreshold = 0;
    require('Conditions').getInstance().realCoordinateThreshold = 0;
    require('Conditions').getInstance().realSnappingThreshold = 0;
    require('Conditions').getInstance().snappingThreshold = 0;
    require('Conditions').getInstance().descList = [];

    // extend bbox
    function extendBBox(bbox, width, height) {
      bbox.max.x += (width / 10);
      bbox.min.x -= (width / 10);
      bbox.max.y += (height / 10);
      bbox.min.y -= (height / 10);

      return bbox;
    }

    var dataSize = {
      width: Math.abs(data.bbox.max.x - data.bbox.min.x),
      height: Math.abs(data.bbox.max.y - data.bbox.min.y)
    };
    data.bbox = extendBBox(data.bbox, dataSize.width, dataSize.height);

    var floorId;
    var propertyContainer = require('Storage').getInstance().getPropertyContainer();
    for (floorId in data.floorData) {

      require('Broker').getInstance().publish({
        req: 'addnewfloor',
        reqObj: {
          'floor': floorId
        }
      });


      var floorProperty = propertyContainer.getElementById('floor', floorId);
      floorProperty.groundHeight = data.floorData[floorId].floorHight;
      floorProperty.celingHeight = data.floorData[floorId].celingHeight;
      floorProperty.lowerCorner = [data.bbox.min.x, data.bbox.min.y];
      floorProperty.upperCorner = [data.bbox.max.x, data.bbox.max.y];
      floorProperty.layer = data.floorData[floorId].layer;
      floorProperty.doorHeight = data.floorData[floorId].doorHeight != -1 ? data.floorData[floorId].doorHeight : 15;
    }

    var transResult = require("../Utils/GMLHelper.js").transCoor(
      data, {
        height: document.getElementById(floorId).clientHeight,
        width: document.getElementById(floorId).clientWidth
      }
    );

    var canvasContainer = require('Storage').getInstance().getCanvasContainer();
    for (floorId in data.floorData) {
      var stage = canvasContainer.stages[floorId];
      stage.stage.height(transResult.newCanvasSize.height);
      stage.stage.width(transResult.newCanvasSize.width);
      stage.backgroundLayer.setGrid(transResult.newCanvasSize.width, transResult.newCanvasSize.height);
    }

    require('Conditions').getInstance().coordinateThreshold = 10;
    require('Conditions').getInstance().realCoordinateThreshold = 0.0000001;
    require('Conditions').getInstance().realSnappingThreshold = 0.0000001;
    require('Conditions').getInstance().snappingThreshold = 10;

    require('Broker').getInstance().publish({
      req: 'addproeprtydatafromgml',
      reqObj: [transResult.data.floorData, data.interLayerConnection]
    });

    require('Broker').getInstance().publish({
      req: 'addobjectfromgml',
      reqObj: transResult.data.floorData
    });

    require('Conditions').getInstance().realCoordinateThreshold = 10;
    require('Conditions').getInstance().realSnappingThreshold = 10;

  }


  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.importFile = function(reqObj) {

    var reader = new FileReader();
    reader.readAsText(reqObj.file);
    reader.onload = function(e) {
      var geojson = JSON.parse(e.target.result);


      if (reqObj.option == 'new-project') {
        /* need to develop */
      } else if (reqObj.importOn.length == 0) {
        log.warn('there is no target floor')
        return -1;
      } else {
        require('Broker').getInstance().getManager('addnewfloor', 'GeometryManager').addObjectFromGeojson({
          'geojson': geojson,
          'floor': reqObj.importOn,
          coor: reqObj.coordinate,
          condition: {
            significant: reqObj.significant
          }
        });
      }

    }
  }

  ProjectManager.prototype.updateConditions = function(reqObj) {
    var conditions = require('Conditions').getInstance();
    conditions.pre_cell = reqObj.prefix.cell;
    conditions.pre_cellBoundary = reqObj.prefix.cellboundary;
    conditions.pre_state = reqObj.prefix.state;
    conditions.pre_transition = reqObj.prefix.trnsition;

    var ratio = reqObj.canvas.aspectRatio.split(':');

    if(ratio.length != 2){
      require('Popup')('error', 'Invalid Input', reqObj.canvas.aspectRatio);
    }
    else{
      conditions.aspectRatio = {
        x: ratio[0]*1,
        y: ratio[1]*1
      };
    }

    conditions.scaleFactor = reqObj.canvas.scaleFactor;
    conditions.scaleMax = reqObj.canvas.scaleMax;
    conditions.automGenerateState = reqObj.canvas.automGenerateState;

    conditions.saveWithTimeStamp = reqObj.save.saveWithTimeStamp;

    require('Popup')('success', 'General Conditons updated');

    $('#setting-conditions-modal').modal('hide');
  }

  return ProjectManager;
});
