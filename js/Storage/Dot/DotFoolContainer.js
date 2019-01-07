/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./DotFool.js"
], function(
  DotFool
) {
  'use strict';

  /**
   * @class DotFoolContainer
   */
  function DotFoolContainer() {

    /**
     * @memberof DotFoolContainer
     * @type Obeject
     * @desc key : floor id<br>value : dot fool
     */
    this.dotFool = {};

  }

  DotFoolContainer.prototype.clear = function(){
    this.dotFool = {};
  }

  /**
   * @memberof DotFoolContainer
   * @param String floor id
   * @desc Make a dot fool for the floor
   */
  DotFoolContainer.prototype.addNewDotFool = function(floor) {

    if (this.dotFool[floor] != null) log.info("Dot Fool for " + floor + " is alreay exist !");
    else this.dotFool[floor] = new DotFool(floor);
  }

  /**
   * @memberof DotFoolContainer
   * @param String floor id
   */
  DotFoolContainer.prototype.getDotFool = function(floor) {

    // if there is no parameter, return all dot fool
    if (floor == null) return this.dotFool;

    return this.dotFool[floor];

  }

  /**
   * @memberof DotFoolContainer
   * @param {String} uuid
   * @param {String} floor
   */
  DotFoolContainer.prototype.getDotById = function(uuid, floor) {

    if (floor == null) {
      var keys = Object.keys(this.dotFool);
      for (var key in this.dotFool) {
        if (this.dotFool[key] != null &&
            this.dotFool[key].dots[uuid] != null)
            return this.dotFool[key].dots[uuid];
      }
    } else {
      return this.dotFool[floor].dots[uuid];
    }

    log.error("There is no dot which uuid is " + uuid);
  }

  /**
  * @memberof DotFoolContainer
  */
  DotFoolContainer.prototype.load = function(values){

    this.dotFool = {};

    for(var key in values.dotFool){

      var tmp = new DotFool();
      tmp.load(values.dotFool[key]);
      this.dotFool[key] = tmp;

    }

  }

  return DotFoolContainer;
});
