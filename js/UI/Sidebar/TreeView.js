/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([], function() {
  'use strict';

  /**
  * @desc
  * @exports TreeView
  */
  function TreeView() {

    /**
    * fancytree
    * @see {@link https://github.com/mar10/fancytree}
    */
    this.tree = null;

  };

  /**
  * Read All value from storage and appear in tree view.
  */
  TreeView.prototype.init = function() {

    var json = window.storage.propertyContainer.toJson();
    console.log(json);

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
  */
  TreeView.prototype.addFloor = function(newFloorProperty) {

    var floorObj = new Object;
    floorObj.title = newFloorProperty.name;
    floorObj.key = newFloorProperty.id;
    floorObj.folder = true;
    floorObj.children = new Array();

    floorObj.children.push({"title" : "Cell", "key" : newFloorProperty.id+"-cell", "folder" : true});
    floorObj.children.push({"title" : "CellBoundary", "key" : newFloorProperty.id+"-cellBoundary", "folder" : true});
    floorObj.children.push({"title" : "State", "key" : newFloorProperty.id+"-state", "folder" : true});
    floorObj.children.push({"title" : "Transition", "key" : newFloorProperty.id+"-transition", "folder" : true});

    console.log(floorObj);

    var projectKey = window.storage.propertyContainer.getElementById('project').id;
    $("#tree-view").fancytree("getTree").getNodeByKey(projectKey).addChildren(floorObj);
    $("#tree-view").fancytree("getTree").activateKey(floorObj.key);
  }

  /**
  * @param {String} _key
  * @param {String} _name
  */
  TreeView.prototype.updateTitle = function(_key, _title){
    console.log(_key, _title);
    $("#tree-view").fancytree("getTree").getNodeByKey(_key).setTitle(_title);

  }

  return TreeView;
});
