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
      (this.properties.name != null || require('Conditions').getInstance().exportConditions[this.type].properties.name)) {

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
      (this.properties.description != null || require('Conditions').getInstance().exportConditions[this.type].properties.description)) {

      this.properties['description'] = description;

    } else {

      log.warn("The given conditions said you don 't need to need to set description of Feature.");
    }

  }

  Feature.prototype.addPrtDesc = function(prtDesc){
    if (this.properties != null &&
      (this.properties.description != null || require('Conditions').getInstance().exportConditions[this.type].properties.description)) {

      for(var key in prtDesc){
        if(this.properties.description[key] == undefined) {}
        else if(this.properties.description[key] == "" && prtDesc[key] != "")
          this.properties.description[key] = prtDesc[key];
      }

    } else {

      log.warn("The given conditions said you don 't need to need to set description of Feature.");
    }
  }

  Feature.prototype.addDesc = function(key, value){
    if (this.properties != null &&
      (this.properties.description != null || require('Conditions').getInstance().exportConditions[this.type].properties.description)) {

      if(this.properties.description[key] == undefined)
        this.properties.description[key] = value;

    } else {

      log.warn("The given conditions said you don 't need to need to set description of Feature.");
    }
  }

  Feature.prototype.convertDescObj2Str = function(){
    if (this.properties != null &&
      (this.properties.description != null || require('Conditions').getInstance().exportConditions[this.type].properties.description)) {

      var str = "";
      for(var key in this.properties.description)
        str += key + "=\"" + this.properties.description[key] + "\":";
      this.properties['description'] = str;

    } else {

      log.warn("The given conditions said you don 't need to need to set description of Feature.");
    }
  }

  /**
   * @memberof Feature
   */
  Feature.prototype.setDuality = function(duality) {

    if (this.properties != null &&
      (this.properties.duality != null || require('Conditions').getInstance().exportConditions[this.type].properties.duality)) {

      if (duality == null || duality == "") delete this.properties['duality'];
      else this.properties['duality'] = duality;

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
  Feature.prototype.simplify = function() {

    function isArray(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    }

    var condition;
    if (this.type.indexOf('Space') != -1)
      condition = require('Conditions').getInstance().exportSimplifyCondition["CellSpace"].properties;
    else if (this.type.indexOf('Boundary') != -1)
      condition = require('Conditions').getInstance().exportSimplifyCondition["CellSpaceBoundary"].properties;
    else
      condition = require('Conditions').getInstance().exportSimplifyCondition[this.type].properties;

    var keys = Object.keys(condition);

    for (var i = 0; i < keys.length; i++) {
      var obj = this.properties[keys[i]];
      if (!condition[keys[i]] && (obj == "" || (isArray(obj) && obj.lenght == 0))) {
        delete this.properties[keys[i]];
      }
    }

  }



  return Feature;

});
