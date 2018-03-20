define([], function() {
  'user strict';

  /**
  * @class Feature
  */
  function Feature() { }

  /**
   * @memberof Feature
   */
  Feature.prototype.setName = function(name) {

    this.attributes['name'] = name;

  }

  /**
   * @memberof Feature
   */
  Feature.prototype.setDescription = function(description) {

    this.attributes['description'] = description;

  }

  /**
   * @memberof Feature
   */
  Feature.prototype.setDuality = function(duality) {

    this.attributes['duality'] = duality;

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

  return Feature;

});
