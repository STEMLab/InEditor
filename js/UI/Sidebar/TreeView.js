
define([], function() {
  'use strict';

  function Sidebar(){

    this.setTree();

  };

  Sidebar.prototype.setTree = function(storage){
    console.log(storage);

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
            expanded: true,
            children: [{
                title: "Node 3.1",
                key: "id3.1"
              },
              {
                title: "Node 3.2",
                selected: true
              }
            ]
          }
        ]
      });
    });

  }

  return Sidebar;
});
