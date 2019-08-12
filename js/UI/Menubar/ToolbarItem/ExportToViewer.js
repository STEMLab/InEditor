/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  var createMenubar = function() {
    var ulRight = document.createElement('ul');
    ulRight.classList.add('navbar-nav');
    ulRight.classList.add('my-2');
    ulRight.classList.add('my-lg-0');

    var viewerBtn = document.createElement('li');
    viewerBtn.classList.add('nav-item');
    viewerBtn.innerHTML = "<img src=\"./assets/icon/go_viewer.png\" title=\"go viewer\" data-modaltype=\"viewer\" id=\"btn__viewer\">";

    ulRight.appendChild(viewerBtn);
    return ulRight;
  }

  return createMenubar();
});
