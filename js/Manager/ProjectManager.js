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






  return ProjectManager;
});
