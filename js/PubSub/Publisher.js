/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
   * @class Publisher
   */
  function Publisher(broker) {

    /**
    * @memberof Publisher
    */
    this.broker = _broker;

  }

  /**
  * @memberof Publisher
  */
  Publisher.prototype.publish = function(_message) {

    require('Broker').getInstance().publish(_message);

  }

  return Publisher;

});
