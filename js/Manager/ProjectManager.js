/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "../PubSub/Subscriber.js"
],function(
  Subscriber
) {
  'use strict';

  /**
   * @class ProjectManager
   * @augments Subscriber
   */
  function ProjectManager() {

    Subscriber.apply(this, arguments);

    this.init();
  }

  ProjectManager.prototype = Object.create(Subscriber.prototype);

  ProjectManager.prototype.init = function(){

    this.name = 'ProjectManager';

  }

  /**
   * @param {Message.reqObj} reqObj null
   * @memberof ProjectManager
   */
   ProjectManager.prototype.exportToJson = function(reqObj){

     var manager = window.broker.getManager('exporttojson', 'ProjectManager');
     var result = manager.celldataToJson();
     log.info(result);

   }

   /**
    * @memberof ProjectManager
    */
   ProjectManager.prototype.celldataToJson = function(){

     var result;

     var geometries = window.storage.geometryContainer.cellGeometry;

     for( var key in geometries ){

       var tmp = new CellFormat();
       tmp.setCoordinates(geometries[key].points);
       result[geometries[key].id] = tmp;

     }

     var properties = window.storage.propertyContainer.cellProperties;

     for( var key in properties ){

       result[properties[key].id].setName(properties[key].name);
       result[properties[key].id].setDesc(properties[key].description);

     }

     return result;

   }




  return ProjectManager;
});
