/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class InterLayerConnectionProperty
   * @desc  InterLayerConnection is denoted relationships between States in different SpaceLayers.
   */
  function InterLayerConnectionProperty(id) {

    this.id = id;

    /**
     * @memberof InterLayerConnectionProperty
     * @desc An attribute that represents a relationship between two layers.<br>This value should be `typeOfTopoExpressionCodeEnumerationType` and each of attribute of it is follows.<br>* CONTAINS : <br>* OVERLAPS : <br>* EQUALS : <br>* WITHIN : <br>* CROSSES : <br>* INTERSECTS :
     * @default INTERSECTS
     */
    this.typeOfTopoExpression = 'CONTAINS';

    /**
     * @memberof InterLayerConnectionProperty
     * @desc This attribute can contain an additional description for the InterLayerConnection.
     */
    this.comment = "";

    /**
     * @memberof InterLayerConnectionProperty
     * @desc This attribute represents the States belonged into the InterLayerConnection object.
     * @type {Array} Array of id of state
     */
    this.interConnects = new Array(2);

    /**
     * @memberof InterLayerConnectionProperty
     * @desc This attribute represents the SpaceLayers which include each State of InterConnects.<br>In Alpha
     * @type {Array} Array of id of layer
     */
    this.connectedLayer = new Array(2);
  }

  InterLayerConnectionProperty.prototype.load = function(values) {
    var keys = Object.keys(values);
    for(var key of keys){
      if(this[key] != undefined) this[key] = values[key];
    }
	if(this.name == undefined) this.name = this.id;
  }

  InterLayerConnectionProperty.prototype.addState = function(state) {
    var index = -1;
    if (this.interConnects[0] == null) index = 0;
    else if (this.interConnects[1] == null) index = 1;
    else {
      log.error("InterLayerConnection:: this object is already full!");
      return;
    }

    var floorId = require('Storage').getInstance().getPropertyContainer().getFloorById('state', state);
    var layer = require('Storage').getInstance().getPropertyContainer().getElementById('floor', floorId).layer;

    if (index == 0) {
      this.interConnects[0] = state;
      this.connectedLayer[0] = layer;
    } else if (this.connectedLayer[0] != layer && this.interConnects[0] != state) {
      this.interConnects[1] = state;
      this.connectedLayer[1] = layer;
    }
  }


  InterLayerConnectionProperty.prototype.getInterConnectsString = function() {
    return this.interConnects[0] + " - " + this.interConnects[1];
  }

  InterLayerConnectionProperty.prototype.getConnectedLayerString = function() {
    return this.connectedLayer[0] + " - " + this.connectedLayer[1];
  }
  return InterLayerConnectionProperty;
});
