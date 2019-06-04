/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  // <li class="nav-item dropdown">
  //   <a class="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">EDIT</a>
  //   <div class="dropdown-menu">
  //     <a class="dropdown-item disabled" id="edit-merge-cells" data-toggle="modal" data-target="#edit-merge-cells-modal">Merge Cells</a>
  //   </div>
  // </li>

  var createMenuItem = function() {
    var li = document.createElement('li');
    li.classList.add('nav-item');
    li.classList.add('dropdown');

    var link = document.createElement('a');
    link.classList.add('nav-link');
    link.setAttribute('data-toggle', 'dropdown');
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');
    link.innerHTML = 'EDIT';

    var div = document.createElement('div');
    div.classList.add('dropdown-menu');

    var mergeCells = document.createElement('a');
    mergeCells.id = 'edit-merge-cells';
    mergeCells.innerHTML = 'Merge Cells';
    mergeCells.classList.add('dropdown-item');
    mergeCells.classList.add('disabled');

    div.appendChild(mergeCells);

    li.appendChild(link);
    li.appendChild(div);

    return li;
  }

  return createMenuItem();
});
