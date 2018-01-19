
/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([], function() {
  'use strict';

  function Publisher(_broker){

    this.broker =_broker;

  }

  Publisher.prototype.publish = function(_message){

    this.broker.publish(_message);

  }

  return Publisher;

});
