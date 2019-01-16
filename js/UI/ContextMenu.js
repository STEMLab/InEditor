/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class ContextMenu
   */
  function ContextMenu() {
    this.bindContextMenu = function(floorId) {

      var menu = new BootstrapMenu('#' + floorId, {
        fetchElementData: function() {
          var selectedObj = window.broker.getManager('addnewhole', 'GeometryManager').isObjectSelected(floorId);
          return {
            type: selectedObj.type,
            id: selectedObj.result,
            floor: floorId
          }
        },
        actions: function(data) {
          return makeMenus({
            type: 'floor',
            id: [floorId],
            floor: floorId
          });
        }()
      });

      function makeMenus(data) {
        var menus =  [];
        for (var i = 0; i < data.id.length; i++) {
          menus = menus.concat(makeOneMenu({
            type: data.type,
            id: data.id[i],
            floor: data.floor
          }));
        }
        return menus;
      }

      function makeOneMenu(data) {
        return [{
            name: function(data) {
              var title = '<b>';
              var name;

              if (Array.isArray(data.id)) {
                for (var i of data.id) {
                  name = window.storage.propertyContainer.getElementById(data.type, i).name;
                  title += name + '(' + i + ')  ';
                }
              } else {
                name = window.storage.propertyContainer.getElementById(data.type, data.id).name;
                title += name + '(' + data.id + ')';
              }

              title += '</b>';

              return title;
            }
          },
          {
            name: 'Edit Properties',
            iconClass: 'fa-pencil',
            onClick: function(data) {
              window.uiContainer.sidebar.property.setPropertyTab(data.type, data.id, window.storage)
            }
          },
          {
            name: 'Delete',
            iconClass: 'fa-trash-o',
            onClick: function(data) {
              var msg = {
                req: "",
                reqObj: {
                  floor: data.floor,
                  id: data.id
                }
              };

              if (data.type == 'floor') msg.req = 'deletefloor';
              else if (data.type == 'cell') msg.req = 'deletecell';
              else if (data.type == 'cellboundary') msg.req = 'deletecellboundary';
              else if (data.type == 'transition') msg.req = 'deletetransition';
              else if (data.type == 'state') msg.req = 'deletestate';

              if (Array.isArray(msg.reqObj.id)) {
                var ids = data.id;
                for (var i of ids) {
                  if (window.broker.isPublishable(msg.req)) {
                    msg.reqObj.id = i;
                    window.broker.publish(msg);
                  }
                }
              } else {
                if (window.broker.isPublishable(msg.req)) window.broker.publish(msg);
              }
            }
          },
          {
            name: 'Rotate slant',
            iconClass: 'fa-repeat',
            isShown: function(data) {
              if (data.type == 'cell') {
                var cellGeo = window.storage.geometryContainer.getElementById('cell', data.id[0]);
                if (cellGeo.slant != null) return true;
                else return false;
              } else return false;
            },
            onClick: function(data) {
              if (window.broker.isPublishable('rotateslant'))
                window.broker.publish({
                  req: 'rotateslant',
                  reqObj: {
                    floor: data.floor,
                    id: data.id[0]
                  }
                });
            }
          }
        ];
      }
    }
  }

  return new ContextMenu();
});
