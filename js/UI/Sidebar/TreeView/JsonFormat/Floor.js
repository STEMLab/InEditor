/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  function FloorJson(id, name){
    var type = require('ObjectType');

    return {
      title : name,
      key : id,
      folder : true,
      type : "floor",
      icon : '../../assets/tree-icon/floor.png',
      children : [
        {
          "title": "Cell",
          "key": id + "-" + type.CELL_SPACE,
          "folder": true,
          "type": type.CELL_SPACE + "Folder"
        },
        {
          "title": "CellBoundary",
          "key": id + "-" + type.CELL_SPACE_BOUNDARY,
          "folder": true,
          "type": type.CELL_SPACE_BOUNDARY + "Folder"
        },
        {
          "title": "State",
          "key": id + "-" + type.STATE,
          "folder": true,
          "type":  type.STATE + "Folder"
        },
        {
          "title": "Transition",
          "key": id + "-" + type.TRANSITION,
          "folder": true,
          "type":  type.TRANSITION + "Folder"
        }
      ]
    }
  }


  return FloorJson;
});
