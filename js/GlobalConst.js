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

    PSPROPERTY_TYPE : {
      PUBLIC_SAFETY_DOOR: 'property__ps_door',
      PUBLIC_SAFETY_WINDOW: 'property__ps_window',
      PUBLIC_SAFETY_HATCH: 'property__ps_hatch',
      PUBLIC_SAFETY_ROOM: 'property__ps_room',
      PUBLIC_SAFETY_ELEVATOR: 'property__ps_elevator',
      PUBLIC_SAFETY_STAIR: 'property__ps_stair',
      PUBLIC_SAFETY_ALARM: 'property__ps_alarm',
      PUBLIC_SAFETY_TRANSFORMER: 'property__ps_transformer',
      PUBLIC_SAFETY_DETECTOR: 'property__ps_detector',
      PUBLIC_SAFETY_FIREPUMP: 'property__ps_firepump',
      PUBLIC_SAFETY_SHUTOFF: 'property__ps_shutoff',
      PUBLIC_SAFETY_MEDICAL: 'property__ps_medical',
      PUBLIC_SAFETY_GENERATOR: 'property__ps_generator',
      PUBLIC_SAFETY_SPRINKLER: 'property__ps_sprinkler',
      PUBLIC_SAFETY_SAFETYKEYBOX: 'property__ps_safetykeybox',
      PUBLIC_SAFETY_MANUAL: 'property__ps_manual',
      PUBLIC_SAFETY_ESCALATOR: 'property__ps_escalator'
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
