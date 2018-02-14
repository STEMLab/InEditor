/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class TreeView
  */
  function TreeView() {

    /**
    * fancytree
    * @see {@link https://github.com/mar10/fancytree}
    * @memberof TreeView
    */
    this.tree = null;

  };

  /**
  * Read All value from storage and appear in tree view.
  * @memberof TreeView
  */
  TreeView.prototype.init = function() {

    var json = window.storage.propertyContainer.toJson();
    // console.log(json);

    $("#tree-view").fancytree({
      extensions: ["glyph"],
      selectMode: 1,
      glyph: {
        preset: "awesome4",
        map: {}
      },
      icon: true,
      source:[ json ]
    });

    this.tree = $("#tree-view").fancytree("getTree");

  }

  /**
  * Read All value from storage and appear in tree view.
  * @param {FloorProperty} newFloorProperty
  * @memberof TreeView
  */
  TreeView.prototype.addFloor = function(newFloorProperty) {

    var floorObj = new Object;
    floorObj.title = newFloorProperty.name;
    floorObj.key = newFloorProperty.id;
    floorObj.folder = true;
    floorObj.type = "floor";
    floorObj.children = new Array();

    floorObj.children.push({"title" : "Cell", "key" : newFloorProperty.id+"-cell", "folder" : true, "type" : "cellFolder"});
    floorObj.children.push({"title" : "CellBoundary", "key" : newFloorProperty.id+"-cellBoundary", "folder" : true, "type" : "cellBoundaryFolder"});
    floorObj.children.push({"title" : "State", "key" : newFloorProperty.id+"-state", "folder" : true, "type" : "stateFolder"});
    floorObj.children.push({"title" : "Transition", "key" : newFloorProperty.id+"-transition", "folder" : true, "type" : "transtitionFolder"});

    var projectKey = window.storage.propertyContainer.getElementById('project').id;
    $("#tree-view").fancytree("getTree").getNodeByKey(projectKey).addChildren(floorObj);
    $("#tree-view").fancytree("getTree").activateKey(floorObj.key);
  }

  /**
  * @param {String} _key
  * @param {String} _name
  * @memberof TreeView
  */
  TreeView.prototype.updateTitle = function(_key, _title){

    $("#tree-view").fancytree("getTree").getNodeByKey(_key).setTitle(_title);

  }

  /**
  * @param {String} id
  * @param {String} floor
  * @memberof TreeViews
  */
  TreeView.prototype.addCell = function(id, floor){


    $("#tree-view").fancytree("getTree").getNodeByKey(floor+"-cell").addChildren({
      title : id,
      key : id,
      folder : false,
      type : 'cell'
    });

    $("#tree-view").fancytree("getTree").activateKey(id);

  }

  /**
  * @param {String} id
  * @memberof TreeView
  */
  TreeView.prototype.reomveNode = function(id){
    $("#tree-view").fancytree("getTree").getNodeByKey(id).remove();
  }

  return TreeView;
});
