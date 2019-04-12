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

    handlerBinder['project-export'] = {
      'click': this.showModal
    };

    handlerBinder['viewer-btn'] = {
      'click': this.showModal
    };

    handlerBinder['setting-conditions'] = {
      'click': this.showModal
    }

    handlerBinder['setting-code'] = {
      'click': this.showModal
    }

    handlerBinder['setting-desc'] = {
      'click': this.showModal
    }

    handlerBinder['module-type-text'] = {
      'change': this.showFeatureTypeAttr
    };

    handlerBinder['feature-type-text'] = {
      'change': this.showExtensionAttr
    };

    handlerBinder['add-map-btn'] = {
      'click': this.addMap
    }

    handlerBinder['activate-map-btn'] = {
      'click': this.activateMap
    }

    handlerBinder['deactivate-map-btn'] = {
      'click': this.deactivateMap
    }

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

      //data.preventDefault();

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

  UIChangeEventHandler.prototype.showModal = function(broker, previousMsg, data) {
    switch (data.target.dataset.modaltype) {
      case 'export':
        $('#go-factory-modal').modal('show');
        break;
      case 'viewer':
        $('#go-viewer-modal').modal('show');
        break;
      case 'conditions':
        if (window.broker.isPublishable('showconditionmodal')) {
          broker.publish(new Message('showconditionmodal', {}));
        }
        break;
      case 'desc':
        if (broker.isPublishable('updatedesclist')) {
          broker.publish(new Message('updatedesclist', {}));
        }

        $('#setting-desc-modal').modal('show');
        break;
      case 'code':
        if (window.broker.isPublishable('showcodemodal')) {
          broker.publish(new Message('showcodemodal', {}));
        }
      default:

    }

    var result = {
      'result': true,
      'msg': null
    };

    return result;
  }

  UIChangeEventHandler.prototype.showFeatureTypeAttr = function(broker, previousMsg, data) {
    var result = new Result;
    var pre = data.target.dataset.pre;
    var selected = data.target.selectedOptions.length != 0 ?
      data.target.selectedOptions[0].innerHTML :
      "";

    if (broker.isPublishable('shownaviattr')) {
      broker.publish(new Message('shownaviattr', {
        'pre': data.target.dataset.pre,
        'selected': selected,
        'table': document.getElementById("property-extension-table").childNodes[0]
      }));

      result = {
        'result': true,
        'msg': 'shownaviattr'
      };

    }

    return result;
  }

  UIChangeEventHandler.prototype.showExtensionAttr = function(broker, previousMsg, data) {
    var result = new Result;
    var pre = data.target.dataset.pre;
    var selected = data.target.selectedOptions.length != 0 ?
      data.target.selectedOptions[0].innerHTML :
      "";

    if (broker.isPublishable('showextensionattr')) {
      broker.publish(new Message('showextensionattr', {
        'pre': data.target.dataset.pre,
        'selected': selected,
        'moduleType': document.getElementById("module-type-text").value,
        'path' : [document.getElementById("feature-type-text").value],
        'table' : document.getElementById("property-extension-table").childNodes[0]
      }));

      result = {
        'result': true,
        'msg': 'showextensionattr'
      };

    }

    return result;
  }

  UIChangeEventHandler.prototype.addMap = function(broker, previousMsg, data) {
    var x = document.getElementById('map-x-text').value;
    var y = document.getElementById('map-y-text').value;

    var result = {
      'result': false,
      'msg': null
    };

    if ((x != "" || y != "") && broker.isPublishable('addmap')) {
      broker.publish(new Message('addmap', {
        'floor': document.getElementById('id-text').value,
        'coor': [x * 1, y * 1]
      }));

      result.result = true;
    }

    return result;
  }

  UIChangeEventHandler.prototype.activateMap = function(broker, previousMsg, data) {
    var result = {
      'result': true,
      'msg': null
    };

    if (!window.conditions.activateMap) {
      window.conditions.activateMap = true;
      var id = document.getElementById('id-text').value;
      document.getElementById(id + '-map').style.zIndex = "1";
    }


    return result;
  }

  UIChangeEventHandler.prototype.deactivateMap = function(broker, previousMsg, data) {
    var result = {
      'result': true,
      'msg': null
    };

    if (window.conditions.activateMap) {
      window.conditions.activateMap = false;
      var id = document.getElementById('id-text').value;
      document.getElementById(id + '-map').style.zIndex = "0";
    }

    return result;
  }



  return UIChangeEventHandler;
});
