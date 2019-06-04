/**
 * @author suheeeee <lalune1120@hotmail.com>
 */

define(function(require) {

  var singleton = (function() {

    /**
     * @class EventHandler
     */
    function EventHandler(args) {

      var _handlers = [];
      var _handlerBinder = [];

      this.getHandlers = function(){
        return _handlers;
      }

      this.getHandlerBinder = function(){
        return _handlerBinder;
      }

      /**
       * @memberof EventHandler
       */
      this.init = function() {

        this.add();
        this.setHandlerBinder();
        this.btnEvnetBind();
        this.keyEventBind();

      }

      /**
       * @memberof EventHandler
       */
      this.add = function() {

        _handlers['drawEventHandler'] = new(require('EventHandlers').DRAW);
        _handlers['propertyEventHandler'] = new(require('EventHandlers').PROPERTY);
        _handlers['projectEventHandler'] = new(require('EventHandlers').PROJECT);
        _handlers['uiChangeEventHandler'] = new(require('EventHandlers').UICHANGE);
        _handlers['exportEventHandler'] = new(require('EventHandlers').EXPORT);

      }

      /**
       * @memberof EventHandler
       */
      this.btnEvnetBind = function() {

        for (var key in _handlerBinder) {
          for (var subkey in _handlerBinder[key]) {

            if (subkey == 'click' && document.getElementById(key) != null) {

              // event on html ui element
              document.getElementById(key).addEventListener('click', function(event) {
                require('EventHandler').getInstance().callHandler('html', event);
              });

            } else if (subkey == 'fancytreeclick') {

            } else if (subkey == 'wheel') {

              window.addEventListener('wheel', function(event, data) {

                if (event.target.tagName == 'CANVAS') {
                  //event.preventDefault();
                  require('EventHandler').getInstance().callHandler('canvas', event);
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
      this.canvasObjectEventBind = function(type, obj) {

        log.info('canvasObjectEventBind called : ', type, obj);

        if (type != 'stage' && type != 'line' && type != 'circle') {

          log.error('EventHandler.canvasObjectEventBind : ERROR !! ' + type + ' is not acceptable type');

        } else {

          for (var subkey in _handlerBinder[type]) {
            obj.on(
              subkey,
              function(event) {
                require('EventHandler').getInstance().callHandler(type, event)
              });
          }

          log.info(obj);

        }

      }


      /**
       * @memberof EventHandler
       */
      this.keyEventBind = function() {
        event.preventDefault();

        $(document).keydown(function(event) {
          if (event.ctrlKey) {
            require('Conditions').getInstance().ctrlDown = true;
          }

          if (require('Conditions').getInstance().ctrlDown == true && event.keyCode == 90) {

            // ctrl + z
            event.preventDefault();
            require('History').getInstance().undo();

          } else if (require('Conditions').getInstance().ctrlDown == true && event.keyCode == 83) {

            // ctrl + s
            event.preventDefault();
            require('EventHandler').getInstance().callHandler('keyboard', event);

          } else if (require('Conditions').getInstance().ctrlDown == true && event.keyCode == 67) {

            // ctrl + c
            event.preventDefault();
            require('EventHandler').getInstance().callHandler('keyboard', event);

          } else if (require('Conditions').getInstance().ctrlDown == true && event.keyCode == 66) {

            // ctrl + b
            event.preventDefault();
            require('EventHandler').getInstance().callHandler('keyboard', event);

          } else if (require('Conditions').getInstance().ctrlDown == true && event.keyCode == 82) {

            // ctrl + t
            event.preventDefault();
            require('EventHandler').getInstance().callHandler('keyboard', event);

          }

        });

        $(document).keyup(function(event) {

          if (event.key == 'Escape') {
            require('EventHandler').getInstance().callHandler('keyboard', event);
          } else if (event.key == 'Enter') {
            require('EventHandler').getInstance().callHandler('keyboard', event);
          }

          if (event.key == 'Control') {
            require('Conditions').getInstance().ctrlDown = false;
          }
        });

      }


      /**
       * @memberof EventHandler
       */
      this.setHandlerBinder = function() {

        for (var key in _handlers) {
          _handlers[key].setHandlerBinder(_handlerBinder);
        }

      }


      /**
       * @param {String} _target html, stage, tree
       * @param {Object} _event
       * @param {Object} _data
       * @memberof EventHandler
       */
      this.callHandler = function(_target, _event, _data) {

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

        } else if (_target == 'code-modal-trash') {

          target = _target;
          type = _event.type;
          data = _event;

        }

        if (_target == 'line') {
          log.info(event);
        }

        var result = _handlerBinder[target][type](require('Broker').getInstance(), require('History').getInstance().getPreviousMsg(), data);

        if (!result.result) {

          log.warn(result.msg);

        }

      }

    }

    var INSTANCE;

    return {
      getInstance: function(args) {
        if (INSTANCE === undefined) {
          INSTANCE = new EventHandler(args);
          INSTANCE.init();
        }
        return INSTANCE;
      }
    };

  })();



  return singleton;
});
