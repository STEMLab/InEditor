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

  Property.prototype.resize = function(){

    var sidebarH = document.getElementById('property-container').parentElement.clientHeight;
    var treeviewH = document.getElementById('tree-view').clientHeight
    log.info("sidebarH : " + sidebarH);
    log.info("treeviewH : " + treeviewH);
    log.info("sidebarH - treeviewH : " + (sidebarH - treeviewH));
    log.info("property-container : " + document.getElementById('property-container').style);
    document.getElementById('property-container').style.height = sidebarH - treeviewH;
    log.info(document.getElementById('property-container').style.height);
    log.info(document.getElementById('property-container').clientHeight)

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

    var floorKeys=[];
    for(var floor of floors){
      floorKeys.push(floor.id);
    }

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var canvasDiv = "<table class=\"property-table ui compact table inverted \">";
    canvasDiv += "<tr><td class=\"title\">Upload floor plan</td><td class=\"value\"><input id=\"floorplan-file\" type=\"file\" accept=\".jpg,.jpeg,.png,.gif,.bmp\"></td></tr>";
    // canvasDiv += "<tr><td class=\"title\">Resizing canvas</td><td class=\"value\"><input id=\"name-text\" type=\"button\" value=\"V\"></td></tr>";

    canvasDiv += "<tr><td class=\"title\">Copy another floor</td><td class=\"value\"><select id=\"copyfloor-text\" style=\"width: 80%;\">";
    canvasDiv += "<option value=\"\" selected disabled hidden></option>";
    for (var key in floorKeys) {
      var value = floorKeys[key];
      if(value != floorProperty.id) canvasDiv += "<option value=\"" + value + "\">" + value + "</option>";
    }

    canvasDiv += "</select>";
    canvasDiv += "<input id=\"copyfloor-btn\" type=\"button\" value=\"V\"></td></tr>";

    canvasDiv += "</table>";

    var propertiesDiv = "<table id=\"property-table\" type=\"floor\" class=\"property-table ui compact table inverted \">";
    propertiesDiv += "<tr><td class=\"title\">id</td><td colspan=\"2\"><input id=\"id-text\" type=\"text\" value=" + floorProperty.id + " disabled></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">name</td><td class=\"value\"colspan=\"2\"><input id=\"name-text\" type=\"text\" value=" + floorProperty.name + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">layer</td><td class=\"value\"colspan=\"2\"><input id=\"layer-text\" type=\"text\" value=" + floorProperty.layer + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\" rowspan=\"2\">Lower<br>Left<br>Corner</td>";
    propertiesDiv += "<td class=\"inner-tag\">x</td>";
    propertiesDiv += "<td class=\"inner-value\"><input id=\"lower-corner-x\" value="+floorProperty.lowerCorner[0]+"></td></tr>";
    propertiesDiv += "<tr><td class=\"inner-tag\">y</td><td class=\"inner-value\"><input id=\"lower-corner-y\" value="+floorProperty.lowerCorner[1]+"></td></tr>";
    propertiesDiv += "<tr><td class=\"title\" rowspan=\"2\">Upper<br>Right<br>Corner</td>";
    propertiesDiv += "<td class=\"inner-tag\">x</td>";
    propertiesDiv += "<td class=\"inner-value\"><input id=\"upper-corner-x\" value="+floorProperty.upperCorner[0]+"></td></tr>";
    propertiesDiv += "<tr><td class=\"inner-tag\">y</td><td class=\"inner-value\"><input id=\"upper-corner-y\" value="+floorProperty.upperCorner[1]+"></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">ground height</td><td class=\"value\"colspan=\"2\"><input id=\"ground-height-text\" type=\"text\" value=" + floorProperty.groundHeight + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">celing height</td><td class=\"value\"colspan=\"2\"><input id=\"celing-height-text\" type=\"text\" value=" + floorProperty.celingHeight + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">door height</td><td class=\"value\"colspan=\"2\"><input id=\"door-height-text\" type=\"text\" value=" + floorProperty.doorHeight + "></td></tr>";
    propertiesDiv += this.getDescString(floorProperty.description);
    propertiesDiv += "<tr><td colspan=\"3\"><button class=\"submit-btn\"  id=\"property-subimt-btn\">submit</button></td></tr></table>";

    var divs = {
      "cavas": canvasDiv,
      "properties": propertiesDiv
    };

    propertyLayout.registerComponent('property-component', function(container, state) {

      container.getElement().html("<div id=\"property-" + state.id + "\">" + divs[state.id] + "</div>");

    });

    propertyLayout.init();

    // event binding
    document.getElementById('floorplan-file').addEventListener('change', function(event) {

      window.eventHandler.callHandler('file', event);

    });

    // event binding
    document.getElementById('property-subimt-btn').addEventListener('click', function(event) {

      window.eventHandler.callHandler('html', event);

    });

    // event binding
    document.getElementById('copyfloor-btn').addEventListener('click', function(event) {

      window.eventHandler.callHandler('html', event);

    });

  }

  /**
  * @memberof Property
  */
  Property.prototype.setViewWithRef = function(config, property, type) {

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var propertiesDiv = "<table id=\"property-table\" type=" + type + " class=\"property-table ui compact table inverted \">";
    propertiesDiv += "<tr><td class=\"title\">id</td><td class=\"value\"><input id=\"id-text\" type=\"text\" value=" + property.id + " disabled></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">name</td><td class=\"value\"><input id=\"name-text\" type=\"text\" value=" + property.name + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">duality</td><td class=\"value\"><input id=\"duality-text\" type=\"text\" disabled value=" + property.duality + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">external ref</td><td class=\"value\"><select id=\"externalRef-text\" style=\"width: 100%;\">";

    for (var key in property.externalReference) {
      var value = property.externalReference[key];
      propertiesDiv += "<option value=\"" + value + "\">" + value + "</option>";
    }

    propertiesDiv += "</select></td></tr>";

    propertiesDiv += "<tr><td class=\"title\">partial-<br>bounded<br>by</td><td class=\"value\"><select id=\"partialboundedBy-text\" style=\"width: 100%;\">";

    for (var key in property.partialboundedBy) {
      var value = property.partialboundedBy[key];
      propertiesDiv += "<option value=\"" + value + "\"></option>";
    }

    propertiesDiv += "</select></td></tr>";
    propertiesDiv += this.getDescString(property.description);

    propertiesDiv += "<tr><td colspan=\"2\"><button id=\"property-subimt-btn\" class=\"submit-btn\" >submit</button></td></tr></table>";
    propertiesDiv += "</table>";


    // ref tab
    var refDiv = "<table id=\"property-ref-table\" type=\"ref\" class=\"property-table\">";
    refDiv += "<tr><td class=\"title\">ref</td><td class=\"value\"><input id=\"ref-text\" type=\"text\"></td></tr>";
    refDiv += "<tr><td colspan=\"2\"><button class=\"submit-btn\"  id=\"property-ref-submit-btn\">submit</button></td></tr>";
    refDiv += "</table>";

    var divs = {
      "properties": propertiesDiv,
      "ref": refDiv
    };


    propertyLayout.registerComponent('property-component', function(container, state) {

      container.getElement().html("<div id=\"property-" + state.id + "\">" + divs[state.id] + "</div>");

    });

    propertyLayout.init();

    // event binding
    document.getElementById('property-subimt-btn').addEventListener('click', function(event) {
      window.eventHandler.callHandler('html', event);
    });

    document.getElementById('property-ref-submit-btn').addEventListener('click', function(event) {
      window.eventHandler.callHandler('html', event);
    });
  }

  /**
  * @memberof Property
  */
  Property.prototype.setCellBoundaryView = function(config, property, type) {

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var propertiesDiv = "<table id=\"property-table\" type=" + type + " class=\"property-table\">";
    propertiesDiv += "<tr><td class=\"title\">id</td><td class=\"value\"><input id=\"id-text\" type=\"text\" value=" + property.id + " disabled></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">name</td><td class=\"value\"><input id=\"name-text\" type=\"text\" value=" + property.name + "></td></tr>";
    propertiesDiv += this.getDescString(property.description);
    propertiesDiv += "<tr><td class=\"title\">duality</td><td class=\"value\"><input id=\"duality-text\" type=\"text\" disabled value=" + property.duality + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">external ref</td><td class=\"value\"><select id=\"externalRef-text\" style=\"width: 100%;\">";

    for (var key in property.externalReference) {
      var value = property.externalReference[key];
      propertiesDiv += "<option value=\"" + value + "\">" + value + "</option>";
    }

    propertiesDiv += "</select></td></tr>";

    propertiesDiv += "<tr><td colspan=\"2\"><button id=\"property-subimt-btn\" class=\"submit-btn\" >submit</button></td></tr></table>";
    propertiesDiv += "</table>";


    // ref tab
    var refDiv = "<table id=\"property-ref-table\" type=\"ref\" class=\"property-table\">";
    refDiv += "<tr><td class=\"title\">ref</td><td class=\"value\"><input id=\"ref-text\" type=\"text\"></td></tr>";
    refDiv += "<tr><td colspan=\"2\"><button class=\"submit-btn\"  id=\"property-ref-submit-btn\">submit</button></td></tr>";
    refDiv += "</table>";

    var divs = {
      "properties": propertiesDiv,
      "ref": refDiv
    };


    propertyLayout.registerComponent('property-component', function(container, state) {

      container.getElement().html("<div id=\"property-" + state.id + "\">" + divs[state.id] + "</div>");

    });

    propertyLayout.init();

    // event binding
    document.getElementById('property-subimt-btn').addEventListener('click', function(event) {
      window.eventHandler.callHandler('html', event);
    });

    document.getElementById('property-ref-submit-btn').addEventListener('click', function(event) {
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
  Property.prototype.setStateyView = function(config, property, type){

    // id, name, desc, duality, connects[]

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#protperty-container'));

    var propertiesDiv = "<table id=\"property-table\" type=" + type + " class=\"property-table ui compact table inverted \">";
    propertiesDiv += "<tr><td class=\"title\">id</td><td class=\"value\"><input id=\"id-text\" type=\"text\" value=" + property.id + " disabled></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">name</td><td class=\"value\"><input id=\"name-text\" type=\"text\" value=" + property.name + "></td></tr>";
    propertiesDiv += this.getDescString(property.description);
    propertiesDiv += "<tr><td class=\"title\">duality</td><td class=\"value\"><input id=\"duality-text\" type=\"text\" disabled value=" + property.duality + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">connects</td><td class=\"value\"><select id=\"connects-text\" style=\"width: 100%;\">";

    for (var key in property.connects) {
      var value = property.connects[key];
      propertiesDiv += "<option value=\"" + value + "\">" + value + "</option>";
    }

    propertiesDiv += "</select></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">height</td><td class=\"value\"><input id=\"height-text\" type=\"text\" value=" + property.height + "></td></tr>";
    propertiesDiv += "<tr><td colspan=\"2\"><button id=\"property-subimt-btn\" class=\"submit-btn\" >submit</button></td></tr></table>";
    propertiesDiv += "</table>";

    this.setView(config, propertiesDiv);

    // event binding
    document.getElementById('property-subimt-btn').addEventListener('click', function(event) {
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

    var divContent = "<table id=\"property-table\" type=\"project\" class=\"property-table  ui compact table inverted\">";
    divContent += "<tr><td class=\"title\">id</td><td class=\"value\"><input id=\"id-text\" type=\"text\" value=" + projectProperty.id + " disabled></td></tr>";
    divContent += "<tr><td class=\"title\">name</td><td class=\"value\"><input id=\"name-text\" type=\"text\" value=" + projectProperty.name + " ></td></tr>";
    divContent += "<tr><td class=\"title\">date</td><td class=\"value\"><input id=\"date-text\" type=\"text\" value=" + projectProperty.date + " disabled></td></tr>";
    divContent += "<tr><td class=\"title\">author</td><td class=\"value\"><input id=\"author-text\" type=\"text\" value=" + projectProperty.author + " ></td></tr>";
    divContent += this.getDescString(projectProperty.description);
    divContent += "<tr><td colspan=\"2\"><button class=\"submit-btn\" id=\"property-subimt-btn\">submit</button></td></tr></table>";

    this.setView(config, divContent);

    // event binding
    document.getElementById('property-subimt-btn').addEventListener('click', function(event) {
      window.eventHandler.callHandler('html', event);
    });

  }

  /**
  * @memberof Property
  */
  Property.prototype.clear = function(){

    document.getElementById('property-container').innerHTML = "";

  }

  Property.prototype.setTransitionView = function(config, property, type){

    // id, name, description, weight, connects, duality, isInterLayerConnetion

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var propertiesDiv = "<table id=\"property-table\" type=" + type + " class=\"property-table  ui compact table inverted \">";
    propertiesDiv += "<tr><td class=\"title\">id</td><td class=\"value\"><input id=\"id-text\" type=\"text\" value=" + property.id + " disabled></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">name</td><td class=\"value\"><input id=\"name-text\" type=\"text\" value=" + property.name + "></td></tr>";
    propertiesDiv += this.getDescString(property.description);
    propertiesDiv += "<tr><td class=\"title\">duality</td><td class=\"value\"><input id=\"duality-text\" type=\"text\" disabled value=" + property.duality + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">weight</td><td class=\"value\"><input id=\"weight-text\" type=\"text\" value=" + property.weight + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">connects</td><td class=\"value\"><input id=\"connects-text\" type=\"text\" disabled value=\""+ property.getConncetsString() + "\"></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">is stair</td><td class=\"value\"><input id=\"stair-text\" type=\"checkbox\" disabled ";

    if( property.isStair.tf ){
      // propertiesDiv += "checked value =" + property.isStair.connection[0] + " + \"-\" + "+ property.isStair.connection[1];
      propertiesDiv += "checked> <label for=\"stair-text\">" + property.isStair.connection[0] + " - "+ property.isStair.connection[1]+"</label";
    }

    propertiesDiv += "></td></tr>";
    propertiesDiv += "<tr><td colspan=\"2\"><button id=\"property-subimt-btn\" class=\"submit-btn\" >submit</button></td></tr></table>";
    propertiesDiv += "</table>";

    this.setView(config, propertiesDiv);

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

  Property.prototype.setInterLayerView = function(config, property, type){

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var propertiesDiv = "<table id=\"property-table\" type=" + type + " class=\"property-table  ui compact table inverted \">";
    propertiesDiv += "<tr><td class=\"title\">id</td><td class=\"value\"><input id=\"id-text\" type=\"text\" value=" + property.id + " disabled></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">inter\nConnects</td><td class=\"value\"><input id=\"interConnects-text\" type=\"text\" disabled value=\""+ property.getInterConnectsString() + "\"></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">connected\nLayer</td><td class=\"value\"><input id=\"connectedLayer-text\" type=\"text\" disabled value=\""+ property.getConnectedLayerString() + "\"></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">Topo\nExpression</td><td class=\"value\"><select id=\"topoExpression-text\" style=\"width: 80%;\">";
    propertiesDiv += "<option value=\""+property.typeOfTopoExpression +"\" selected>"+property.typeOfTopoExpression +"</option>";
    propertiesDiv += "<option value=\"CONTAINS\">CONTAINS</option>";
    propertiesDiv += "<option value=\"OVERLAPS\">OVERLAPS</option>";
    propertiesDiv += "<option value=\"EQUALS\">EQUALS</option>";
    propertiesDiv += "<option value=\"WITHIN\">WITHIN</option>";
    propertiesDiv += "<option value=\"CROSSES\">CROSSES</option>";
    propertiesDiv += "<option value=\"INTERSECTS\">INTERSECTS</option>";
    propertiesDiv += "</select></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">commnet</td><td class=\"value\"><textarea id=\"commnet-text\" rows=\"4\" cols=\"21\">" + property.commnet + "</textarea></td></tr>";
    propertiesDiv += "<tr><td colspan=\"2\"><button id=\"property-subimt-btn\" class=\"submit-btn\" >submit</button></td></tr></table>";
    propertiesDiv += "</table>";

    this.setView(config, propertiesDiv);

  }

  Property.prototype.getDescString = function(desc){
    var num = Object.keys(desc).length;
    var i = 0;
    var descString = "";
    for(var key in desc){
      descString += "<tr>";
      if(i == 0) descString += "<tr><td rowspan=\""+num+"\">Desc</td>";
      descString += "<td>";
      descString += "<div class=\"ui inverted mini right labeled input\">";
      descString += "<label for=\"desc-text-"+key+"\" class=\"ui label\">"+key+"</label>";
      descString += "<input type=\"text\" id=\"desc-text-"+key+"\" value=\""+desc[key]+"\">";
      descString += "<button class=\"ui label\">-</button>";
      descString += "</div>";
      descString += "</td></tr>";
      i++;
    }
    return descString;
  }

  return Property;
});
