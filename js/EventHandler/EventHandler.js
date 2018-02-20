/**
 * @author suheeeee <lalune1120@hotmail.com>
 */

define([
  "./ProjectEventHandler.js",
  "./DrawEventHandler.js",
  "./PropertyEventHandler.js",
  "./UIChangeEventHandler.js"
], function(
  ProjectEventHandler,
  DrawEventHandler,
  PropertyEventHandler,
  UIChangeEventHandler
) {
  'use strict';

  /**
   * @class EventHandler
   */
  function EventHandler() {

    this.handlers = [];
    this.handlerBinder = [];

    this.init();
  }

  /**
   * @memberof EventHandler
   */
  EventHandler.prototype.init = function() {

    this.add();
    this.setHandlerBinder();
    this.btnEvnetBind();
    this.keyEventBind();

  }

  /**
   * @memberof EventHandler
   */
  EventHandler.prototype.add = function() {

    this.handlers['drawEventHandler'] = new DrawEventHandler();
    this.handlers['propertyEventHandler'] = new PropertyEventHandler();
    this.handlers['projectEventHandler'] = new ProjectEventHandler();
    this.handlers['uiChangeEventHandler'] = new UIChangeEventHandler();

  }

  /**
   * @memberof EventHandler
   */
  EventHandler.prototype.btnEvnetBind = function() {

    for (var key in this.handlerBinder) {
      for (var subkey in this.handlerBinder[key]) {

        if (subkey == 'click' && document.getElementById(key) != null) {

          // event on html ui element
          document.getElementById(key).addEventListener('click', function(event) {
            window.eventHandler.callHandler('html', event);
          });

        } else if (subkey == 'fancytreeclick') {

          $("#tree-view").fancytree({
            click: function(event, data) {
              window.eventHandler.callHandler('tree', event, data)
            }
          });

        } else if (subkey == 'wheel') {

          window.addEventListener('wheel', function(event, data) {

            if (event.target.tagName == 'CANVAS') {
              window.eventHandler.callHandler('canvas', event);
            }

          });

        }
      }
    }

  }

  /**
   * @param {Obejct} obj new canvas object
   * @memberof EventHandler
   */
  EventHandler.prototype.stageEventBind = function(_type, _id) {

    for (var subkey in window.eventHandler.handlerBinder[_type]) {

      if (subkey == 'contentClick') { // event on canvas

        var stage = window.storage.canvasContainer.getElementById('stage', _id);

        stage.stage.on(
          'contentClick',
          function(event) {
            window.eventHandler.callHandler('stage', event)
          });
      }

    }
  }

  EventHandler.prototype.keyEventBind = function() {

    $(document).keydown(function(event) {
      if ( event.ctrlKey ) {
        window.conditions.ctrlDown = true;
      }

      if (window.conditions.ctrlDown == true && event.keyCode == 90) {
        event.preventDefault();
        window.myhistory.undo();
      }
    });

    $(document).keyup(function(event) {

      if (event.key == 'Escape') {
        window.eventHandler.callHandler('keyboard', event);
      } else if (event.key == 'Enter') {
        window.eventHandler.callHandler('keyboard', event);
      }

      if( event.key == 'Control' ) {
        window.conditions.ctrlDown = false;
      }
    });




  }


  /**
   * @memberof EventHandler
   */
  EventHandler.prototype.setHandlerBinder = function() {

    for (var key in this.handlers) {
      this.handlers[key].setHandlerBinder(this.handlerBinder);
    }

  }


  /**
   * @param {String} _target html, stage, tree
   * @param {Object} _event
   * @param {Object} _data
   * @memberof EventHandler
   */
  EventHandler.prototype.callHandler = function(_target, _event, _data) {

    var target;
    var type;
    var message;
    var data;

    if (_target == 'html') {

      target = _event.target.id;
      type = _event.type;
      data = _event;

    } else if (_target == 'stage') {
      // target = _event.currentTarget.attrs.id;
      target = 'stage';
      type = _event.type;
      data = _event;

    } else if (_target == 'tree') {

      target = _event.target.id;
      type = _event.type;
      data = _data;

    } else if (_target == 'canvas') {

      target = 'canvas';
      type = _event.type;
      data = _event;

    } else if (_target == 'file') {

      target = 'floorplan-file';
      type = _event.type;
      data = _event;

    } else if (_target == 'keyboard') {

      target = _event.key;
      type = _event.type;

    }

    var result = this.handlerBinder[target][type](window.broker, window.myhistory.getPreviousMsg(), data);

    if (!result.result) {

      log.error(result.msg);

    }

  }


  return EventHandler;
});
