/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @class TransitionGeometry
  */
  function TransitionGeometry(id, connects, dots) {

    /**
    * @memberof TransitionGeometry
    */
    this.id = id;

    /**
    * @memberof TransitionGeometry
    */
    this.connects = connects;

    /**
    * @memberof TransitionGeometry
    */
    this.points = dots;
  }

  /**
  * @memberof TransitionGeometry
  */
  TransitionGeometry.prototype.load = function(values){
    this.id = values.id;
    this.connects = values.connects;
    this.points = values.points
  }

  /**
  * @memberof TransitionGeometry
  */
  TransitionGeometry.prototype.getConnects = function(){
    return this.connects;
  }

  /**
  * @memberof TransitionGeometry
  */
  TransitionGeometry.prototype.getDuality = function(){

    for(var i = 0 ; i < this.points.length; i++){
      for(var key in this.points[i].memberOf){
        if(this.points[i].memberOf[key] == 'cellBoundary') return key;
      }
    }

    return null;

  }

  /**
  * @memberof TransitionGeometry
  */
  TransitionGeometry.prototype.updatePoints = function(newPoints){
    this.points = newPoints;
  }

  return TransitionGeometry;
});
