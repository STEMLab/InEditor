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
  * @exports Manager
  */
  function Manager(){

    Subscriber.apply(this, arguments);

    /**
    *  requests
    */
    this.reqs = {};

  }

  Manager.prototype = Object.create(Subscriber.prototype);

  Manager.prototype.init = function(){

  }


  Manager.prototype.addReq = function(obj){

    this.reqs = obj;

  }


  return Manager;
});
