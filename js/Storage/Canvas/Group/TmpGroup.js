/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../Object/Cell.js",
  "../Object/CellBoundary.js",
  "../Object/Transition.js",
  "../Object/Cursor.js"
], function(
  Cell,
  CellBoundary,
  Transition,
  Cursor
) {
  'use strict';

  /**
   * @class TmpGroup
   */
  function TmpGroup() {

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
    this.obj = null;

    /**
    * @memberof TmpGroup
    */
    this.cursor = new Cursor({x : 0, y : 0});
    this.tmpGroup.add(this.cursor.getObject());

  }

  /**
  * @memberof TmpGroup
  */
  TmpGroup.prototype.addNewObj = function(type) {

    // this.tmpGroup.destroyChildren();

    if (type == 'cell') {

      this.obj = new Cell('tmpObj');
      this.obj.type = 'cell';
      window.tmpObj = this.obj;
      this.tmpGroup.add(this.obj.getCornersObject());
      this.tmpGroup.add(this.obj.getPolyObject());

    } else if (type == 'cellBoundary') {

      this.obj = new CellBoundary('tmpObj');
      this.obj.type = 'cellBoundary'
      window.tmpObj = this.obj;
      this.tmpGroup.add(this.obj.getLineObject());
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

  TmpGroup.prototype.getCursor = function(){
    return this.cursor;
  }

  TmpGroup.prototype.removeObj = function(){

    // log.info(this.tmpGroup.children);

    this.obj = null;

    var len = this.tmpGroup.children.length;

    for(var i = 0; i < len; i++){
      if( this.tmpGroup.children[i].nodeType == "Group" || this.tmpGroup.children[i].className != "Circle"){
        this.tmpGroup.children.splice(i, 1);
        i--;
        len--;
      }
    }
  }


  return TmpGroup;

});
