/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "./DotPool.js"
], function(
  DotPool
) {
  'use strict';

  /**
   * @class DotPoolContainer
   */
  function DotPoolContainer() {

    /**
     * @memberof DotPoolContainer
     * @type Obeject
     * @desc key : floor id<br>value : dot pool
     */
    this.dotPool = {};

  }

  DotPoolContainer.prototype.clear = function(){
    this.dotPool = {};
  }

  /**
   * @memberof DotPoolContainer
   * @param String floor id
   * @desc Make a dot pool for the floor
   */
  DotPoolContainer.prototype.addNewDotPool = function(floor) {

    if (this.dotPool[floor] != null) log.info("Dot Pool for " + floor + " is alreay exist !");
    else this.dotPool[floor] = new DotPool(floor);
  }

  /**
   * @memberof DotPoolContainer
   * @param String floor id
   */
  DotPoolContainer.prototype.getDotPool = function(floor) {

    // if there is no parameter, return all dot pool
    if (floor == null) return this.dotPool;

    return this.dotPool[floor];

  }

  /**
   * @memberof DotPoolContainer
   * @param {String} uuid
   * @param {String} floor
   */
  DotPoolContainer.prototype.getDotById = function(uuid, floor) {

    if (floor == null) {
      var keys = Object.keys(this.dotPool);
      for (var key in this.dotPool) {
        if (this.dotPool[key] != null &&
            this.dotPool[key].dots[uuid] != null)
            return this.dotPool[key].dots[uuid];
      }
    } else {
      return this.dotPool[floor].dots[uuid];
    }

    log.error("There is no dot which uuid is " + uuid);
  }

  /**
  * @memberof DotPoolContainer
  */
  DotPoolContainer.prototype.load = function(values){

    this.dotPool = {};

    for(var key in values.dotPool){

      var tmp = new DotPool();
      tmp.load(values.dotPool[key]);
      this.dotPool[key] = tmp;

    }

  }

  return DotPoolContainer;
});
