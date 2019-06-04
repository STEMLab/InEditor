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
          var selectedObj = require('Broker').getInstance().getManager('addnewhole', 'GeometryManager').isObjectSelected(floorId);
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
              var propertyContainer = require('Storage').getInstance().getPropertyContainer();

              if (Array.isArray(data.id)) {
                for (var i of data.id) {
                  name = propertyContainer.getElementById(data.type, i).name;
                  title += name + '(' + i + ')  ';
                }
              } else {
                name = propertyContainer.getElementById(data.type, data.id).name;
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
              require('UI').getInstance().propertyTab.setPropertyTab(data.type, data.id, require('Storage').getInstance())
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
                  if (require('Broker').getInstance().isPublishable(msg.req)) {
                    msg.reqObj.id = i;
                    require('Broker').getInstance().publish(msg);
                  }
                }
              } else {
                if (require('Broker').getInstance().isPublishable(msg.req)) require('Broker').getInstance().publish(msg);
              }
            }
          },
          {
            name: 'Rotate slant',
            iconClass: 'fa-repeat',
            isShown: function(data) {
              if (data.type == 'cell') {
                var cellGeo = require('Storage').getInstance().getGeometryContainer().getElementById('cell', data.id[0]);
                if (cellGeo.slant != null) return true;
                else return false;
              } else return false;
            },
            onClick: function(data) {
              if (require('Broker').getInstance().isPublishable('rotateslant'))
                require('Broker').getInstance().publish({
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
