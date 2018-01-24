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
   * @exports PropertyEventHandler
   */
  function PropertyEventHandler() {

  }

  PropertyEventHandler.prototype.setHandlerBinder = function(handlerBinder) {

    handlerBinder['property-subimt-btn'] = {
      'click': this.clickPropertySubmitBtn
    }

  }


  PropertyEventHandler.prototype.clickPropertySubmitBtn = function(broker, previousMsg) {

    var result = {
      'result': false,
      'msg': null
    };

    switch (previousMsg) {
      case null:

        broker.publish(new Message('updateproperty', {
          "type": document.getElementById("property-table").getAttribute("type"),
          "id": document.getElementById("id-text").value,
          "updateContent": window.eventHandler.handlers['propertyEventHandler'].getUpdateContent(document.getElementById("property-table").getAttribute("type"))
        }));

        result = {
          'result': true,
          'msg': null
        };

        break;

      default:
        result = {
          'resutl': false,
          'msg': 'no match function !'
        };

        break;
    }

    return result;

  }

  PropertyEventHandler.prototype.getUpdateContent = function(type) {
    var result = new Object;

    switch (type) {
      case 'project':
        result = {
          'name': document.getElementById("name-text").value,
          'date': document.getElementById("date-text").value,
          'author': document.getElementById("author-text").value,
          'description': document.getElementById("description-text").value
        };
        break;
      case 'floor':
        result = {
          'name': document.getElementById("name-text").value,
          'level': document.getElementById("level-text").value,
          'lowerCorner': document.getElementById("lower-corner-text").value,
          'upperCorner': document.getElementById("upper-corner-text").value,
          'groundHeight': document.getElementById("ground-height-text").value,
          'celingHeight': document.getElementById("celing-height-text").value,
          'doorHeight': document.getElementById("door-height-text").value,
          'description': document.getElementById("description-text").value
        };
        break;
      case 'cell':
        result = {
          'name': document.getElementById("name-text").value,
          'description': document.getElementById("description-text").value
        };
        break;
      case 'cellBoundary':
        result = {
          'name': document.getElementById("name-text").value,
          'description': document.getElementById("description-text").value
        };
        break;
      case 'state':
        result = {
          'name': document.getElementById("name-text").value,
          'description': document.getElementById("description-text").value
        };
        break;
      case 'transiton':
        result = {
          'name': document.getElementById("name-text").value,
          'weight': document.getElementById("weight-text").value,
          'description': document.getElementById("description-text").value
        };
        break;
      default:
    }

    return result;
  }



  return PropertyEventHandler;
});
