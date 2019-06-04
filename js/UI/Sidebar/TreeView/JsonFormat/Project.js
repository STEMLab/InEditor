/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  function ProjectJson(id, name){
    return {
      title: name,
      key: id,
      type: 'project',
      folder: true,
      children: new Array()
    }
  }

  return ProjectJson;
});
