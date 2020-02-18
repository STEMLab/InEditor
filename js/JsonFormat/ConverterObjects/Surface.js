/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  "user strict";

  /**
   * @class Surface
   */
  function Surface() {}

  Surface.prototype.wkt2geojson = function(wkt) {};

  Surface.prototype.geojson2wkt = function(gj) {
    var result = "POLYGON (";
    for (var i in gj) {
      result += "(";
      for (var j in gj[i]) {
        result += gj[i][j].join(" ");
        if (j * 1 !== gj[i].length - 1) result += ", ";
      }
      result += ")";
      if (i * 1 != gj.length - 1) result += ", ";
    }

    result += ")";
    return result;
  };

  return Surface;
});
