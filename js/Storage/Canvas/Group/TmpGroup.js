/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../Object/Cell.js",
  "../Object/CellBoundary.js",
  "../Object/Transition.js"
], function(
  Cell,
  CellBoundary,
  Transition
) {
  'use strict';

  /**
   * @class TmpGroup
   */
  function TmpGroup(type) {

    /**
    * @memberof TmpGroup
    */
    this.tmpGroup = new Konva.Group({
      x: 0,
      y: 0
    });

    /**
    * @memberof TmpGroup
    */
    this.obj; // states array

    this.newObj(type);
  }

  /**
  * @memberof TmpGroup
  */
  TmpGroup.prototype.newObj = function(type) {

    this.tmpGroup.destroyChildren();

    if (type == 'cell') {

      this.obj = new Cell('tmpObj');
      this.obj.type = 'cell';
      window.tmpObj = this.obj;
      this.tmpGroup.add(this.obj.getCornersObject());
      this.tmpGroup.add(this.obj.getPolyObject());

    } else if (type == 'cellBoundary') {

      this.obj = new CellBoundary('tmpObj');
      this.tmpGroup.add(this.obj.getCornersObject());

      // get polyline

    } else if (type == 'transition') {

      this.obj = new Transition('tmpObj');
      this.tmpGroup.add(this.obj.getLineObject());

    }

  }

  /**
  * @memberof TmpGroup
  */
  TmpGroup.prototype.getGroup = function() {
    return this.tmpGroup;
  }

  return TmpGroup;

});
