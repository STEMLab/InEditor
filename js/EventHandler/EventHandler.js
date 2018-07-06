/**
 * @author suheeeee <lalune1120@hotmail.com>
 */

define([
  "./ProjectEventHandler.js",
  "./DrawEventHandler.js",
  "./PropertyEventHandler.js",
  "./UIChangeEventHandler.js",
  "./ExportEventHandler.js"
], function(
  ProjectEventHandler,
  DrawEventHandler,
  PropertyEventHandler,
  UIChangeEventHandler,
  ExportEventHandler
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
    this.handlers['exportEventHandler'] = new ExportEventHandler();

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
   * @param {string} type of object. This should be one of { stage, line, circle }
   * @memberof EventHandler
   */
  EventHandler.prototype.canvasObjectEventBind = function(type, obj) {

    log.info('canvasObjectEventBind called : ', type, obj);

    if( type != 'stage' && type != 'line' && type != 'circle' ){

      log.error('EventHandler.canvasObjectEventBind : ERROR !! ' + type + ' is not acceptable type');

    } else {

        for (var subkey in window.eventHandler.handlerBinder[type]) {
        // obj.on(
    //   subkey,
    //   function(event) {
    //     window.eventHandler.callHandler(type, event)
    //   });

          if(type == 'line'){
            // obj.on(
            //   subkey,
            //   function(event) {
            //     window.eventHandler.callHandler(type, event)
            //   });
            obj.on('mouseover', function(){log.info('hi')});
          } else {
            obj.on(
              subkey,
              function(event) {
                window.eventHandler.callHandler(type, event)
              });
          }
      }

      log.info(obj);

    }

  }

  /**
   * @memberof EventHandler
   */
   EventHandler.prototype.getCanvasEventHandler = function(type){
     var result = {};
     for (var subkey in window.eventHandler.handlerBinder[type]) {
       result[subkey] = ( function(event) {
         window.eventHandler.callHandler(type, event)
       });
     }

     return result;
   }


  /**
   * @memberof EventHandler
   */
  EventHandler.prototype.keyEventBind = function() {
    event.preventDefault();

    $(document).keydown(function(event) {
      if (event.ctrlKey) {
        window.conditions.ctrlDown = true;
      }

      if (window.conditions.ctrlDown == true && event.keyCode == 90) {

        // ctrl + z
        event.preventDefault();
        window.myhistory.undo();

      } else if (window.conditions.ctrlDown == true && event.keyCode == 83) {

        // ctrl + s
        event.preventDefault();
        window.eventHandler.callHandler('keyboard', event);

      } else if (window.conditions.ctrlDown == true && event.keyCode == 67) {

        // ctrl + c
        event.preventDefault();
        window.eventHandler.callHandler('keyboard', event);

      }  else if (window.conditions.ctrlDown == true && event.keyCode == 66) {

        // ctrl + b
        event.preventDefault();
        window.eventHandler.callHandler('keyboard', event);

      }  else if (window.conditions.ctrlDown == true && event.keyCode == 82) {

        // ctrl + t
        event.preventDefault();
        window.eventHandler.callHandler('keyboard', event);

      }

    });

    $(document).keyup(function(event) {

      if (event.key == 'Escape') {
        window.eventHandler.callHandler('keyboard', event);
      } else if (event.key == 'Enter') {
        window.eventHandler.callHandler('keyboard', event);
      }

      if (event.key == 'Control') {
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

    } else if (_target == 'stage' || _target == 'line' || _target == 'circle') {
      // target = _event.currentTarget.attrs.id;
      target = _target;
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

    if(_target == 'line') {
      log.info(event);
    }

    var result = this.handlerBinder[target][type](window.broker, window.myhistory.getPreviousMsg(), data);

    if (!result.result) {

      log.warn(result.msg);

    }

  }


  return EventHandler;
});
