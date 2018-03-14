define([], function() {
  'user strict';

  /**
  * @class Feature
  */
  function Feature(conditions) {

    this.id = "";
    this.parentId = "";
    this.docId = "";

  }

  /**
   * @memberof Feature
   */
  Feature.prototype.setId = function(id) {

    this.id = id;

  }

  /**
   * @memberof Feature
   */
  Feature.prototype.setParentId = function(pid) {

    this.parentId = pid;

  }

  /**
   * @memberof Feature
   */
  Feature.prototype.setDocId = function(did) {

    this.docId = did;

  }

  /**
   * @memberof Feature
   */
  Feature.prototype.setName = function(name) {

    if (this.properties != null &&
        (this.properties.name != null || window.conditions.exportConditions[this.type].properties.name)) {

      this.properties['name'] = name;

    } else {

      log.warn("The given conditions said you don 't need to need to set name of Feature.");
    }

  }

  /**
   * @memberof Feature
   */
  Feature.prototype.setDescription = function(description) {

    if (this.properties != null &&
        (this.properties.description != null || window.conditions.exportConditions[this.type].properties.description)) {

      this.properties['description'] = description;

    } else {

      log.warn("The given conditions said you don 't need to need to set description of Feature.");
    }

  }

  /**
   * @memberof Feature
   */
  Feature.prototype.setDuality = function(duality) {

    if (this.properties != null &&
        (this.properties.duality != null || window.conditions.exportConditions[this.type].properties.duality)) {

      this.properties['duality'] = duality;

    } else {

      log.warn("The given conditions said you don 't need to need to set duality of Feature.");
    }

  }

  /**
   * @memberof Feature
   */
  Feature.prototype.setCoor = function(coor) {

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    if (!isArray(coor)) {

      log.warn("The given parameter is not an Array type.");

    } else {

      this.geometry.coordinates = coor;

    }

  }

  /**
   * @memberof Feature
   */
  Feature.prototype.clearCoor = function() {
    this.geometry.coordinates = [];
  }

  /**
   * @memberof Feature
   */
  Feature.prototype.setGeometryId = function(id) {

    this.geometry.properties.id = id;

  }

  /**
  * @memberof Feature
  * @desc Simplify feature object using `exportSimplifyCondition`.
  */
  Feature.prototype.simplify = function(){

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    var condition = window.conditions.exportSimplifyCondition[this.type].properties;

    var keys = Object.keys(condition);

    for(var i = 0; i < keys.length; i++){
      var obj = this.properties[keys[i]];
      if( !condition[keys[i]] && ( obj == "" || (isArray(obj) && obj.lenght == 0))){
        delete this.properties[keys[i]];
      }
    }

  }


  return Feature;

});
