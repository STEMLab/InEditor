/**
 * @author suheeeee<lalune1120@hotmail.com>
 */
define(function(require) {

  /**
   * @class
   * @name Storage
   */
  let singleton = (function() {

    function Storage() {

      /**
       * @private
       * @name Storage#_geometryContainer
       */
      let GeometryContainer = require('./Geometries/GeometryContainer.js');
      let _geometryContainer = new GeometryContainer();

      /**
       * @private
       * @name Storage#_propertyContainer
       */
      let PropertyContainer = require('./Properties/PropertyContainer.js');
      let _propertyContainer = new PropertyContainer();

      /**
       * @private
       * @name Storage#_canvasContainer
       */
      let CanvasContainer = require('./Canvas/CanvasContainer.js');
      let _canvasContainer = new CanvasContainer();

      /**
       * @private
       * @name Storage#_dotPoolContainer
       */
      let DotPoolContainer = require('./Dot/DotPoolContainer.js');
      let _dotPoolContainer = new DotPoolContainer();


      /**
       * @function
       * @name Storage#getGeometryContainer
       */
      this.getGeometryContainer = function(){
        return _geometryContainer;
      }

      /**
       * @function
       * @name Storage#getPropertyContainer
       */
      this.getPropertyContainer = function(){
        return _propertyContainer;
      }

      /**
       * @function
       * @name Storage#getCanvasContainer
       */
      this.getCanvasContainer = function(){
        return _canvasContainer;
      }

      /**
       * @function
       * @name Storage#getDotPoolContainer
       */
      this.getDotPoolContainer = function(){
        return _dotPoolContainer;
      }
    }

    Storage.prototype.clear = function() {
      this.getGeometryContainer().clear();
      this.getPropertyContainer().clear();
      this.getCanvasContainer().clear();
      this.getDotPoolContainer().clear();
    }

    Storage.prototype.show = function(){
      log.info({
        'geometryContainer' : this.getGeometryContainer(),
        'propertyContainer' : this.getPropertyContainer(),
        'canvasContainer' : this.getCanvasContainer(),
        'dotPoolContainer' : this.getDotPoolContainer()
      })
    }


    let INSTANCE;

    return {
      getInstance: function(args) {
        if (INSTANCE === undefined) {
          INSTANCE = new Storage(args);
        }
        return INSTANCE;
      }
    };

  })();

  return singleton;
});
