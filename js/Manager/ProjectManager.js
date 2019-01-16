/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../PubSub/Subscriber.js",
  "../Conditions.js",
  "../Storage/Canvas/Stage.js",
  "../UI/ContextMenu.js"
], function(
  Subscriber,
  Conditions,
  Stage,
  ContextMenu
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

        window.broker.getManager('setpropertyview', 'UIManager').showSnackBar({
          msg: 'Project saved successfully (' + window.conditions.savePath + '/' + window.conditions.saveName + '.bson)'
        });

      } else if (xhr.status == 500) {

        window.broker.getManager('setpropertyview', 'UIManager').showSnackBar({
          msg: xhr.statusText + '! ' + xhr.responseText
        });

      }
    }

    xhr.open("POST", "http://127.0.0.1:8080/save-project", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({
      doc: doc,
      path: window.conditions.savePath + '/' + window.conditions.saveName + '.bson'
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

          var manager = window.broker.getManager('loadproject', 'ProjectManager');

          // add workspace and stage
          for (var key in loadData.canvasContainer) {

            var newFloorProperty = window.storage.propertyContainer.getElementById('floor', key);
            manager.loadStage(
              key,
              newFloorProperty,
              {
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
    ContextMenu.bindContextMenu(floorId);

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
          var parsed = manager.parseJson(indoor);
          manager.makeeObj(parsed);
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

  /**
   * @memberof ProjectManager
   */
  ProjectManager.prototype.parseJson = function(json) {

    var docId = json.value.id;

    // primalSpaceFeatures
    var primalSpaceFeatures = json.value.primalSpaceFeatures.primalSpaceFeatures;
    var primalSpaceFeaturesId = primalSpaceFeatures.id;
    var cm = primalSpaceFeatures.cellSpaceMember != undefined ?
      this.parseCellSpaceMember(primalSpaceFeatures.cellSpaceMember) :
      null;
    var cbm = primalSpaceFeatures.cellSpaceBoundaryMember != undefined ?
      this.parseCellBoundaryMember(primalSpaceFeatures.cellSpaceBoundaryMember) :
      null;

    // multiLayeredGraph
    var mlg = json.value.multiLayeredGraph.multiLayeredGraph;
    var mlgId = mlg.id;
    var spaceLayersId = mlg.spaceLayers.id;
    var spaceLayers = {};
    for (var spaceLayer of mlg.spaceLayers[0].spaceLayerMember) {
      spaceLayer = spaceLayer.spaceLayer;
      spaceLayers[spaceLayer.id] = this.parseSpaceLayer(spaceLayer);
    }

    return {
      cm: cm,
      cbm: cbm,
      layers: spaceLayers
    };
  }

  ProjectManager.prototype.parseBasicProperty = function(obj) {
    var property = {
      id: obj.id,
      description: {},
      duality: null,
      name: null
    };

    if (obj.name != undefined) property['name'] = obj.name[0].value.trim();
    if (obj.duality != undefined) property['duality'] = obj.duality.href.substring(1);

    if (obj.description != undefined && Object.keys(obj.description).length > 0) {
      var descArr = obj.description.value.trim().split(':');
      for (var desc of descArr) {
        if (desc != "") {
          var parse = desc.split('=');
          property['description'][parse[0]] = parse[1].substring(1, parse[1].length - 1);
        }
      }
    }

    if (obj.externalReference != undefined) {
      property['externalReference'] = obj.externalReference;
    }

    return property;
  }

  ProjectManager.prototype.parseSurface = function(surface) {
    function existInArray(_points, coor) {
      for (var c of _points) {
        if (coor[0] == c[0] && coor[1] == c[1]) return true;
      }
      return false;
    }

    var posOrPointPropertyOrPointRep = surface.abstractSurface.value.exterior.abstractRing.value.posOrPointPropertyOrPointRep;
    var _points = [];
    var low = 999999999999,
      high = -999999999999,
      _z = -1;

    for (var point of posOrPointPropertyOrPointRep) {
      var coor = [point.value.value[0], point.value.value[1]];
      var z = point.value.value[2];

      if (low > z) low = z;
      if (high < z) high = z;

      if (_z == -1) _z = z;
      else if (_z == z && !existInArray(_points, coor)) _points.push(coor);
      else {
        _points = [];
        break;
      }
    }

    return {
      _points: _points,
      low: low,
      high: high
    };
  }


  ProjectManager.prototype.parseSolid = function(solid) {
    var result = {},
      exterior;
    var z_low = 999999999999,
      z_high = -999999999999;
    var points = [];

    if (solid.value.exterior != undefined) {
      exterior = solid.value.exterior.shell.surfaceMember;

      for (var surface of exterior) {
        var parse = this.parseSurface(surface);
        if (z_low > parse.low) z_low = parse.low;
        if (z_high < parse.high) z_high = parse.high;

        if (parse._points.length > 0 && parse._points.length > points.length) points = parse._points;
      }

      result['points'] = points;
      result['floorHight'] = z_low;
      result['celingHeight'] = z_high - z_low;

      var holes = [];
      if (solid.value.interior != undefined) {
        var interiors = solid.value.interior;

        for (var interior of interiors) {
          points = [];

          for (var surface of interior.shell.surfaceMember) {
            var parse = this.parseSurface(surface);
            if (parse._points.length > 0 && parse._points.length > points.length) points = parse._points;
          }

          if (points.length > 0) holes.push(points);
        }

        result['holes'] = holes;
      }
    }
    return result;
  }

  ProjectManager.prototype.parsePolygon = function(polygon) {
    var posOrPointPropertyOrPointRep = polygon.abstractSurface.value.exterior.abstractRing.value.posOrPointPropertyOrPointRep;
    var _points = [];
    var low = 999999999999,
      high = -999999999999,
      _z = -1;

    function existInArray(_points, coor) {
      for (var c of _points) {
        if (coor[0] == c[0] && coor[1] == c[1]) return true;
      }
      return false;
    }

    for (var point of posOrPointPropertyOrPointRep) {
      var coor = [point.value.value[0], point.value.value[1]];
      var z = point.value.value[2];

      if (low > z) low = z;
      if (high < z) high = z;

      if (!existInArray(_points, coor)) {
        if (_z == -1) {
          _z = z;
          _points.push(coor);
        } else if (_z == z)
          _points.push(coor);
      }

    }

    return {
      _points: _points,
      low: low,
      high: high
    };
  }

  ProjectManager.prototype.parseCellSpaceMember = function(cellSpaceMember) {

    var VERY_SMALL_VALUE = -99999999999;
    var VERY_BIG_VALUE = 99999999999;
    var boundingBox = {
      min: {
        x: VERY_BIG_VALUE,
        y: VERY_BIG_VALUE
      },
      max: {
        x: VERY_SMALL_VALUE,
        y: VERY_SMALL_VALUE
      }
    };

    function setBBox(coor) {
      if (coor.x > boundingBox.max.x) boundingBox.max.x = coor.x;
      if (coor.y > boundingBox.max.y) boundingBox.max.y = coor.y;
      if (coor.x < boundingBox.min.x) boundingBox.min.x = coor.x;
      if (coor.y < boundingBox.min.y) boundingBox.min.y = coor.y;
    }

    var cells = {};
    var cellListByHight = {};
    var layers = {};

    for (var cell of cellSpaceMember) {
      cell = cell.cellSpace;

      var cellData = this.parseBasicProperty(cell);
      cellData['partialboundedBy'] = [];

      if (cell.partialboundedBy != undefined) {
        for (var obj of cell.partialboundedBy) {
          cellData['partialboundedBy'].push(obj.href.substring(1).split('-')[0]);
        }
      }

      // geometry
      if (cell.cellSpaceGeometry.geometry3D != undefined) {
        var parsed = this.parseSolid(cell.cellSpaceGeometry.geometry3D.abstractSolid);
        cellData['points'] = parsed.points;
        cellData['floorHight'] = parsed.floorHight;
        cellData['celingHeight'] = parsed.celingHeight;
        cellData['holes'] = parsed.holes;
      } else {
        // 2D
      }

      for (var point of parsed.points)
        setBBox({
          x: point[0],
          y: point[1]
        });

      cells[cellData.id] = cellData;

      var key = JSON.stringify({
        floor: cellData.floorHight,
        celing: cellData.celingHeight
      });
      if (cellListByHight[key] == undefined) cellListByHight[key] = [cellData];
      else cellListByHight[key].push(cellData)
    }

    return {
      cells: cells,
      cellListByHight: cellListByHight,
      bbox: boundingBox
    };
  }

  ProjectManager.prototype.parseCellBoundaryMember = function(cellSpaceBoundaryMember) {
    var cellBoundaries = {};
    var cellBoundaryListByHigth = {};
    for (var cellBoundary of cellSpaceBoundaryMember) {
      cellBoundary = cellBoundary.cellSpaceBoundary;

      // property
      var cbData = this.parseBasicProperty(cellBoundary);
      if (cbData.id.split('-')[1] == "REVERSE") continue;
      if (cbData.duality != null &&
        cbData.duality.split('-')[1] == "REVERSE")
        cbData.duality = cbData.duality.split('-')[0];
      // parse navi data

      // geometry
      if (cellBoundary.cellSpaceBoundaryGeometry.geometry3D != undefined) {
        var parsed = this.parsePolygon(cellBoundary.cellSpaceBoundaryGeometry.geometry3D);
        cbData['points'] = parsed._points;
        cbData['floorHight'] = parsed.low;
        cbData['celingHeight'] = parsed.high - parsed.low;
      } else {
        // 2D
      }

      cellBoundaries[cbData.id] = cbData;

      var key = JSON.stringify({
        floor: cbData.floorHight,
        celing: cbData.celingHeight
      });

      if (cellBoundaryListByHigth[key] == undefined) cellBoundaryListByHigth[key] = [cbData];
      else cellBoundaryListByHigth[key].push(cbData)
    }

    return {
      cellBoundaries: cellBoundaries,
      cellBoundaryListByHigth: cellBoundaryListByHigth
    };
  }

  ProjectManager.prototype.parseSpaceLayer = function(sl) {
    var states = {},
      transitions = {};

    for (var node of sl.nodes) {
      if(node.stateMember == undefined) continue;

      for (var state of node.stateMember) {
        state = state.state;
        var stateData = this.parseBasicProperty(state);
        stateData['connects'] = state.connects != undefined ? state.connects : [];

        if (stateData.connects.length > 0) {
          for (var i in stateData.connects) {
            stateData.connects[i] = stateData.connects[i].href.substring(1);
          }
        }

        stateData['point'] = [state.geometry.point.pos.value[0], state.geometry.point.pos.value[1]];
        stateData['height'] = state.geometry.point.pos.value[2];

        states[stateData.id] = stateData;
      }
    }

    for (var edge of sl.edges) {
      if(edge.transitionMember == undefined) continue;

      for (var transition of edge.transitionMember) {
        transition = transition.transition;
        var transitionData = this.parseBasicProperty(transition);
        if (transitionData.id.split('-')[1] == "REVERSE") continue;
        if (transitionData.duality != null &&
          transitionData.duality.split('-')[1] == "REVERSE")
          transitionData.duality = transitionData.duality.split('-')[0];


        transitionData['points'] = [];
        var lineString = transition.geometry.abstractCurve.value.posOrPointPropertyOrPointRep;
        for (var point of lineString)
          transitionData.points.push(point.value.value)

        transitions[transitionData.id] = transitionData;
      }
    }

    return {
      states: states,
      transitions: transitions
    };
  }

  ProjectManager.prototype.makeeObj = function(data) {
    window.storage.clear();
    window.uiContainer.workspace.destroy();
    window.uiContainer.sidebar.treeview.init();
    window.conditions.automGenerateState = false;
    window.conditions.LAST_FLOOR_ID_NUM = 0;
      window.conditions.coordinateThreshold = 0.0000000001;
    window.conditions.snappingThreshold = 0.0000000001;

    var floorId;
    var floorDic = {};
    for (var key in data.cm.cellListByHight) {
      var floorData = JSON.parse(key);
      floorId = window.conditions.pre_floor + (++window.conditions.LAST_FLOOR_ID_NUM);
      floorDic[key] = floorId;

      window.broker.publish({
        req: 'addnewfloor',
        reqObj: {
          'floor': floorId
        }
      });

      var floorProperty = window.storage.propertyContainer.getElementById('floor', floorId);
      floorProperty.groundHeight = floorData.floor;
      floorProperty.celingHeight = floorData.celing;
      floorProperty.lowerCorner = [data.cm.bbox.min.x - 5, data.cm.bbox.min.y - 5];
      floorProperty.upperCorner = [data.cm.bbox.max.x + 5, data.cm.bbox.max.y + 5];

    }

    this.transCoordinates(data, floorId, floorDic);

    for (var key in data.cm.cellListByHight) {
      window.broker.publish({
        req: 'addcellsfromgml',
        reqObj: {
          'floor': floorDic[key],
          'data': data.cm.cellListByHight[key]
        }
      });
    }

    var floorProperties = window.storage.propertyContainer.floorProperties;

    for (var key in data.cbm.cellBoundaryListByHigth) {
      var floorId;
      for(var floorProperty of floorProperties){
        var keyObj = JSON.parse(key);
        if(floorProperty.groundHeight == keyObj.floor && floorProperty.doorHeight == keyObj.celing){
          floorId = floorProperty.id;
          break;
        }
      }
      window.broker.publish({
        req: 'addcellboundariesfromgml',
        reqObj: {
          'floor': floorId,
          'data': data.cbm.cellBoundaryListByHigth[key]
        }
      });
    }

  }

  ProjectManager.prototype.transCoordinates = function(data, floorId, floorDic) {

    // calculate canvas size
    var boundingBox = {
      max : { x : data.cm.bbox.max.x + 5, y: data.cm.bbox.max.y + 5},
      min : { x : data.cm.bbox.min.x - 5, y: data.cm.bbox.min.y - 5}
    };

    var height = boundingBox.max.x - boundingBox.min.x;
    var width = boundingBox.max.y - boundingBox.min.y;
    var ratio = {};

    function mirrorTransformation(height, point){
      var mirrorMatrix = math.matrix([
        [1, 0, 0],
        [0, -1, boundingBox.max.y],
        [0, 0, 1]
      ]);
      var pointMatrix = math.matrix([point[0], point[1], 1]);
      var mirroredPoint = math.multiply(mirrorMatrix, pointMatrix);
      return [mirroredPoint._data[0], mirroredPoint._data[1]];
    }

    for (var key in data.cm.cells) {
      for (var pointKey in data.cm.cells[key].points) {
        data.cm.cells[key].points[pointKey] = mirrorTransformation( height  , data.cm.cells[key].points[pointKey]);
      }
    }

    for(var key in data.cbm.cellBoundaries){
      for (var pointKey in data.cbm.cellBoundaries[key].points) {
        data.cbm.cellBoundaries[key].points[pointKey] = mirrorTransformation( height  , data.cbm.cellBoundaries[key].points[pointKey]);
      }
    }


    if (width > height)
      ratio = {
        width: width / height,
        height: 1
      };
    else
      ratio = {
        width: 1,
        height: height / width
      };

    var containerSize = {
      height: document.getElementById(floorId).clientHeight,
      width: document.getElementById(floorId).clientWidth
    };
    var containerRatio = {};

    if (containerSize.width > containerSize.height)
      containerRatio = {
        width: containerSize.width / containerSize.height,
        height: 1
      };
    else
      containerRatio = {
        width: 1,
        height: containerSize.height / containerSize.width
      };

    var newSize = {
      height: 0,
      width: 0
    };

    if (ratio.height == 1) {
      newSize = {
        width: (containerSize.width / ratio.width) + 10,
        height: containerSize.height + 10
      };
    } else {
      newSize = {
        width: containerSize.width + 10,
        height: (containerSize.height / ratio.height) + 10
      };
    }

    for (var floor of Object.values(floorDic)) {
      var stage = window.storage.canvasContainer.stages[floor];
      stage.stage.height(newSize.height);
      stage.stage.width(newSize.width);
      stage.backgroundLayer.setGrid(newSize.width, newSize.height);
    }

    // trans points
    var canvasCenter = {
      x: newSize.width / 2,
      y: newSize.height / 2
    };

    function affineTransformation(boundingBox, pixelWidth, pixelHeight, point) {
      var pointMatrix = math.matrix([point[0], point[1], 1]);
      var widthScale = Math.abs(pixelWidth / (boundingBox.max.x - boundingBox.min.x));
      var heightScale = Math.abs(pixelHeight / (boundingBox.max.y - boundingBox.min.y));
      var widthTrans = -boundingBox.min.x;
      var heightTrans = -boundingBox.min.y;
      var matrix = math.matrix([
        [widthScale, 0, widthTrans],
        [0, heightScale, heightTrans],
        [0, 0, 1]
      ]);

      var result = math.multiply(matrix, pointMatrix);

      return [result._data[0], result._data[1]];
    }

    for (var key in data.cm.cells) {
      for (var pointKey in data.cm.cells[key].points) {
        data.cm.cells[key].points[pointKey] = affineTransformation(
          boundingBox, newSize.width, newSize.height,
          data.cm.cells[key].points[pointKey]
        );
      }
    }

    for(var key in data.cbm.cellBoundaries){
      for (var pointKey in data.cbm.cellBoundaries[key].points) {
        data.cbm.cellBoundaries[key].points[pointKey] = affineTransformation(
          boundingBox, newSize.width, newSize.height,
          data.cbm.cellBoundaries[key].points[pointKey]
        );
      }
    }

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
