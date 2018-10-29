/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(["./Feature"], function(Feature) {
  'user strict';

  /**
  * @class InterLayerConnection
  * @augments Feature
  */
  function InterLayerConnection(conditions) {

    Feature.apply(this, arguments);

    this.properties = {
      "comment":"",
   		 "interConnects": new Array(2),
   		 "connectedLayers": new Array(2),
   		 "typeOfTopoExpression": "CONTAINS"
    };
  }

  InterLayerConnection.prototype = Object.create(Feature.prototype);

  /**
  * @memberof InterLayerConnection
  */
  InterLayerConnection.prototype.setInterConnects = function(arr){

    this.properties.interConnects = arr.slice(0);

  }

  /**
  * @memberof InterLayerConnection
  */
  InterLayerConnection.prototype.setConnectedLayers = function(arr){

    this.properties.connectedLayers = arr.slice(0);
  }

  /**
  * @memberof InterLayerConnection
  */
  InterLayerConnection.prototype.setTopoExpression = function(topo){

    this.properties.typeOfTopoExpression = topo;
  }

  /**
  * @memberof InterLayerConnection
  */
  InterLayerConnection.prototype.setComment = function(comment){

    this.properties.comment = comment;
  }

  return InterLayerConnection;

});
