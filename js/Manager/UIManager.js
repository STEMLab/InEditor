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
  * @exports Manager/UIManager
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
      'updateproperty' : 'single'
    });

    this.addCallbackFun('settreeview', this.test );
    this.addCallbackFun('setpropertyview', this.test );
    this.addCallbackFun('updateproperty', this.updateProperty );
  }

  UIManager.prototype.test = function(reqObj){

    console.log("ui-manager test success");

  }

  UIManager.prototype.updateProperty = function(reqObj){

    window.uiContainer.sidebar.treeview.updateTitle(reqObj.id, reqObj.updateContent.name);

  }




  return UIManager;
});
