/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  /**
   * @class
   * @name CellSpace
   * @memberof UI.Sidebar.treeView
   * @augments UI.Sidebar.treeView.TreeView
   */
  var singleton = (function() {

    function TreeView() {
      /**
       * fancytree
       * @see {@link https://github.com/mar10/fancytree}
       * @memberof TreeView
       */

      /**
       * fancytree
       * @private
       * @name UI.Sidebar.treeView.TreeView#_floorTree
       */
      var _floorTree = null;

      /**
       * fancytree
       * @private
       * @name UI.Sidebar.treeView.TreeView#_floorTree
       */
      var _classTree = null;

      /**
       * @function
       * @name UI.Sidebar.treeView.TreeView#getFloorTree
       */
      this.getFloorTree = function() {
        return _floorTree;
      }

      /**
       * @function
       * @name UI.Sidebar.treeView.TreeView#getClassTree
       */
      this.getClassTree = function() {
        return _classTree;
      }

      /**
       * @function
       * @name UI.Sidebar.treeView.TreeView#setFloorTree
       */
      this.setFloorTree = function(t) {
        _floorTree = t;
      }

      /**
       * @function
       * @name UI.Sidebar.treeView.TreeView#setClassTree
       */
      this.setClassTree = function(t) {
        _classTree = t;
      }

    }


    /**
     * @function
     * @name UI.Sidebar.treeView.TreeView#init
     */
    TreeView.prototype.init = function() {

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
              componentName: 'treeview-component',
              title: 'By Floor',
              isClosable: false,
              componentState: {
                id: 'floor'
              }
            },
            {
              type: 'component',
              componentName: 'treeview-component',
              title: 'By Class',
              isClosable: false,
              componentState: {
                id: 'class'
              }
            }
          ]
        }]
      };


      var divContent = "";
      var divs = {
        "floor": divContent,
        "class": divContent
      };

      $('#tree-view-container').empty();

      var treeViewContainer = new GoldenLayout(config, $('#tree-view-container'));

      treeViewContainer.registerComponent('treeview-component', function(container, state) {

        container.getElement().html("<div id=\"tree-view-" + state.id + "\">" + divs[state.id] + "</div>");

      });

      treeViewContainer.init();
      $("#tree-view-floor").addClass("tree-view");
      $("#tree-view-class").addClass("tree-view");

      var json = require('Storage').getInstance().getPropertyContainer().toJson();

      $("#tree-view-floor").fancytree({
        extensions: ["glyph"],
        selectMode: 1,
        glyph: {
          preset: "awesome4",
          map: {}
        },
        icon: true,
        source: [json],
        click: function(event, data) {
          require('EventHandler').getInstance().callHandler('tree', event, data)
        }
      });

      this.setFloorTree($("#tree-view-floor").fancytree("getTree"));


      // init calss tree
      json.children.push({
        "title": "Cell",
        "key": "tree-view-class-cellSpace",
        "folder": true,
        "type": "cellSpaceFolder"
      });
      json.children.push({
        "title": "CellBoundary",
        "key": "tree-view-class-cellSpaceBoundary",
        "folder": true,
        "type": "cellSpaceBoundaryFolder"
      });
      json.children.push({
        "title": "State",
        "key": "tree-view-class-state",
        "folder": true,
        "type": "stateFolder"
      });
      json.children.push({
        "title": "Transition",
        "key": "tree-view-class-transition",
        "folder": true,
        "type": "transtitionFolder"
      });
      json.children.push({
        "title": "InterLayerConnection",
        "key": "tree-view-class-interlayerConnection",
        "folder": true,
        "type": "interlayerFolder"
      });

      $("#tree-view-class").fancytree({
        extensions: ["glyph"],
        selectMode: 1,
        glyph: {
          preset: "awesome4",
          map: {}
        },
        icon: true,
        source: [json],
        click: function(event, data) {
          require('EventHandler').getInstance().callHandler('tree', event, data)
        }
      });

      this.setClassTree($("#tree-view-class").fancytree("getTree"));
    }

    /**
     * @function
     * @name UI.Sidebar.treeView.TreeView#addProject
     */
    TreeView.prototype.addProject = function(value) {
      var projectObj = require('./JsonFormat/Factory.js')('PROJECT', value.id, value.name);
      $("#tree-view-floor").fancytree("getTree").clear();
      $("#tree-view-floor").fancytree("getTree").getRootNode().addChildren(projectObj);
    }

    /**
     * @function
     * @name UI.Sidebar.treeView.TreeView#addFloor
     */
    TreeView.prototype.addFloor = function(value) {
      var floorObj = require('./JsonFormat/Factory.js')('FLOOR', value.id, value.name);
      var projectKey = require('Storage').getInstance().getPropertyContainer().getElementById('project').id;
      this.getFloorTree().getNodeByKey(projectKey).addChildren(floorObj);
      this.getFloorTree().activateKey(floorObj.key);

      var floorTreeId = $("#tree-view-floor").fancytree("getTree").getNodeByKey(floorObj.key).li.id;

      var menu = new BootstrapMenu('#' + floorTreeId, {
        fetchElementData: function(e) {
          return floorObj.key
        },
        actions: {
          id: {
            name: function(floorTreeId) {
              return '<b>' + floorTreeId + '</b>';
            }
          },
          delete: {
            name: 'Delete',
            iconClass: 'fa-trash-o',
            onClick: function(floorTreeId) {
              if (require('Broker').getInstance().isPublishable('deletefloor')) {
                require('Broker').getInstance().publish({
                  req: 'deletefloor',
                  reqObj: {
                    id: floorObj.key
                  }
                });
              }
            }
          }
        }
      });
    }

    TreeView.prototype.addNode = function(id, name, type, floor) {
      var ot = require('ObjectType');

      // floor tree
      if (type != 'INTERLAYER_CONNECTION') {
        this.getFloorTree().getNodeByKey(floor + "-" + ot[type]).addChildren(
          require('./JsonFormat/Factory.js')(type, id, name)
        );

        this.getFloorTree().activateKey(id);
      }


      // class tree
      this.getClassTree().getNodeByKey("tree-view-class-" + ot[type]).addChildren(
        require('./JsonFormat/Factory.js')(type, id, name)
      );

      this.getClassTree().activateKey(id);
      this.bindRightClick(id, floor, type);
    }

    TreeView.prototype.bindRightClick = function(id, floor, type) {
      var req = "";
      if (type == 'CELL_SPACE') req = 'deletecell';
      else if (type == 'CELL_SPACE_BOUNDARY') req = 'deletecellboundary';
      else if (type == 'STATE') req = 'deletestate';
      else if (type == 'TRANSITION') req = 'deletetransition';
      else if (type == 'INTERLAYER_CONNECTION') req = 'interlayerConnection';

      var divIds = [];
      if (type != 'INTERLAYER_CONNECTION') divIds.push(this.getFloorTree().getNodeByKey(id).li.id);
      divIds.push(this.getClassTree().getNodeByKey(id).li.id);

      var propertyContainer = require('Storage').getInstance().getPropertyContainer();
      for (var i of divIds) {
        var menu = new BootstrapMenu('#' + i, {
          fetchElementData: function(e) {
            return id
          },
          actions: {
            id: {
              name: function(id) {
                return '<b>' + id + '</b>';
              }
            },
            delete: {
              name: 'Delete',
              iconClass: 'fa-trash-o',
              onClick: function(id) {
                if (require('Broker').getInstance().isPublishable(req)) {
                  if (type == 'cellboundary') type = 'cellBoundary';
                  var floor = propertyContainer.getFloorById(type, id);
                  require('Broker').getInstance().publish({
                    req: req,
                    reqObj: {
                      floor: floor,
                      id: id
                    }
                  });
                }
              }
            }
          }
        });
      }
    }

    /**
     * @param {String} id
     * @memberof TreeView
     */
    TreeView.prototype.removeNode = function(id) {
      if (id instanceof Array) {
        for (var i in id) {
          this.getFloorTree().getNodeByKey(id[i]).remove();
          this.getClassTree().fancytree("getTree").getNodeByKey(id[i]).remove();
        }
      } else if (typeof id === 'string') {
        this.getFloorTree().getNodeByKey(id).remove();
        this.getClassTree().getNodeByKey(id).remove();
      }

    }

    /**
     *  @memberof TreeView
     */
    TreeView.prototype.refresh = function(propertyContainer) {

      this.getFloorTree().clear();
      this.getClassTree().getNodeByKey('tree-view-class-cellSpace').removeChildren();
      this.getClassTree().getNodeByKey('tree-view-class-cellSpaceBoundary').removeChildren();
      this.getClassTree().getNodeByKey('tree-view-class-state').removeChildren();
      this.getClassTree().getNodeByKey('tree-view-class-transition').removeChildren();
      this.getClassTree().getNodeByKey('tree-view-class-interlayerConnection').removeChildren();


      this.addProject(propertyContainer.projectProperty);

      if (propertyContainer.floorProperties.length != 0) {

        // add floors
        for (var i = 0; i < propertyContainer.floorProperties.length; i++) {
          this.addFloor(propertyContainer.floorProperties[i]);
        }

        // add cells
        for (var i = 0; i < propertyContainer.cellProperties.length; i++) {
          this.addNode(
            propertyContainer.cellProperties[i].id,
            propertyContainer.cellProperties[i].name,
            'CELL_SPACE',
            propertyContainer.getFloorById('cell', propertyContainer.cellProperties[i].id)
          );
        }

        // add cellboundary
        for (var i = 0; i < propertyContainer.cellBoundaryProperties.length; i++) {
          this.addNode(
            propertyContainer.cellBoundaryProperties[i].id,
            propertyContainer.cellBoundaryProperties[i].name,
            'CELL_SPACE_BOUNDARY',
            propertyContainer.getFloorById('cellBoundary', propertyContainer.cellBoundaryProperties[i].id)
          );
        }

        // add state
        var stateLen = propertyContainer.stateProperties.length;
        for (var i = 0; i < stateLen; i++) {
          this.addNode(
            propertyContainer.stateProperties[i].id,
            propertyContainer.stateProperties[i].name,
            'STATE',
            propertyContainer.getFloorById('state', propertyContainer.stateProperties[i].id)
          );
        }

        // add transition
        var transitionLen = propertyContainer.transitionProperties.length;
        for (var i = 0; i < transitionLen; i++) {
          this.addNode(
            propertyContainer.transitionProperties[i].id,
            propertyContainer.transitionProperties[i].name,
            'TRANSITION',
            propertyContainer.getFloorById('transition', propertyContainer.transitionProperties[i].id)
          );
        }

        // add InterLayerConnection
        var interlayerLen = propertyContainer.interlayerConnections.length;
        for (var i = 0; i < interlayerLen; i++) {
          this.addNode(
            propertyContainer.interlayerConnections[i].id,
            propertyContainer.interlayerConnections[i].name,
            'INTERLAYER_CONNECTION',
            propertyContainer.getFloorById('interlayerConnection', propertyContainer.interlayerConnections[i].id)
          );
        }

      }

    }

    /**
     * @param {String} _key
     * @param {String} _name
     * @memberof TreeView
     */
    TreeView.prototype.updateTitle = function(_key, _title) {
      var propertyContainer = require('Storage').getInstance().getPropertyContainer();

      if (propertyContainer.getElementById('interlayerConnection', _key) == null)
        this.getFloorTree().getNodeByKey(_key).setTitle(_title);

      if (propertyContainer.getElementById('floor', _key) == null)
        this.getClassTree().getNodeByKey(_key).setTitle(_title);

    }


    var INSTANCE;

    return {
      getInstance: function(args) {
        if (INSTANCE === undefined) {
          INSTANCE = new TreeView(args);
        }
        return INSTANCE;
      }
    };

  })();

  return singleton;
});
