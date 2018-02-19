/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "./TreeView.js",
  "./Property.js"
], function(
  TreeView,
  Property
) {
  'use strict';

  /**
  * @class Sidebar
  */
  function Sidebar(){

    /**
    * @memberof Sidebar
    */
    this.treeview = new TreeView();

    /**
    * @memberof Sidebar
    */
    this.property = new Property();
    
  };
  return Sidebar;
});
