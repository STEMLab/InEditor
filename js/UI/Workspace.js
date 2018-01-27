/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([], function() {
  'use strict';

  /**
   * @exports Workspace
   */
  function Workspace() {

    this.init();

  }

  Workspace.prototype.init = function(){

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

    this.workspaceLayout.init();

    $(window).resize(function() {
      window.uiContainer.workspace.workspaceLayout.updateSize();

    });


  }

  Workspace.prototype.addNewWorkspace = function(_id, _name) {

    var newItemConfig = {
      title: _name,
      type: 'component',
      componentName: 'workspace'
    };

    var contentItems = window.uiContainer.workspace.workspaceLayout.root.contentItems[0];
    contentItems.addChild(newItemConfig);

    var index = contentItems.contentItems.length - 1;
    contentItems.contentItems[index].element[0].id = _id;

    var viewport = "<div class=\"Panel\" id=\"viewport\" style=\"position:absoulte;\"><div id=" + _id + " class=\"container\"></div></div>";
    contentItems.contentItems[index].element[0].innerHTML = viewport;


    $(window).resize(function() {
      window.uiContainer.workspace.workspaceLayout.updateSize();
    });

  }

  return Workspace;

});
