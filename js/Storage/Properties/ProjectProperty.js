/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([],function() {
  'use strict';

  /**
  * @classdesc
  * @class
  */
  function ProjectProperty() {
    this.id = window.conditions.guid();
    this.data = window.conditions.getDate();
    this.author = new String();
    this.descript = new String();
    this.savePath = null;
  }

  return ProjectProperty;
});
