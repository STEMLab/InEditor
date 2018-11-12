/**
 * @author suheeeee<lalune1120@hotmail.com>
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
   * @desc This handler deal with events which request change ui.<br>e.g. click tree view content.
   * @class UIChangeEventHandler
   */
  function UIChangeEventHandler() {

  }

  /**
   * @memberof UIChangeEventHandler
   */
  UIChangeEventHandler.prototype.setHandlerBinder = function(handlerBinder) {

    handlerBinder['tree-view-class'] = {
      'fancytreeclick': this.clickTreeView
    };

    handlerBinder['tree-view-floor'] = {
      'fancytreeclick': this.clickTreeView
    };

    handlerBinder['canvas'] = {
      'wheel': this.wheelCanavs
    };

    handlerBinder['floorplan-file'] = {
      'change': this.floorplanUpload
    };


    handlerBinder['setting-desc'] = {
      'click': this.updateDescList
    };

    handlerBinder['navi-text'] = {
      'change' : this.showNaviAttr
    };

    handlerBinder['project-export'] = {
      'click': this.showModal
    };



    // handlerBinder['stage']={
    //   'contentContextmenu': this.callStageMenu
    // }
  }


  /**
   * @desc When tree view clicked `activateworkspace` and `setpropertyview` can publish.
   * @memberof UIChangeEventHandler
   */
  UIChangeEventHandler.prototype.clickTreeView = function(broker, previousMsg, data) {

    var result = {
      'result': false,
      'msg': null
    };

    if (data.node.type == 'floor') {

      if (broker.isPublishable('activateworkspace') && broker.isPublishable('setpropertyview')) {

        broker.publish(new Message('activateworkspace', {
          'id': data.node.key
        }));

        broker.publish(new Message('setpropertyview', {
          'type': data.node.type,
          'id': data.node.key,
          'storage': window.storage
        }));

        result.result = true;

      }

    } else if (broker.isPublishable('setpropertyview')) {

      // Converts the contents of the sidebar > property to the contents of the selected element.
      broker.publish(new Message('setpropertyview', {
        'type': data.node.type,
        'id': data.node.key,
        'storage': window.storage
      }));

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to setpropertyview.";

    }

    return result;
  }

  /**
   * @desc When tree view clicked `zoomworkspace` can publish.
   * @memberof UIChangeEventHandler
   */
  UIChangeEventHandler.prototype.wheelCanavs = function(broker, previousMsg, data) {

    var result = {
      'result': false,
      'msg': null
    };

    if (broker.isPublishable('zoomworkspace')) {

      data.preventDefault();

      var target = data.path[2].id;
      var oldScale = window.storage.canvasContainer.stages[target].stage.scaleX();

      if (data.deltaY > 0 && oldScale <= window.conditions.scaleMin) {

        result = {
          'result': false,
          'msg': "size of canvas is already minimum size."
        };


      } else if (data.deltaY < 0 && oldScale >= window.conditions.scaleMax) {

        result = {
          'result': false,
          'msg': "size of canvas is already maximum size."
        };

      } else {

        var mousePoint = {
          x: window.storage.canvasContainer.stages[target].stage.getPointerPosition().x / oldScale - window.storage.canvasContainer.stages[target].stage.x() / oldScale,
          y: window.storage.canvasContainer.stages[target].stage.getPointerPosition().y / oldScale - window.storage.canvasContainer.stages[target].stage.y() / oldScale,
        };

        var newScale = data.deltaY < 0 ? oldScale * window.conditions.scaleFactor : oldScale / window.conditions.scaleFactor;
        window.storage.canvasContainer.stages[target].stage.scale({
          x: newScale,
          y: newScale
        });

        var newPos;

        if (0 < newScale && newScale <= 1) {

          newPos = {
            x: 0,
            y: 0
          };

        } else {

          newPos = {
            x: -(mousePoint.x - window.storage.canvasContainer.stages[target].stage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePoint.y - window.storage.canvasContainer.stages[target].stage.getPointerPosition().y / newScale) * newScale
          };

        }

        broker.publish(new Message('zoomworkspace', {
          'id': target,
          'newScale': newScale,
          'newPos': newPos
        }));

        result = {
          'result': true,
          'msg': null
        };

      }



    } else {

      result.msg = "wrong state transition : " + previousMsg + " to zoomworkspace.";

    }

    return result;
  }

  /**
   * @desc When tree view clicked `addfloorplan` can publish.
   * @memberof UIChangeEventHandler
   */
  UIChangeEventHandler.prototype.floorplanUpload = function(broker, previousMsg, data) {

    var result = {
      'result': false,
      'msg': null
    };

    if (broker.isPublishable('addfloorplan') && document.getElementById(data.target.id).files[0] != null) {
      broker.publish(new Message('addfloorplan', {
        'id': document.getElementById('id-text').value,
        'img': document.getElementById(data.target.id).files[0]
      }));


      result = {
        'result': true,
        'msg': null
      };

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to addfloorplan.";

    }

    return result;

  }

  /**
   * @desc
   * @memberof UIChangeEventHandler
   */
  UIChangeEventHandler.prototype.callStageMenu = function(broker, previousMsg, data) {

    var result = {
      'result': false,
      'msg': null
    };

    event.preventDefault();
    log.info('TEST');

    return result;

  }

  UIChangeEventHandler.prototype.updateDescList = function(broker, previousMsg, data) {
    var result = {
      'result': false,
      'msg': null
    };

    if (broker.isPublishable('updatedesclist')) {
      broker.publish(new Message('updatedesclist', { }));
      result = {
        'result': true,
        'msg': null
      };
    } else {
      result.msg = "wrong state transition : " + previousMsg + " to updatedesclist.";
    }

    return result;
  }

  UIChangeEventHandler.prototype.showNaviAttr = function(broker, previousMsg, data){
    var result = new Result;
    var pre = data.target.dataset.pre;

    if(pre == "" && data.target.value != "" && data.target.value != "selected"){
      var table = document.getElementById("property-navi-table").childNodes[0];
      var btn = table.childNodes[1];
      table.removeChild(btn);

      var classTr = document.createElement("tr");
      classTr.innerHTML = "<td class=\"title\">class</td><td class=\"value\"><input id=\"class-text\" type=\"text\" value=\"\"></td>";
      var functionTr = document.createElement("tr");
      functionTr.innerHTML = "<td class=\"title\">function</td><td class=\"value\"><input id=\"function-text\" type=\"text\" value=\"\"></td>";
      var usageTr = document.createElement("tr");
      usageTr.innerHTML = "<td class=\"title\">usage</td><td class=\"value\"><input id=\"usage-text\" type=\"text\" value=\"\"></td>";

      table.appendChild(classTr);
      table.appendChild(functionTr);
      table.appendChild(usageTr);
      table.appendChild(btn);
      document.getElementById("navi-text").dataset.pre = data.target.value;
    }
    else if(pre != "" && (data.target.value == "" || data.target.value == "selected")){

      var table = document.getElementById("property-navi-table").childNodes[0];
      var len = table.childNodes.length;
      while(table.childNodes.length > 2){
        table.removeChild(table.childNodes[1]);
      }
      document.getElementById("navi-text").dataset.pre = "";
    }



    log.info(document.getElementById("navi-text"));
    result = {
      'result': true,
      'msg': null
    };

    return result;
  }

  UIChangeEventHandler.prototype.showModal = function(broker, previousMsg, data){
    switch (data.target.dataset.modaltype) {
      case 'export':
        $('#go-factory-modal').modal('show');
        break;
      default:

    }

    var result = {
      'result': true,
      'msg': null
    };

    return result;
  }


  return UIChangeEventHandler;
});
