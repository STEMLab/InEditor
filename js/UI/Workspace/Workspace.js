/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class Workspace
   */
  function Workspace() {

    this.init();

  }

  /**
   * @memberof Workspace
   */
  Workspace.prototype.init = function() {

    // init
    var config = {
      content: [{
        type: 'stack'
      }]
    };

    this.workspaceLayout = new GoldenLayout(config, $('#workspace-layout-container'));

    this.workspaceLayout.registerComponent('workspace', function(container, state) {
      // container.getElement().html(viewport);
    });

    this.workspaceLayout.on('stackCreated', function(stack) {
      stack.on('activeContentItemChanged', function(contentItem) {
        let id = contentItem.config.id;
        require('UI').getInstance().propertyTab.setPropertyTab('floor', id, require('Storage').getInstance());
      });
    });


    this.workspaceLayout.init();

    $(window).resize(function() {
      // document.getElementById('workspace').resize();
    });


  }

  /**
   * @memberof Workspace
   * @test
   */
  Workspace.prototype.addNewWorkspace = function(_id, _name) {

    var newItemConfig = {
      title: _name,
      type: 'component',
      componentName: 'workspace',
      id: _id
    };

    if (this.workspaceLayout.root.contentItems.length == 0)
      this.init();

    var contentItems = this.workspaceLayout.root.contentItems[0];
    contentItems.addChild(newItemConfig);

    var index = contentItems.contentItems.length - 1;
    contentItems.contentItems[index].element[0].id = _id;

    var viewport = "<div class=\"Panel\" id=\"viewport\" style=\"position:absoulte;\"><div id=" + _id + " class=\"container\"></div></div>";
    contentItems.contentItems[index].element[0].innerHTML = viewport;

  }

  /**
   * @memberof Workspace
   * @param {String} id floor id
   */
  Workspace.prototype.activateWorkspace = function(id) {
    var Workspace;
    if (this.workspaceLayout == undefined) {
      Workspace = require('UI').getInstance().workspace;
      Workspace.workspaceLayout.root.contentItems[0].header.setActiveContentItem(Workspace.findContentItem(id));
    } else {
      this.workspaceLayout.root.contentItems[0].header.setActiveContentItem(this.findContentItem(id));
    }
  }

  /**
   * @memberof Workspace
   */
  Workspace.prototype.destroy = function(condition) {

    require('UI').getInstance().workspace.workspaceLayout.destroy();

  }

  /**
   * @memberof Workspace
   */
  Workspace.prototype.deleteWorkspace = function(id) {

    var Workspace;
    if (this.workspaceLayout == undefined) {
      Workspace = require('UI').getInstance().workspace;
      Workspace.workspaceLayout.root.contentItems[0].removeChild(Workspace.findContentItem(id), false);
    } else {
      this.workspaceLayout.root.contentItems[0].removeChild(this.findContentItem(id), false);
    }
  }

  /**
   * @memberof Workspace
   */
  Workspace.prototype.findContentItem = function(id) {

    var workspaceLayout;
    if (this.workspaceLayout == undefined) {
      workspaceLayout = require('UI').getInstance().workspace.workspaceLayout;
    } else {
      workspaceLayout = this.workspaceLayout;
    }

    var contentItem;
    for (var stack of workspaceLayout.root.contentItems) {
      for (var item of stack.contentItems) {
        if (item.config.id === id) {
          contentItem = item;
          break;
        }

        if (contentItem != null) break;
      }
    }

    return contentItem;
  }

  /**
   * @memberof Workspace
   */
  Workspace.prototype.getActivatedWorkspace = function() {
    var items = this.workspaceLayout.root.contentItems;
    var result = [];

    if (this.workspaceLayout.root.contentItems.length == 0) return -1;

    for (var i in items) {
      for (var j in items[i].contentItems) {
        if (!items[i].contentItems[j].container.isHidden) result.push(items[i].contentItems[j].config.title);
      }
    }


    return result;
  }

  return Workspace;

});
