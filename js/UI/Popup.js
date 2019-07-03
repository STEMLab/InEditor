  /**
   * @author suheeeee<lalune1120@hotmail.com>
   */

  define(function(require) {
    function callPopUp() {
      $.suiAlert({
        title: arguments[1] != undefined ? arguments[1] : "",
        description: arguments[2] != undefined ? arguments[2] : "",
        type: arguments[0],
        time: '10',
        position: arguments[0] == 'success' ? 'bottom-center' : 'top-right'
      });
    }
    return callPopUp;
  });
