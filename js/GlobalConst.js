/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  return {
    CELL_SPACE : 'cellSpace',
    CELL_SPACE_BOUNDARY : 'cellSpaceBoundary',
    STATE : 'state',
    TRANSITION : 'transition',
    HOLE : 'hole',
    POINT: 'point',
    INTERLAYER_CONNECTION: 'interlayerConnection',

    GEOMETRY_TYPE : {
      CELL_SPACE: 'geometry__cellSpace',
      CELL_SPACE_BOUNDARY: 'geometry__cellSpaceBoundary',
      STATE: 'geometry__state',
      TRANSITION: 'geometry__transition',
      HOLE: 'geometry__hole',
      POINT: 'geometry__point',
      CONTAINER: 'geometry__container'
    },

    PROPERTY_TYPE : {
      CELL_SPACE: 'property__cellSpace',
      CELL_SPACE_BOUNDARY: 'property__cellSpaceBoundary',
      STATE: 'property__state',
      TRANSITION: 'property__transition',
      PROJECT: 'property__project',
      FLOOR: 'property__floor',
      CONTAINER: 'property__container'
    },

    CANVAS_TYPE : {
      CELL_SPACE: 'canvas__cellSpace',
      CELL_SPACE_BOUNDARY: 'canvas__cellSpaceBoundary',
      STATE: 'canvas__state',
      TRANSITION: 'canvas__transition',
      HOLE: 'canvas__hole',
      CONTAINER: 'canvas__container',
      STAGE: 'canvas__stage'
    },

    UI_TYPE : {
      CELL_SPACE: 'ui__cellSpace',
      CELL_SPACE_BOUNDARY: 'ui__cellSpaceBoundary',
      STATE: 'ui__state',
      TRANSITION: 'ui__transition',
      STAGE: 'ui__stage'
    },

    extractType: function(underbarData){
      var index = -1;
      var data = underbarData;

      if(underbarData.indexOf('__') == -1){ }
      else {
        index = underbarData.indexOf('__') + 2;
        data = underbarData.substring( index, underbarData.length );
      }

      return data;
    }
  };

});
