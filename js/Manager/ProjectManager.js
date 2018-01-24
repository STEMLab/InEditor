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
  * @classdesc
  * @class
  */
  function ProjectManager() {

    Manager.apply(this, arguments);

    this.init();
  }

  ProjectManager.prototype = Object.create(Manager.prototype);

  ProjectManager.prototype.init = function(){

    this.name = 'ProjectManager';

    this.addReq({
      'start-projtest' : 'cycle',
      'projtest' : 'cycle',
      'end-projtest' : 'cycle'
    });


    this.addCallbackFun('start-protest', this.test );
    this.addCallbackFun('protest', this.test );
    this.addCallbackFun('end-protest', this.test );

  }

  ProjectManager.prototype.test = function(reqObj){

    console.log("project-manager test success");

  }




  return ProjectManager;
});
