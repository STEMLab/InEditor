/**
* @author suheeeee <lalune1120@hotmaile.com>
*/

define([],function() {
  'use strict';

  /**
  * @classdesc
  * @class
  */
  function Conditions() {
    this.pre_cell = 'C';
    this.pre_cellBoundary = 'B';
    this.pre_floor = 'F';
    this.pre_state = 'S';
    this.pre_transition = 'T';

    this.LAST_CELL_ID_NUM = 0;
    this.LAST_CELLBOUNDARY_ID_NUM = 0;
    this.LAST_FLOOR_ID_NUM = 0;
    this.LAST_STATE_ID_NUM = 0;
    this.LAST_TRANSITION_ID_NUM = 0;
  }

  Conditions.prototype.guid = function() {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  Conditions.prototype.getDate = function() {
    var d = new Date();

    var s =
      this.leadingZeros(d.getFullYear(), 4) + '-' +
      this.leadingZeros(d.getMonth() + 1, 2) + '-' +
      this.leadingZeros(d.getDate(), 2);

    return s;
  }

  Conditions.prototype.leadingZeros = function(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  }

  return Conditions;
});
