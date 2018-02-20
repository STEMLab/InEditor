/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./SurfaceFormat.js"
], function(
  SurfaceFormat
) {
  'user strict';

  /**
   * @class CellFormat
   */
  function CellFormat() {

    /**
     * @memberof CellFormat
     */
    this.type = "CellSpace";

    /**
     * @memberof CellFormat
     */
    this.attributes = {
      name: "",
      description: ""
    };

    /**
     * @memberof CellFormat
     * @desc Surface
     */
    this.geometry2d = new SurfaceFormat();
  }

  /**
   * @memberof CellFormat
   */
  CellFormat.prototype.setName = function(name) {
    this.attributes.name = name;
  }

  /**
   * @memberof CellFormat
   */
  CellFormat.prototype.setDesc = function(desc) {
    this.attributes.description = desc;
  }

  /**
   * @memberof CellFormat
   * @param coordinates 1 * n array
   */
  CellFormat.prototype.pushCoordinates = function(coordinates) {

    var len = coordinates.length;

    for (var i = 0; i < len; i = i + 2) {

      this.geometry2d.coordinates.push([coordinates[i], coordinates[i + 1]]);

    }

  }

  /**
  * @memberof CellFormat
  * @param coordinates 1 * n array
  */
  CellFormat.prototype.setCoordinates = function(coordinates){

    this.geometry2d.coordinates = [];

    this.pushCoordinates(coordinates);

  }

 /**
 * return coordinates array
 */
  CellFormat.prototype.getCoordinates = function(){

    return this.geometry2d.coordinates;

  }

  return CellFormat;

});
