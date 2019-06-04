/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {

  var createModals = function() {

    this.appendModals = function(body){
      body.appendChild(require('./GoFactory.js'));
      body.appendChild(require('./GoViewer.js'));
    }

    this.a = 'a';

  }

  return new createModals;
});
