/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([], function() {
  'use strict';

  /**
   * @exports Publisher
   */
  function Publisher(_broker) {

    this.broker = _broker;

  }

  Publisher.prototype.publish = function(_message) {

    if (this.broker != null) {

      this.broker.publish(_message);

    } else {

      window.broker.publish(_message);

    }


  }

  return Publisher;

});
