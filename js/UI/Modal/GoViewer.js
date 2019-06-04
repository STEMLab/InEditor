/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  var createModal = function() {
    var modal = document.createElement('div');
    modal.id = 'modal__viewer';
    modal.classList.add('modal');
    modal.classList.add('fade');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'myModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    var dialog = document.createElement('div');
    dialog.classList.add('modal-dialog');

    var content = document.createElement('div');
    content.classList.add('modal-content');

    var body = document.createElement('div');
    body.classList.add('modal-body');

    var footer = document.createElement('div');
    footer.classList.add('modal-footer');

    /*******************************************************************************
                                          body
    *******************************************************************************/

    var baseURLGroup = document.createElement('div');
    baseURLGroup.classList.add('form-group');

    var baseURLLabel = document.createElement('label');
    baseURLLabel.setAttribute('for', 'modal__viewer__baseURL');
    baseURLLabel.innerHTML = 'Base URL';

    var baseURLInput = document.createElement('input');
    baseURLInput.setAttribute('type', 'text');
    baseURLInput.setAttribute('value', 'http://127.0.0.1');
    baseURLInput.innerHTML = 'Base URL';
    baseURLInput.id = 'modal__viewer__baseURL';
    baseURLInput.classList.add('form-control');

    baseURLGroup.appendChild(baseURLLabel);
    baseURLGroup.appendChild(baseURLInput);

    /***/

    var portNumGroup = document.createElement('div');
    portNumGroup.classList.add('form-group');

    var portNumLabel = document.createElement('label');
    portNumLabel.setAttribute('for', 'modal__viewer__portNum');
    portNumLabel.innerHTML = 'Port Number';

    var portNumInput = document.createElement('input');
    portNumInput.setAttribute('type', 'number');
    portNumInput.setAttribute('placeholder', '3000');
    portNumInput.id = 'modal__viewer__portNum';
    portNumInput.classList.add('form-control');

    portNumGroup.appendChild(portNumLabel);
    portNumGroup.appendChild(portNumInput);

    /***/

    var paramGroup = document.createElement('div');
    paramGroup.classList.add('form-group');

    var paramLabel = document.createElement('label');
    paramLabel.setAttribute('for', 'modal__viewer__param');
    paramLabel.innerHTML = 'Parameter';

    var paramInput = document.createElement('input');
    paramInput.setAttribute('type', 'text');
    paramInput.setAttribute('placeholder', 'api/ijson');
    paramInput.id = 'modal__viewer__param';
    paramInput.classList.add('form-control');

    paramGroup.appendChild(paramLabel);
    paramGroup.appendChild(paramInput);

    /***/

    body.appendChild(baseURLGroup);
    body.appendChild(portNumGroup);
    body.appendChild(paramGroup);


    /*******************************************************************************
                                          footer
    *******************************************************************************/

    var middle = document.createElement('middle');
    middle.id = 'uriHelp';
    middle.classList.add('form-text');
    middle.classList.add('text-muted');
    middle.innerHTML = 'Base URL:Port Number/Parameter';

    /***/

    var button =  document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', 'Close');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.id = 'modal__viewer__btn';
    button.innerHTML = 'Call Viewer';

    /***/

    footer.appendChild(middle);
    footer.appendChild(button);


/*******************************************************************************/

    content.appendChild(body);
    content.appendChild(footer);

    dialog.appendChild(content);

    modal.appendChild(dialog);

    return modal;
  }

  return createModal();
});
