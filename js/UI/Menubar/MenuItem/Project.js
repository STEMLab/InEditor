/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  // <li class="nav-item dropdown">
  //   <a class="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">PROJECT</a>
  //   <div class="dropdown-menu">
  //     <a class="dropdown-item" id="project-new" onClick="window.location.reload()">New</a>
  //     <a class="dropdown-item" id="project-load">Load</a><input type="file" id="project-load-file" accept=".bson" class="d-none" />
  //     <a class="dropdown-item" id="project-save">Save</a>
  //     <a class="dropdown-item" id="project-saveas" data-toggle="modal" data-target="#project-save-as-modal">Save As...</a>
  //     <hr>
  //     <a class="dropdown-item" id="project-import">Import(.gml)</a><input type="file" id="project-import-file" accept=".gml" class="d-none" />
  //     <a class="dropdown-item" id="project-export" data-modaltype="export">Export(.gml)</a>
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
    link.innerHTML = 'PROJECT';

    var div = document.createElement('div');
    div.classList.add('dropdown-menu');

    var _new = document.createElement('a');
    _new.id = 'project-new';
    _new.setAttribute('onClick', 'window.location.reload()');
    _new.innerHTML = 'New';
    _new.classList.add('dropdown-item');

    var load = document.createElement('a');
    load.id = 'project-load';
    load.innerHTML = 'Load';
    load.classList.add('dropdown-item');

    var loadFile = document.createElement('input');
    loadFile.id = 'project-load-file';
    loadFile.setAttribute('type', 'file');
    loadFile.setAttribute('accept', '.bson');
    loadFile.classList.add('d-none');

    var save = document.createElement('a');
    save.id = 'project-save';
    save.innerHTML = 'Save';
    save.classList.add('dropdown-item');

    var saveAs = document.createElement('a');
    saveAs.id = 'project-saveas';
    //saveAs.setAttribute(' data-modaltype', '#modal__project__save_as');
    saveAs.innerHTML = 'Save As...';
    saveAs.classList.add('dropdown-item');

    var hr = document.createElement('hr');

    var _import = document.createElement('a');
    _import.id = 'project-import';
    _import.innerHTML = 'Import(.gml)';
    _import.classList.add('dropdown-item');

    var _import_input = document.createElement('input');
    _import_input.type = 'file';
    _import_input.id = 'project-import-file';
    _import_input.setAttribute('accept', '.gml');
    _import_input.classList.add('d-none');

    var _export = document.createElement('a');
    _export.id = 'project-export';
    _export.innerHTML = 'Export(.gml)';
    _export.classList.add('dropdown-item');
    _export.setAttribute('data-modaltype', 'export');

    div.appendChild(_new);
    div.appendChild(load);
    div.appendChild(loadFile);
    div.appendChild(save);
    div.appendChild(saveAs);
    div.appendChild(hr);
    div.appendChild(_import);
    div.appendChild(_import_input);
    div.appendChild(_export);

    li.appendChild(link);
    li.appendChild(div);

    return li;
  }

  return createMenuItem();
});
