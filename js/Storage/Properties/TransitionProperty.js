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
    */
    this.isInterLayerConnetion = { tf : false, connection : [] };
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

  TransitionProperty.prototype.getConncetsString = function(){
    return this.connects[0] +  ' - ' + this.connects[1];
  }

  return TransitionProperty;
});
