/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  var createToolbar = function() {
    var nav = document.createElement('nav');
    nav.classList.add('navbar');
    nav.classList.add('navbar-expand');
    nav.classList.add('navbar-dark');
    nav.classList.add('staic-top');
    nav.classList.add('toolbar');

    var collapse = document.createElement('div');
    collapse.classList.add('collapse');
    collapse.classList.add('navbar-collapse');
    collapse.id = "navbarsExampleDefault";

    collapse.appendChild(require('./ToolbarItem/CreateObjects.js'));
    collapse.appendChild(require('./ToolbarItem/ExportToViewer.js'));
    nav.appendChild(collapse);

    return nav;
  }

  return createToolbar();
});
