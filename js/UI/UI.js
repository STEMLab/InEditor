define([], function() {
  'use strict';

  function UI() {
    /***************************************************************************************************/
    /***************************************** workspace ***********************************************/
    /***************************************************************************************************/

    var config = {
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

    /***************************************************************************************************/
    /****************************************** property ***********************************************/
    /***************************************************************************************************/
    var propertyConfig = {
      settings: {
        hasHeaders: true,
        constrainDragToContainer: true,
        reorderEnabled: true,
        selectionEnabled: false,
        popoutWholeStack: false,
        blockedPopoutsThrowError: true,
        closePopoutsOnUnload: true,
        showPopoutIcon: true,
        showMaximiseIcon: true,
        showCloseIcon: true
      },
      content: [{
        type: 'stack',
        content: [{
          title: 'canvas',
          type: 'component',
          componentName: 'property-component'
        }, {
          title: 'properties',
          type: 'component',
          componentName: 'property-component'
        }]
      }]
    };

    var config = {
      settings: {
        showPopoutIcon: false,
        showMaximiseIcon: false,
        showCloseIcon: false
      },
      content: [{
        type: 'stack',
        content: [{
            type: 'component',
            componentName: 'property-component',
            title: 'canvas',
            isClosable: false,
            componentState: {
              id: 'propertiesCanvas'
            }
          },
          {
            type: 'component',
            componentName: 'property-component',
            title: 'properties',
            isClosable: false,
            componentState: {
              id: 'propertiesProper'
            }
          }
        ]
      }]
    };



    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    propertyLayout.registerComponent('property-component', function(container, state) {
      container.getElement().html("<div id=" + state.id + "></div>");
    });

    propertyLayout.init();



    $(window).resize(function() {
      workspaceLayout.updateSize();
    });

  }

  return UI;

});
