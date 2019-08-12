/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  var createMenubar = function() {
    var ulLeft = document.createElement('ul');
    ulLeft.classList.add('navbar-nav');
    ulLeft.classList.add('mr-auto');

    var btn = document.createElement('li');
    btn.classList.add('nav-item');

    var imgData = [
      "<img src=\"./assets/icon/floor_d.png\" title=\"Add new Floor\" id=\"btn__floor\">",
      "<img src=\"./assets/icon/cell_d.png\" title=\"Add new Cell\" id=\"btn__cellSpace\">",
      "<img src=\"./assets/icon/hole_d.png\" title=\"Add hole in cell\" id=\"btn__hole\">",
      "<img src=\"./assets/icon/cellboundary_d.png\" title=\"Add new CellBoundary\" id=\"btn__cellSpaceBoundary\">",
      "<img src=\"./assets/icon/hatch_d.png\" title=\"Add new Hatch\" id=\"btn__hatch\">",
      "<img src=\"./assets/icon/state_d.png\" title=\"Add new State\" id=\"btn__state\">",
      "<img src=\"./assets/icon/transition_d.png\" title=\"Add new Transition\" id=\"btn__transition\">",
      "<img src=\"./assets/icon/stair_d.png\" title=\"Add new Stair\" id=\"btn__stair\">",
      "<img src=\"./assets/icon/slant_down_d.png\" title=\"Add new Cell with slant\" id=\"btn__slant_down\">",
      "<img src=\"./assets/icon/slant_up_d.png\" title=\"Add new Cell with slant\" id=\"btn__slant_up\">",
      "<img src=\"./assets/icon/slant_up_down_d.png\" title=\"Add new two Cell with slant\" id=\"btn__slant_up_down\">",
      "<img src=\"./assets/icon/inter_d.png\" title=\"Add new InterLayerConnection\" id=\"btn__interlayerconnection\">"
    ];

    for(var i in imgData){
      var _btn = btn.cloneNode(true);
      _btn.innerHTML = imgData[i];
      ulLeft.appendChild(_btn);
    }

    return ulLeft;
  }

  return createMenubar();
});
