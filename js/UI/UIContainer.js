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

    Split(['#sidebar', '#workspace'], {
      sizes: [20, 80]
    });

    Split(['#tree-view-container', '#property-container'], {
      direction: 'vertical',
      cursor: 'row-resize',
      sizes: [60, 38]
    });

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
