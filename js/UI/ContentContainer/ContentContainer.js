/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  var createContentContainer = function() {
    var colContainer = document.createElement('div');
    colContainer.classList.add('split-col-container');

    var sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    addClass(sidebar, ['split', 'split-col']);

    var rowContainer = document.createElement('div');
    rowContainer.classList.add('split-row-container');

    var treeViewContainer = document.createElement('div');
    treeViewContainer.id = 'tree-view-container';
    addClass(treeViewContainer, ['split', 'split-row', 'tree-view-container']);

    var propertyContainer = document.createElement('div');
    propertyContainer.id = 'property-container';
    addClass(propertyContainer, ['split', 'split-row', 'property-container']);

    rowContainer.appendChild(treeViewContainer);
    rowContainer.appendChild(propertyContainer);
    sidebar.appendChild(rowContainer);
    colContainer.appendChild(sidebar);

    var workspace = document.createElement('div');
    workspace.id = 'workspace';
    addClass(workspace, ['split', 'split-col']);

    colContainer.appendChild(workspace);

    function addClass(element, list){
      for(var i in list) element.classList.add(list[i]);
    }

    return colContainer;
  }

  return createContentContainer();
});
