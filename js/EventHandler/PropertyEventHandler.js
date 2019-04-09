/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
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

    handlerBinder['extend-subimt-btn'] = {
      'click': this.clickExtebdSubmitBtn
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

    handlerBinder['setting-code-new-object-btn'] = {
      'click': this.addNewCode
    }

    handlerBinder['setting-code-upload-file-btn'] = {
      'click': this.uploadCodeFile
    }

    handlerBinder['code-modal-trash'] = {
      'click': this.deleteCode
    }

    handlerBinder['get-map-coor-btn'] = {
      'click': this.getMapCoor
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

      var Message = require('../PubSub/Message.js');
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

      var Message = require('../PubSub/Message.js');
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
          'groundHeight': document.getElementById("ground-height-text").value * 1,
          'celingHeight': document.getElementById("celing-height-text").value * 1,
          'doorHeight': document.getElementById("door-height-text").value * 1,
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
          'description': {},
          'height': document.getElementById('height-text').value * 1,
          'bottom': document.getElementById('bottom-text').value * 1
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
          'description': {},
          'height': document.getElementById('height-text').value * 1,
          'bottom': document.getElementById('bottom-text').value * 1
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

      var Message = require('../PubSub/Message.js');
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

  PropertyEventHandler.prototype.clickExtebdSubmitBtn = function(broker, previousMsg) {
    var result = new Object;

    if (broker.isPublishable('updateproperty')) {

      var CodeList = require('Property').CODE_LIST.getInstance();
      let ExtensionBase = require('Property').EXTEND_BASE;
      let data = new ExtensionBase();
      data.moduleType = document.getElementById('module-type-text').value;
      data.featureType = document.getElementById('feature-type-text').value;

      if(data.moduleType != "" && data.featureType != ""){
        if(data.moduleType == "navi" && document.getElementById('property-table').dataset.type == "cell"){
          data.attributes = {
            function: CodeList.getCodeNum([data.featureType, 'class'], document.getElementById("class-text").value),
            class: CodeList.getCodeNum([data.featureType, 'function'], document.getElementById("function-text").value),
            usage: CodeList.getCodeNum([data.featureType, 'function'], document.getElementById("usage-text").value)
          }
        }
        else if(data.moduleType == "non-navi"){
          data.attributes = {
            obstacleType: CodeList.getCodeNum([data.featureType], document.getElementById("obstacle-type-text").value)
          }
        }
      }

      var Message = require('../PubSub/Message.js');
      broker.publish(new Message('updateproperty', {
        "type": $('#property-table').data('type'),
        "id": document.getElementById("id-text").value,
        "dataClass": 'ExtensionBase',
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


  PropertyEventHandler.prototype.clickTextureSubmitBtn = function(broker, previousMsg) {
    var result = new Object;

    if (broker.isPublishable('updateproperty')) {

      var data = {
        'direction': {
          'in' : document.getElementById('check-direction-in').children[0].checked,
          'out' : document.getElementById('check-direction-out').children[0].checked
        },
        'target' : {
          'ceiling' : document.getElementById('check-target-ceiling').children[0].checked,
          'wall' : document.getElementById('check-target-wall').children[0].checked,
          'floor' : document.getElementById('check-target-floor').children[0].checked
        }
      };

      var Message = require('../PubSub/Message.js');
      broker.publish(new Message('updateproperty', {
        "type": $('#property-table').data('type'),
        "id": document.getElementById("id-text").value,
        "isTexture": true,
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
      var Message = require('../PubSub/Message.js');
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
    var Message = require('../PubSub/Message.js');

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

  PropertyEventHandler.prototype.addNewCode = function(broker, previousMsg, data) {

    var result = new Object;
    var Message = require('../PubSub/Message.js');

    var ot = $('#setting-code-new-object-obj-type-menu').dropdown('get value');
    var ct = $('#setting-code-new-object-code-type-menu').dropdown('get value');
    var cn = $('#setting-code-new-object-code-number-menu').val();
    var cd = $('#setting-code-new-object-code-desc-menu').val();

    if (broker.isPublishable('addnewcode')) {
      if (ot == 'NonNavigableSpace') {
        broker.publish(new Message('addnewcode', {
          path: ['NonNavigableSpace'],
          cn: cn,
          cd: cd
        }));

        result = {
          result: true,
          msg: null
        }
      } else {
        broker.publish(new Message('addnewcode', {
          path: [ot, ct],
          cn: cn,
          cd: cd
        }));

        result = {
          result: true,
          msg: null
        }
      }
    }

    return result;
  }

  PropertyEventHandler.prototype.uploadCodeFile = function(broker, previousMsg, data) {
    var file = document.getElementById('setting-code-upload-file').files[0];
    var result = {
      result: false,
      msg: null
    }

    var Message = require('../PubSub/Message.js');
    if (broker.isPublishable('uploadcodefile')) {
      broker.publish(new Message('uploadcodefile', {
        file: file
      }));

      result = true;
    }

    return result;
  }

  PropertyEventHandler.prototype.deleteCode = function(broker, previousMsg, data) {
    var path = data.target.id.split('-');
    var result = {
      result: false,
      msg: null
    }

    var Message = require('../PubSub/Message.js');

    if (broker.isPublishable('deletecode')) {
      broker.publish(new Message('deletecode', {
        path: path[2] != "" ? [path[1], path[2]] : [path[1]],
        cn: path[3],
        cd: path[4]
      }));

      result.result = true;
    }

    return result;
  }

  PropertyEventHandler.prototype.getMapCoor = function(broker, previousMsg, data) {

    var Message = require('../PubSub/Message.js');
    if (broker.isPublishable('getmapcoor')) {
      broker.publish(new Message('getmapcoor', {
        "floor": document.getElementById('id-text').value
      }));

      result = {
        'result': true,
        'msg': null
      };

    } else {

      result.msg = "wrong state transition : " + previousMsg + " to getmapcoor.";

    }

    return result;
  }



  return PropertyEventHandler;
});
