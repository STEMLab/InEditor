/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class TreeView
   */
  function TreeView() {

    /**
     * fancytree
     * @see {@link https://github.com/mar10/fancytree}
     * @memberof TreeView
     */
    this.tree = null;

  };

  /**
   * Read All value from storage and appear in tree view.
   * @memberof TreeView
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


    // init floor tree
    var json = window.storage.propertyContainer.toJson();

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
        window.eventHandler.callHandler('tree', event, data)
      }
    });

    this.tree = $("#tree-view-floor").fancytree("getTree");


    // init calss tree
    json.children.push({
      "title": "Cell",
      "key": "tree-view-class-cell",
      "folder": true,
      "type": "cellFolder"
    });
    json.children.push({
      "title": "CellBoundary",
      "key": "tree-view-class-cellBoundary",
      "folder": true,
      "type": "cellBoundaryFolder"
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
        window.eventHandler.callHandler('tree', event, data)
      }
    });

    this.tree = $("#tree-view-class").fancytree("getTree");
  }

  TreeView.prototype.addProject = function(newProejctProeprty) {

    var projectObj = new Object;
    projectObj.title = newProejctProeprty.name;
    projectObj.key = newProejctProeprty.id;
    projectObj.type = 'project';
    projectObj.folder = true;

    $("#tree-view-floor").fancytree("getTree").clear();
    $("#tree-view-floor").fancytree("getTree").getRootNode().addChildren(projectObj);
  }

  /**
   * Read All value from storage and appear in tree view.
   * @param {FloorProperty} newFloorProperty
   * @memberof TreeView
   */
  TreeView.prototype.addFloor = function(newFloorProperty) {

    var floorObj = new Object;
    floorObj.title = newFloorProperty.name;
    floorObj.key = newFloorProperty.id;
    floorObj.folder = true;
    floorObj.type = "floor";
    floorObj.icon = '../../assets/tree-icon/floor.png'
    floorObj.children = new Array();

    floorObj.children.push({
      "title": "Cell",
      "key": newFloorProperty.id + "-cell",
      "folder": true,
      "type": "cellFolder"
    });
    floorObj.children.push({
      "title": "CellBoundary",
      "key": newFloorProperty.id + "-cellBoundary",
      "folder": true,
      "type": "cellBoundaryFolder"
    });
    floorObj.children.push({
      "title": "State",
      "key": newFloorProperty.id + "-state",
      "folder": true,
      "type": "stateFolder"
    });
    floorObj.children.push({
      "title": "Transition",
      "key": newFloorProperty.id + "-transition",
      "folder": true,
      "type": "transtitionFolder"
    });

    var projectKey = window.storage.propertyContainer.getElementById('project').id;
    $("#tree-view-floor").fancytree("getTree").getNodeByKey(projectKey).addChildren(floorObj);
    $("#tree-view-floor").fancytree("getTree").activateKey(floorObj.key);

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
            if (window.broker.isPublishable('deletefloor')) {
              window.broker.publish({
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

  /**
   * @param {String} _key
   * @param {String} _name
   * @memberof TreeView
   */
  TreeView.prototype.updateTitle = function(_key, _title) {

    if (window.storage.propertyContainer.getElementById('interlayerConnection', _key) == null)
      $("#tree-view-floor").fancytree("getTree").getNodeByKey(_key).setTitle(_title);

    if (window.storage.propertyContainer.getElementById('floor', _key) == null)
      $("#tree-view-class").fancytree("getTree").getNodeByKey(_key).setTitle(_title);

  }

  /**
   * @param {String} id
   * @param {String} floor
   * @memberof TreeViews
   */
  TreeView.prototype.addCell = function(id, floor) {
    this.addNode(id, floor, 'cell');
    this.bindRightClick(id, floor, 'cell');
  }

  TreeView.prototype.bindRightClick = function(id, floor, type) {
    var req = "";
    if (type == 'cell') req = 'deletecell';
    else if (type == 'cellboundary') req = 'deletecellboundary';
    else if (type == 'state') req = 'deletestate';
    else if (type == 'transition') req = 'deletetransition';
    else if (type == 'interlayerConnection') req = 'interlayerConnection';

    var divIds = [];
    if(type != 'interlayerConnection') divIds.push($("#tree-view-floor").fancytree("getTree").getNodeByKey(id).li.id);
    divIds.push($("#tree-view-class").fancytree("getTree").getNodeByKey(id).li.id);

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
              if (window.broker.isPublishable(req)) {
                if(type == 'cellboundary') type = 'cellBoundary';
                var floor = window.storage.propertyContainer.getFloorById(type, id);
                window.broker.publish({
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
  TreeView.prototype.reomveNode = function(id) {
    if (id instanceof Array) {
      for (var i in id) {
        $("#tree-view-floor").fancytree("getTree").getNodeByKey(id[i]).remove();
        $("#tree-view-class").fancytree("getTree").getNodeByKey(id[i]).remove();
      }
    } else if (typeof id === 'string') {
      $("#tree-view-floor").fancytree("getTree").getNodeByKey(id).remove();
      $("#tree-view-class").fancytree("getTree").getNodeByKey(id).remove();
    }

  }

  TreeView.prototype.addNode = function(nodeId, floorId, type) {

    // floor tree
    if (type != 'interlayerConnection') {
      $("#tree-view-floor").fancytree("getTree").getNodeByKey(floorId + "-" + type).addChildren({
        title: nodeId,
        key: nodeId,
        folder: false,
        type: type,
        icon: '../../assets/tree-icon/' + type + '.png'
      });

      $("#tree-view-floor").fancytree("getTree").activateKey(nodeId);
    }


    // class tree
    $("#tree-view-class").fancytree("getTree").getNodeByKey("tree-view-class-" + type).addChildren({
      title: nodeId,
      key: nodeId,
      folder: false,
      type: type,
      icon: '../../assets/tree-icon/' + type + '.png'
    });

    $("#tree-view-class").fancytree("getTree").activateKey(nodeId);
  }

  /**
   * @memberof TreeView
   */
  TreeView.prototype.addCellBoundary = function(id, floor) {
    this.addNode(id, floor, 'cellBoundary');
    this.bindRightClick(id, floor, 'cellboundary');
  }

  /**
   * @memberof TreeView
   */
  TreeView.prototype.addState = function(id, floor) {
    this.addNode(id, floor, 'state');
    this.bindRightClick(id, floor, 'state');
  }

  /**
   * @memberof TreeView
   */
  TreeView.prototype.addInterLayerConnection = function(id, floor) {
    this.addNode(id, floor, 'interlayerConnection');
    this.bindRightClick(id, floor, 'interlayerConnection');
  }

  /**
   * @memberof TreeView
   */
  TreeView.prototype.addTransition = function(id, floor) {
    this.addNode(id, floor, 'transition');
    this.bindRightClick(id, floor, 'transition');
  }

  /**
   *  @memberof TreeView
   */
  TreeView.prototype.refresh = function(propertyContainer) {

    this.addProject(propertyContainer.projectProperty);

    if (propertyContainer.floorProperties.length != 0) {


      // add floors
      for (var i = 0; i < propertyContainer.floorProperties.length; i++) {
        this.addFloor(propertyContainer.floorProperties[i]);
      }

      // add cells
      for (var i = 0; i < propertyContainer.cellProperties.length; i++) {
        this.addCell(propertyContainer.cellProperties[i].id, propertyContainer.getFloorById('cell', propertyContainer.cellProperties[i].id));
        if (propertyContainer.cellProperties[i].id != propertyContainer.cellProperties[i].name) {
          this.updateTitle(propertyContainer.cellProperties[i].id, propertyContainer.cellProperties[i].name);
        }
      }

      // add cellboundary
      for (var i = 0; i < propertyContainer.cellBoundaryProperties.length; i++) {
        this.addCellBoundary(propertyContainer.cellBoundaryProperties[i].id, propertyContainer.getFloorById('cellBoundary', propertyContainer.cellBoundaryProperties[i].id));
        if (propertyContainer.cellBoundaryProperties[i].id != propertyContainer.cellBoundaryProperties[i].name) {
          this.updateTitle(propertyContainer.cellBoundaryProperties[i].id, propertyContainer.cellBoundaryProperties[i].name);
        }
      }

      // add state
      var stateLen = propertyContainer.stateProperties.length;
      for (var i = 0; i < stateLen; i++) {
        var id = propertyContainer.stateProperties[i].id;
        this.addState(id, propertyContainer.getFloorById('state', id));
        if (id != propertyContainer.stateProperties[i].name) {
          this.updateTitle(id, propertyContainer.stateProperties[i].name);
        }
      }

      // add transition
      var transitionLen = propertyContainer.transitionProperties.length;
      for (var i = 0; i < transitionLen; i++) {
        var id = propertyContainer.transitionProperties[i].id;
        this.addTransition(id, propertyContainer.getFloorById('transition', id));
        if (id != propertyContainer.transitionProperties[i].name) {
          this.updateTitle(id, propertyContainer.transitionProperties[i].name);
        }
      }

    }

  }


  return TreeView;
});
