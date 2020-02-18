/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'user strict';

  /**
  * @class Solid
  */
  function Solid() { };

  Solid.prototype.wkt2geojson = function(wkt){

  };

  Solid.prototype.geojson2wkt = function(gj){

    var result = "SOLID (";

    for(var solid in gj){
      result += "(";

      for(var surface in gj[solid]){
        var converter = require('js/JsonFormat/GeometryConverter.js');
        var surfaceWKT = new converter('Surface').geojson2wkt(gj[solid][surface][0]);
        result += surfaceWKT.substring(surfaceWKT.indexOf('('), surfaceWKT.length);
        if(surface*1 != gj[solid].length - 1) result +=", ";
      }

      result += ")";
      if(solid != gj.length - 1) result +=", ";
    }

    result += ")";

    return result;
  }

  return Solid;

});
