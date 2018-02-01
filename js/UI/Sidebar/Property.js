/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([], function() {
  'use strict';

  /**
   * @exports Property
   */
  function Property() {

  };

  /**
   * @param type The type of object to be displayed in the property tab. 'floor', 'cell', 'cellboundry', 'state', 'transition'
   * @param {String} id The id of object to be displayed in the property tab.
   * @param {Storage} storage
   */
  Property.prototype.setPropertyTab = function(type, id, storage) {
    console.log(">>> set property tab :", type, id);

    if (type == "floor") this.setFloorProperty(id, storage);
    else if (type == "cell") this.setCellProperty(id, storage);
    else if (type == "cellBoundary") this.setCellBoundaryProperty(id, storage);
    else if (type == "state") this.setStateProperty(id, storage);
    else if (type == "transition") this.setTransitionProperty(id, storage);
    else if (type == "project") this.setProjectProperty(id, storage);

  }

  /**
   * @param config
   * @param divContent
   */
  Property.prototype.setView = function(config, divContent) {
    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    propertyLayout.registerComponent('property-component', function(container, state) {
      container.getElement().html(divContent);
    });

    propertyLayout.init();
  }

  Property.prototype.setFloorView = function(config, floorProperty) {

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var canvasDiv = "<table>";
    canvasDiv += "<tr><td class=\"title\">Upload floor plan</td><td class=\"value\"><input id=\"floorplan-file\" type=\"file\" accept=\".jpg,.jpeg,.png,.gif,.bmp\"></td></tr>";
    canvasDiv += "<tr><td class=\"title\">Resizing canvas</td><td class=\"value\"><input id=\"name-text\" type=\"button\" value=\"V\"></td></tr>";
    canvasDiv += "</table>";

    var propertiesDiv = "<table id=\"property-table\" type=\"floor\">";
    propertiesDiv += "<tr><td class=\"title\">id</td><td class=\"value\"><input id=\"id-text\" type=\"text\" value=" + floorProperty.id + " disabled></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">name</td><td class=\"value\"><input id=\"name-text\" type=\"text\" value=" + floorProperty.name + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">level</td><td class=\"value\"><input id=\"level-text\" type=\"text\" value=" + floorProperty.level + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">lower corner</td><td class=\"value\"><input id=\"lower-corner-text\" type=\"text\" value=" + floorProperty.lowerCorner + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">upper corner</td><td class=\"value\"><input id=\"upper-corner-text\" type=\"text\" value=" + floorProperty.upperCorner + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">ground height</td><td class=\"value\"><input id=\"ground-height-text\" type=\"text\" value=" + floorProperty.groundHeight + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">celing height</td><td class=\"value\"><input id=\"celing-height-text\" type=\"text\" value=" + floorProperty.celingHeight + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">door height</td><td class=\"value\"><input id=\"door-height-text\" type=\"text\" value=" + floorProperty.doorHeight + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">description</td><td class=\"value\"><textarea id=\"description-text\" rows=\"4\" cols=\"21\">" + floorProperty.description + "</textarea></td></tr>";
    propertiesDiv += "</table><br>";
    propertiesDiv += "<tr><td><button id=\"property-subimt-btn\">submit</button></td></tr></table>";

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

  }

  Property.prototype.setViewWithRef = function(config, property) {

    $('#property-container').empty();

    var propertyLayout = new GoldenLayout(config, $('#property-container'));

    var propertiesDiv = "<table id=\"property-table\" type=\"cell\">";
    propertiesDiv += "<tr><td class=\"title\">id</td><td class=\"value\"><input id=\"id-text\" type=\"text\" value=" + property.id + " disabled></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">name</td><td class=\"value\"><input id=\"name-text\" type=\"text\" value=" + property.name + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">description</td><td class=\"value\"><textarea id=\"description-text\" rows=\"4\" cols=\"21\"></textarea></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">duality</td><td class=\"value\"><input id=\"duality-text\" type=\"text\" disabled value=" + property.duality + "></td></tr>";
    propertiesDiv += "<tr><td class=\"title\">external ref</td><td class=\"value\"><select id=\"externalRef-text\" style=\"width: 100%;\">";

    for (var key in property.externalReference) {
      var value = property.externalReference[key];
      propertiesDiv += "<option value=\"" + value + "\">" + value + "</option>";
    }

    propertiesDiv += "</select></td></tr>";

    propertiesDiv += "<tr><td class=\"title\">partialbounded by</td><td class=\"value\"><select id=\"partialboundedBy-text\" style=\"width: 100%;\">";

    for (var key in property.partialboundedBy) {
      var value = property.partialboundedBy[key];
      propertiesDiv += "<option value=\"" + value + "\"></option>";
    }

    propertiesDiv += "</table><br>";
    propertiesDiv += "<tr><td><button id=\"property-subimt-btn\">submit</button></td></tr></table>";

    var refDiv = "<table id =\"property-ref-table\" type=\"ref\">";
    refDiv += "<tr><td class=\"title\">ref</td><td class=\"value\"><input id=\"ref-text\" type=\"text\" value=\"\"></td></tr>";
    refDiv += "</table><br>";
    refDiv += "<tr><td><button id=\"property-ref-subimt-btn\">submit</button></td></tr></table>";

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

    document.getElementById('property-ref-subimt-btn').addEventListener('click', function(event) {
      window.eventHandler.callHandler('html', event);
    });
  }


  /**
   * @param {String} id The id of floor object to be displayed in the property tab.
   * @param {Storage} storage storage
   * @desc Clears the contents of the property tab and creates a new tab for that floor.<br>Tabs consist of 'canvas' and 'property'.<br>The canvas tab allows you to resize the canvas or insert or remove the floor plan.<br>The property tab allows you to view/change the value of the floor's property(Level, Lower corner, Upper corner, Ground height, Celling height, Door height, description).
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
            title: 'canvas',
            isClosable: false,
            componentState: {
              id: 'cavas'
            }
          },
          {
            type: 'component',
            componentName: 'property-component',
            title: 'properties',
            isClosable: false,
            componentState: {
              id: 'properties'
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

    this.setViewWithRef(config, storage.propertyContainer.getElementById('cell', id));

  }

  /**
   * @param id The id of cellboundary object to be displayed in the property tab.
   * @param storage storage
   * @desc Clears the contents of the property tab and creates a new tab for that cellboundary.<br>Tab consist of property.<br>The property tab allows you to view/change the value of the cellboundary's property(name, duality, description).
   */
  Property.prototype.setCellBoundaryProperty = function(id, storage) {

    var config = {
      settings: {
        showPopoutIcon: false,
        showMaximiseIcon: false,
        showCloseIcon: false
      },
      content: [{
        type: 'component',
        componentName: 'property-component',
        title: 'properties',
        isClosable: false,
        componentState: {
          id: 'propertiesProper'
        }
      }]
    };

    var divContent = "<div>cellboundary properties</div>";

    this.setView(config, divContent);

  }


  /**
   * @param id The id of state object to be displayed in the property tab.
   * @param storage storage
   * @desc Clears the contents of the property tab and creates a new tab for that state.<br>Tab consist of property.<br>The property tab allows you to view/change the value of the state's property(name, duality, connects, description).
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

    var divContent = "<div>state properties</div>";

    this.setView(config, divContent);

  }


  /**
   * @param id The id of transition object to be displayed in the property tab.
   * @param storage storage
   * @desc Clears the contents of the property tab and creates a new tab for that transition.<br>Tab consist of property.<br>The property tab allows you to view/change the value of the transition's property(name, duality, weight, connects, description).
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

    var transitionProperty = storage.propertyContainer.getElementById('transition', id);


    this.setView(config, divContent);

  }


  /**
   * @param {String} id The id of cell object to be displayed in the property tab.
   * @param {Storage} storage storage
   * @desc Clears the contents of the property tab and creates a new tab for that project.<br>Tab consist of property.<br>The property tab allows you to view/change the value of the project's property(name, date, author, description).
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

    var divContent = "<table id=\"property-table\" type=\"project\">";
    divContent += "<tr><td class=\"title\">id</td><td class=\"value\"><input id=\"id-text\" type=\"text\" value=" + projectProperty.id + " disabled></td></tr>";
    divContent += "<tr><td class=\"title\">name</td><td class=\"value\"><input id=\"name-text\" type=\"text\" value=" + projectProperty.name + " ></td></tr>";
    divContent += "<tr><td class=\"title\">date</td><td class=\"value\"><input id=\"date-text\" type=\"text\" value=" + projectProperty.date + " disabled></td></tr>";
    divContent += "<tr><td class=\"title\">author</td><td class=\"value\"><input id=\"author-text\" type=\"text\" value=" + projectProperty.author + " ></td></tr>";
    divContent += "<tr><td class=\"title\">description</td><td class=\"value\"><textarea id=\"description-text\" rows=\"4\" cols=\"21\">" + projectProperty.description + "</textarea></td></tr>";
    divContent += "<br><tr><td><button id=\"property-subimt-btn\">submit</button></td></tr></table>";

    this.setView(config, divContent);

    // event binding
    document.getElementById('property-subimt-btn').addEventListener('click', function(event) {
      window.eventHandler.callHandler('html', event);
    });

  }


  return Property;
});
