/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./Sidebar/Sidebar.js",
  "./Workspace.js"
], function(
  Sidebar,
  Workspace
) {
  'use strict';

  /**
   * @class UIContainer
   */
  function UIContainer() {

    /**
     * @memberof UIContainer
     */
    this.sidebar = new Sidebar();

    /**
     * @memberof UIContainer
     */
    this.workspace = new Workspace();

  }

  UIContainer.prototype.resize = function() {

    window.uiContainer.workspace.workspaceLayout.updateSize();
    // window.uiContainer.sidebar.property.resize();

  }

  return UIContainer;
});
