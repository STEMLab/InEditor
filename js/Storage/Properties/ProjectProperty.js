/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class ProjectProperty
   */
  function ProjectProperty() {

    /**
     * @memberof ProjectProperty
     */
    this.id = window.conditions.guid();

    /**
     * @memberof ProjectProperty
     */
    this.name = this.id;

    /**
     * @memberof ProjectProperty
     */
    this.date = window.conditions.getDate();

    /**
     * @memberof ProjectProperty
     */
    this.author = new String();

    /**
     * @memberof ProjectProperty
     */
    this.description = new String();

    /**
     * @memberof ProjectProperty
     */
    this.savePath = null;
  }

  /**
   * @memberof ProjectProperty
   */
  ProjectProperty.prototype.load = function(values) {

    this.id = values.id;
    this.name = values.name;
    this.date = values.date;
    this.author = values.author;
    this.description = values.description;
    this.savePath = values.savePath;

  }

  return ProjectProperty;
});
