/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  // <li class="nav-item dropdown">
  //   <a class="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">SETTING</a>
  //   <div class="dropdown-menu">
  //     <a class="dropdown-item" id="setting-conditions" data-modaltype="conditions">Conditions</a>
  //     <a class="dropdown-item" id="setting-desc" data-modaltype="desc">Description</a>
  //     <a class="dropdown-item" id="setting-code" data-modaltype="code">Code</a>
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
    link.innerHTML = 'SETTING';

    var div = document.createElement('div');
    div.classList.add('dropdown-menu');

    var conditions = document.createElement('a');
    conditions.id = 'setting-conditions';
    conditions.innerHTML = 'Conditions';
    conditions.classList.add('dropdown-item');
    conditions.setAttribute('data-modaltype', 'conditions');

    var desc = document.createElement('a');
    desc.id = 'setting-desc';
    desc.innerHTML = 'Description';
    desc.classList.add('dropdown-item');
    desc.setAttribute('data-modaltype', 'desc');

    var code = document.createElement('a');
    code.id = 'setting-code';
    code.innerHTML = 'Code';
    code.classList.add('dropdown-item');
    code.setAttribute('data-modaltype', 'code');

    div.appendChild(conditions);
    div.appendChild(desc);
    div.appendChild(code);

    li.appendChild(link);
    li.appendChild(div);

    return li;
  }

  return createMenuItem();
});
