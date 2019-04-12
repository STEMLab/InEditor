/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([
  "../Object/Cell.js",
  "../Object/CellBoundary.js",
  "../Object/Transition.js",
  "../Object/Cursor.js",
  "../Object/Hole.js",
  "../Object/Hatch.js"
], function(
  Cell,
  CellBoundary,
  Transition,
  Cursor,
  Hole,
  Hatch
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

    /**
    * @memberof TmpGroup
    */
    this.cursorData = {
      isSnapped: false,
      snapedObj: {
        type: '',
        obj: null
      }
    };

    /**
    * @memberof TmpGroup
    */
    this.tooltip = new Konva.Text({
        text: "",
        fontFamily: "Calibri",
        fontSize: 15,
        padding: 5,
        textFill: "white",
        fill: "black",
        alpha: 0.75,
        visible: false,
        width: 150
    });

    this.cursor.name('cursor');
    this.tooltip.name('tooltip');

    this.tmpGroup.add(this.cursor.getObject());
    this.tmpGroup.add(this.tooltip);

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
      window.tmpObj = this.obj;
      this.tmpGroup.add(this.obj.getLineObject());

    } else if (type == 'stair') {

      this.obj = new Transition('tmpObj');
      window.tmpObj = this.obj;

    } else if (type == 'hole'){

      this.obj = new Hole('tmpObj');
      window.tmpObj = this.obj;
      this.tmpGroup.add(this.obj.getCornersObject());
      this.tmpGroup.add(this.obj.getPolyObject());

    } else if (type == 'hatch'){

      this.obj = new Hatch('tmpObj');
      window.tmpObj = this.obj;
      this.tmpGroup.add(this.obj.getCornersObject());
      this.tmpGroup.add(this.obj.getPolyObject());

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

  TmpGroup.prototype.getCursorData = function(){
    return this.cursorData;
  }

  TmpGroup.prototype.removeObj = function(){

    // log.info(this.tmpGroup.children);

    this.obj = null;

    var len = this.tmpGroup.children.length;

    for(var i = 0; i < len; i++){
      if( this.tmpGroup.children[i].name() == 'cursor' || this.tmpGroup.children[i].name() == 'tooltip' ){}
      else{
        this.tmpGroup.children.splice(i, 1);
        i--;
        len--;
      }
    }
  }

  TmpGroup.prototype.moveTooltip = function(x, y){

    this.tooltip.x(x);
    this.tooltip.y(y);

  }

  TmpGroup.prototype.setTooltipText = function(text){

    this.tooltip.setAttr('text', text);

  }

  TmpGroup.prototype.hideTooltip = function(){

    this.tooltip.hide();

  }

  TmpGroup.prototype.showTooltip = function(){

    this.tooltip.show();

  }

  TmpGroup.prototype.setCursorData = function(data){

    if( data.isSnapped == undefined ){

      log.error('ERROR !! setCursorData : isSnapped is not defined on parameter', data);
      return ;

    } else if( data.snapedObj == undefined ){

      log.error('ERROR !! setCursorData : snapedObj is not defined on parameter', data);
      return ;

    } else if( data.snapedObj.type == undefined ){

      log.error('ERROR !! setCursorData : type is not defined on parameter', data);
      return ;

    }  else if( data.snapedObj.obj == undefined && data.snapedObj.obj != null){

      log.error('ERROR !! setCursorData : obj is not defined on parameter', data);
      return ;

    }

    this.cursorData = data;

  }


  return TmpGroup;

});
