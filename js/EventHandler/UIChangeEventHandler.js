/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "../PubSub/Message.js"
], function(
  Message
) {
  'use strict';

  /**
   * @desc This handler deal with events which request change ui.<br>e.g. click tree view content.
   * @exports UIChangeEventHandler
   */
  function UIChangeEventHandler() {

  }

  UIChangeEventHandler.prototype.setHandlerBinder = function(handlerBinder) {

    handlerBinder['tree-view'] = {
      'fancytreeclick': this.clickTreeView
    };

    handlerBinder['canvas'] = {
      'wheel': this.wheelCanavs
    };

    handlerBinder['floorplan-file'] = {
      'change': this.floorplanUpload
    };


  }

  UIChangeEventHandler.prototype.clickTreeView = function(broker, previousMsg, data) {

    var result = {
      'result': false,
      'msg': null
    };

    switch (previousMsg) {

      case null:
        // Converts the contents of the sidebar > property to the contents of the selected element.
        broker.publish(new Message('setpropertyview', {
          'type': data.node.type,
          'id': data.node.key,
          'storage': window.storage
        }));

        // Converts the active tab of the workspace to the selected floor.
        if (data.node.type == 'floor') {
          broker.publish(new Message('setworkspaceview', {
            'id': data.node.key
          }));
        }

        result = {
          'result': true,
          'msg': null
        };
        break;

      default:
        result.msg = "wrong previous state : " + previousMsg;
        break;
    }

    return result;
  }


  UIChangeEventHandler.prototype.wheelCanavs = function(broker, previousMsg, data) {

    var result = {
      'result': false,
      'msg': null
    };

    switch (previousMsg) {

      case null:
        data.preventDefault();

        var target = data.path[2].id;
        var oldScale = window.storage.canvasContainer.stages[target].stage.scaleX();

        if (data.deltaY > 0 && oldScale < window.conditions.scaleMin) {

          result = {
            'result': false,
            'msg': "size of canvas is already minimum size."
          };

          break;

        } else if (data.deltaY < 0 && oldScale > window.conditions.scaleMax) {

          result = {
            'result': false,
            'msg': "size of canvas is already maximum size."
          };

          break;

        }

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
        break;

      default:
        result.msg = "wrong previous state : " + previousMsg;
        break;
    }

    return result;
  }


  UIChangeEventHandler.prototype.floorplanUpload = function(broker, previousMsg, data) {

    var result = {
      'result': false,
      'msg': null
    };

    switch (previousMsg) {

      case null:

        broker.publish(new Message('addfloorplan', {
          'id': document.getElementById('id-text').value,
          'img': document.getElementById(data.target.id).files[0]
        }));


        result = {
          'result': true,
          'msg': null
        };
        break;

      default:
        result.msg = "wrong previous state : " + previousMsg;
        break;
    }

    return result;

  }
  return UIChangeEventHandler;
});
