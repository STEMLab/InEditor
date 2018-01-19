define([
  "./Sidebar/Sidebar.js",
  "./Workspace.js"
], function(
  Sidebar,
  Workspace
) {
  'use strict';

  function UIContainer(){
    this.sidebar = new Sidebar();
    this.workspace = new Workspace();
  }

  return UIContainer;
});
