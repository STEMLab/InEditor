/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([], function() {
  'use strict';

  /**
   * @desc
   * @exports Conditions
   */
  function Conditions() {

    /**
    * @desc Prefix of cell object
    * @default C
    */
    this.pre_cell = 'C';

    /**
    * @desc Prefix of cellBoundary object
    * @default B
    */
    this.pre_cellBoundary = 'B';

    /**
    * @desc Prefix of floor object
    * @default F
    */
    this.pre_floor = 'F';

    /**
    * @desc Prefix of state object
    * @default S
    */
    this.pre_state = 'S';

    /**
    * @desc Prefix of transtiion object
    * @default T
    */
    this.pre_transition = 'T';

    this.LAST_CELL_ID_NUM = 0;
    this.LAST_CELLBOUNDARY_ID_NUM = 0;
    this.LAST_FLOOR_ID_NUM = 0;
    this.LAST_STATE_ID_NUM = 0;
    this.LAST_TRANSITION_ID_NUM = 0;

    /**
    * @desc The aspect ratio used to create the stage
    * @default { x : 4, y : 3 }
    */
    this.aspectRatio = { x : 4, y : 3 };

    /**
    * @desc scale factor
    * @default 1.5
    */
    this.scaleFactor = 1.1;

    /**
    * @desc min scale
    * @default 1
    */
    this.scaleMin = 1;

    /**
    * @desc max scale
    * @default 50
    */
    this.scaleMax = 50;

    /**
    * @default 10
    */
    this.maxHistoryLen = 10;
    
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
