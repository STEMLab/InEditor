/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class Property
   */
  function Property() {

  };

  Property.prototype.resize = function() {

    var sidebarH = document.getElementById('property-container').parentElement.clientHeight;
    var treeviewH = document.getElementById('tree-view').clientHeight
    document.getElementById('property-container').style.height = sidebarH - treeviewH;
  }

  /**
   * @param type The type of object to be displayed in the property tab. 'floor', 'cell', 'cellboundry', 'state', 'transition'
   * @param {String} id The id of object to be displayed in the property tab.
   * @param {Storage} storage
   * @memberof Property
   */
  Property.prototype.setPropertyTab = function(type, id, storage) {
    log.info("> set property tab :", type, id);

    if (type == "floor") this.setFloorProperty(id, storage);
    else if (type == "cell") this.setCellProperty(id, storage);
    else if (type == "cellBoundary") this.setCellBoundaryProperty(id, storage);
    else if (type == "state") this.setStateProperty(id, storage);
    else if (type == "transition") this.setTransitionProperty(id, storage);
    else if (type == "project") this.setProjectProperty(id, storage);
    else if (type == "interlayerConnection") this.setInterLayerConnectionProperty(id, storage);

  }

  /**
   * @param config
   * @param divContent
   * @memberof Property
   */
  Property.prototype.setView = function(config, divContent) {
    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    propertyLayout.registerComponent('property-component', function(container, state) {
      container.getElement().html(divContent);
    });

    propertyLayout.init();

    // event binding
    document.getElementById('property-subimt-btn').addEventListener('click', function(event) {

      window.eventHandler.callHandler('html', event);

    });
  }

  /**
   * @memberof Property
   */
  Property.prototype.setFloorView = function(config, floorProperty) {

    var floors = window.storage.propertyContainer.floorProperties;

    var floorKeys = [];
    for (var floor of floors) {
      floorKeys.push(floor.id);
    }

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var canvasDiv = "<table id=\"property-table\" data-type=\"canvas\" class=\"ui inverted table property-table\">";
    canvasDiv += "<tr><td class=\"title\">Upload floor plan</td><td class=\"value\"><input id=\"floorplan-file\" type=\"file\" accept=\".jpg,.jpeg,.png,.gif,.bmp\"></td></tr>";
    canvasDiv += "<tr><td class=\"title\">Copy another floor</td><td class=\"value\"><select id=\"copyfloor-text\" class=\"ui compact selection dropdown\" style=\"width: 80%;\">";
    canvasDiv += "<option value=\"\" selected disabled hidden></option>";

    for (var key in floorKeys) {
      var value = floorKeys[key];
      if (value != floorProperty.id) canvasDiv += "<option value=\"" + value + "\">" + value + "</option>";
    }

    canvasDiv += "</select>";



    canvasDiv += "<button class=\"ui icon button\" style=\"width:20%; position: absolute; top: 5.5rem;\">";
    canvasDiv += "<i id=\"copyfloor-btn\" class=\"inverted grey check icon\"></i></button>";



    // "<input id=\"copyfloor-btn\" type=\"button\" value=\"V\"></td></tr>";

    canvasDiv += "</table>";

    var propertiesDiv = "<table id=\"property-table\" data-type=\"floor\" class=\"property-table ui compact table inverted \">";
    propertiesDiv += this.getBasicTr('id', 'id', floorProperty.id, true);
    propertiesDiv += this.getBasicTr('name', 'name', floorProperty.name, false);
    propertiesDiv += this.getBasicTr('layer', 'layer', floorProperty.layer, false);

    propertiesDiv += "<tr><td class=\"title\" >Lower<br>Left<br>Corner</td>";
    propertiesDiv += "<td><table>" + this.getBasicTr('lower-corner-x', 'x', floorProperty.lowerCorner[0], false);
    propertiesDiv += this.getBasicTr('lower-corner-y', 'y', floorProperty.lowerCorner[1], false) + "</table></td></tr>";

    propertiesDiv += "<tr><td class=\"title\" >Upper<br>Right<br>Corner</td>";
    propertiesDiv += "<td><table>" + this.getBasicTr('upper-corner-x', 'x', floorProperty.upperCorner[0], false);
    propertiesDiv += this.getBasicTr('upper-corner-y', 'y', floorProperty.upperCorner[1], false) + "</table></td></tr>";

    propertiesDiv += this.getBasicTr('ground-height', 'floor height', floorProperty.groundHeight, false);
    propertiesDiv += this.getBasicTr('celing-height', 'wall height', floorProperty.celingHeight, false);
    propertiesDiv += this.getBasicTr('door-height', 'door height', floorProperty.doorHeight, false);
    propertiesDiv += this.getDescString(floorProperty.description);

    propertiesDiv += "</table>";

    propertiesDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-subimt-btn\">Submit</div>";


    var divs = {
      "cavas": canvasDiv,
      "properties": propertiesDiv
    };

    propertyLayout.registerComponent('property-component', function(container, state) {

      container.getElement().html("<div id=\"property-" + state.id + "\">" + divs[state.id] + "</div>");

    });

    propertyLayout.init();

    function bindEvent(id, action, type){
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    bindEvent('floorplan-file', 'change', 'file');
    bindEvent('add-new-local-desc-btn', 'click', 'html');
    bindEvent('copyfloor-btn', 'click', 'html');
    bindEvent('property-subimt-btn', 'click', 'html');

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for(var obj of deleteLocalDescIcons)
      obj.addEventListener('click', function(event) {
        event.target.id = 'delete-local-desc-btn';
        window.eventHandler.callHandler('html', event);
      });
  }

  /**
   * @memberof Property
   */
  Property.prototype.setViewWithRef = function(config, property, type) {

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var propertiesDiv = "<table id=\"property-table\" data-type=" + type + " class=\"property-table ui compact table inverted \">";
    propertiesDiv += this.getBasicTr('id', 'id', property.id, true);
    propertiesDiv += this.getBasicTr('name', 'name', property.name, false);
    propertiesDiv += this.getBasicTr('duality', 'duality', property.duality != ""? property.duality:'none', true);
    propertiesDiv += this.getDropDownTr('externalRef-text', 'external ref', property.externalReference);
    propertiesDiv += this.getDropDownTr('partialboundedBy-text', 'partial-<br>bounded<br>by', property.partialboundedBy);
    propertiesDiv += this.getDescString(property.description);

    propertiesDiv += "</table>";
    propertiesDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-subimt-btn\">Submit</div>";


    // ref tab
    var refDiv = "<table id=\"property-ref-table\" data-type=" + type + " class=\"property-table ui compact table inverted\">";
    refDiv += "<tr><td class=\"title\">ref</td><td class=\"value\"><input id=\"ref-text\" type=\"text\"></td></tr>";
    refDiv += "</table>";
    refDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-ref-submit-btn\">Submit</div>";


    // navi tab
    var naviDiv = "<table id=\"property-navi-table\" data-type=" + type + " class=\"property-table ui compact table inverted\">";
    log.info(property.naviType);
    naviDiv += this.getDropDownTr('navi-text', 'Navi Type', [property.naviType, "NavigableSpace", "GeneralSpace", "TransferSpace", "TransitionSpace"]);
    if (property.naviType != "") {
      naviType += this.getBasicTr('class', 'class', property.navi.class, false);
      naviType += this.getBasicTr('function', 'function', property.navi.function, false);
      naviType += this.getBasicTr('usage', 'usage', property.navi.usage, false);
    }

    naviDiv += "</table>";
    naviDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-navi-submit-btn\">Submit</div>";

    var divs = {
      "properties": propertiesDiv,
      "ref": refDiv,
      "navi": naviDiv
    };


    propertyLayout.registerComponent('property-component', function(container, state) {

      container.getElement().html("<div id=\"property-" + state.id + "\">" + divs[state.id] + "</div>");

    });

    propertyLayout.init();

    // event binding
    function bindEvent(id, action, type){
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    bindEvent('property-subimt-btn', 'click', 'html');
    bindEvent('property-ref-submit-btn', 'click', 'html');
    bindEvent('property-navi-submit-btn', 'click', 'html');
    bindEvent('navi-text', 'click', 'html');
    bindEvent('add-new-local-desc-btn', 'click', 'html');

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for(var obj of deleteLocalDescIcons)
      obj.addEventListener('click', function(event) {
        event.target.id = 'delete-local-desc-btn';
        window.eventHandler.callHandler('html', event);
      });


  }



  /**
   * @memberof Property
   */
  Property.prototype.setCellBoundaryView = function(config, property, type) {

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var propertiesDiv = "<table id=\"property-table\" data-type=" + type + " class=\"property-table ui compact table inverted \">";
    propertiesDiv += this.getBasicTr('id', 'id', property.id, true);
    propertiesDiv += this.getBasicTr('name', 'name', property.name, false);
    propertiesDiv += this.getBasicTr('duality', 'duality', property.duality != ""? property.duality:'none', true);
    propertiesDiv += this.getDropDownTr('externalRef-text', 'external ref', property.externalReference);
    propertiesDiv += this.getDescString(property.description);

    propertiesDiv += "</table>";
    propertiesDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-subimt-btn\">Submit</div>";



    // ref tab
    var refDiv = "<table id=\"property-ref-table\" data-type=\"ref\" class=\"property-table\">";
    refDiv += "<tr><td class=\"title\">ref</td><td class=\"value\"><input id=\"ref-text\" type=\"text\"></td></tr>";
    refDiv += "<tr><td colspan=\"2\"><button class=\"submit-btn\"  id=\"property-ref-submit-btn\">submit</button></td></tr>";
    refDiv += "</table>";

    // navi tab
    var naviDiv = "<table id=\"property-navi-table\" data-type=\"navi\" class=\"property-table\">";
    naviDiv += "<tr><td class=\"title\">Navi Type</td><td class=\"value\"><select id=\"navi-text\" style=\"width: 80%;\" data-pre=" + property.naviType + ">";
    naviDiv += "<option value=" + property.naviType + " selected>" + property.naviType + "</option>";
    naviDiv += "<option value=\"NavigableBoundary\">NavigableSpace</option>";
    naviDiv += "<option value=\"GeneralSpace\">GeneralSpace</option>";
    naviDiv += "<option value=\"ConnectionBoundary\">TransferSpace</option>";
    naviDiv += "<option value=\"AnchorBoundary\">TransitionSpace</option>";
    naviDiv += "</select></td></tr>";

    if (property.naviType != "") {
      naviDiv += "<tr><td class=\"title\">class</td><td class=\"value\"><input id=\"class-text\" type=\"text\" value=" + property.navi.class + "></td></tr>";
      naviDiv += "<tr><td class=\"title\">function</td><td class=\"value\"><input id=\"function-text\" type=\"text\" value=" + property.navi.function+"></td></tr>";
      naviDiv += "<tr><td class=\"title\">usage</td><td class=\"value\"><input id=\"usage-text\" type=\"text\" value=" + property.navi.usage + "></td></tr>";
    }

    naviDiv += "</table>";
    naviDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-navi-submit-btn\">Submit</div>";


    var divs = {
      "properties": propertiesDiv,
      "ref": refDiv,
      "navi": naviDiv
    };


    propertyLayout.registerComponent('property-component', function(container, state) {

      container.getElement().html("<div id=\"property-" + state.id + "\">" + divs[state.id] + "</div>");

    });

    propertyLayout.init();

    // event binding
    function bindEvent(id, action, type){
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    bindEvent('property-subimt-btn', 'click', 'html');
    bindEvent('property-ref-submit-btn', 'click', 'html');
    bindEvent('property-navi-submit-btn', 'click', 'html');
    bindEvent('navi-text', 'click', 'html');
    bindEvent('add-new-local-desc-btn', 'click', 'html');

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for(var obj of deleteLocalDescIcons)
      obj.addEventListener('click', function(event) {
        event.target.id = 'delete-local-desc-btn';
        window.eventHandler.callHandler('html', event);
      });

  }


  /**
   * @param {String} id The id of floor object to be displayed in the property tab.
   * @param {Storage} storage storage
   * @desc Clears the contents of the property tab and creates a new tab for that floor.<br>Tabs consist of 'canvas' and 'property'.<br>The canvas tab allows you to resize the canvas or insert or remove the floor plan.<br>The property tab allows you to view/change the value of the floor's property(Level, Lower corner, Upper corner, Ground height, Celling height, Door height, description).
   * @memberof Property
   */
  Property.prototype.setFloorProperty = function(id, storage) {

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
            title: 'properties',
            isClosable: false,
            componentState: {
              id: 'properties'
            }
          },
          {
            type: 'component',
            componentName: 'property-component',
            title: 'cavas',
            isClosable: false,
            componentState: {
              id: 'cavas'
            }
          }
        ]
      }]
    };

    this.setFloorView(config, storage.propertyContainer.getElementById('floor', id));

  }

  /**
   * @param {String} id The id of cell object to be displayed in the property tab.
   * @param {Storage} storage
   * @desc Clears the contents of the property tab and creates a new tab for that cell.<br>Tab consist of property.<br>The property tab allows you to view/change the value of the cell's property(name, duality, description).
   * @memberof Property
   */
  Property.prototype.setCellProperty = function(id, storage) {


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
            title: 'properties',
            isClosable: false,
            componentState: {
              id: 'properties'
            }
          },
          {
            type: 'component',
            componentName: 'property-component',
            title: 'ref',
            isClosable: false,
            componentState: {
              id: 'ref'
            }
          },
          {
            type: 'component',
            componentName: 'property-component',
            title: 'navi',
            isClosable: false,
            componentState: {
              id: 'navi'
            }
          }
        ]
      }]
    };

    this.setViewWithRef(config, storage.propertyContainer.getElementById('cell', id), 'cell');

  }

  /**
   * @param id The id of cellboundary object to be displayed in the property tab.
   * @param storage storage
   * @desc Clears the contents of the property tab and creates a new tab for that cellboundary.<br>Tab consist of property.<br>The property tab allows you to view/change the value of the cellboundary's property(name, duality, description).
   * @memberof Property
   */
  Property.prototype.setCellBoundaryProperty = function(id, storage) {

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
            title: 'properties',
            isClosable: false,
            componentState: {
              id: 'properties'
            }
          },
          {
            type: 'component',
            componentName: 'property-component',
            title: 'ref',
            isClosable: false,
            componentState: {
              id: 'ref'
            }
          },
          {
            type: 'component',
            componentName: 'property-component',
            title: 'navi',
            isClosable: false,
            componentState: {
              id: 'navi'
            }
          }
        ]
      }]
    };

    this.setCellBoundaryView(config, storage.propertyContainer.getElementById('cellBoundary', id), 'cellBoundary');

  }


  /**
   * @param id The id of state object to be displayed in the property tab.
   * @param storage storage
   * @desc Clears the contents of the property tab and creates a new tab for that state.<br>Tab consist of property.<br>The property tab allows you to view/change the value of the state's property(name, duality, connects, description).
   * @memberof Property
   */
  Property.prototype.setStateProperty = function(id, storage) {

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
          title: 'properties',
          isClosable: false,
          componentState: {
            id: 'propertiesProper'
          }
        }]
      }]
    };

    this.setStateyView(config, storage.propertyContainer.getElementById('state', id), 'state');

  }

  /**
   * @memberof Property
   */
  Property.prototype.setStateyView = function(config, property, type) {

    // id, name, desc, duality, connects[]

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#protperty-container'));

    var propertiesDiv = "<table id=\"property-table\" data-type=\"state\" class=\"property-table ui compact table inverted \">";
    propertiesDiv += this.getBasicTr('id', 'id', property .id, true);
    propertiesDiv += this.getBasicTr('name', 'name', property .name, false);
    propertiesDiv += this.getBasicTr('duality', 'duality', property.duality != ""? property.duality:'none', true);
    propertiesDiv += this.getBasicTr('height', 'height', property.height, false);
    propertiesDiv += this.getDropDownTr('connects-text', 'connects', property.connects);
    propertiesDiv += this.getDescString(property.description);
    propertiesDiv += "</table>";

    propertiesDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-subimt-btn\">Submit</div>";

    this.setView(config, propertiesDiv);

    // event binding
    function bindEvent(id, action, type){
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    bindEvent('property-subimt-btn', 'click', 'html');
    bindEvent('add-new-local-desc-btn', 'click', 'html');

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for(var obj of deleteLocalDescIcons)
      obj.addEventListener('click', function(event) {
        event.target.id = 'delete-local-desc-btn';
        window.eventHandler.callHandler('html', event);
      });

  }


  /**
   * @param id The id of transition object to be displayed in the property tab.
   * @param storage storage
   * @desc Clears the contents of the property tab and creates a new tab for that transition.<br>Tab consist of property.<br>The property tab allows you to view/change the value of the transition's property(name, duality, weight, connects, description).
   * @memberof Property
   */
  Property.prototype.setTransitionProperty = function(id, storage) {

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
          title: 'properties',
          isClosable: false,
          componentState: {
            id: 'propertiesProper'
          }
        }]
      }]
    };

    this.setTransitionView(config, storage.propertyContainer.getElementById('transition', id), 'transition');

  }


  /**
   * @param {String} id The id of cell object to be displayed in the property tab.
   * @param {Storage} storage storage
   * @desc Clears the contents of the property tab and creates a new tab for that project.<br>Tab consist of property.<br>The property tab allows you to view/change the value of the project's property(name, date, author, description).
   * @memberof Property
   */
  Property.prototype.setProjectProperty = function(id, storage) {

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
          title: 'properties',
          isClosable: false,
          componentState: {
            id: 'propertiesProper'
          }
        }]
      }]
    };

    var projectProperty = storage.propertyContainer.getElementById('project', id);

    var divContent = "<table id=\"property-table\" data-type=\"project\" class=\"ui inverted table property-table\">";
    divContent += this.getBasicTr('id', 'id', projectProperty.id, true);
    divContent += this.getBasicTr('name', 'name', projectProperty.name, false);
    divContent += this.getBasicTr('date', 'date', projectProperty.date, false);
    divContent += this.getBasicTr('author', 'author', projectProperty.author, false);
    divContent += this.getDescString(projectProperty.description);
    divContent += "</table>";
    divContent += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-subimt-btn\">Submit</div>";

    this.setView(config, divContent);

    // event binding
    function bindEvent(id, action, type){
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    bindEvent('property-subimt-btn', 'click', 'html');
    bindEvent('add-new-local-desc-btn', 'click', 'html');

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for(var obj of deleteLocalDescIcons)
      obj.addEventListener('click', function(event) {
        event.target.id = 'delete-local-desc-btn';
        window.eventHandler.callHandler('html', event);
      });

  }

  /**
   * @memberof Property
   */
  Property.prototype.clear = function() {

    document.getElementById('property-container').innerHTML = "";

  }

  Property.prototype.setTransitionView = function(config, property, type) {

    // id, name, description, weight, connects, duality, isInterLayerConnetion

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var propertiesDiv = "<table id=\"property-table\" data-type=\"transition\" class=\"property-table ui compact table inverted \">";
    propertiesDiv += this.getBasicTr('id', 'id', property .id, true);
    propertiesDiv += this.getBasicTr('name', 'name', property .name, false);
    propertiesDiv += this.getBasicTr('duality', 'duality', property.duality != ""? property.duality:'none', true);
    propertiesDiv += this.getBasicTr('weight', 'weight', property .weight, false);
    propertiesDiv += this.getBasicTr('connects', 'connects', "\"" + property.getConncetsString() +"\"", true);
    propertiesDiv += this.getDescString(property.description);
    propertiesDiv += "</table>";

    propertiesDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-subimt-btn\">Submit</div>";

    this.setView(config, propertiesDiv);

    // event binding
    function bindEvent(id, action, type){
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    bindEvent('property-subimt-btn', 'click', 'html');
    bindEvent('add-new-local-desc-btn', 'click', 'html');

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for(var obj of deleteLocalDescIcons)
      obj.addEventListener('click', function(event) {
        event.target.id = 'delete-local-desc-btn';
        window.eventHandler.callHandler('html', event);
      });

  }


  Property.prototype.setInterLayerConnectionProperty = function(id, storage) {

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
          title: 'properties',
          isClosable: false,
          componentState: {
            id: 'propertiesProper'
          }
        }]
      }]
    };

    this.setInterLayerView(config, storage.propertyContainer.getElementById('interlayerConnection', id), 'interlayerConnection');
  }

  Property.prototype.setInterLayerView = function(config, property, type) {

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var propertiesDiv = "<table id=\"property-table\" type=\"floor\" class=\"property-table ui compact table inverted \">";
    propertiesDiv += this.getBasicTr('id', 'id', property .id, true);
    propertiesDiv += this.getBasicTr('interConnects', 'inter\nConnects', "\"" + property.getInterConnectsString() + "\"", true);
    propertiesDiv += this.getBasicTr('connectedLayer', 'connected\nLayer', "\"" +  property.getConnectedLayerString() + "\"", true);
    propertiesDiv += this.getDropDownTr('topoExpression-text', 'Topo\nExpression', [property.typeOfTopoExpression, 'CONTAINS', 'OVERLAPS', 'EQUALS', 'WITHIN', 'CROSSES', 'INTERSECTS']);

    propertiesDiv += this.getDescString(property.commnet);
    propertiesDiv += "</table>";
    propertiesDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-subimt-btn\">Submit</div>";


    this.setView(config, propertiesDiv);

    document.getElementById('add-new-local-desc-btn').addEventListener('click', function(event) {
      window.eventHandler.callHandler('html', event);
    });

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for(var obj of deleteLocalDescIcons)
      obj.addEventListener('click', function(event) {
        event.target.id = 'delete-local-desc-btn';
        window.eventHandler.callHandler('html', event);
      });

  }

  Property.prototype.getDescString = function(desc) {
    var num = Object.keys(desc).length;
    var i = 0;
    var descString = "";
    descString += "<tr><td colspan=\"2\">Desc";
    descString += "<div style=\"padding-left: .5rem;\">";
    descString += "<table style=\"width:100%\">";

    for (var key in desc) {
      descString += "<tr>";
      descString += "<td>"+key+"</td>";
      descString += "<td><div class=\"ui transparent inverted input value\"><input type=\"text\" id=\"desc-text-" + key + "\" value=\"" + desc[key] + "\"></div></td>";
      descString += "<td><i class=\"fitted trash alternate inverted icon delete-local-desc-icon\" data-key=" + key + "></i></td>";
      descString += "<tr>";
      i++;
    }
    descString += "</table><div class=\"ui divider\"></div>";
    descString += "Add Local Desc";
    descString += "<div class=\"ui transparent icon inverted input\"><input type=\"text\" id=\"add-new-local-desc-text\" placeHolder=\"New Desc...\"><button class=\"mini ui icon button\"><i id=\"add-new-local-desc-btn\" class=\"plus icon inverted\"></i></button>";
    descString += "</div></div></td></tr>";

    return descString;
  }

  Property.prototype.getBasicTr = function(id, title, value, disable){
    var str = "<tr><td class=\"title\">"+title+"</td><td class=\"value\">";
    str += "<div class=\"ui transparent inverted input\">";
    str += "<input id=\""+id+"-text\" type=\"text\" value=" + value;

    if(disable == true) str += " disabled";

    str +="></div></td></tr>";
    return str;
  }

  Property.prototype.getDropDownTr = function(id, title, itemData){

    var str = "<tr><td class=\"title\">"+title+"</td><td class=\"value\">";
    str += "<select class=\"ui compact selection dropdown\" id="+id+">";
    for(var key in itemData){
      if(key == 0) str += "<option value="+itemData[key]+" selected=\"\">"+itemData[key]+"</option>";
      else str += "<option value="+itemData[key]+">"+itemData[key]+"</option>";
    }
    str +="</select></td></tr>";

    return str;
  }

  Property.prototype.getDropDownSearchTr = function(id, title, itemData){

  }

  return Property;
});
