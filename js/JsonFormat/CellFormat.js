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
  function CellFormat(cgid) {

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
    this.geometry = new SurfaceFormat(cgid);
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
  CellFormat.prototype.pushCoordinatesFromDots = function(dots) {

    var len = dots.length;

    for (var i = 0; i < len; i++) {

      this.geometry.coordinates.push([dots[i].point.x, dots[i].point.y, 0]);

    }

  }

  /**
   * @memberof CellFormat
   * @param coordinates 1 * n array
   */
  CellFormat.prototype.setCoordinates = function(coordinates) {

    this.pushCoordinatesFrom2DArray(coordinates);

  }

  /**
   * @return coordinates array
   */
  CellFormat.prototype.getCoordinates = function() {

    return this.geometry.coordinates;

  }


  CellFormat.prototype.getCoordinate = function(i){

    if(this.geometry.coordinates.length > i){
      return this.geometry.coordinates[i];
    }
  }

  /**
   * @memberof CellFormat
   */
  CellFormat.prototype.setHeight = function(height) {
    this.geometry.properties.height = height;
  }

  /**
   * @memberof CellFormat
   */
  CellFormat.prototype.updateCoordinates = function(index, position, value) {

    if (position == 'x') {

      this.geometry.coordinates[index][0] = value;

    } else if (position == 'y') {

      this.geometry.coordinates[index][1] = value;

    } else if (position == 'z') {

      this.geometry.coordinates[index][2] = value;

    }

  }

  /**
   * @memberof CellFormat
   */
  CellFormat.prototype.getCoordinatesLen = function() {
    return this.geometry.coordinates.length;
  }

  CellFormat.prototype.changeCoordinates = function(coordinates) {

    this.geometry.coordinates = coordinates;

  }

  CellFormat.prototype.pushCoordinatesFrom2DArray = function(coordinates){

    var len = coordinates.length;
    for(var i = 0; i < len; i++){
      this.updateCoordinates(i, 'x', coordinates[i][0]);
      this.updateCoordinates(i, 'y', coordinates[i][1]);
    }

  }

  CellFormat.prototype.pushCoordinate = function(coor){

    this.geometry.coordinates.push(coor);

  }


  return CellFormat;

});
