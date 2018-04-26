/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([],function() {
  'use strict';

  /**
  * @class TransitionProperty
  */
  function TransitionProperty(id) {

    /**
    * @memberof TransitionProperty
    */
    this.id = id;

    /**
    * @memberof TransitionProperty
    */
    this.name = id;

    /**
    * @memberof TransitionProperty
    */
    this.description = "";

    /**
    * @memberof TransitionProperty
    */
    this.weight = "";

    /**
    * @memberof TransitionProperty
    */
    this.connects = new Array(2);

    /**
    * @memberof TransitionProperty
    */
    this.duality; // CellSpaceBoundary

    /**
    * @memberof TransitionProperty
    * @desc connection [ start floor, end floor ]
    */
    this.isStair = { tf : false, connection : [] };
  }

  /**
  * @memberof TransitionProperty
  */
  TransitionProperty.prototype.load = function(values){

    this.id = values.id;
    this.name = values.name;
    this.description = values.description;
    this.weight = values.weight;
    this.duality = values.duality;
    this.connects = values.connects;

  }

  /**
  * @memberof TransitionProperty
  */
  TransitionProperty.prototype.setName = function(name){
    this.name = name;
  }

  /**
  * @memberof TransitionProperty
  */
  TransitionProperty.prototype.setDesc = function(desc){
    this.description = desc;
  }

  /**
  * @memberof TransitionProperty
  */
  TransitionProperty.prototype.setWesight = function(weight){
    this.weight = weight;
  }

  /**
  * @memberof TransitionProperty
  */
  TransitionProperty.prototype.setConnects = function(connects){
    this.connects = connects;
  }

  /**
  * @memberof TransitionProperty
  */
  TransitionProperty.prototype.setDuality = function(duality){
    this.duality = duality;
  }

  /**
  * @memberof TransitionProperty
  */
  TransitionProperty.prototype.getConncetsString = function(){
    return this.connects[0] +  ' - ' + this.connects[1];
  }

  /**
  * @memberof TransitionProperty
  * @param {Array} If connection is undefined(there is no parameter), `isStair` attribute will be reset.
  */
  TransitionProperty.prototype.setStair = function(connection){

    if(connection == undefined) this.isStair = { tf : false, connection : [] };
    else                        this.isStair = { tf : true, connection : connection };
    
  }

  return TransitionProperty;
});
