define([], function() {
  'use strict';

  function Workspace() {
    /***************************************************************************************************/
    /***************************************** workspace ***********************************************/
    /***************************************************************************************************/

    var config = {
      // selectionEnabled: true,
      content: [{
        type: 'stack',
        content: [{
          type: 'component',
          title: 'test-floor',
          componentName: 'workspace',
          componentState: {
            text: 'Component 1'
          }
        }]
      }]
    };

    var workspaceLayout = new GoldenLayout(config, $('#workspace-container'));
    var viewport = "<div class=\"Panel\" id=\"viewport\" style=\"position:absoulte;\"><div id=\"container\" class=\"container\"></div></div>";


    workspaceLayout.registerComponent('workspace', function(container, state) {
      container.getElement().html(viewport);
    });




    workspaceLayout.init();





    $(window).resize(function() {
      workspaceLayout.updateSize();
    });

  }

  return Workspace;

});
