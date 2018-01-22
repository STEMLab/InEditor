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
  function UIManager() {

    Manager.apply(this, arguments);

    this.init();
  }

  UIManager.prototype = Object.create(Manager.prototype);

  UIManager.prototype.init = function(){

    this.name = 'UIManager';

    this.addReq({
      'settreeview' : 'single',
      'setpropertyview' : 'single',
      'addnewfloor':'single'
    });


    this.addCallbackFun('settreeview', this.test );
    this.addCallbackFun('setpropertyview', this.test );
    this.addCallbackFun('addnewfloor', this.test );

  }

  UIManager.prototype.test = function(reqObj){

    console.log("ui-manager test success");

  }




  return UIManager;
});
