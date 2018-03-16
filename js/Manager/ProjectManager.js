/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../PubSub/Subscriber.js"
], function(
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

  ProjectManager.prototype.init = function() {

    this.name = 'ProjectManager';

    this.addCallbackFun('saveproject', this.saveProject);

  }

  ProjectManager.prototype.saveProject = function() {

    // Create a bson parser instance
    var bson = new BSON();

    // Serialize document
    var id = window.storage.propertyContainer.projectProperty.id;
    var doc = {};
    doc[window.storage.propertyContainer.projectProperty.id] = window.storage;
    doc['conditions'] = window.conditions;

    // Serialize a document;
    var data = bson.serialize(doc);


    log.info(data);

    // send json data to viewer
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) {
        log.info(">>>> succeed to export to viewer");
      }
    }

    // var formData = new FormData();
    // formData.append("mydata", data);
    //
    // log.info(formData.getAll('mydata'));
    //
    //
    // xhr.open("POST", "http://127.0.0.1:8080/save-project-to-bson/", true);
    // xhr.send(formData);

    xhr.open("POST", "http://127.0.0.1:8080/save-project-to-bson/", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var s = JSON.stringify(doc)
    xhr.send(s);

  }


  return ProjectManager;
});
