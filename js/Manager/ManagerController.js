define([
  "./GeometryManager.js",
  "./PropertyManager.js",
  "./ProjectManager.js"
], function(
  GeometryManager,
  PropertyManager,
  ProjectManager
) {
  'use strict';

  function ManagerController() {

    this.managers = [];
    this.reqs = [];

    this.init();
  }

  ManagerController.prototype.init = function() {

    this.addManagers();
    this.mappingReq();

  }

  ManagerController.prototype.addManagers = function() {

    this.managers['GeometryManager'] = new GeometryManager();
    this.managers['PropertyManager'] = new PropertyManager();
    this.managers['ProjectManager'] = new ProjectManager();

  }

  /**
  * @param message { 'request' : req-type, 'requestObj' : obj }
  */
  ManagerController.prototype.run = function(message) {

    this.managers[this.reqs[message.request]].run(message, window.managerController.storage);


  }



  ManagerController.prototype.mappingReq = function() {

    for (var key in this.managers) {
      var list = this.managers[key].getReqList();

      for (var req in list) {
        this.reqs[req] = key;
      }
    }

  }

  return ManagerController;
});
