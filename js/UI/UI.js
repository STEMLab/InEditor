/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  /**
   * @class
   * @name UI
   */
  var singleton = (function() {

    function UI() {

      this.theme = new (require('./Theme.js'))();
      this.header = document.getElementById('header');
      this.menubar = require('./Menubar/Menubar.js');
      this.toolbar = require('./Menubar/Toolbar.js');
      this.modals = require('./Modal/Modals.js');

      this.header.appendChild(this.menubar);
      this.header.appendChild(this.toolbar);

      var contentContainer = require('./ContentContainer/ContentContainer.js');
      this.content = document.getElementById('content-body');

      this.content.appendChild(contentContainer);

      Split(['#sidebar', '#workspace'], {
        sizes: [20, 80]
      });

      Split(['#tree-view-container', '#property-container'], {
        direction: 'vertical',
        cursor: 'row-resize',
        sizes: [30, 67]
      });

      var worksapceContainer = require('./Workspace/WorkspaceContainer.js');
      new worksapceContainer(document.getElementById('workspace'));

      var Workspace = require('./Workspace/Workspace.js');
      this.workspace = new Workspace();
      this.modals.appendModals(document.body);

      this.treeView = require('./Sidebar/TreeView/TreeView.js').getInstance();
      this.treeView.init();

      this.propertyTab = new(require('./Sidebar/PropertyTab/Property.js'))();

    }


    var INSTANCE;

    return {
      getInstance: function(args) {
        if (INSTANCE === undefined) {
          INSTANCE = new UI(args);
        }
        return INSTANCE;
      }
    };

  })();

  return singleton;
});
