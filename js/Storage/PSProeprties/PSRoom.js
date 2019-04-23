/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  function PSRoom(_id) {

    require('Property').CELL_SPACE.apply(this, arguments);
    this.featrueType = require('ObjectType').PSPROPERTY_TYPE.PUBLIC_SAFETY_ROOM;
    this.extend.moduleType = 'navi';
    this.extend.featureType = 'GeneralSpace';
    this.extend.attributes = {
      'psRoomType': '', // Medical, Security
      'function' : '',
      'class' : '',
      'usage' : ''
    };
  }

  PSRoom.prototype = Object.create(require('Property').CELL_SPACE.prototype);

  PSRoom.prototype.getRoomTypeEnum = function(){
    return ['Medical', 'Security'];
  }

  PSRoom.prototype.copy = function(cell){
    this.name = JSON.parse(JSON.stringify(cell.name));
    this.description = JSON.parse(JSON.stringify(cell.description));
    this.duality = JSON.parse(JSON.stringify(cell.duality));
    this.externalReference = [ ...cell.externalReference ];
    this.partialboundedBy = [ ...cell.partialboundedBy ];
    this.storey = JSON.parse(JSON.stringify(cell.storey));
    this.bottom = JSON.parse(JSON.stringify(cell.bottom))*1;
    this.height = JSON.parse(JSON.stringify(cell.bottom))*1;
  }


  return PSRoom;
});
