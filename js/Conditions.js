/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class Conditions
   */
  function Conditions() {

    /**
     * @desc Prefix of cell object
     * @default C
     */
    this.pre_cell = 'C';

    /**
     * @desc Prefix of cellBoundary object
     * @memberof Conditions
     * @default B
     */
    this.pre_cellBoundary = 'B';

    /**
     * @desc Prefix of floor object
     * @memberof Conditions
     * @default F
     */
    this.pre_floor = 'F';

    /**
     * @desc Prefix of state object
     * @memberof Conditions
     * @default S
     */
    this.pre_state = 'S';

    /**
     * @desc Prefix of transtiion object
     * @memberof Conditions
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
     * @memberof Conditions
     * @default { x : 4, y : 3 }
     */
    this.aspectRatio = {
      x: 4,
      y: 3
    };

    /**
     * @desc scale factor
     * @memberof Conditions
     * @default 1.1
     */
    this.scaleFactor = 1.1;

    /**
     * @desc min scale
     * @memberof Conditions
     * @default 1
     */
    this.scaleMin = 1;

    /**
     * @desc max scale
     * @memberof Conditions
     * @default 50
     */
    this.scaleMax = 50;

    /**
     * @memberof Conditions
     * @default 10
     */
    this.maxHistoryLen = 10;

    this.ctrlDown = false;

    /**
     * @memberof Conditions
     */
    this.coordinateThreshold = 10;

    /**
    + @memberof Conditions
    */
    this.realCoordinateThreshold = this.coordinateThreshold;

    /**
     * @memberof Conditions
     */
    this.snappingThreshold = 10;

    /**
    + @memberof Conditions
    */
    this.realSnappingThreshold = this.snappingThreshold;

    /**
     * @memberof Conditions
     */
    this.cursorrSize = 5;

    /**
     * @memberof Conditions
     */
    this.cursorColor = 'red';

    /**
    * @memberof  Conditions
    */
    this.automGenerateState = true;

    /**
    * @memberof  Conditions
    */
    this.useMultiSpaceLayer = true;

    /**
     * @memberof Conditions
     * @desc If the value is 'true', the attribute will included json which exported.
     */
    this.exportConditions = {
      'CellSpace': {
        'properties': {
          'name': true,
          'description': true,
          'partialboundedBy': true,
          'externalReference': true,
          'duality': true
        },
        'geometry': {
          'extrude': true
        }
      },
      'CellSpaceBoundary': {
        'properties': {
          'name': true,
          'description': true,
          'externalReference': true,
          'duality': true
        },
        'geometry': {
          'extrude': true
        }
      },
      'State': {
        'properties': {
          'name': true,
          'description': true,
          'duality': true,
          'connects': true
        }
      },
      'Transition': {
        'properties': {
          'name': true,
          'description': true,
          'duality': true,
          'weight': true,
          'connects': true
        }
      },
      'MultiLayer': false
    };

    /**
     * @memberof Conditions
     * @desc This this value is true, the attribute will remain even it's value is null("").
     */
    this.exportSimplifyCondition = {
      'CellSpace': {
        'properties': {
          'name': true,
          'description': true,
          'partialboundedBy': false,
          'externalReference': false,
          'duality': true
        }
      },
      'CellSpaceBoundary': {
        'properties': {
          'name': true,
          'description': true,
          'externalReference': false,
          'duality': true
        }
      },
      'State': {
        'properties': {
          'name': true,
          'description': true,
          'duality': true,
          'connects': true
        }
      },
      'Transition': {
        'properties': {
          'name': true,
          'description': true,
          'duality': true,
          'weight': false
        }
      }
    };

  }

  /**
   * @memberof Conditions
   */
  Conditions.prototype.guid = function() {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  /**
   * @memberof Conditions
   */
  Conditions.prototype.getDate = function() {
    var d = new Date();

    var s =
      this.leadingZeros(d.getFullYear(), 4) + '-' +
      this.leadingZeros(d.getMonth() + 1, 2) + '-' +
      this.leadingZeros(d.getDate(), 2);

    return s;
  }

  /**
   * @memberof Conditions
   */
  Conditions.prototype.leadingZeros = function(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  }

  /**
   * @memberof Conditions
   */
  Conditions.prototype.load = function(values) {
    this.pre_cell = values.pre_cell;
    this.pre_cellBoundary = values.pre_cellBoundary;
    this.pre_floor = values.pre_floor;
    this.pre_state = values.pre_state;
    this.pre_transition = values.pre_transition;

    this.LAST_CELL_ID_NUM = values.LAST_CELL_ID_NUM;
    this.LAST_CELLBOUNDARY_ID_NUM = values.LAST_CELLBOUNDARY_ID_NUM;
    this.LAST_FLOOR_ID_NUM = values.LAST_FLOOR_ID_NUM;
    this.LAST_STATE_ID_NUM = values.LAST_STATE_ID_NUM;
    this.LAST_TRANSITION_ID_NUM = values.LAST_TRANSITION_ID_NUM;
    this.aspectRatio = {
      x: values.aspectRatio.x,
      y: values.aspectRatio.y
    };
    this.scaleFactor = values.scaleFactor;
    this.scaleMin = values.scaleMin;
    this.scaleMax = values.scaleMax;
    this.maxHistoryLen = values.maxHistoryLen;
    this.ctrlDown = values.ctrlDown;
    this.coordinateThreshold = values.coordinateThreshold;
    this.snappingThreshold = values.snappingThreshold;
    this.cursorrSize = values.cursorrSize;
    this.cursorColor = values.cursorColor;

    this.exportConditions = values.exportConditions;
    this.exportSimplifyCondition = values.exportSimplifyCondition;
  }

  return Conditions;
});
