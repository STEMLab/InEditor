define([], function() {
  'use strict';

  function Cursor(coor){

    this.coor = coor;

    this.cursor = new Konva.Circle({
      radius: require('Conditions').getInstance().cursorrSize,
      fill: require('Conditions').getInstance().cursorColor,
      x: this.coor.x,
      y: this.coor.y
    });

  }

  Cursor.prototype.setCoor = function(coor){
    if(coor.x == NaN || coor.y == NaN){
      log.warn('Curosr : input coordinates '+coor+ ' is invalid value !');
      this.updateCoor();
      return false;
    }
    this.coor = coor;
    this.updateCoor();
    return true;
  }

  Cursor.prototype.updateCoor = function(coor){
    this.cursor.setAttr('x', this.coor.x);
    this.cursor.setAttr('y', this.coor.y);
  }

  Cursor.prototype.getObject = function(){
    return this.cursor;
  }

  Cursor.prototype.setVisible = function(visiblity){
    this.cursor.visible(visiblity);
  }

  Cursor.prototype.name = function(name){

    if(name == null || name == undefined)
      return this.cursor.name();
    else
      this.cursor.name(name);

  }

  return Cursor;

});
