/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  /**
   * @class StateProperty
   */
  function StateProperty(id) {

    require('./PropertyBase.js').apply(this, arguments);
    this.featureType = require('ObjectType').PROPERTY_TYPE.STATE;

    let EB = require('./ExtensionBase.js');
    this.extend = new EB();

    /**
     * @memberof StateProperty
     */
    this.connects = [];

    /**
     * @memberof StateProperty
     */
     this.height = 0;
  }

  /**
   * @memberof StateProperty
   */
  StateProperty.prototype.load = function(values){

    this.id = values.id;
    this.name = values.name;
    this.description = values.description;
    this.duality = values.duality;
    this.connects = values.connects;
    this.height = values.height;

  }

  /**
  * @memberof StateProperty
  */
  StateProperty.prototype.setDuality = function(duality){

    this.duality = duality;

  }

  /**
  * @memberof StateProperty
  */
  StateProperty.prototype.getId = function(){
    return this.id;
  }

  /**
  * @memberof StateProperty
  * @param {String} id of connected dot
  */
  StateProperty.prototype.addConnects = function(connect){
    this.connects.push(connect);
  }

  /**
  * @memberof StateProperty
  * @param {String} id of connected dot
  */
  StateProperty.prototype.setHeight = function(height){
    this.height = height;
  }

  StateProperty.prototype.getAvailbleModuleType = function() {
    return ["", "PSExtension"];
  }

  return StateProperty;
});
