/**
 * @author suheeeee<lalune1120@hotmail.com>
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

    handlerBinder['property-ref-submit-btn'] = {
      'click': this.clickPropertRefySubmitBtn
    }

    handlerBinder['property-navi-submit-btn'] = {
      'click': this.clickNaviSubmitBtn
    }

    handlerBinder['setting-conditions-submit-btn'] = {
      'click': this.addDescList
    }

    handlerBinder['add-new-local-desc-btn'] = {
      'click': this.addLocalDesc
    }

    handlerBinder['delete-local-desc-btn'] = {
      'click': this.deleteLocalDesc
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

    if (broker.isPublishable('updateproperty')) {

      broker.publish(new Message('updateproperty', {
        "type": $('#property-table').data('type'),
        "id": document.getElementById("id-text").value,
        "updateContent": window.eventHandler.handlers['propertyEventHandler'].getUpdateContent($('#property-table').data('type'))
      }));

      result = {
        'result': true,
        'msg': null
      };

    } else {

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

    if (broker.isPublishable('updaterefdata')) {

      broker.publish(new Message('updaterefdata', {
        "type": $('#property-table').data('type'),
        "id": document.getElementById("id-text").value,
        "updateContent": window.eventHandler.handlers['propertyEventHandler'].getUpdateContent('ref')
      }));

      result = {
        'result': true,
        'msg': null
      };

    } else {

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
          'description': {}
        };
        break;
      case 'floor':
        result = {
          'name': document.getElementById("name-text").value,
          'layer': document.getElementById("layer-text").value,
          'lowerCorner': [document.getElementById("lower-corner-x-text").value, document.getElementById("lower-corner-y-text").value],
          'upperCorner': [document.getElementById("upper-corner-x-text").value, document.getElementById("upper-corner-y-text").value],
          'groundHeight': document.getElementById("ground-height-text").value,
          'celingHeight': document.getElementById("celing-height-text").value,
          'doorHeight': document.getElementById("door-height-text").value,
          'description': {}
        };

        var id = document.getElementById("id-text").value;
        var descList = window.storage.propertyContainer.getElementById('floor', id).description;
        for (var key in descList) {
          result.description[key] = document.getElementById("desc-text-" + key).value;
        }

        break;
      case 'cell':
        result = {
          'name': document.getElementById("name-text").value,
          'description': {}
        };

        var id = document.getElementById("id-text").value;
        var descList = window.storage.propertyContainer.getElementById('cell', id).description;
        for (var key in descList) {
          result.description[key] = document.getElementById("desc-text-" + key).value;
        }

        break;
      case 'ref':
        result = {
          'externalRef': document.getElementById("ref-text").value
        }
        break;
      case 'cellBoundary':
        result = {
          'name': document.getElementById("name-text").value,
          'naviType': document.getElementById("navi-text").value,
          'description': {}
        };

        var id = document.getElementById("id-text").value;
        var descList = window.storage.propertyContainer.getElementById('cellBoundary', id).description;
        for (var key in descList) {
          result.description[key] = document.getElementById("desc-text-" + key).value;
        }

        break;
      case 'state':
        result = {
          'name': document.getElementById("name-text").value,
          'description': {},
          'height': document.getElementById("height-text").value
        };

        var id = document.getElementById("id-text").value;
        var descList = window.storage.propertyContainer.getElementById('state', id).description;
        for (var key in descList) {
          result.description[key] = document.getElementById("desc-text-" + key).value;
        }

        break;
      case 'transition':
        result = {
          'name': document.getElementById("name-text").value,
          'weight': document.getElementById("weight-text").value,
          'description': {}
        };

        var id = document.getElementById("id-text").value;
        var descList = window.storage.propertyContainer.getElementById('transition', id).description;
        for (var key in descList) {
          result.description[key] = document.getElementById("desc-text-" + key).value;
        }

        break;
      case 'interlayerConnection':
        result = {
          'typeOfTopoExpression': document.getElementById("topoExpression-text").options[document.getElementById("topoExpression-text").selectedIndex].value,
          'commnet': document.getElementById("commnet-text").value,
        };
        break;
      default:
    }

    return result;
  }

  PropertyEventHandler.prototype.addDescList = function(broker, previousMsg) {
    var result = {
      'result': false,
      'msg': null
    };

    if (broker.isPublishable('addnewglobaldesc')) {

      broker.publish(new Message('addnewglobaldesc', {
        data: document.getElementById('setting-desc-modal-newDesc').value
      }));

      document.getElementById('setting-desc-modal-newDesc').value = "";

      result = {
        'result': true,
        'msg': null
      };

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to addnewglobaldesc.";

    }

    return result;
  }

  PropertyEventHandler.prototype.clickNaviSubmitBtn = function(broker, previousMsg) {
    var result = new Object;

    if (broker.isPublishable('updateproperty')) {
      var type = document.getElementById("navi-text").value;
      if (type == "" || type == "selected") type = "";

      var data = {
        'naviType': type,
        'navi': {
          'class': "",
          'function': "",
          'usage': ""
        }
      };

      if (data.naviType != "" && data.naviType != "selected") {
        data.navi.class = document.getElementById("class-text").value
        data.navi.function = document.getElementById("function-text").value
        data.navi.usage = document.getElementById("usage-text").value
      }

      broker.publish(new Message('updateproperty', {
        "type": $('#property-table').data('type'),
        "id": document.getElementById("id-text").value,
        "isNavi": true,
        "updateContent": data
      }));

      result = {
        'result': true,
        'msg': null
      };

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to updateproperty.";

    }

    return result;
  }

  PropertyEventHandler.prototype.addLocalDesc = function(broker) {
    var result = new Object;
    var text = $('#add-new-local-desc-text').val();

    if (broker.isPublishable('addlocaldesc') && (text != "" && text != null)) {
      broker.publish(new Message('addlocaldesc', {
        "id": $('#id-text').val(),
        "type": $('#property-table').data('type'),
        "desc": text
      }));

      result = {
        'result': true,
        'msg': null
      };

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to addlocaldesc.";

    }

    return result;
  }

  PropertyEventHandler.prototype.deleteLocalDesc = function(broker, previousMsg, data) {
    var result = new Object;

    if (broker.isPublishable('deletelocaldesc')) {
      broker.publish(new Message('deletelocaldesc', {
        "id": $('#id-text').val(),
        "type": $('#property-table').data('type'),
        "desc": data.target.dataset.key
      }));
      result = {
        'result': true,
        'msg': null
      };

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to addlocaldesc.";

    }

    return result;
  }



  return PropertyEventHandler;
});
