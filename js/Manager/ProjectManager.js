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
    doc['codeList'] = require('Property').CODE_LIST.getInstance().getList();

    var filename = window.conditions.savePath + '/' + window.conditions.saveName + '-' + new Date().getTime() + '.bson';


    // send json data to viewer
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        require('Popup')('success', 'Project saved successfully', filename);
      } else if (xhr.status == 500) {
        require('Popup')('error', xhr.statusText, xhr.responseText);
      }
    }

    xhr.open("POST", "http://127.0.0.1:8080/save-project", true);
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

    var reader = new FileReader();
    reader.readAsBinaryString(reqObj.file);
    reader.onload = function(e) {

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200) {
          var obj = JSON.parse(xhr.responseText);

          window.conditions.load(obj.conditions);
          delete obj.conditions;

          require('Property').CODE_LIST.getInstance().load(obj.codeList);
          delete obj.codeList;

          // manager가 load를 하도록  function move
          var loadData = obj[Object.keys(obj)[0]];
          window.storage.propertyContainer.load(loadData.propertyContainer);
          window.storage.dotFoolContainer.load(loadData.dotFoolContainer);
          window.storage.geometryContainer.load(loadData.geometryContainer, window.storage.dotFoolContainer);

          window.storage.canvasContainer.clearCanvas();

          window.uiContainer.workspace.destroy();

          var manager = window.broker.getManager('loadproject', 'ProjectManager');

          // add workspace and stage
          for (var key in loadData.canvasContainer) {

            var newFloorProperty = window.storage.propertyContainer.getElementById('floor', key);
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
          window.storage.canvasContainer.addObjFromGeometries(window.storage.geometryContainer);

          // refresh tree view
          window.uiContainer.sidebar.treeview.refresh(window.storage.propertyContainer);

        }

      }

      xhr.open("POST", "http://127.0.0.1:8080/convert-bson-to-json", true);
      xhr.send(reader.result);

    }

  }

  ProjectManager.prototype.loadStage = function(key, newFloorProperty, canvasProperty) {


    window.uiContainer.workspace.addNewWorkspace(key, newFloorProperty.name);
    var Stage = require('../Storage/Canvas/Stage.js');
    window.storage.canvasContainer.stages[key] = new Stage(
      newFloorProperty.id,
      newFloorProperty.name,
      newFloorProperty.id,
      canvasProperty.width,
      canvasProperty.height,
      'force'
    );

    window.storage.canvasContainer.stages[key].backgroundLayer.saveFloorplanDataURL(canvasProperty.dataURL);
    window.storage.canvasContainer.stages[key].backgroundLayer.refresh();

    // bind stage click event
    window.eventHandler.canvasObjectEventBind('stage',
      window.storage.canvasContainer.stages[newFloorProperty.id].stage);

    var floorId = newFloorProperty.id;

    // bind right click event
    require("../UI/ContextMenu.js").bindContextMenu(floorId);

  }

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.importGML = function(reqObj) {

    var reader = new FileReader();
    reader.readAsText(reqObj.file);

    reader.onload = function() {

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200) {
          var manager = window.broker.getManager('importgml', 'ProjectManager');
          var indoor = JSON.parse(manager.xmlToJson('./output/TMP.gml'));
          // var parsed = manager.parseJson(indoor);
          var parsed = require("../Utils/GMLHelper.js").parse(indoor);
          manager.makeObj(parsed);
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
  ProjectManager.prototype.xmlToJson = function(path) {
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

  ProjectManager.prototype.makeObj = function(data) {
    window.storage.clear();
    window.uiContainer.workspace.destroy();
    window.uiContainer.sidebar.treeview.init();
    window.conditions.automGenerateState = false;
    window.conditions.LAST_FLOOR_ID_NUM = 0;
    window.conditions.coordinateThreshold = 0;
    window.conditions.realCoordinateThreshold = 0;
    window.conditions.realSnappingThreshold = 0;
    window.conditions.snappingThreshold = 0;
    window.conditions.descList = [];

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
    for (floorId in data.floorData) {

      window.broker.publish({
        req: 'addnewfloor',
        reqObj: {
          'floor': floorId
        }
      });


      var floorProperty = window.storage.propertyContainer.getElementById('floor', floorId);
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

    for (floorId in data.floorData) {
      var stage = window.storage.canvasContainer.stages[floorId];
      stage.stage.height(transResult.newCanvasSize.height);
      stage.stage.width(transResult.newCanvasSize.width);
      stage.backgroundLayer.setGrid(transResult.newCanvasSize.width, transResult.newCanvasSize.height);
    }

    window.conditions.coordinateThreshold = 10;
    window.conditions.realCoordinateThreshold = 0.0000001;
    window.conditions.realSnappingThreshold = 0.0000001;
    window.conditions.snappingThreshold = 10;

    window.broker.publish({
      req: 'addproeprtydatafromgml',
      reqObj: transResult.data.floorData
    });

    window.broker.publish({
      req: 'addobjectfromgml',
      reqObj: transResult.data.floorData
    });

    window.conditions.realCoordinateThreshold = 10;
    window.conditions.realSnappingThreshold = 10;

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
        window.broker.getManager('addnewfloor', 'GeometryManager').addObjectFromGeojson({
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
    var conditions = window.conditions;
    conditions.pre_cell = reqObj.prefix.cell;
    conditions.pre_cellBoundary = reqObj.prefix.cellboundary;
    conditions.pre_state = reqObj.prefix.state;
    conditions.pre_transition = reqObj.prefix.trnsition;

    // conditions.aspectRatio = reqObj.aspectRatio;
    conditions.scaleFactor = reqObj.canvas.scaleFactor;
    conditions.scaleMax = reqObj.canvas.scaleMax;
    conditions.automGenerateState = reqObj.canvas.automGenerateState;

    $('#setting-conditions-modal').modal('hide');
  }

  return ProjectManager;
});
