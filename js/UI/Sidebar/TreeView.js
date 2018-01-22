define([], function() {
  'use strict';

  function TreeView() {

    this.tree;
    this.init();

  };

  TreeView.prototype.init = function() {

    $(function() {
      // Initialize Fancytree

    });

    $("#tree-view").fancytree({
      extensions: ["glyph"],
      selectMode: 1,
      glyph: {
        preset: "awesome4",
        map: {}
      },
      icon: true

    });

    this.tree = $("#tree-view").fancytree("getTree");


  }

  TreeView.prototype.setTree = function(storage) {

    $(function() {
      // Initialize Fancytree
      $("#tree-view").fancytree({
        extensions: ["glyph"],
        selectMode: 1,
        glyph: {
          preset: "awesome4",
          map: {}
        },
        icon: true,
        source: [ // Typically we would load using ajax instead...
          {
            title: "Folder 3",
            folder: true,
            expanded: false,
            children: [{
                title: "Node 3.1",
                key: "id3.1"
              },
              {
                title: "Node 3.2",
                selected: false
              }
            ]
          }
        ]
      });
    });

  }


  return TreeView;
});
