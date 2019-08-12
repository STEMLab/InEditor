/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
   * @class Theme
   */
  function Theme() {

    var _path = {
      light: "./css/IndoorGML-light.css",
      dark: "./css/IndoorGML-dark.css"
    }

    var _link = document.getElementById("InEditor-Theme");

    var _currentTheme  = 'dark';

    this.setDarkTheme = function(){
      _currentTheme = 'dark';
      _link.href = _path.dark;

      document.getElementById('menubar').classList.remove('navbar-light');
      document.getElementById('menubar').classList.add('navbar-dark');

      document.getElementById('add-new-local-desc-btn').classList.add('inverted');
      document.getElementById('add-new-local-desc-text').parentElement.classList.add('inverted')
    }

    this.setLightTheme = function(){
      _currentTheme = 'light';
      _link.href = _path.light;

      document.getElementById('menubar').classList.add('navbar-light');
      document.getElementById('menubar').classList.remove('navbar-dark');

      document.getElementById('add-new-local-desc-btn').classList.remove('inverted');
      document.getElementById('add-new-local-desc-text').parentElement.classList.remove('inverted')
    }

    this.getTheme = function(){
      return _currentTheme;
    }

  }



  return Theme;

});
