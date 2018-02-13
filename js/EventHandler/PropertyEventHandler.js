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
   * @class PropertyEventHandler
   */
  function PropertyEventHandler() {

  }

  /**
  * @memberof PropertyEventHandler
  */
  PropertyEventHandler.prototype.setHandlerBinder = function(handlerBinder) {

    handlerBinder['property-subimt-btn'] = {
      'click': this.clickPropertySubmitBtn
    }

    handlerBinder['property-ref-subimt-btn'] = {
      'click': this.clickPropertRefySubmitBtn
    }

  }

  /**
  * @desc When PropertySubmit btn clicked `updateproperty` can publish.
  * @memberof PropertyEventHandler
  */
  PropertyEventHandler.prototype.clickPropertySubmitBtn = function(broker, previousMsg) {

    var result = {
      'result': false,
      'msg': null
    };

    if(broker.isPublishable('updateproperty')){

      broker.publish(new Message('updateproperty', {
        "type": document.getElementById("property-table").getAttribute("type"),
        "id": document.getElementById("id-text").value,
        "updateContent": window.eventHandler.handlers['propertyEventHandler'].getUpdateContent(document.getElementById("property-table").getAttribute("type"))
      }));

      result = {
        'result': true,
        'msg': null
      };

    } else{

      result.msg = "wrong state transition : " + previousMsg + " to updateproperty.";

    }

    return result;

  }

  /**
  * @desc When PropertRefySubmit btn clicked `updaterefdata` can publish.
  * @memberof PropertyEventHandler
  */
  PropertyEventHandler.prototype.clickPropertRefySubmitBtn = function(broker, previousMsg) {

    var result = {
      'result': false,
      'msg': null
    };

    if(broker.isPublishable('updaterefdata')){

      broker.publish(new Message('updaterefdata', {
        "type": document.getElementById("property-table").getAttribute("type"),
        "id": document.getElementById("id-text").value,
        "updateContent": window.eventHandler.handlers['propertyEventHandler'].getUpdateContent('ref')
      }));

      result = {
        'result': true,
        'msg': null
      };

    } else{

      result.msg = "wrong state transition : " + previousMsg + " to updaterefdata.";

    }

    return result;

  }

  /**
  * @desc Read html values in sidabar > property.
  * @memberof PropertyEventHandler
  */
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
      case 'ref':
        result = {
          'externalRef': document.getElementById("ref-text").value
        }
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
