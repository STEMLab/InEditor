/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  function PropertyBase(_id) {

    this.id = _id;

    this.name = _id;

    this.description = {};
    var list = window.conditions.descList;
    for (var l of list) {
      this.description[l] = "";
    }

    this.duality = "";

    this.storey = [];

    this.featureType = "";

  }

  PropertyBase.prototype.setId = function(_id){
    let floors = window.storage.propertyContainer.floorProperties;
    for(let floor of floors){
      if(floor.keys.indexOf(_id) != -1){
        require('Popup')('error', 'Invalid input', _id + ' is already exist')
        return -1;
      }
    }

    this.id = _id;
    return 1;
  }

  PropertyBase.prototype.setAttr = function(type, data){
    if(type == 'id') this.setId(data);
    else this[type] = data;
  }




  return PropertyBase;
});
