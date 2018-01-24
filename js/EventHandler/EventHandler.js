/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "./ProjectEventHandler.js",
  "./DrawEventHandler.js",
  "./PropertyEventHandler.js"
], function(
  ProjectEventHandler,
  DrawEventHandler,
  PropertyEventHandler
) {
  'use strict';

  /**
  * @exports EventHandler
  */
  function EventHandler() {

    this.handlers = [];
    this.handlerBinder = [];

    /**
     * Save previous runned message for controll request cycle.
     * For example, if 'start-test' runned before next message must be 'test' or 'end-test'.
     */
    this.previousMsg = null;

    this.init();
  }

  EventHandler.prototype.init = function() {

    this.add();
    this.setHandlerBinder();
    this.btnEvnetBind();

  }

  EventHandler.prototype.add = function() {
    // this.handlers.push(new DrawEventHandler());
    // this.handlers.push(new PropertyEventHandler());
    // this.handlers.push(new ProjectEventHandler());

    this.handlers['drawEventHandler'] = new DrawEventHandler();
    this.handlers['propertyEventHandler'] = new PropertyEventHandler();
    this.handlers['projectEventHandler'] = new ProjectEventHandler();

  }

  EventHandler.prototype.btnEvnetBind = function() {

    for (var key in this.handlerBinder) {
      for (var subkey in this.handlerBinder[key]) {
        if (subkey == 'click' && document.getElementById(key) != null) { // event on other html element

          document.getElementById(key).addEventListener('click', function(e) {
            window.eventHandler.callHandler(e)
          });

        }
      }
    }


  }

  /**
   * @desc This function must called after add new floor and bind event handler to events on new stage.
   * @param _id id of new floor
   */
  EventHandler.prototype.stageEventBind = function(_id) {

    for (var key in this.handlerBinder) {
      for (var subkey in this.handlerBinder[key]) {
        if (subkey == 'contentClick') { // event on canvas

          var stage = window.storage.canvasContainer.getElementById('stage', _id);

          stage.stage.on(
            'contentClick',
            function(e) {
              window.eventHandler.callHandler(e)
            });
        }
      }
    }
  }

  EventHandler.prototype.setHandlerBinder = function() {

    for (var key in this.handlers) {
      this.handlers[key].setHandlerBinder(this.handlerBinder);
    }

  }

  EventHandler.prototype.callHandler = function(e) {

    var target;
    var type;
    var message;

    if (e.target != null) {

      target = e.target.id;
      type = e.type;

    } else if (e.currentTarget != null) {

      target = e.currentTarget.attrs.id;
      type = e.type;

    }

    var message = this.handlerBinder[target][type];

    var result = this.handlerBinder[target][type](window.broker, window.eventHandler.previousMsg);

    if (result.result) {
      this.previousMsg = result.msg;
    } else {
      console.log("error! " + result.msg);
    }

  }


  return EventHandler;
});
