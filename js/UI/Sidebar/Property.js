/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
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

    var canvasDiv = "<table id=\"property-canvas-table\" data-type=\"floor\" class=\"property-table ui compact table inverted \">";
    canvasDiv += "<tr><td class=\"title\">Upload floor plan</td><td class=\"value\"><input id=\"floorplan-file\" type=\"file\" style=\"width:100%\" accept=\".jpg,.jpeg,.png,.gif,.bmp\"></td></tr>";

    canvasDiv += "<tr><td class=\"title\">Copy another floor</td><td class=\"value\"><select id=\"copyfloor-text\" class=\"ui compact selection dropdown\">"
    canvasDiv += "<option value=\"\" selected disabled hidden></option>";

    for (var key in floorKeys) {
      var value = floorKeys[key];
      if (value != floorProperty.id) canvasDiv += "<option value=\"" + value + "\">" + value + "</option>";
    }

    canvasDiv += "</select></td><td>";

    canvasDiv += "<button class=\"ui icon button\" style=\"width:20%;\">";
    canvasDiv += "<i id=\"copyfloor-btn\" class=\"inverted grey check icon\"></i></button>";

    canvasDiv += "<tr><td class=\"title\">Remove<br>floor plan</td>";
    canvasDiv += "<td class=\"value\"><button class=\"ui icon button\">";
    canvasDiv += "<i id=\"remove-floorplan-btn\" class=\"inverted grey check icon\" style=\"width: max-content;\"></i></button></td></tr>";

    canvasDiv += "<tr><td class=\"title\" >Add<br>Map</td>";
    canvasDiv += "<td><table>" + this.getBasicTr('map-x', 'x', '129.08242187295514', false);
    canvasDiv += this.getBasicTr('map-y', 'y', '35.234839296124264', false) + "</table></td>";

    canvasDiv += "<td><button class=\"ui icon button\" style=\"width:20%;\">";
    canvasDiv += "<i id=\"add-map-btn\" class=\"inverted grey check icon\"></i></button></td></tr>";

    canvasDiv += "<tr><td class=\"title\" >Map control</td><td colspan=\"2\"><table style=\"width:100%\">";
    canvasDiv += "<tr><td><button class=\"ui icon button\">";
    canvasDiv += "<i id=\"activate-map-btn\" class=\"inverted grey check icon\" style=\"width: max-content;\"> Activate Map</i></button></td></tr>";
    canvasDiv += "<tr><td><button class=\"ui icon button\">";
    canvasDiv += "<i id=\"get-map-coor-btn\" class=\"inverted grey check icon\" style=\"width: max-content;\"> Get Map Coor</i></button></td></tr>";
    canvasDiv += "<tr><td><button class=\"ui icon button\">";
    canvasDiv += "<i id=\"deactivate-map-btn\" class=\"inverted grey check icon\" style=\"width: max-content;\"> Deactivate Map</i></button></td></tr></table></td></tr>"
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

    function bindEvent(id, action, type) {
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    bindEvent('floorplan-file', 'change', 'file');
    bindEvent('add-new-local-desc-btn', 'click', 'html');
    bindEvent('copyfloor-btn', 'click', 'html');
    bindEvent('property-subimt-btn', 'click', 'html');
    bindEvent('add-map-btn', 'click', 'html');
    bindEvent('get-map-coor-btn', 'click', 'html');
    bindEvent('activate-map-btn', 'click', 'html');
    bindEvent('deactivate-map-btn', 'click', 'html');
    bindEvent('remove-floorplan-btn', 'click', 'html');

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for (var obj of deleteLocalDescIcons)
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
    let eventBindList = [];

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    // core
    let baseTable = document.createElement('table');
    baseTable.setAttribute('data-type', type);
    baseTable.id = 'property-table';
    baseTable.classList.add('property-table', 'ui', 'compact', 'table', 'inverted');
    baseTable = this.bindBasePropsTr(baseTable, property);
    baseTable.appendChild(this.getOneTextTr('bottom', 'bottom-text', property.bottom));
    baseTable.appendChild(this.getOneTextTr('height', 'height-text', property.height));
    baseTable.appendChild(this.getOneTextTr('storey', 'storey-text', property.storey));
    baseTable.appendChild(this.getOneDropTr('external ref', 'externalRef-text', property.externalReference));
    baseTable.appendChild(this.getOneDropTr('partial-\nbounded\nby', 'partialboundedBy-text', property.partialboundedBy));

    let propsBtn = this.getSubmitBtn('property-subimt-btn');
    let propertiesDiv = document.createElement('div');
    propertiesDiv.appendChild(baseTable);
    propertiesDiv.appendChild(propsBtn);

    eventBindList.push(['property-subimt-btn', 'click', 'html']);
    eventBindList.push(['add-new-local-desc-btn', 'click', 'html']);

    // extend
    let extendTable = document.createElement('table');
    extendTable.setAttribute('data-type', type);
    extendTable.id = 'property-extension-table';
    extendTable.classList.add('property-table', 'ui', 'compact', 'table', 'inverted');
    extendTable.appendChild(this.getOneDropTr('module\ntype', 'module-type-text', property.getAvailbleModuleType(), property.extend.moduleType));
    eventBindList.push(['module-type-text', 'change', 'html']);

    if(property.extend.moduleType != ""){
      extendTable.appendChild(this.getOneDropTr('feature\ntype', 'feature-type-text', property.getAvailbleFeatureType(), property.extend.featureType));
      eventBindList.push(['feature-type-text', 'change', 'html']);
    }

    if(property.extend.featureType  != ""){
      if(property.extend.featureType.includes('Non')){
        // non navi
        extendTable.appendChild(
          this.getOneCodeListTr(
            ['NonNavigableSpace'],
            'obstacle-text',
            'obtacle',
            property.extend.attributes.obstacleType == "" ? undefined : property.extend.attributes.obstacleType
          )
        );
      }
      else{
        extendTable.appendChild(this.getOneCodeListTr([property.extend.featureType, 'class'], 'class-text', 'class', property.extend.attributes.class));
        extendTable.appendChild(this.getOneCodeListTr([property.extend.featureType, 'function'], 'function-text', 'function', property.extend.attributes.function));
        extendTable.appendChild(this.getOneCodeListTr([property.extend.featureType, 'function'], 'usage-text', 'usage', property.extend.attributes.usage));
      }
    }

    let extBtn = this.getSubmitBtn('extend-subimt-btn');
    eventBindList.push(['extend-subimt-btn', 'click', 'html']);

    let extendDiv = document.createElement('div');
    extendDiv.appendChild(extendTable);
    extendDiv.appendChild(extBtn);

    var divs = {
      "properties": propertiesDiv.outerHTML,
      "extension": extendDiv.outerHTML
    };

    $('select.dropdown').dropdown();

    propertyLayout.registerComponent('property-component', function(container, state) {

      container.getElement().html("<div id=\"property-" + state.id + "\">" + divs[state.id] + "</div>");

    });

    propertyLayout.init();

    // event binding
    function bindEvent(id, action, type) {
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    for(let e of eventBindList) bindEvent(...e);

    $('.ui.dropdown').dropdown({
      direction: 'downward',
      duration: 100
    });

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for (var obj of deleteLocalDescIcons)
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
    let eventBindList = [];

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    // core
    let baseTable = document.createElement('table');
    baseTable.setAttribute('data-type', type);
    baseTable.id = 'property-table';
    baseTable.classList.add('property-table', 'ui', 'compact', 'table', 'inverted');
    baseTable = this.bindBasePropsTr(baseTable, property);
    baseTable.appendChild(this.getOneTextTr('bottom', 'bottom-text', property.bottom));
    baseTable.appendChild(this.getOneTextTr('height', 'height-text', property.height));
    baseTable.appendChild(this.getOneTextTr('storey', 'storey-text', property.storey, true));

    let propsBtn = this.getSubmitBtn('property-subimt-btn');
    let propertiesDiv = document.createElement('div');
    propertiesDiv.appendChild(baseTable);
    propertiesDiv.appendChild(propsBtn);

    eventBindList.push(['property-subimt-btn', 'click', 'html']);
    eventBindList.push(['add-new-local-desc-btn', 'click', 'html']);baseTable.appendChild(this.getOneDropTr('external ref', 'externalRef-text', property.externalReference));

    // extend
    let extendTable = document.createElement('table');
    extendTable.setAttribute('data-type', type);
    extendTable.id = 'property-extension-table';
    extendTable.classList.add('property-table', 'ui', 'compact', 'table', 'inverted');
    extendTable.appendChild(this.getOneDropTr('module\ntype', 'module-type-text', property.getAvailbleModuleType(), property.extend.moduleType));
    eventBindList.push(['module-type-text', 'change', 'html']);

    if(property.extend.moduleType != ""){
      extendTable.appendChild(this.getOneDropTr('feature\ntype', 'feature-type-text', property.getAvailbleFeatureType(), property.extend.featureType));
      eventBindList.push(['feature-type-text', 'change', 'html']);
    }

    let extBtn = this.getSubmitBtn('extend-subimt-btn');
    eventBindList.push(['extend-subimt-btn', 'click', 'html']);

    let extendDiv = document.createElement('div');
    extendDiv.appendChild(extendTable);
    extendDiv.appendChild(extBtn);

    var divs = {
      "properties": propertiesDiv.outerHTML,
      "extension": extendDiv.outerHTML
    };


    propertyLayout.registerComponent('property-component', function(container, state) {

      container.getElement().html("<div id=\"property-" + state.id + "\">" + divs[state.id] + "</div>");

    });

    propertyLayout.init();

    // event binding
    function bindEvent(id, action, type) {
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    for(let e of eventBindList) bindEvent(...e);

    $('.ui.dropdown').dropdown({
      direction: 'downward',
      duration: 100
    });

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for (var obj of deleteLocalDescIcons)
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
            title: 'extension',
            isClosable: false,
            componentState: {
              id: 'extension'
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
            title: 'extension',
            isClosable: false,
            componentState: {
              id: 'extension'
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
    propertiesDiv += this.getBasicTr('id', 'id', property.id, true);
    propertiesDiv += this.getBasicTr('name', 'name', property.name, false);
    propertiesDiv += this.getBasicTr('duality', 'duality', property.duality != "" ? property.duality : 'none', true);
    propertiesDiv += this.getBasicTr('height', 'height', property.height, false);
    propertiesDiv += this.getDropDownTr('connects-text', 'connects', property.connects);
    propertiesDiv += this.getDescString(property.description);
    propertiesDiv += "</table>";

    propertiesDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-subimt-btn\">Submit</div>";

    this.setView(config, propertiesDiv);

    // event binding
    function bindEvent(id, action, type) {
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    bindEvent('property-subimt-btn', 'click', 'html');
    bindEvent('add-new-local-desc-btn', 'click', 'html');

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for (var obj of deleteLocalDescIcons)
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
    function bindEvent(id, action, type) {
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    bindEvent('property-subimt-btn', 'click', 'html');
    bindEvent('add-new-local-desc-btn', 'click', 'html');

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for (var obj of deleteLocalDescIcons)
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
    propertiesDiv += this.getBasicTr('id', 'id', property.id, true);
    propertiesDiv += this.getBasicTr('name', 'name', property.name, false);
    propertiesDiv += this.getBasicTr('duality', 'duality', property.duality != "" ? property.duality : 'none', true);
    propertiesDiv += this.getBasicTr('weight', 'weight', property.weight, false);
    propertiesDiv += this.getBasicTr('connects', 'connects', "\"" + property.getConncetsString() + "\"", true);
    propertiesDiv += this.getDescString(property.description);
    propertiesDiv += "</table>";

    propertiesDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-subimt-btn\">Submit</div>";

    this.setView(config, propertiesDiv);

    // event binding
    function bindEvent(id, action, type) {
      document.getElementById(id).addEventListener(action, function(event) {
        window.eventHandler.callHandler(type, event);
      });
    }

    bindEvent('property-subimt-btn', 'click', 'html');
    bindEvent('add-new-local-desc-btn', 'click', 'html');

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for (var obj of deleteLocalDescIcons)
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
    propertiesDiv += this.getBasicTr('id', 'id', property.id, true);
    propertiesDiv += this.getBasicTr('interConnects', 'inter\nConnects', "\"" + property.getInterConnectsString() + "\"", true);
    propertiesDiv += this.getBasicTr('connectedLayer', 'connected\nLayer', "\"" + property.getConnectedLayerString() + "\"", true);
    propertiesDiv += this.getDropDownTr('topoExpression-text', 'Topo\nExpression', [property.typeOfTopoExpression, 'CONTAINS', 'OVERLAPS', 'EQUALS', 'WITHIN', 'CROSSES', 'INTERSECTS']);

    propertiesDiv += this.getDescString(property.commnet);
    propertiesDiv += "</table>";
    propertiesDiv += "<div class=\"ui inverted basic olive bottom attached button\" tabindex=\"0\" id=\"property-subimt-btn\">Submit</div>";


    this.setView(config, propertiesDiv);

    document.getElementById('add-new-local-desc-btn').addEventListener('click', function(event) {
      window.eventHandler.callHandler('html', event);
    });

    var deleteLocalDescIcons = document.getElementsByClassName('delete-local-desc-icon');
    for (var obj of deleteLocalDescIcons)
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
      descString += "<td>" + key + "</td>";
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

  Property.prototype.getBasicTr = function(id, title, value, disable) {
    var str = "<tr><td class=\"title\">" + title + "</td><td class=\"value\">";
    str += "<div class=\"ui transparent inverted input\">";
    str += "<input id=\"" + id + "-text\" type=\"text\" value=" + value;

    if (disable == true) str += " disabled";

    str += "></div></td></tr>";
    return str;
  }

  Property.prototype.getDropDownTr = function(id, title, itemData) {

    var str = "<tr><td class=\"title\">" + title + "</td><td class=\"value\">";
    str += "<select class=\"ui fluid selection dropdown\" id=" + id + ">";
    for (var key in itemData) {
      if (key == 0) str += "<option value=" + itemData[key] + " selected=\"\">" + itemData[key] + "</option>";
      else str += "<option value=" + itemData[key] + " class=\"property-dropdown\">" + itemData[key] + "</option>";
    }
    str += "</select></td></tr>";

    return str;
  }


  Property.prototype.getCodeListTr = function(path, id, title, pre) {
    var cl = require('Property').CODE_LIST.getInstance().getList()[path[0]];
    var items = path.length >= 2 ? cl[path[1]] : cl;

    var str = "<td class=\"title\">" + title + "</td>";
    str += "<td><div class=\"ui fluid search selection dropdown\">";
    str += "<input type=\"hidden\" id=" + id + " ";
    str += pre != undefined ? "value=\"" + items[pre] + "\">" : ">";
    str += "<i class=\"dropdown icon\"></i>";
    str += pre == undefined ?
      "<div class=\"default text\">Select code</div>" :
      "<div class=\"text\"><i class=\"ui label circular property-dropdown\">" + pre + "</i>" + items[pre] + "</div>"
    str += "<div class=\"down menu\">";

    for (var key in items) {
      str += "<div class=\"item property-dropdown\" data-value=\"" + items[key] + "\"><i class=\"ui label circular property-dropdown\">" + key + "</i>" + items[key] + "</div>";
    }
    str += "</div></td>";

    return str;
  }

  Property.prototype.getOneTextTr = function(title, id, value, disable) {
    let tr = document.createElement('tr');

    let titleTd = document.createElement('td');
    titleTd.classList.add('title');
    titleTd.innerHTML = title;

    let valueTd = document.createElement('td');
    valueTd.classList.add('value');

    let inputDiv = document.createElement('div');
    inputDiv.classList.add('ui', 'transparent', 'inverted', 'input');

    let input = document.createElement('input');
    input.id = id;
    input.setAttribute('value', value);
    if(disable) input.disabled = true;

    inputDiv.appendChild(input);
    valueTd.appendChild(inputDiv);
    tr.appendChild(titleTd);
    tr.appendChild(valueTd);

    return tr;
  }

  Property.prototype.getDescTr = function(desc){
    let num = Object.keys(desc).length;
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.setAttribute('colspan', '2');
    td.appendChild(document.createTextNode('Desc'));

    let div = document.createElement('div');
    div.style.cssText = 'padding-left: .5rem;';

    let innerTable = document.createElement('table');
    innerTable.style.cssText = 'width:100%;';

    for(let key in desc){
      let innerTr = document.createElement('tr');
      let innerKey = document.createElement('td');
      innerKey.innerHTML = key;

      let innerValueTd = document.createElement('td');
      let innerValue = document.createElement('div');
      innerValue.classList.add('ui', 'transparent', 'inverted', 'input', 'value');
      let innerInput = document.createElement('input');
      innerInput.id = 'desc-text-' + key;
      innerInput.setAttribute('value', desc[key]);
      innerValue.appendChild(innerInput);
      innerValueTd.appendChild(innerValue);

      let innerTrashTd = document.createElement('td');
      let i = document.createElement('i');
      i.classList.add('fitted', 'trash', 'alternate', 'inverted', 'icon', 'delete-local-desc-icon');
      i.setAttribute('data-key', key);
      innerTrashTd.appendChild(i);

      innerTr.appendChild(innerKey);
      innerTr.appendChild(innerValueTd);
      innerTr.appendChild(innerTrashTd);

      innerTable.appendChild(innerTr);
    }


    let divider = document.createElement('div');
    divider.classList.add('ui', 'divider');
    let addLocalDesc = document.createTextNode('Add Local Desc');


    let newDescDiv = document.createElement('div');
    newDescDiv.classList.add('ui', 'transparent', 'icon', 'inverted', 'input');

    let input = document.createElement('input');
    input.id = 'add-new-local-desc-text';
    input.setAttribute('placeHolder', 'New Desc...');

    let addBtn = document.createElement('button');
    addBtn.classList.add('mini', 'ui', 'icon', 'button');

    let i = document.createElement('i');
    i.id = 'add-new-local-desc-btn';
    i.classList.add('plus', 'icon', 'inverted');

    addBtn.appendChild(i);
    newDescDiv.appendChild(input);
    newDescDiv.appendChild(addBtn);

    div.appendChild(innerTable);
    div.appendChild(divider);
    div.appendChild(newDescDiv);
    td.appendChild(div);
    tr.appendChild(td);

    return tr;
  }

  Property.prototype.getOneDropTr = function(title, id, values, pre){
    let tr = document.createElement('tr');
    let titleTd = document.createElement('td');
    titleTd.classList.add('title');
    titleTd.appendChild(document.createTextNode(title));
    let valueTd = document.createElement('td');
    valueTd.classList.add('value');
    let select = document.createElement('select');
    select.classList.add('ui', 'fluid', 'selection', 'dropdown');
    select.id = id;

    for(let key in values){
      let option = document.createElement('option');
      option.setAttribute('value', values[key]);
      option.appendChild(document.createTextNode(values[key]));

      if(key == 0) option.setAttribute('selected', '');
      else option.classList.add('property-dropdown');

      select.appendChild(option);
    }

    if(pre != undefined && select.value != pre){
      var selected = Array.from(select.children).filter(function(v){
        return v.selected;
      });
      selected[0].removeAttribute('selected');

      var target =  Array.from(select.children).filter(function(v){
        return v.value == pre;
      });
      target[0].setAttribute('selected', '');
    }

    valueTd.appendChild(select);
    tr.appendChild(titleTd);
    tr.appendChild(valueTd);

    return tr;
  }

  Property.prototype.bindBasePropsTr = function(table, props) {
    table.appendChild(this.getOneTextTr('id', 'id-text', props.id, true));
    table.appendChild(this.getOneTextTr('name', 'name-text', props.name));
    table.appendChild(this.getOneTextTr('duality', 'duality-text', props.duality, true));
    table.appendChild(this.getDescTr(props.description));
    return table;
  }

  Property.prototype.getSubmitBtn = function(id){
    let btn = document.createElement('div');
    btn.classList.add('ui', 'inverted', 'basic', 'olive', 'bottom', 'attached', 'button');
    btn.id = id;
    btn.appendChild(document.createTextNode('Submit'));

    return btn;
  }

  Property.prototype.getOneCodeListTr = function(path, id, title, pre){
    let cl = require('Property').CODE_LIST.getInstance().getList()[path[0]];
    let items = path.length >= 2 ? cl[path[1]] : cl;

    let tr = document.createElement('tr');
    let titleTd = document.createElement('td');
    titleTd.classList.add('title');
    titleTd.appendChild(document.createTextNode(title));

    let valueTd = document.createElement('td');

    let valueDiv = document.createElement('div');
    valueDiv.classList.add('ui', 'fluid', 'search', 'selection', 'dropdown');

    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.id = id;

    if(pre != undefined) input.setAttribute('value', items[pre]);
    valueDiv.appendChild(input);

    let i = document.createElement('i');
    i.classList.add('dropdown', 'icon');
    valueDiv.appendChild(i);

    let selectCodeDiv = document.createElement('div');
    selectCodeDiv.classList.add('text');
    if(pre == undefined){
      selectCodeDiv.classList.add('default');
      selectCodeDiv.appendChild(document.createTextNode('Select code'));
    }
    else {
      let pre = document.createElement('i');
      pre.classList.add('ui', 'label', 'circular', 'property-dropdown');
      pre.appendChild(document.createTextNode(pre));
      selectCodeDiv.appendChild(pre);
      selectCodeDiv.appendChild(document.createTextNode(items[pre]));
    }
    valueDiv.appendChild(selectCodeDiv);

    let menuDiv = document.createElement('div');
    menuDiv.classList.add('down', 'menu');

    for(let key in items){
      let item = document.createElement('div');
      item.classList.add('item', 'property-dropdown');
      item.setAttribute('data-value', items[key]);

      let innerDD = document.createElement('i');
      innerDD.classList.add('ui', 'label', 'circular', 'property-dropdown');
      innerDD.appendChild(document.createTextNode(key));
      item.appendChild(innerDD);

      item.appendChild(document.createTextNode(items[key]));
      menuDiv.appendChild(item);
    }

    valueDiv.appendChild(menuDiv);
    valueTd.appendChild(valueDiv);

    tr.appendChild(titleTd);
    tr.appendChild(valueTd);
    return tr;
  }

  return Property;
});
