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
  function PropertyManager() {

    Subscriber.apply(this, arguments);
    this.init();
  }

  PropertyManager.prototype = Object.create(Subscriber.prototype);

  PropertyManager.prototype.init = function(){

    this.name = 'PropertyManager';

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
