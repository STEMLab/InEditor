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
    this.addCallbackFun('deleteinterlayerconnection', this.deleteInterlayerConnection);

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

    this.addCallbackFun('copyfloor', this.copyFloor);



  }

  /**
   * @param {Message.reqObj} reqObj floor
   * @memberof PropertyManager
   */
  PropertyManager.prototype.addNewFloor = function(reqObj) {
    var FLOOR = new require('Property').FLOOR;
    var newFloorProperty = new FLOOR(reqObj.floor);

    // add new property
    require('Storage').getInstance().getPropertyContainer().floorProperties.push(newFloorProperty);

  }



  /**
   * @param {Message.reqObj} reqObj type, id, updateContent
   * @memberof PropertyManager
   */
  PropertyManager.prototype.updateProperty = function(reqObj) {

    var propertyContainer = require('Storage').getInstance().getPropertyContainer();
    var obj = propertyContainer.getElementById(reqObj.type, reqObj.id);

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
          var c = propertyContainer.getElementById('cell', ck);
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
          obj.storey = reqObj.updateContent.storey;

          var floor = propertyContainer.getElementById('floor', propertyContainer.getFloorById('cell', obj.id));
          if (reqObj.updateContent.bottom * reqObj.updateContent.height < 0) {
            require('Popup')('warning', 'Invalide input : bottom(' + reqObj.updateContent.bottom + '), height(' + reqObj.updateContent.height + ')');
          } else if (reqObj.updateContent.bottom + reqObj.updateContent.height <= floor.celingHeight + floor.groundHeight) {
            obj.height = reqObj.updateContent.height;
            obj.bottom = reqObj.updateContent.bottom;

            var state = propertyContainer.getElementById('state', obj.duality);
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

          var floor = propertyContainer.getElementById('floor', propertyContainer.getFloorById('cellBoundary', obj.id));
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
        var floor = propertyContainer.getElementById('floor', propertyContainer.getFloorById('state', obj.id));
        if( 0 > reqObj.updateContent.height  ||
            reqObj.updateContent.height > floor.celingHeight )
          require('Popup')('warning', 'Invalide input : height(' + reqObj.updateContent.height + ')');
        else
          obj.height = reqObj.updateContent.height;

        break;
      case 'transition':
        obj.name = reqObj.updateContent.name;
        obj.description = reqObj.updateContent.description;
        obj.weight = reqObj.updateContent.weight;
        break;
      case 'interlayerConnection':
        obj.typeOfTopoExpression = reqObj.updateContent.typeOfTopoExpression;
        obj.comment = reqObj.updateContent.comment;
        break;
      default:
        console.log("PropertyManager >>> wrong reqObj.type(" + reqObj.type + ")");
    }

    require('Popup')('success', 'PROPERTY UPDATED', 'Valid properties of ' + reqObj.id + ' were successfully updated.');

  }

  /**
   * @param {Message.reqObj} reqObj type, id, updateContent
   * @memberof PropertyManager
   */
  PropertyManager.prototype.updateRefProperty = function(reqObj) {

    var obj = require('Storage').getInstance().getPropertyContainer().getElementById(reqObj.type, reqObj.id);
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

    var propertyContainer = require('Storage').getInstance().getPropertyContainer();
    var floorProperty = propertyContainer.getElementById('floor', reqObj.floor);

    // add new cellproperty object in storage.propertyContainer
    var CellProperty = require('Property').CELL_SPACE;
    var newCellProperty = new CellProperty(reqObj.id);
    newCellProperty.height = floorProperty.celingHeight;
    newCellProperty.bottom = 0;
    newCellProperty.storey = reqObj.floor;
    propertyContainer.cellProperties.push(newCellProperty);


    // add cell key in floor property
    floorProperty.cellKey.push(reqObj.id);

    // add state property if there if conditions.automGenerateState is true
    if (require('Conditions').getInstance().automGenerateState) {
      var StateProperty = require('Property').STATE;
      var newState = new StateProperty(require('Conditions').getInstance().pre_state + (require('Conditions').getInstance().LAST_STATE_ID_NUM));
      newState.setDuality(reqObj.id);

      propertyContainer.stateProperties.push(newState);
      propertyContainer.getElementById('floor', reqObj.floor).stateKey.push(
        newState.id
      );

      newCellProperty.setDuality(newState.id);
    }

  }

  /**
   * @memberof PropertyManager
   * @param {Message.reqObj} reqObj id : new obj id<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewState = function(reqObj) {

    if (reqObj.isEmpty != null) {
      return;
    }

    var propertyContainer = require('Storage').getInstance().getPropertyContainer();
    var StateProperty = require('Property').STATE;
    var newState = new StateProperty(require('Conditions').getInstance().pre_state + (require('Conditions').getInstance().LAST_STATE_ID_NUM));
    if (reqObj.duality) {
      var cell = propertyContainer.getElementById('cell', reqObj.duality);

      if(cell.duality === null || cell.duality === ""){
        newState.setDuality(reqObj.duality);
        cell.setDuality(newState.id);
      }

    }

    propertyContainer.stateProperties.push(newState);
    propertyContainer.getElementById('floor', reqObj.floor).stateKey.push(
      newState.id
    );
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

    require('Broker').getInstance().getManager('end-addnewcell', 'PropertyManager').deleteCell(undoObj);

    require('Conditions').getInstance().LAST_CELL_ID_NUM--;

  }

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof PropertyManager
   * @return cell id
   */
  PropertyManager.prototype.deleteCell = function(reqObj) {

    require('Broker').getInstance().getManager('end-addnewcell', 'PropertyManager').deletePropertyObj({
      type: 'cell',
      target: reqObj
    });

  }

  /**
   * @param {Object} reqObj id<br>floor: floor id
   * @memberof PropertyManager
   */
  PropertyManager.prototype.deleteState = function(reqObj) {
    require('Broker').getInstance().getManager('end-addnewcell', 'PropertyManager').deletePropertyObj({
      type: 'state',
      target: reqObj
    });
  }

  PropertyManager.prototype.deletePropertyObj = function(reqObj) {

    var propertyContainer = require('Storage').getInstance().getPropertyContainer();
    var obj = propertyContainer.getElementById(reqObj.type, reqObj.target.id);
    var duality = obj.duality ? obj.duality : null;

    var floor = propertyContainer.getElementById('floor', reqObj.target.floor);
    var propertiesList, index, keyList, dualityType, pbb;
    switch (reqObj.type) {
      case 'cell':
        propertiesList = propertyContainer.cellProperties;
        index = floor.cellKey.indexOf(reqObj.target.id);
        floor.cellKey.splice(index, 1);
        dualityType = 'state';
        break;
      case 'cellBoundary':
        propertiesList = propertyContainer.cellBoundaryProperties;
        index = floor.cellBoundaryKey.indexOf(reqObj.target.id);
        floor.cellBoundaryKey.splice(index, 1);
        dualityType = 'transition';
        break;
      case 'transition':
        propertiesList = propertyContainer.transitionProperties;
        index = floor.transitionKey.indexOf(reqObj.target.id);
        floor.transitionKey.splice(index, 1);
        dualityType = 'cellBoundary';
        break;
      case 'state':
        propertiesList = propertyContainer.stateProperties;
        index = floor.stateKey.indexOf(reqObj.target.id);
        floor.stateKey.splice(index, 1);
        dualityType = 'cell';
        break;
    case 'interlayerConnection':
        propertiesList = propertyContainer.interlayerConnections;
        break;
      default:
    }

    if (reqObj.type == 'cellBoundary') {
      var cells = propertyContainer.cellProperties;
      for (var cell of cells) {
        if (cell.partialboundedBy.indexOf(obj.id) != -1) {
          cell.partialboundedBy.splice(cell.partialboundedBy.indexOf(cell.id), 1);
        }
      }
    }

    propertiesList.splice(propertiesList.indexOf(obj), 1);

    if (duality != null && duality != "") {
      var dualityObj = propertyContainer.getElementById(dualityType, duality);
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

    var propertyContainer = require('Storage').getInstance().getPropertyContainer();

    // add new cellspace boundary property(=CellBoundaryProperty) in stage.propertyContainer
    var CellBoundaryProperty = require('Property').CELL_SPACE_BOUNDARY;
    var property = new CellBoundaryProperty(reqObj.id);

    var floorProperty = propertyContainer.getElementById('floor', reqObj.floor);
    property.height = floorProperty.doorHeight;
    property.bottom = 0;

    propertyContainer.cellBoundaryProperties.push(property);

    // add key in floor property
    propertyContainer.getElementById('floor', reqObj.floor).cellBoundaryKey.push(
      reqObj.id
    );

    var associationCells = window.tmpObj.associationCell;
    var canvasContainer = require('Storage').getInstance().getCanvasContainer();
    for (var key in associationCells) {
      var cell = propertyContainer.getElementById('cell', key);
      if (cell == null) {
        var holeObj = canvasContainer.stages[reqObj.floor].getElementById('cell', key);
        cell = propertyContainer.getElementById('cell', holeObj.holeOf);
      }

      cell.addPartialboundedBy(reqObj.id)
    }

    window.tmpObj = null;
  }

  /**
   * @memberof PropertyManager
   */
  PropertyManager.prototype.endAddNewCellBoundary_undo = function(undoObj) {

    require('Broker').getInstance().getManager('end-addnewcell', 'PropertyManager').deleteCellBoundary(undoObj);
    require('Conditions').getInstance().LAST_CELLBOUNDARY_ID_NUM--;

  }

  PropertyManager.prototype.deleteCellBoundary = function(reqObj) {

    require('Broker').getInstance().getManager('end-addnewcell', 'PropertyManager').deletePropertyObj({
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

    var propertyContainer = require('Storage').getInstance().getPropertyContainer();
    var canvasObj = require('Storage').getInstance().getCanvasContainer().stages[reqObj.floor].transitionLayer.group.getLastTransition();
    var TransitionProperty = require('Property').TRANSITION;
    var newProperty = new TransitionProperty(reqObj.id);
    var connects = canvasObj.getConnection()
    newProperty.setConnects(connects);
    newProperty.setDuality(canvasObj.getDuality());

    // add connects to state
    propertyContainer.getElementById('state', connects[0]).addConnects(newProperty.id);
    propertyContainer.getElementById('state', connects[1]).addConnects(newProperty.id);

    // add new transition object in storage.propertyContainer
    propertyContainer.transitionProperties.push(newProperty);

    // add transition key in floor property
    propertyContainer.getElementById('floor', reqObj.floor).transitionKey.push(
      reqObj.id
    );

    if (newProperty.duality != "" && newProperty.duality != "" && newProperty.duality != null && newProperty.duality != null)
      propertyContainer.getElementById('cellBoundary', newProperty.duality).setDuality(newProperty.id);

  }

  /**
   * @memberof PropertyManager
   * @param {Object} undoObj id : if of new object<br>floor : id of the floor where the new object will be created
   */
  PropertyManager.prototype.endAddNewTransition_undo = function(undoObj) {

    require('Broker').getInstance().getManager('end-addnewtransition', 'PropertyManager').deleteTransition(undoObj);
    require('Conditions').getInstance().LAST_TRANSITION_ID_NUM--;

  }

  PropertyManager.prototype.deleteTransition = function(reqObj) {

    require('Broker').getInstance().getManager('end-addnewcell', 'PropertyManager').deletePropertyObj({
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

    var propertyContainer = require('Storage').getInstance().getPropertyContainer();
    var geometryObj =require('Storage').getInstance().getGeometryContainer().getElementById('transition', reqObj.id);
    var TransitionProperty = require('Property').TRANSITION;
    var newProperty = new TransitionProperty(reqObj.id);
    var connects = geometryObj.getConnects();
    newProperty.setConnects(connects);
    newProperty.setDuality(geometryObj.getDuality());

    var startFloor = propertyContainer.getFloorById('state', connects[0]);
    var endFloor = propertyContainer.getFloorById('state', connects[1]);
    newProperty.setStair([startFloor, endFloor]);

    // add connects to state
    propertyContainer.getElementById('state', connects[0]).addConnects(newProperty.id);
    propertyContainer.getElementById('state', connects[1]).addConnects(newProperty.id);

    // add new transition object in storage.propertyContainer
    propertyContainer.transitionProperties.push(newProperty);

    // add transition key in floor property
    propertyContainer.getElementById('floor', reqObj.floor).transitionKey.push(
      reqObj.id
    );

  }

  PropertyManager.prototype.endAddNewSlantUp = function(reqObj) {

    if (reqObj.isEmpty != null) {
      return;
    }

    if (require('Conditions').getInstance().automGenerateState) {
      require('Broker').getInstance().getManager('end-addnewcell', 'PropertyManager').endAddNewCell(reqObj);

      var state = require('Storage').getInstance().getPropertyContainer().getElementById('state', require('Conditions').getInstance().pre_state + require('Conditions').getInstance().LAST_STATE_ID_NUM);
      state.height = require('Storage').getInstance().getPropertyContainer().getElementById('floor', reqObj.floor).celingHeight;
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

    require('Conditions').getInstance().LAST_STATE_ID_NUM--;
    var num = require('Conditions').getInstance().LAST_CELL_ID_NUM - 1;
    require('Broker').getInstance().getManager('end-addnewcell', 'PropertyManager').endAddNewCell({
      floor: reqObj.floor,
      id: require('Conditions').getInstance().pre_cell + num
    });


    require('Conditions').getInstance().LAST_STATE_ID_NUM++;
    require('Broker').getInstance().getManager('end-addnewcell', 'PropertyManager').endAddNewSlantUp({
      floor: reqObj.floor,
      id: require('Conditions').getInstance().pre_cell + require('Conditions').getInstance().LAST_CELL_ID_NUM
    });
  }

  PropertyManager.prototype.deleteDescList = function(reqObj) {
    var index = require('Conditions').getInstance().descList.indexOf(reqObj);
    if (index != -1) {
      require('Conditions').getInstance().descList.splice(index, 1);

      var propertyContainer = require('Storage').getInstance().getPropertyContainer();

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
    if (reqObj.data != "" && require('Conditions').getInstance().descList.indexOf(reqObj.data) == -1) {
      require('Conditions').getInstance().descList.push(reqObj.data);
      var propertyContainer = require('Storage').getInstance().getPropertyContainer();

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
    var obj = require('Storage').getInstance().getPropertyContainer().getElementById(reqObj.type, reqObj.id);
    if (obj.description[reqObj.desc] == undefined) {
      obj.description[reqObj.desc] = "";
    }
  }

  PropertyManager.prototype.deleteLocalDesc = function(reqObj) {
    var obj = require('Storage').getInstance().getPropertyContainer().getElementById(reqObj.type, reqObj.id);
    if (require('Conditions').getInstance().descList.indexOf(reqObj.desc) == -1)
      delete obj.description[reqObj.desc];
  }


  PropertyManager.prototype.addobjectFromGML = function(reqObj) {
    function copyObj(obj, type) {

      var construct = require('Property');
      if (type == 'cell') construct = construct.CELL_SPACE;
      else if (type == 'cellBoundary') construct = construct.CELL_SPACE_BOUNDARY;
      else if (type == 'state') construct = construct.STATE;
      else if (type == 'transition') construct = construct.TRANSITION;
      else if (type == 'interlayerconnection') construct = construct.INTERLAYER_CONNECTION;

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

    var propertyContainer = require('Storage').getInstance().getPropertyContainer();

    for (var floor of Object.values(reqObj[0])) {

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

    for(var inter of reqObj[1]){
      var newProperty = copyObj(inter, 'interlayerconnection');
      propertyContainer.interlayerConnections.push(newProperty);
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
          if(data[0].includes("Non")){
            codeList.addCode([data[0]], data[1] != undefined ? data[1] : "", data[2] != undefined ? data[2] : "");
          }
          else {
            codeList.addCode(
              [data[0], data[1]],
              data[2] != undefined ? data[2] : undefined,
              data[3] != undefined ? data[3] : undefined);
          }

        }

        var manager = require('Broker').getInstance().getManager('showcodemodal', 'UIManager');
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

        var manager = require('Broker').getInstance().getManager('showcodemodal', 'UIManager');
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
      var objects = require('Storage').getInstance().getPropertyContainer().cellProperties;
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

    var manager = require('Broker').getInstance().getManager('showcodemodal', 'UIManager');
    manager.showCodeModal();
    if (refresh) manager.setPropertyView({
      type: tableType,
      id: target,
      storage: require('Storage').getInstance()
    });
  }

  PropertyManager.prototype.getMapCoor = function(reqObj) {
    var map = require('Storage').getInstance().getCanvasContainer().getElementById('stage', reqObj.floor).map;
    var extent = map.getView().calculateExtent(map.getSize());
    var bottomLeft = ol.proj.toLonLat(ol.extent.getBottomLeft(extent));
    var topRight = ol.proj.toLonLat(ol.extent.getTopRight(extent));
    var center = ol.proj.toLonLat(ol.extent.getCenter(extent));

    var fp = require('Storage').getInstance().getPropertyContainer().getElementById('floor', reqObj.floor);
    fp.setMapCoor(bottomLeft, topRight);
    require('Storage').getInstance().getPropertyContainer().projectProperty.isRealCoor = true;
    require('Storage').getInstance().getPropertyContainer().projectProperty.realCoorFloor = fp.id;
    alert('bottom left : ' + bottomLeft + '\ntop right : ' + topRight + '\ncenter : ' + center);

  }

  PropertyManager.prototype.deleteInterlayerConnection = function(reqObj) {

    require('Broker').getInstance().getManager('end-addnewcell', 'PropertyManager').deletePropertyObj({
      type: 'interlayerConnection',
      target: reqObj
    });

  }

  return PropertyManager;
});
