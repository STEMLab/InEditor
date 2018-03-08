/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function(){
  'user strict';

  /**
  * @class SurfaceFormat
  */
  function SurfaceFormat(id){

    /**
    * @memberof SurfaceFormat
    */
    this.type = "Surface";

    /**
    * @memberof SurfaceFormat
    */
    this.coordinates = [];

    /**
    * @memberof SurfaceFormat
    */
    this.properties = {
      "id" : id,
      "extrude" : "true",
      "height" : 0
    }
  }

  return SurfaceFormat;

});
