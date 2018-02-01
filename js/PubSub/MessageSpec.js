/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([], function() {
  'use strict';

  /**
   * @class MessageSpec
   */
  function MessageSpec(_cycle, _including, _codes) {

    /**
    * @desc `sigle` or `cycle`.
    * @memberof MessageSpec
    */
    this.cycle = _cycle;

    /**
    * @desc including : this message can be publish during  `code` running.<br>excluding : this message can't be publish during `code` running.<br><br>If number of exclude code is more than number of include code, make sure message specifcation maintains  include code and this value should be `include`.
    * @memberof MessageSpec
    */
    this.including = _including;

    this.codes = _codes;

  }


  return MessageSpec;
});
