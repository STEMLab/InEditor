/**
 * @author suheeeee <lalune1120@hotmail.com>
 */

define([
  "../PubSub/Message.js",
  "./Result.js"
], function(
  Message,
  Result
) {
  'use strict';

  /**
   * @class DrawEventHandler
   */
  function DrawEventHandler() { }

  /**
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.setHandlerBinder = function(handlerBinder) {

    handlerBinder['floor-btn'] = {
      'click': this.clickFloorBtn
    };

    handlerBinder['cell-btn'] = {
      'click': this.clickCellBtn
    };

    handlerBinder['hole-btn'] = {
      'click': this.clickHoleBtn
    };

    handlerBinder['cellboundary-btn'] = {
      'click': this.clickCellBoundaryBtn
    };

    handlerBinder['hatch-btn'] = {
      'click': this.clickHatchBtn
    };

    handlerBinder['state-btn'] = {
      'click': this.clickStateBtn
    };

    handlerBinder['transition-btn'] = {
      'click': this.clickTransitionBtn
    }

    handlerBinder['interlayerconnection-btn'] = {
      'click': this.clickInterBtn
    }

    handlerBinder['stair-btn'] = {
      'click': this.clickStairBtn
    }

    handlerBinder['slant-down-btn'] = {
      'click': this.clickSlantDownBtn
    }

    handlerBinder['slant-up-btn'] = {
      'click': this.clickSlantUpBtn
    }

    handlerBinder['slant-up-down-btn'] = {
      'click': this.clickSlantUpDownBtn
    }

    handlerBinder['stage'] = {
      'contentClick': this.addNewDot,
      'contentMousemove': this.stageMoveMouse,
      'contentDblclick': this.stageDbclick
      // 'contentContextmenu': this.stageContextmenu
    };

    handlerBinder['line'] = {
      'mouseover': this.lineDbclick
    };

    handlerBinder['Escape'] = {
      'keyup': this.cancelDraw
    };

    handlerBinder['Enter'] = {
      'keyup': this.finishDraw
    }

    handlerBinder['c'] = {
      'keydown': this.clickCellBtn
    }

    handlerBinder['b'] = {
      'keydown': this.clickCellBoundaryBtn
    }

    handlerBinder['r'] = {
      'keydown': this.clickTransitionBtn
    }

    handlerBinder['copyfloor-btn'] = {
      'click': this.copyFloor
    }


  }

  DrawEventHandler.prototype.stageDbclick = function(broker, previous, data){

    log.info('stage dbclick called');

    var result = new Result();

    var floor = data.currentTarget.attrs.id;
    var cursor = window.storage.canvasContainer.stages[floor].tmpLayer.group.getCursor();
    var cursorData =  window.storage.canvasContainer.stages[floor].tmpLayer.group.getCursorData();

    if(cursorData.isSnapped == false){

      result.msg = "There is no match function !";

    } else if( cursorData.snapedObj.type == 'line' && broker.isPublishable('modifyline') ){

      broker.publish(new Message('modifyline', {
        floor: floor,
        line : cursorData.snapedObj.obj
      }));

      broker.publish(new Message('start-modifypoint',{
        floor: floor,
        point: window.storage.dotFoolContainer.getDotFool(floor).getDotByPoint(cursor.coor)
      }));

      result.result = true;
      result.msg = 'modifypoint';

    } else if( cursorData.snapedObj.type == 'point' && broker.isPublishable('start-modifypoint') ){

      broker.publish(new Message('start-modifypoint', {
        floor: floor,
        point : cursorData.snapedObj.obj
      }));

      result.result = true;
      result.msg = 'modifypoint';

    } else if( broker.isPublishable('end-modifypoint') ){

      broker.publish(new Message('end-modifypoint', {
        floor: floor
      }));

      result.result = true;
      result.msg = null;

    } else {

      result.msg = 'ERROR !! There is some erroe with cursor data ' + cursorData;

    }

    return result;

  }

  DrawEventHandler.prototype.mousedown = function(broker, previous, data){
    log.info('mousedown : ', data);

    return new Result();
  }

  /**
   * @desc When cell btn clicked `start-addnewcell` or `end-addnewcell` can publish.
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.clickCellBtn = function(broker, previousMsg) {

    var result = new Result();

    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);

    if (isFloorExist && broker.isPublishable('start-addnewcell')) {

      // reqObj.floor will be active workspace
      broker.publish(new Message('start-addnewcell', null));

      result = {
        'result': true,
        'msg': 'start-addnewcell'
      };

    } else if (broker.isPublishable('end-addnewcell')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewcell', {
          'isEmpty': true
        }));

      } else {

        var newId = null;
        var flag = false;
        while(!flag){
          newId = window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM);
          flag = window.storage.propertyContainer.getElementById('cell', newId) == null ? true : false;
        }

        broker.publish(new Message('end-addnewcell', {
          'id': newId,
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (!isFloorExist) {

      result.msg = "There is no floor ...";

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to start-addnewcell, end-addnewcell.";

    }

    return result;

  }

  /**
=   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.clickHoleBtn = function(broker, previousMsg) {

    var result = new Result();

    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);

    if (isFloorExist && broker.isPublishable('start-addnewhole')) {

      // reqObj.floor will be active workspace
      broker.publish(new Message('start-addnewhole', null));

      result = {
        'result': true,
        'msg': 'start-addnewhole'
      };

    } else if (broker.isPublishable('end-addnewhole')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewhole', {
          'id': window.tmpObj.id,
          'floor': window.tmpObj.floor,
          'isEmpty': true
        }));

      } else {

        broker.publish(new Message('end-addnewhole', {
          'id': window.conditions.pre_hole + (++window.conditions.LAST_HOLE_ID_NUM),
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (!isFloorExist) {

      result.msg = "There is no floor ...";

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to start-addnewcell, end-addnewcell.";

    }

    return result;

  }

  /**
   * @desc When floor btn clicked `addnewfloor` can publish.
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.clickFloorBtn = function(broker, previousMsg) {

    var result = new Result();

    if (broker.isPublishable('addnewfloor')) {

      broker.publish(new Message('addnewfloor', {
        'floor': window.conditions.pre_floor + (++window.conditions.LAST_FLOOR_ID_NUM)
      }));

      result.result = true;
      result.msg = null;

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to addnewfloor.";

    }

    return result;

  }

  /**
   * @desc This will call when stage clicked, so we need to distinguish which geometry will be added new dot by the previous run message.<br>This can publish `addnewcell`,
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.addNewDot = function(broker, previousMsg, data) {

    var result = new Result();

    if (broker.isPublishable('addnewcell')) {

      var isSameFloor = (data.currentTarget.attrs.id == window.tmpObj.floor);
      var isFirstClick = (window.tmpObj.floor == null);

      if (isFirstClick || (!isFirstClick && isSameFloor)) {

        broker.publish(new Message('addnewcell', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewcell';


      } else if (!isFirstClick && !isSameFloor) {

        result.msg = "you clicked different floor!";

      } else {

        result.msg = "wrong state transition : " + previousMsg + " to addnewcell.";

      }
    }
    else if (broker.isPublishable('addnewslantdown')) {

      var isSameFloor = (data.currentTarget.attrs.id == window.tmpObj.floor);
      var isFirstClick = (window.tmpObj.floor == null);

      if (isFirstClick || (!isFirstClick && isSameFloor)) {

        broker.publish(new Message('addnewslantdown', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewslantdown';


      } else if (!isFirstClick && !isSameFloor) {

        result.msg = "you clicked different floor!";

      } else {

        result.msg = "wrong state transition : " + previousMsg + " to addnewslantdown.";

      }
    }
    else if (broker.isPublishable('addnewslantup')) {

      var isSameFloor = (data.currentTarget.attrs.id == window.tmpObj.floor);
      var isFirstClick = (window.tmpObj.floor == null);

      if (isFirstClick || (!isFirstClick && isSameFloor)) {

        broker.publish(new Message('addnewslantup', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewslantup';


      } else if (!isFirstClick && !isSameFloor) {

        result.msg = "you clicked different floor!";

      } else {

        result.msg = "wrong state transition : " + previousMsg + " to addnewslantup.";

      }
    }
    else if (broker.isPublishable('addnewslantupdown')) {

      var isSameFloor = (data.currentTarget.attrs.id == window.tmpObj.floor);
      var isFirstClick = (window.tmpObj.floor == null);

      if (isFirstClick || (!isFirstClick && isSameFloor)) {

        broker.publish(new Message('addnewslantupdown', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewslantupdown';


      } else if (!isFirstClick && !isSameFloor) {

        result.msg = "you clicked different floor!";

      } else {

        result.msg = "wrong state transition : " + previousMsg + " to addnewslantupdown.";

      }
    }
    else if (broker.isPublishable('addnewhole')) {

      var isSameFloor = (data.currentTarget.attrs.id == window.tmpObj.floor);
      var isFirstClick = (window.tmpObj.floor == null);

      if (isFirstClick || (!isFirstClick && isSameFloor)) {

        broker.publish(new Message('addnewhole', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewhole';


      } else if (!isFirstClick && !isSameFloor) {

        result.msg = "you clicked different floor!";

      } else {

        result.msg = "wrong state transition : " + previousMsg + " to addnewfloor.";

      }
    } else if (broker.isPublishable('addnewhatch')) {

      var isSameFloor = (data.currentTarget.attrs.id == window.tmpObj.floor);
      var isFirstClick = (window.tmpObj.floor == null);

      if (isFirstClick || (!isFirstClick && isSameFloor)) {

        broker.publish(new Message('addnewhatch', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewhatch';


      } else if (!isFirstClick && !isSameFloor) {

        result.msg = "you clicked different floor!";

      } else {

        result.msg = "wrong state transition : " + previousMsg + " to addnewfloor.";

      }
    }
    else if (broker.isPublishable('addnewcellboundary')) {

      var isSameFloor = (data.currentTarget.attrs.id == window.tmpObj.floor);
      var isFirstClick = (window.tmpObj.affiliatedCell == null);

      if (isFirstClick || (!isFirstClick && isSameFloor)) {

        broker.publish(new Message('addnewcellboundary', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewcellboundary';

      } else if (!isFirstClick && !isSameFloor) {

        result.msg = "you clicked different floor!";

      } else {

        result.msg = "wrong state transition : " + previousMsg + " to addnewcellboundary.";

      }

    }
    else if (broker.isPublishable('end-addnewstate')) {

      var floor = data.currentTarget.attrs.id;
      var isCellSelected = window.broker.getManager("end-addnewstate", "GeometryManager").isCellSelected(floor);

      if( isCellSelected.length == 1 ){

        var newId = null;
        var flag = false;
        while(!flag){
          newId = window.conditions.pre_state + (++window.conditions.LAST_STATE_ID_NUM);
          flag = window.storage.propertyContainer.getElementById('state', newId) == null ? true : false;
        }

        broker.publish(new Message('end-addnewstate', {
          floor: floor,
          id: newId,
          duality: isCellSelected[0]
        }));

        result.result = true;
        result.msg = 'end-addnewstate';

      } else if( isCellSelected.length > 1 ){
        broker.publish(new Message('makecellselectmenu', {
          floor: floor,
          cells: isCellSelected,
          pageCoor:{ x: data.evt.pageX, y: data.evt.pageY }
        }));

        result.result = true;
        result.msg = 'makecellselectmenu';

      } else {

        var newId = null;
        var flag = false;
        while(!flag){
          newId = window.conditions.pre_state + (++window.conditions.LAST_STATE_ID_NUM);
          flag = window.storage.propertyContainer.getElementById('state', newId) == null ? true : false;
        }

        broker.publish(new Message('end-addnewstate', {
          floor: floor,
          id: newId,
        }));

        result.result = true;
        result.msg = 'end-addnewstate';

      }

    }
    else if (broker.isPublishable('addnewtransition')) {

      var isFirstClick = (window.tmpObj.floor == null);
      var isSameFloor = (data.currentTarget.attrs.id == window.tmpObj.floor);

      if(isSameFloor || isFirstClick){

        broker.publish(new Message('addnewtransition', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewtransition';

      } else {

        result.msg = 'Transition need states which existed same floor but you select wrong state.';

      }

      if(window.tmpObj.dots.length == 3){

        var newId = null;
        var flag = false;
        while(!flag){
          newId = window.conditions.pre_transition + (++window.conditions.LAST_TRANSITION_ID_NUM);
          flag = window.storage.propertyContainer.getElementById('transition', newId) == null ? true : false;
        }

        broker.publish(new Message('end-addnewtransition', {
          floor: data.currentTarget.attrs.id,
          id: newId
        }));

        result.result = true;
        result.msg = null;
      }

    }
    else if (broker.isPublishable('addnewstair')) {

      var isFirstClick = (window.tmpObj.floor == null);
      var isSameFloor = (data.currentTarget.attrs.id == window.tmpObj.floor);

      if(isFirstClick || !isSameFloor){

        broker.publish(new Message('addnewstair', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewstair';

      } else if( isSameFloor ) {

        result.msg = 'You should select state which on the different floor from the floor that the state you selected before.';

      } else {

        result.msg = "wrong state transition : " + previousMsg + " to addnewstair.";

      }

      if(window.tmpObj.dots.length == 2){

        broker.publish(new Message('end-addnewstair', {
          floor: window.tmpObj.floor,
          id: window.conditions.pre_transition+(++window.conditions.LAST_TRANSITION_ID_NUM)
        }));

        result.result = true;
        result.msg = null;
      }

    }
    else if (broker.isPublishable('addnewinterlayerconnetction')) {

      var isFirstClick = (window.tmpObj.interConnects[0] == null);
      var isSameDifferLayer = (data.currentTarget.attrs.id == window.tmpObj.floor);

      if(isFirstClick || !isSameFloor){

        broker.publish(new Message('addnewinterlayerconnetction', {
          'floor': data.currentTarget.attrs.id
        }));

        result.result = true;
        result.msg = 'addnewinterlayerconnetction';

      }  else {

        result.msg = "wrong state transition : " + previousMsg + " to addnewinterlayerconnetction.";

      }

      if(window.tmpObj.interConnects[1] != null){

        broker.publish(new Message('end-addnewinterlayerconnetction', {
          id: window.conditions.pre_inter+(++window.conditions.LAST_INTER_ID_NUM)
        }));

        result.result = true;
        result.msg = null;
      }

    }
    else {

      result.msg = "no match function.";

    }

    return result;

  }

  /**
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.cancelDraw = function(broker, previousMsg) {

    var result = new Result();

    switch (previousMsg) {
      case 'addnewcell':
        if (broker.isPublishable('cancel-addnewcell')) {
          broker.publish(new Message('cancel-addnewcell', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = null;
        }
        break;
      case 'addnewcellboundary':
        if (broker.isPublishable('cancel-addnewcellboundary')) {

          broker.publish(new Message('cancel-addnewcellboundary', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = null;

        }
        break;
      case 'addnewstate':
        if (broker.isPublishable('cancel-addnewstate')) {

          broker.publish(new Message('cancel-addnewstate', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = null;

        }

        break;
      case 'addnewtransition':
        if(broker.isPublishable('cancel-addnewtransition')){

          broker.publish(new Message('cancel-addnewtransition', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = null;

        }
        break;
      case 'addnewhole':
        if(broker.isPublishable('cancel-addnewhole')){

          broker.publish(new Message('cancel-addnewhole', {
            'floor': window.tmpObj.floor
          }));

          result.result = true;
          result.msg = null;

        }
        break;
      default:
        result.msg = "no match function.";
    }

    return result;
  }

  /**
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.finishDraw = function(broker, previousMsg) {

    var result = new Result();

    if (broker.isPublishable('end-addnewcell')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewcell', {
          'isEmpty': true
        }));

      } else {

        var newId = null;
        var flag = false;
        while(!flag){
          newId = window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM);
          flag = window.storage.propertyContainer.getElementById('cell', newId) == null ? true : false;
        }

        broker.publish(new Message('end-addnewcell', {
          'id': newId,
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (broker.isPublishable('end-addnewslantdown')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewslantdown', {
          'isEmpty': true
        }));

      } else {

        broker.publish(new Message('end-addnewslantdown', {
          'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (broker.isPublishable('end-addnewslantupdown')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewslantupdown', {
          'isEmpty': true
        }));

      } else {

        broker.publish(new Message('end-addnewslantupdown', {
          'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (broker.isPublishable('end-addnewhole')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewhole', {
          'isEmpty': true
        }));

      } else {

        broker.publish(new Message('end-addnewhole', {
          'id': window.conditions.pre_hole + (++window.conditions.LAST_HOLE_ID_NUM),
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (broker.isPublishable('end-addnewcellboundary')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewcellboundary', {
          'isEmpty': true
        }));

      } else {
        var newId = null;
        var flag = false;
        while(!flag){
          newId = window.conditions.pre_cellBoundary + (++window.conditions.LAST_CELLBOUNDARY_ID_NUM);
          flag = window.storage.propertyContainer.getElementById('cellBoundary', newId) == null ? true : false;
        }

        broker.publish(new Message('end-addnewcellboundary', {
          'id': newId,
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (broker.isPublishable('end-addnewstate')) {

    } else if (broker.isPublishable('end-addnewtransition')) {

      if (window.tmpObj.isEmpty()){

        broker.publish(new Message('end-addnewcellboundary', {
          'isEmpty': true
        }));

      } else {

        var newId = null;
        var flag = false;
        while(!flag){
          newId = window.conditions.pre_transition + (++window.conditions.LAST_TRANSITION_ID_NUM);
          flag = window.storage.propertyContainer.getElementById('transition', newId) == null ? true : false;
        }

        broker.publish(new Message('end-addnewtransition', {
          floor: data.currentTarget.attrs.id,
          id: newId
        }));

      }

      result.result = true;
      result.msg = null;

    } else {
      result.mgs = "no match function."
    }

    return result;

  }

  /**
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.stageMoveMouse = function(broker, previousMsg, data) {

    var result = new Result();
    var rect = window.storage.canvasContainer.stages[data.currentTarget.attrs.id].stage.content.getBoundingClientRect();

    if (broker.isPublishable('snapping')) {

      var reqObj = {
        floor: data.currentTarget.attrs.id,
        point: {
          x: data.evt.clientX - rect.left,
          y: data.evt.clientY - rect.top
        }
      };

      broker.publish(new Message('snapping', reqObj));

      broker.publish(new Message('movetooltip', reqObj));

      result.result = true;
      result.msg = 'snapping';

    } else if (broker.isPublishable('modifypoint')) {

      var reqObj = {
        floor: data.currentTarget.attrs.id,
        point: {
          x: data.evt.clientX - rect.left,
          y: data.evt.clientY - rect.top
        }
      };

      broker.publish(new Message('snapping', reqObj));

      broker.publish(new Message('modifypoint', {
        floor: data.currentTarget.attrs.id
      }));

      result.result = true;
      result.msg = 'modifypoint';

    } else {

      result.msg = "no match function.";

    }


    return result;
  }

  /**
   * @memberof DrawEventHandler
   */
  DrawEventHandler.prototype.clickCellBoundaryBtn = function(broker, previousMsg) {

    var result = new Result();

    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);
    var isCellExist = (window.storage.propertyContainer.cellProperties.length != 0);

    if (!isFloorExist) {
      result.msg = "There is no floor ...";
    } else if (!isCellExist) {
      result.msg = "There is no cell ...";
    } else if (broker.isPublishable('start-addnewcellboundary')) {

      broker.publish(new Message('start-addnewcellboundary', null));

      result = {
        'result': true,
        'msg': 'start-addnewcellboundary'
      };

    } else if (broker.isPublishable('end-addnewcellboundary')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewcellboundary', {
          'isEmpty': true
        }));

      } else {

        var newId = null;
        var flag = false;
        while(!flag){
          newId = window.conditions.pre_cellBoundary + (++window.conditions.LAST_CELLBOUNDARY_ID_NUM);
          flag = window.storage.propertyContainer.getElementById('cellBoundary', newId) == null ? true : false;
        }

        broker.publish(new Message('end-addnewcellboundary', {
          'id': newId,
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else {
      result.msg = "wrong transition : " + previousMsg + " to start-addnewcellboundary, end-addnewcellboundary.";
    }

    return result;

  }

  /**
  * @memberof DrawEventHandler
  */
  DrawEventHandler.prototype.clickStateBtn = function(broker, previousMsg){

    var result = new Result();
    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);
    var isCellExist = (window.storage.propertyContainer.cellProperties.length >= 1);

    if (!isFloorExist) {

      result.msg = "There is no floor ...";

    } else if (!isCellExist){

      result.msg = "There is no cell ...";

    } else if(broker.isPublishable('start-addnewstate')){

      broker.publish(new Message('start-addnewstate', null));

      result.result = true;
      result.msg = 'start-addnewstate';

    } else {
      result.msg = "wrong transition : " + previousMsg + " to start-addnewstate, end-addnewstate.";
    }

    return result;

  }

  /**
  * @memberof DrawEventHandler
  */
  DrawEventHandler.prototype.clickTransitionBtn = function(broker, previousMsg){

    var result = new Result();
    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);
    var isStateExist = (window.storage.propertyContainer.stateProperties.length >= 2);

    if (!isFloorExist) {

      result.msg = "There is no floor ...";

    } else if (!isStateExist){

      result.msg = "There is too few state ...";

    } else if(broker.isPublishable('start-addnewtransition')){

      broker.publish(new Message('start-addnewtransition', null));

      result.result = true;
      result.msg = 'start-addnewtransition';

    } else if(broker.isPublishable('end-addnewtransition')){

      broker.publish(new Message('start-addnewtransition', null));

      result.result = true;
      result.msg = null;

    } else {
      result.msg = "wrong transition : " + previousMsg + " to start-addnewtransition, end-addnewtransition.";
    }

    return result;

  }


  /**
  * @memberof DrawEventHandler
  */
  DrawEventHandler.prototype.clickInterBtn = function(broker, previousMsg){

    var result = new Result();
    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);
    var isStateExist = (window.storage.propertyContainer.stateProperties.length >= 2);

    if (!isFloorExist) {

      result.msg = "There is no floor ...";

    } else if (!isStateExist){

      result.msg = "There is too few state ...";

    } else if(broker.isPublishable('start-addnewinterlayerconnetction')){

      broker.publish(new Message('start-addnewinterlayerconnetction', null));

      result.result = true;
      result.msg = 'start-addnewinterlayerconnetction';

    } else if(broker.isPublishable('end-addnewinterlayerconnetction')){

      broker.publish(new Message('start-addnewinterlayerconnetction', null));

      result.result = true;
      result.msg = null;

    } else {
      result.msg = "wrong transition : " + previousMsg + " to start-addnewinterlayerconnetction, end-addnewinterlayerconnetction.";
    }

    return result;

  }

  /**
  * @memberof DrawEventHandler
  */
  DrawEventHandler.prototype.clickStairBtn = function(broker, previousMsg){

    var result = new Result();
    var isFloorExist = (window.storage.propertyContainer.floorProperties.length >= 2);
    var isStateExist = (window.storage.propertyContainer.stateProperties.length >= 2);

    if (!isFloorExist) {

      result.msg = "There is too few floor ...";

    } else if (!isStateExist){

      result.msg = "There is too few state ...";

    } else if(broker.isPublishable('start-addnewstair')){

      broker.publish(new Message('start-addnewstair', null));

      result.result = true;
      result.msg = 'start-addnewstair';

    } else if(broker.isPublishable('end-addnewstair')){

      broker.publish(new Message('start-addnewstair', null));

      result.result = true;
      result.msg = null;

    } else {

      result.msg = "wrong transition : " + previousMsg + " to start-addnewstair, end-addnewstair.";

    }

    return result;

  }

  /**
  * @memberof DrawEventHandler
  */
  DrawEventHandler.prototype.lineDbclick = function(broker, previous, data){
    log.info('dbclick : ', data);

    return new Result();
  }

  /**
  * @memberof DrawEventHandler
  */
  DrawEventHandler.prototype.clickSlantDownBtn = function(broker, previous, data){

    var result = new Result();

    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);

    if (isFloorExist && broker.isPublishable('start-addnewslantdown')) {

      // reqObj.floor will be active workspace
      broker.publish(new Message('start-addnewslantdown', null));

      result = {
        'result': true,
        'msg': 'start-addnewslantdown'
      };

    } else if (broker.isPublishable('end-addnewslantdown')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewslantdown', {
          'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor': window.tmpObj.floor,
          'isEmpty': true
        }));

      } else {

        broker.publish(new Message('end-addnewslantdown', {
          'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (!isFloorExist) {

      result.msg = "There is no floor ...";

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to start-addnewslantdown, end-addnewslantdown.";

    }

    return result;

  }

  /**
  * @memberof DrawEventHandler
  */
  DrawEventHandler.prototype.clickSlantUpBtn = function(broker, previous, data){

    var result = new Result();

    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);

    if (isFloorExist && broker.isPublishable('start-addnewslantup')) {

      // reqObj.floor will be active workspace
      broker.publish(new Message('start-addnewslantup', null));

      result = {
        'result': true,
        'msg': 'start-addnewslantup'
      };

    } else if (broker.isPublishable('end-addnewslantup')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewslantup', {
          'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor': window.tmpObj.floor,
          'isEmpty': true
        }));

      } else {

        broker.publish(new Message('end-addnewslantup', {
          'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (!isFloorExist) {

      result.msg = "There is no floor ...";

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to start-addnewslantup, end-addnewslantup.";

    }

    return result;

  }

  /**
  * @memberof DrawEventHandler
  */
  DrawEventHandler.prototype.clickSlantUpDownBtn = function(broker, previous, data){

    var result = new Result();

    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);

    if (isFloorExist && broker.isPublishable('start-addnewslantupdown')) {

      // reqObj.floor will be active workspace
      broker.publish(new Message('start-addnewslantupdown', null));

      result = {
        'result': true,
        'msg': 'start-addnewslantupdown'
      };

    } else if (broker.isPublishable('end-addnewslantupdown')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewslantupdown', {
          'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor': window.tmpObj.floor,
          'isEmpty': true
        }));

      } else {

        broker.publish(new Message('end-addnewslantupdown', {
          'id': window.conditions.pre_cell + (++window.conditions.LAST_CELL_ID_NUM),
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else if (!isFloorExist) {

      result.msg = "There is no floor ...";

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to start-addnewslantupdown, end-addnewslantupdown.";

    }

    return result;

  }

  DrawEventHandler.prototype.stageContextmenu = function(broker, previous, data){
    var result = new Result();

    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);

    if (isFloorExist && broker.isPublishable('callcontextmenu')) {

      // reqObj.floor will be active workspace
      broker.publish(new Message('callcontextmenu', {floor: data.currentTarget.attrs.id}));

      result = {
        'result': true,
        'msg': 'callcontextmenu'
      };

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to callcontextmenu.";

    }

    return result;
  }

  DrawEventHandler.prototype.test = function(){
    log.info('DrawEventHandler TEST');
  }

  DrawEventHandler.prototype.copyFloor = function(broker, previous, data){
    var result = new Result();

    if ( broker.isPublishable('copyfloor')) {

      var targetFloor = document.getElementById('copyfloor-text').value;

      broker.publish(new Message('copyfloor', {floor: document.getElementById('id-text').value, targetFloor: targetFloor}));

      result = {
        'result': true,
        'msg': 'copyfloor'
      };

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to callcontextmenu.";

    }

    return result;
  }

  DrawEventHandler.prototype.clickHatchBtn = function(broker, previous, data){
    var result = new Result();

    var isFloorExist = (window.storage.propertyContainer.floorProperties.length != 0);
    var isCellExist = (window.storage.propertyContainer.cellProperties.length != 0);

    if (!isFloorExist) {
      result.msg = "There is no floor ...";
    } else if (!isCellExist) {
      result.msg = "There is no cell ...";
    } else if (broker.isPublishable('start-addnewhatch')) {

      broker.publish(new Message('start-addnewhatch', null));

      result = {
        'result': true,
        'msg': 'start-addnewhatch'
      };

    } else if (broker.isPublishable('end-addnewhatch')) {

      if (window.tmpObj.isEmpty()) {

        broker.publish(new Message('end-addnewhatch', {
          'isEmpty': true
        }));

      } else {

        var newId = null;
        var flag = false;
        while(!flag){
          newId = window.conditions.pre_cellBoundary + (++window.conditions.LAST_CELLBOUNDARY_ID_NUM);
          flag = window.storage.propertyContainer.getElementById('hatch', newId) == null ? true : false;
        }

        broker.publish(new Message('end-addnewhatch', {
          'id': newId,
          'floor': window.tmpObj.floor
        }));

      }

      result.result = true;
      result.msg = null;

    } else {
      result.msg = "wrong transition : " + previousMsg + " to start-addnewcellboundary, end-addnewcellboundary.";
    }

    return result;

  }


  return DrawEventHandler;
});
