/**
* @author suheeeee<lalune1120@hotmail.com>
*/
define(function(require){
  /**
   * @class MessageSpec
   */
  return function(_cycle, _including, _codes, _saveable) {
    return {
      /**
      * @desc `sigle` or `cycle`.
      * @memberof MessageSpec
      */
      cycle : _cycle,

      /**
      * @desc including : this message can be publish during  `code` running.<br>excluding : this message can't be publish during `code` running.<br><br>If number of exclude code is more than number of include code, make sure message specifcation maintains  include code and this value should be `include`.
      * @memberof MessageSpec
      */
      including : _including,

      codes : _codes,

      saveable : _saveable
    }
  }
});
