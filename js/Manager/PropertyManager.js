define([
  "./Manager.js"
],function(
  Manager
) {
  'use strict';

  function PropertyManager() {

    Manager.apply(this, arguments);
    this.init();
  }

  PropertyManager.prototype = Object.create(Manager.prototype);

  PropertyManager.prototype.init = function(){

    this.addReq({
      'start-proptest' : 'cycle',
      'proptest' : 'cycle',
      'end-proptest' : 'cycle'
    });

    this.addCallbackFun('start-proptest', this.test );
    this.addCallbackFun('proptest', this.test );
    this.addCallbackFun('end-proptest', this.test );

  }

  PropertyManager.prototype.test = function(reqObj){

    console.log("property-manager test success");

  }

  return PropertyManager;
});
