/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  var createModal = function() {
    var modal = document.createElement('div');
    modal.id = 'modal__factory';
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

    var header = document.createElement('div');
    header.classList.add('modal-header');

    var bodyToFooterBefore = document.createElement('div');
    // bodyToFooterBefore.classList.add('');

    var bodyToFooterLoading = document.createElement('div');
    // bodyToFooterLoading.classList.add('');

    var bodyToFooterDown = document.createElement('div');
    // bodyToFooterDown.classList.add('');


    /*******************************************************************************
                                          heaer
    *******************************************************************************/

    var headerTitle = document.createElement('h5');
    headerTitle.classList.add('modal-title');
    headerTitle.innerHTML = 'Export to IndoorGML';

    /***/

    var headerBtn = document.createElement('button');
    headerBtn.setAttribute('type', 'button');
    headerBtn.classList.add('close');
    headerBtn.setAttribute('data-dismiss', 'modal');
    headerBtn.setAttribute('aria-label','Close');
    headerBtn.innerHTML = '<span aria-hidden=\"true\">&times;</span>';

    /***/

    header.appendChild(headerTitle);
    header.appendChild(headerBtn);

    /*******************************************************************************
                                      bodyToFooterBefore
    *******************************************************************************/

    var beforeBody = document.createElement('div');
    beforeBody.classList.add('modal-body');

    /***/

    var baseURLGroup = document.createElement('div');
    baseURLGroup.classList.add('form-group');

    var baseURLLabel = document.createElement('label');
    baseURLLabel.setAttribute('for', 'modal__factory__baseURL');
    baseURLLabel.innerHTML = 'Base URL';

    var baseURLInput = document.createElement('input');
    baseURLInput.setAttribute('type', 'text');
    baseURLInput.classList.add('form-control');
    baseURLInput.id = 'modal__factory__baseURL';
    baseURLInput.setAttribute('value', 'http://127.0.0.1');

    baseURLGroup.appendChild(baseURLLabel);
    baseURLGroup.appendChild(baseURLInput);

    /***/

    var portNumGroup = document.createElement('div');
    portNumGroup.classList.add('form-group');

    var portNumLabel = document.createElement('label');
    portNumLabel.setAttribute('for', 'modal__factory__portNum');
    portNumLabel.innerHTML = 'Port Number';

    var portNumInput = document.createElement('input');
    portNumInput.setAttribute('type', 'number');
    portNumInput.setAttribute('placeholder', '9797');
    portNumInput.id = 'modal__factory__portNum';
    portNumInput.classList.add('form-control');

    portNumGroup.appendChild(portNumLabel);
    portNumGroup.appendChild(portNumInput);

    /***/

    var geoTypeGroup = document.createElement('div');
    geoTypeGroup.classList.add('form-group');

    var geoTypeLabel = document.createElement('label');
    geoTypeLabel.setAttribute('for', 'modal__factory__geotype_container');
    geoTypeLabel.innerHTML = '<b>Geometry Type</b>';

    var geoTypeContainer = document.createElement('form');
    geoTypeContainer.classList.add('row');
    geoTypeContainer.id = 'modal__factory__geotype_container';


    var geoTypeContainer_2D = document.createElement('div');
    geoTypeContainer_2D.classList.add('radio');
    geoTypeContainer_2D.classList.add('col-md-6');
    geoTypeContainer_2D.classList.add('my-radio');

    var geoTypeContainer_2D_label = document.createElement('label');
    geoTypeContainer_2D_label.classList.add('form-check-label');
    geoTypeContainer_2D_label.setAttribute('title', 'CellSpace : Surface, CellSpaceBoundary : LineString');
    geoTypeContainer_2D_label.innerHTML = '<input class=\"form-check-input\" type=\"radio\" name=\"optradio\" id=\"factory-geometry-type-2D\">Geomety 2D';

    geoTypeContainer_2D.appendChild(geoTypeContainer_2D_label);

    var geoTypeContainer_3D = document.createElement('div');
    geoTypeContainer_3D.classList.add('radio');
    geoTypeContainer_3D.classList.add('col-md-6');
    geoTypeContainer_3D.classList.add('my-radio');

    var geoTypeContainer_3D_label = geoTypeContainer_2D_label.cloneNode(true);
    geoTypeContainer_3D_label.setAttribute('title', 'test');
    geoTypeContainer_3D.appendChild(geoTypeContainer_3D_label);

    geoTypeContainer.appendChild(geoTypeContainer_2D);
    geoTypeContainer.appendChild(geoTypeContainer_3D);
    geoTypeGroup.appendChild(geoTypeLabel);
    geoTypeGroup.appendChild(geoTypeContainer);

    beforeBody.appendChild(geoTypeGroup);



    var beforeFooter = document.createElement('div');
    bodyToFooterBefore.appendChild(beforeBody);


/*******************************************************************************/

    content.appendChild(header);
    content.appendChild(bodyToFooterBefore);
    content.appendChild(bodyToFooterLoading);
    content.appendChild(bodyToFooterDown);

    dialog.appendChild(content);

    modal.appendChild(dialog);

    return modal;
  }

  return createModal();
});
