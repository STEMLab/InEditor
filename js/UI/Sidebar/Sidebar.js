
define([
  "./TreeView.js",
  "./Property.js"
], function(
  TreeView,
  Property
) {
  'use strict';

  function Sidebar(){

    this.treeview = new TreeView();
    this.property = new Property();

  };
  return Sidebar;
});
