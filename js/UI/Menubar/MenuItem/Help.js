/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  var createMenuItem = function() {
    var li = document.createElement('li');
    li.classList.add('nav-item');
    li.classList.add('dropdown');

    var link = document.createElement('a');
    link.classList.add('nav-link');
    link.setAttribute('data-toggle', 'dropdown');
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');
    link.innerHTML = 'HELP';

    var div = document.createElement('div');
    div.classList.add('dropdown-menu');

    var git = document.createElement('a');
    git.id = 'setting-git';
    git.innerHTML = 'GitHub';
    git.classList.add('dropdown-item');
    git.setAttribute('href', 'https://github.com/STEMLab/InEditor');
    git.setAttribute('target', '_blank');

    var demo = document.createElement('a');
    demo.id = 'setting-demo';
    demo.innerHTML = 'Demo video';
    demo.classList.add('dropdown-item');
    demo.setAttribute('href', 'https://youtu.be/eW2Tpq2Yk_c');
    demo.setAttribute('target', '_blank');

    div.appendChild(git);
    div.appendChild(demo);

    li.appendChild(link);
    li.appendChild(div);

    return li;
  }

  return createMenuItem();
});
