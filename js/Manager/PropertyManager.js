/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  /**
   * @class PropertyManager
   * @augments Subscriber
   */
  function PropertyManager() {

    require('Subscriber').apply(this, arguments);

    this.init();

  }

  PropertyManager.prototype = Object.create(require('Subscriber').prototype);

  /**
   * @memberof PropertyManager
   */
  PropertyManager.prototype.init = function() {

    this.name = 'PropertyManager';

    this.addCallbackFun('addnewfloor', this.addNewFloor);
    this.addCallbackFun('updateproperty', this.updateProperty);
    this.addCallbackFun('end-addnewcell', this.endAddNewCell, this.makeSimpleHistoryObj, this.endAddNewCell_undo);
    this.addCallbackFun('updaterefdata', this.updateRefProperty);

    this.addCallbackFun('end-addnewcellboundary', this.endAddNewCellBoundary, this.makeSimpleHistoryObj, this.endAddNewCellBoundary_undo);
    this.addCallbackFun('end-addnewtransition', this.endAddNewTransition, this.makeSimpleHistoryObj, this.endAddNewTransition_undo);
    this.addCallbackFun('end-addnewstate', this.endAddNewState, this.makeSimpleHistoryObj, this.endAddNewState_undo);
    this.addCallbackFun('end-addnewstair', this.endAddNewStair, function() {}, function() {});
    this.addCallbackFun('end-addnewslantdown', this.endAddNewCell, this.makeSimpleHistoryObj, this.endAddNewCell_undo);
    this.addCallbackFun('end-addnewslantup', this.endAddNewSlantUp, this.makeSimpleHistoryObj, this.endAddNewCell_undo);
    this.addCallbackFun('end-addnewslantupdown', this.endAddNewSlantUpDown, this.makeSimpleHistoryObj, this.endAddNewCell_undo);

    this.addCallbackFun('deletecell', this.deleteCell);
    this.addCallbackFun('deletecellboundary', this.deleteCellBoundary);
    this.addCallbackFun('deletestate', this.deleteState);
    this.addCallbackFun('deletetransition', this.deleteTransition);

    this.addCallbackFun('deletedesclist', this.deleteDescList);
    this.addCallbackFun('addnewglobaldesc', this.addDescList);
    this.addCallbackFun('addlocaldesc', this.addLocalDesc);
    this.addCallbackFun('deletelocaldesc', this.deleteLocalDesc);

    // this.addCallbackFun("addcellsfromgml", this.addCellsFromGML);
    // this.addCallbackFun('addcellboundariesfromgml', this.addCellBoundariesFromGML);

    this.addCallbackFun('addproeprtydatafromgml', this.addobjectFromGML);
    this.addCallbackFun('addnewcode', this.addNewCode);
    this.addCallbackFun('uploadcodefile', this.uploadCodeFile);
    this.addCallbackFun('deletecode', this.deleteCode);

    this.addCallbackFun('getmapcoor', this.getMapCoor);


  }

  /**
   * @param {Message.reqObj} reqObj floor
   * @memberof PropertyManager
   */
  PropertyManager.prototype.addNewFloor = function(reqObj) {
    var FLOOR = new require('Property').FLOOR;
    var newFloorProperty = new FLOOR(reqObj.floor);

    // add new property
    window.storage.propertyContainer.floorProperties.push(newFloorProperty);

  }



  /**
   * @param {Message.reqObj} reqObj type, id, updateContent
   * @memberof PropertyManager
   */
  PropertyManager.prototype.updateProperty = function(reqObj) {

    var obj = window.storage.propertyContainer.getElementById(reqObj.type, reqObj.id);

    switch (reqObj.type) {
      case 'project':
        obj.name = reqObj.updateContent.name;
        obj.author = reqObj.updateContent.author;
        obj.description = reqObj.updateContent.description;
        break;
      case 'floor':
        obj.name = reqObj.updateContent.name;
        obj.level = reqObj.updateContent.level;
        obj.layer = reqObj.updateContent.layer;
        obj.lowerCorner = reqObj.updateContent.lowerCorner;
        obj.upperCorner = reqObj.updateContent.upperCorner;
        obj.groundHeight = reqObj.updateContent.groundHeight;

        obj.doorHeight = reqObj.updateContent.doorHeight;
        obj.description = reqObj.updateContent.description;

        for (var ck of obj.cellKey) {
          var c = window.storage.propertyContainer.getElementById('cell', ck);
          if (c.height + c.bottom > reqObj.updateContent.celingHeight) c.height = reqObj.updateContent.celingHeight - c.bottom;
        }

        obj.celingHeight = reqObj.updateContent.celingHeight;
        break;
      case 'cell':
        if (reqObj.dataClass == 'ExtensionBase') {
          obj.extend = reqObj.updateContent;
        } else {
          obj.name = reqObj.updateContent.name;
          obj.description = reqObj.updateContent.description;

          var floor = window.storage.propertyContainer.getElementById('floor', window.storage.propertyContainer.getFloorById('cell', obj.id));
          if (reqObj.updateContent.bottom * reqObj.updateContent.height < 0) {
            require('Popup')('warning', 'Invalide input : bottom(' + reqObj.updateContent.bottom + '), height(' + reqObj.updateContent.height + ')');
          } else if (reqObj.updateContent.bottom + reqObj.updateContent.height <= floor.celingHeight) {
            obj.height = reqObj.updateContent.height;
            obj.bottom = reqObj.updateContent.bottom;

            var state = window.storage.propertyContainer.getElementById('state', obj.duality);
            if (state != null && state.height < obj.bottom)
              state.setHeight(obj.bottom);
          } else {
            require('Popup')('warning', 'Invalide input : bottom(' + reqObj.updateContent.bottom + '), height(' + reqObj.updateContent.height + ')');
          }
        }
        break;
      case 'cellBoundary':
      if (reqObj.dataClass == 'ExtensionBase') {
        obj.extend = reqObj.updateContent;
      } else {
          obj.name = reqObj.updateContent.name;
          obj.description = reqObj.updateContent.description;

          var floor = window.storage.propertyContainer.getElementById('floor', window.storage.propertyContainer.getFloorById('cellBoundary', obj.id));
          if (reqObj.updateContent.bottom * reqObj.updateContent.height < 0) {
            require('Popup')('warning', 'Invalide input : bottom(' + reqObj.updateContent.bottom + '), height(' + reqObj.updateContent.height + ')');
          } else if (reqObj.updateContent.bottom + reqObj.updateContent.height <= floor.celingHeight) {
            obj.height = reqObj.updateContent.height;
            obj.bottom = reqObj.updateContent.bottom;
          } else {
            require('Popup')('warning', 'Invalide input : bottom(' + reqObj.updateContent.bottom + '), height(' + reqObj.updateContent.height + ')');
          }
        }
        break;
      case 'state':
        obj.name = reqObj.updateContent.name;
        obj.description = reqObj.updateContent.description;
        obj.height = reqObj.updateContent.height;
        break;
      case 'transition':
        obj.name = reqObj.updateContent.name;
        obj.description = reqObj.updateContent.description;
        obj.weight = reqObj.updateContent.weight;
        break;
      case 'interlayerConnection':
        obj.typeOfTopoExpression = reqObj.updateContent.typeOfTopoExpression;
        obj.commnet = reqObj.updateContent.commnet;
        break;
      default:
        console.log("PropertyManager >>> wrong reqObj.type(" + reqObj.type + ")");
    }

  }

  /**
   * @param {Message.reqObj} reqObj type, id, updateContent
   * @memberof PropertyManager
   */
  PropertyManager.prototype.updateRefProperty = function(reqObj) {

    var obj = window.storage.propertyContainer.getElementById(reqObj.type, reqObj.id);
    obj.externalReference.push(reqObj.updateContent.externalRef);

  }


  /**
   * @memberof PropertyManager
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewCell = function(reqObj) {

    if (reqObj.isEmpty != null) {
      return;
    }

    var floorProperty = window.storage.propertyContainer.getElementById('floor', reqObj.floor);

    // add new cellproperty object in storage.propertyContainer
    var CellProperty = require('Property').CELL_SPACE;
    var newCellProperty = new CellProperty(reqObj.id);
    newCellProperty.height = floorProperty.celingHeight;
    newCellProperty.bottom = 0;
    window.storage.propertyContainer.cellProperties.push(newCellProperty);

    //////////////////////////// quick code /////////////////////////////////// REMOVE!
    if (reqObj.id.indexOf('EXTERIORDOOR') != -1)
      newCellProperty.navi = {
        type: "AnchorSpace",
        class: "1020",
        function: "1010",
        usage: "1010"
      }
    else if (reqObj.id.indexOf('DOOR') != -1)
      newCellProperty.navi = {
        type: "ConnectionSpace",
        class: "1000",
        function: "1000",
        usage: "1000"
      }
    else if (reqObj.id.indexOf('CORRIDOR') != -1)
      newCellProperty.navi = {
        type: "TransitionSpace",
        class: "1000",
        function: "1000",
        usage: "1000"
      }
    else if (reqObj.id.indexOf('ELEVATOR') != -1)
      newCellProperty.navi = {
        type: "TransitionSpace",
        class: "1010",
        function: "1110",
        usage: "1110"
      }
    else if (reqObj.id.indexOf('STAIR') != -1)
      newCellProperty.navi = {
        type: "TransitionSpace",
        class: "1010",
        function: "1120",
        usage: "1120"
      }



    // add cell key in floor property
    floorProperty.cellKey.push(reqObj.id);

    // add state property if there if conditions.automGenerateState is true
    if (window.conditions.automGenerateState) {
      var StateProperty = require('Property').STATE;
      var newState = new StateProperty(window.conditions.pre_state + (window.conditions.LAST_STATE_ID_NUM));
      newState.setDuality(reqObj.id);

      window.storage.propertyContainer.stateProperties.push(newState);
      window.storage.propertyContainer.getElementById('floor', reqObj.floor).stateKey.push(
        newState.id
      );

      newCellProperty.setDuality(newState.id);
    }

    // log.trace(window.storage);

  }

  /**
   * @memberof PropertyManager
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewState = function(reqObj) {

    if (reqObj.isEmpty != null) {
      return;
    }

    // log.trace(window.storage);
    var StateProperty = require('Property').STATE;
    var newState = new StateProperty(window.conditions.pre_state + (window.conditions.LAST_STATE_ID_NUM));
    if (reqObj.duality) {
      newState.setDuality(reqObj.duality);
    }

    if (newState.id.indexOf('SPRINKLER') != -1 || newState.id.indexOf('ALARM') != -1 || newState.id.indexOf('DETECTOR') != -1)
      newState.height = 20;
    else if (newState.id.indexOf('INDOOR-HYDRANT') != -1)
      newState.height = 10;

    window.storage.propertyContainer.stateProperties.push(newState);
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).stateKey.push(
      newState.id
    );

    if (newState.duality != "" && newState.duality != "") {
      window.storage.propertyContainer.getElementById('cell', newState.duality).setDuality(newState.id);
    }

  }

  /**
   * @memberof PropertyManager
   * @desc just return input parameter(reqObj)
   */
  PropertyManager.prototype.makeSimpleHistoryObj = function(reqObj) {
    return reqObj;
  }

  /**
   * @param {Object} undoObj id<br>floor: floor id
   * @memberof PropertyManager
   * @return cell id
   */
  PropertyManager.prototype.endAddNewCell_undo = function(undoObj) {

    window.broker.getManager('end-addnewcell', 'PropertyManager').deleteCell(undoObj);

    window.conditions.LAST_CELL_ID_NUM--;

  }

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof PropertyManager
   * @return cell id
   */
  PropertyManager.prototype.deleteCell = function(reqObj) {

    window.broker.getManager('end-addnewcell', 'PropertyManager').deletePropertyObj({
      type: 'cell',
      target: reqObj
    });

  }

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof PropertyManager
   */
  PropertyManager.prototype.deleteState = function(reqObj) {
    window.broker.getManager('end-addnewcell', 'PropertyManager').deletePropertyObj({
      type: 'state',
      target: reqObj
    });
  }

  PropertyManager.prototype.deletePropertyObj = function(reqObj) {

    var obj = window.storage.propertyContainer.getElementById(reqObj.type, reqObj.target.id);
    var duality = obj.duality;

    var floor = window.storage.propertyContainer.getElementById('floor', reqObj.target.floor);
    var propertiesList, index, keyList, dualityType, pbb;
    switch (reqObj.type) {
      case 'cell':
        propertiesList = window.storage.propertyContainer.cellProperties;
        index = floor.cellKey.indexOf(reqObj.target.id);
        floor.cellKey.splice(index, 1);
        dualityType = 'state';
        break;
      case 'cellBoundary':
        propertiesList = window.storage.propertyContainer.cellBoundaryProperties;
        index = floor.cellBoundaryKey.indexOf(reqObj.target.id);
        floor.cellBoundaryKey.splice(index, 1);
        dualityType = 'transition';
        break;
      case 'transition':
        propertiesList = window.storage.propertyContainer.transitionProperties;
        index = floor.transitionKey.indexOf(reqObj.target.id);
        floor.transitionKey.splice(index, 1);
        dualityType = 'cellBoundary';
        break;
      case 'state':
        propertiesList = window.storage.propertyContainer.stateProperties;
        index = floor.stateKey.indexOf(reqObj.target.id);
        floor.stateKey.splice(index, 1);
        dualityType = 'cell';
        break;
      default:
    }

    if (reqObj.type == 'cellBoundary') {
      var cells = window.storage.propertyContainer.cellProperties;
      for (var cell of cells) {
        if (cell.partialboundedBy.indexOf(obj.id) != -1) {
          cell.partialboundedBy.splice(cell.partialboundedBy.indexOf(cell.id), 1);
        }
      }
    }

    propertiesList.splice(propertiesList.indexOf(obj), 1);

    if (duality != null && duality != "") {
      var dualityObj = window.storage.propertyContainer.getElementById(dualityType, duality);
      if (dualityObj.duality == reqObj.target.id) dualityObj.duality = "";
    }
  }

  /**
   * @memberof GeometryManager
   * @param {Object} reqObj { id, floor, isEmpty }
   */
  PropertyManager.prototype.endAddNewCellBoundary = function(reqObj) {

    if (reqObj.isEmpty != null) {
      return;
    }

    // add new cellspace boundary property(=CellBoundaryProperty) in stage.propertyContainer
    var CellBoundaryProperty = require('Property').CELL_SPACE_BOUNDARY;
    var property = new CellBoundaryProperty(reqObj.id);

    var floorProperty = window.storage.propertyContainer.getElementById('floor', reqObj.floor);
    property.height = floorProperty.doorHeight;
    property.bottom = 0;

    /////////////////////quick code////////////////////
    if (property.id.indexOf('BIGWINDOW') != -1) {
      property.navi.type = "ConnectionBoundary";
      property.height = 20;
    } else if (property.id.indexOf('WINDOW') != -1) {
      property.navi.type = "ConnectionBoundary";
      property.height = 10;
      property.bottom = 8;
    } else if (property.id.indexOf('EXTERIORDOOR') != -1) {
      property.navi.type = "AnchorBoundary";
    } else if (property.id.indexOf('DOOR') != -1) {
      property.navi.type = "ConnectionBoundary";
    } else if (property.id.indexOf('STAIR') != -1) {
      property.navi.type = "ConnectionBoundary";
      property.height = 20;
    }

    window.storage.propertyContainer.cellBoundaryProperties.push(property);

    // add key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).cellBoundaryKey.push(
      reqObj.id
    );

    var associationCells = window.tmpObj.associationCell;
    for (var key in associationCells) {
      var cell = window.storage.propertyContainer.getElementById('cell', key);
      if (cell == null) {
        var holeObj = window.storage.canvasContainer.stages[reqObj.floor].getElementById('cell', key);
        cell = window.storage.propertyContainer.getElementById('cell', holeObj.holeOf);
      }

      cell.addPartialboundedBy(reqObj.id)
    }

    window.tmpObj = null;
  }

  /**
   * @memberof PropertyManager
   */
  PropertyManager.prototype.endAddNewCellBoundary_undo = function(undoObj) {

    window.broker.getManager('end-addnewcell', 'PropertyManager').deleteCellBoundary(undoObj);
    window.conditions.LAST_CELLBOUNDARY_ID_NUM--;

  }

  PropertyManager.prototype.deleteCellBoundary = function(reqObj) {

    window.broker.getManager('end-addnewcell', 'PropertyManager').deletePropertyObj({
      type: 'cellBoundary',
      target: reqObj
    });

  }

  /**
   * @memberof PropertyManager
   * @param {Message.reqObj} reqObj id : if of new object<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewTransition = function(reqObj) {

    if (reqObj.isEmpty != null) return;

    var canvasObj = window.storage.canvasContainer.stages[reqObj.floor].transitionLayer.group.getLastTransition();
    var TransitionProperty = require('Property').TRANSITION;
    var newProperty = new TransitionProperty(reqObj.id);
    var connects = canvasObj.getConnection()
    newProperty.setConnects(connects);
    newProperty.setDuality(canvasObj.getDuality());

    // add connects to state
    window.storage.propertyContainer.getElementById('state', connects[0]).addConnects(newProperty.id);
    window.storage.propertyContainer.getElementById('state', connects[1]).addConnects(newProperty.id);

    // add new transition object in storage.propertyContainer
    window.storage.propertyContainer.transitionProperties.push(newProperty);

    // add transition key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).transitionKey.push(
      reqObj.id
    );

    if (newProperty.duality != "" && newProperty.duality != "" && newProperty.duality != null && newProperty.duality != null)
      window.storage.propertyContainer.getElementById('cellBoundary', newProperty.duality).setDuality(newProperty.id);

  }

  /**
   * @memberof PropertyManager
   * @param {Object} undoObj id : if of new object<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewTransition_undo = function(undoObj) {

    window.broker.getManager('end-addnewtransition', 'PropertyManager').deleteTransition(undoObj);
    window.conditions.LAST_TRANSITION_ID_NUM--;

  }

  PropertyManager.prototype.deleteTransition = function(reqObj) {

    window.broker.getManager('end-addnewcell', 'PropertyManager').deletePropertyObj({
      type: 'transition',
      target: reqObj
    });

  }

  /**
   * @memberof PropertyManager
   * @param {Message.reqObj} reqObj id : if of new object<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewStair = function(reqObj) {

    if (reqObj.isEmpty != null) return;

    var geometryObj = window.storage.geometryContainer.getElementById('transition', reqObj.id);
    var TransitionProperty = require('Property').TRANSITION;
    var newProperty = new TransitionProperty(reqObj.id);
    var connects = geometryObj.getConnects();
    newProperty.setConnects(connects);
    newProperty.setDuality(geometryObj.getDuality());

    var startFloor = window.storage.propertyContainer.getFloorById('state', connects[0]);
    var endFloor = window.storage.propertyContainer.getFloorById('state', connects[1]);
    newProperty.setStair([startFloor, endFloor]);

    // add connects to state
    window.storage.propertyContainer.getElementById('state', connects[0]).addConnects(newProperty.id);
    window.storage.propertyContainer.getElementById('state', connects[1]).addConnects(newProperty.id);

    // add new transition object in storage.propertyContainer
    window.storage.propertyContainer.transitionProperties.push(newProperty);

    // add transition key in floor property
    window.storage.propertyContainer.getElementById('floor', reqObj.floor).transitionKey.push(
      reqObj.id
    );

    // log.info(window.storage.propertyContainer);

  }

  PropertyManager.prototype.endAddNewSlantUp = function(reqObj) {

    if (reqObj.isEmpty != null) {
      return;
    }

    if (window.conditions.automGenerateState) {
      window.broker.getManager('end-addnewcell', 'PropertyManager').endAddNewCell(reqObj);

      var state = window.storage.propertyContainer.getElementById('state', window.conditions.pre_state + window.conditions.LAST_STATE_ID_NUM);
      state.height = window.storage.propertyContainer.getElementById('floor', reqObj.floor).celingHeight;
    }
  }

  /**
   * @memberof PropertyManager
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewSlantUpDown = function(reqObj) {

    if (reqObj.isEmpty != null) {
      return;
    }

    window.conditions.LAST_STATE_ID_NUM--;
    var num = window.conditions.LAST_CELL_ID_NUM - 1;
    window.broker.getManager('end-addnewcell', 'PropertyManager').endAddNewCell({
      floor: reqObj.floor,
      id: window.conditions.pre_cell + num
    });


    window.conditions.LAST_STATE_ID_NUM++;
    window.broker.getManager('end-addnewcell', 'PropertyManager').endAddNewSlantUp({
      floor: reqObj.floor,
      id: window.conditions.pre_cell + window.conditions.LAST_CELL_ID_NUM
    });
  }

  PropertyManager.prototype.deleteDescList = function(reqObj) {
    var index = window.conditions.descList.indexOf(reqObj);
    if (index != -1) {
      window.conditions.descList.splice(index, 1);

      var propertyContainer = window.storage.propertyContainer;

      if (propertyContainer.projectProperty.description[reqObj] != undefined) {
        delete propertyContainer.projectProperty.description[reqObj];
      }

      function deleteDesc(array, desc) {
        for (var obj of array) {
          if (obj.description[desc] != undefined) {
            delete obj.description[desc];
          }
        }
      }

      deleteDesc(propertyContainer.floorProperties, reqObj);
      deleteDesc(propertyContainer.cellProperties, reqObj);
      deleteDesc(propertyContainer.cellBoundaryProperties, reqObj);
      deleteDesc(propertyContainer.stateProperties, reqObj);
      deleteDesc(propertyContainer.transitionProperties, reqObj);
    }
  }


  PropertyManager.prototype.addDescList = function(reqObj) {
    if (reqObj.data != "" && window.conditions.descList.indexOf(reqObj.data) == -1) {
      window.conditions.descList.push(reqObj.data);
      var propertyContainer = window.storage.propertyContainer;

      if (propertyContainer.projectProperty.description[reqObj.data] == undefined) {
        propertyContainer.projectProperty.description[reqObj.data] = "";
      }

      function addDesc(array, desc) {
        for (var obj of array) {
          if (obj.description[desc] == undefined) {
            obj.description[desc] = "";
          }
        }
      }

      addDesc(propertyContainer.floorProperties, reqObj.data);
      addDesc(propertyContainer.cellProperties, reqObj.data);
      addDesc(propertyContainer.cellBoundaryProperties, reqObj.data);
      addDesc(propertyContainer.stateProperties, reqObj.data);
      addDesc(propertyContainer.transitionProperties, reqObj.data);
    }

  }

  PropertyManager.prototype.addLocalDesc = function(reqObj) {
    var obj = window.storage.propertyContainer.getElementById(reqObj.type, reqObj.id);
    if (obj.description[reqObj.desc] == undefined) {
      obj.description[reqObj.desc] = "";
    }
  }

  PropertyManager.prototype.deleteLocalDesc = function(reqObj) {
    var obj = window.storage.propertyContainer.getElementById(reqObj.type, reqObj.id);
    if (window.conditions.descList.indexOf(reqObj.desc) == -1)
      delete obj.description[reqObj.desc];
  }


  PropertyManager.prototype.addobjectFromGML = function(reqObj) {
    function copyObj(obj, type) {

      var construct = require('Property');
      if (type == 'cell') construct = construct.CELL_SPACE;
      else if (type == 'cellBoundary') construct = construct.CELL_SPACE_BOUNDARY;
      else if (type == 'state') construct = construct.STATE;
      else if (type == 'transition') construct = construct.TRANSITION;

      var newProperty = new construct(obj.id);

      for (var key in newProperty) {
        if (obj[key] != undefined)
          newProperty[key] = obj[key];
      }

      if (newProperty.name == undefined || newProperty.name == null || newProperty.name == "")
        newProperty.name = obj.id;

      if (newProperty.navi != undefined) {
        if (newProperty.navi['function'] != undefined && newProperty.navi['function'] != "")
          require('Property').CODE_LIST.getInstance().addCode([newProperty.navi.type, 'function'], newProperty.navi.function, "", true);
        if (newProperty.navi['class'] != undefined && newProperty.navi['class'] != "")
          require('Property').CODE_LIST.getInstance().addCode([newProperty.navi.type, 'class'], newProperty.navi.class, "", true);
        if (newProperty.navi['usage'] != undefined && newProperty.navi['usage'] != "")
          require('Property').CODE_LIST.getInstance().addCode([newProperty.navi.type, 'function'], newProperty.navi.usage, "", true);
        if (newProperty.navi['obstacleType'] != undefined && newProperty.navi['obstacleType'] != "")
          require('Property').CODE_LIST.getInstance().addCode([newProperty.navi.type], newProperty.navi.obstacleType, "", true);
      }

      return newProperty;
    }

    var propertyContainer = window.storage.propertyContainer;

    for (var floor of Object.values(reqObj)) {

      for (var c of Object.values(floor.cells)) {
        var newProperty = copyObj(c, 'cell');
        propertyContainer.cellProperties.push(newProperty);
        propertyContainer.getElementById('floor', floor.id).cellKey.push(
          c.id
        );
      }

      for (var cb of Object.values(floor.cellBoundaries)) {
        var newProperty = copyObj(cb, 'cellBoundary');
        newProperty.bottom = newProperty.bottom - floor.floorHight;
        propertyContainer.cellBoundaryProperties.push(newProperty);
        propertyContainer.getElementById('floor', floor.id).cellBoundaryKey.push(
          cb.id
        );
      }

      for (var s of Object.values(floor.states)) {
        var newProperty = copyObj(s, 'state');
        propertyContainer.stateProperties.push(newProperty);
        propertyContainer.getElementById('floor', floor.id).stateKey.push(
          s.id
        );
      }

      for (var t of Object.values(floor.transitions)) {
        var newProperty = copyObj(t, 'transition');
        propertyContainer.transitionProperties.push(newProperty);
        propertyContainer.getElementById('floor', floor.id).transitionKey.push(
          t.id
        );
      }
    }
  }

  PropertyManager.prototype.addNewCode = function(reqObj) {
    require('Property').CODE_LIST.getInstance().addCode(reqObj.path, reqObj.cn, reqObj.cd);
  }

  PropertyManager.prototype.uploadCodeFile = function(reqObj) {
    var reader = new FileReader();

    function uploadCSV() {
      reader.onload = function(e) {
        var src = e.target.result;
        var codeList = require('Property').CODE_LIST.getInstance();

        for (var i of src.split(/\r?\n|\r/)) {
          var data = i.split(',');
          codeList.addCode(data[0], data[1] != undefined ? data[1] : "");
        }

        var manager = window.broker.getManager('showcodemodal', 'UIManager');
        manager.showCodeModal();
        require('Popup')('success', 'uplode successed', reqObj.file.name + ' uploaded');
      }

      reader.readAsText(reqObj.file);
    }

    function uploadJson() {
      reader.onload = function(e) {
        var src = JSON.parse(e.target.result).CodeList;
        var codeList = require('Property').CODE_LIST.getInstance();

        for (var data of src) {
          codeList.addCode(data.CodeNumber, data.CodeDesc != undefined ? data.CodeDesc : "");
        }

        var manager = window.broker.getManager('showcodemodal', 'UIManager');
        manager.showCodeModal();
        require('Popup')('success', 'uplode successed', reqObj.file.name + ' uploaded');
      }

      reader.readAsText(reqObj.file);
    }

    if (reqObj.file.type == 'application/json') uploadJson();
    else if (reqObj.file.type == 'application/vnd.ms-excel') uploadCSV();
  }

  PropertyManager.prototype.deleteCode = function(reqObj) {
    if (require('Property').CODE_LIST.getInstance().deleteCode(reqObj.path, reqObj.cn, reqObj.cd)) {
      // success to delete code
      var objects = window.storage.propertyContainer.cellProperties;
      var target = document.getElementById('id-text').value;
      var refresh = false;
      var tableType = document.getElementById('property-table').dataset.type;

      for (var index in objects) {
        if (objects[index].obstacleType == reqObj.CodeNumber) {

          objects[index].obstacleType = "";
          if (objects[index].id == target) refresh = true;
        }
      }
    }

    var manager = window.broker.getManager('showcodemodal', 'UIManager');
    manager.showCodeModal();
    if (refresh) manager.setPropertyView({
      type: tableType,
      id: target,
      storage: window.storage
    });
  }

  PropertyManager.prototype.getMapCoor = function(reqObj) {
    var map = window.storage.canvasContainer.getElementById('stage', reqObj.floor).map;
    var extent = map.getView().calculateExtent(map.getSize());
    var bottomLeft = ol.proj.toLonLat(ol.extent.getBottomLeft(extent));
    var topRight = ol.proj.toLonLat(ol.extent.getTopRight(extent));
    var center = ol.proj.toLonLat(ol.extent.getCenter(extent));

    var fp = window.storage.propertyContainer.getElementById('floor', reqObj.floor);
    fp.setMapCoor(bottomLeft, topRight);
    alert('bottom left : ' + bottomLeft + '\ntop right : ' + topRight + '\ncenter : ' + center);

  }

  return PropertyManager;
});
