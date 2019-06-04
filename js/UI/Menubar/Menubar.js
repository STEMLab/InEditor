/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  var createMenubar = function() {
    var nav = document.createElement('nav');
    nav.classList.add('navbar');
    nav.classList.add('navbar-expand');
    nav.classList.add('navbar-dark');
    nav.classList.add('fixed-top');
    nav.classList.add('menubar');
    nav.id = 'menubar';

    var collapse = document.createElement('div');
    collapse.classList.add('collapse');
    collapse.classList.add('navbar-collapse');

    var ul = document.createElement('ul');
    ul.classList.add('navbar-nav');
    ul.classList.add('mr-auto');

    ul.appendChild( require('./MenuItem/Project.js'));
    ul.appendChild( require('./MenuItem/Edit.js'));
    ul.appendChild( require('./MenuItem/Setting.js'));
    ul.appendChild( require('./MenuItem/Help.js'));

    collapse.appendChild(ul);
    nav.appendChild(collapse);

    return nav;
  }

  return createMenubar();
});
