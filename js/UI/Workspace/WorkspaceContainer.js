/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  var createwWorkspaceContainer = function(main) {
    main.setAttribute('role', 'main');
    main.classList.add('workspace');

    var container = document.createElement('div');
    container.id = "workspace-layout-container";
    
    var snackbar = document.createElement('div');
    snackbar.id = "snackbar";

    main.appendChild(container);
    main.appendChild(snackbar);

  }

  return createwWorkspaceContainer;
});
