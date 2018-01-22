/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([
  "../PubSub/Subscriber.js"
],function(
  Subscriber
) {
  'use strict';

  /**
  * @classdesc
  * @class
  */
  function GeometryManager() {

    Subscriber.apply(this, arguments);

    var currentObj = null;

    this.init();
  }

  GeometryManager.prototype = Object.create(Subscriber.prototype);

  /**
  * @override
  */
  GeometryManager.prototype.init = function(){

    this.name = 'GeometryManager';

    this.addReq({
      'start-geotest' : 'cycle',
      'geotest' : 'cycle',
      'end-geotest' : 'cycle',
      'singletest' : 'single'
      // 'start-addNewCell' : 'cycle'
    });

    this.addCallbackFun('start-geotest', this.startGeotest );
    this.addCallbackFun('geotest', this.geotest );
    this.addCallbackFun('end-geotest', this.endGeotest );
    this.addCallbackFun('singletest', this.singletest );
    // this.addCallbackFun('start-addNewCell', this.startAddNewCell );


  }


  GeometryManager.prototype.startGeotest = function(reqObj, storage){

    console.log("startGeotest success", storage);

  }

  GeometryManager.prototype.geotest = function(reqObj, storage){

    console.log("geotest success", storage);

  }

  GeometryManager.prototype.endGeotest = function(reqObj, storage){

    console.log("endGeotest success", storage);

  }

  GeometryManager.prototype.singletest = function(reqObj, storage){

    console.log("singletest success", storage);

  }





  return GeometryManager;
});
