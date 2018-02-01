/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([
  "./Manager.js"
],function(
  Manager
) {
  'use strict';

  /**
  * @exports Manager/ProjectManager
  */
  function ProjectManager() {

    Manager.apply(this, arguments);

    this.init();
  }

  ProjectManager.prototype = Object.create(Manager.prototype);

  ProjectManager.prototype.init = function(){

    this.name = 'ProjectManager';

    this.addReq({

    });




  }






  return ProjectManager;
});
