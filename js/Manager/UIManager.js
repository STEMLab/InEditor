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
  * @classdesc
  * @class
  */
  function UIManager() {

    Subscriber.apply(this, arguments);

    this.init();
  }

  UIManager.prototype = Object.create(Subscriber.prototype);

  UIManager.prototype.init = function(){

    this.name = 'UIManager';

    this.addReq({
      'settreeview' : 'single',
      'setpropertyview' : 'single'
    });


    this.addCallbackFun('settreeview', this.test );
    this.addCallbackFun('setpropertyview', this.test );

  }

  UIManager.prototype.test = function(reqObj){

    console.log("ui-manager test success");

  }




  return UIManager;
});
