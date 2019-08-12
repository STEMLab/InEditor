/**
 * @author suheeeee<lalune1120@hotmail.com>
 */
define(function(require) {
  function NodeJson(id, name, type){
    let lowType;
    if(type === 'CELL_SPACE') lowType = 'cell';
    else if(type === 'CELL_SPACE_BOUNDARY') lowType = 'cellBoundary';
    else if(type === 'STATE') lowType = 'state';
    else if(type === 'INTERLAYER_CONNECTION') lowType = 'interlayerConnection';
    else if(type === 'TRANSITION') lowType = 'transition';

    return {
      title: name,
      key: id,
      folder: false,
      type: lowType,
      icon: '../../assets/tree-icon/' + lowType + '.png'
    }
  }

  return NodeJson;
});
