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

    if (this.broker != null) {

      this.broker.publish(_message);

    } else {

      window.broker.publish(_message);

    }


  }

  return Publisher;

});
