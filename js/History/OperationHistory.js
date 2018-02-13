/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "./Deque.js"
], function(
  Deque
){
  'user strict';

  /**
  * @class OperationHistory
  */
  function OperationHistory(cycle_name){

    this.cycle_name = cycle_name;

    this.opq = new Deque();

    this.flag = false;

  }

  return OperationHistory;

});
