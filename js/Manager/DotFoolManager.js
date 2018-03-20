/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../PubSub/Subscriber.js",
  "../Storage/Dot/DotFool.js"
], function(
  Subscriber,
  DotFool
) {
  'use strict';

  /**
   * @class DotFoolManager
   * @augments Subscriber
   */
  function DotFoolManager() {

    Subscriber.apply(this, arguments);

    this.init();
  }

  DotFoolManager.prototype = Object.create(Subscriber.prototype);

  DotFoolManager.prototype.init = function() {

    this.name = 'DotFoolManager';


  }



  return DotFoolManager;
});
