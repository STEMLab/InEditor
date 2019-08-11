  /**
   * @author suheeeee<lalune1120@hotmail.com>
   */

  define(function(require) {
    function callPopUp() {
      var flag = true;
      if(document.getElementById('alert') != null){
        alterTitle = document.getElementById('alert').children[2].children[0].innerHTML;
        alterDesc = document.getElementById('alert').children[2].children[1].innerHTML;

        if((arguments[1] == undefined && alterTitle == "") || (arguments[1] == alterTitle))
          if((arguments[2] == undefined && alterDesc == "")||(arguments[2] == alterDesc))
            flag = false;
      }

      if(flag)
        $.suiAlert({
          title: arguments[1] != undefined ? arguments[1] : "",
          description: arguments[2] != undefined ? arguments[2] : "",
          type: arguments[0],
          time: arguments[1] != undefined && arguments[1] == 'The dots are too close!' ? '2' : '10',
          position: arguments[0] == 'success' ? 'bottom-center' : 'top-right'
        });
    }
    return callPopUp;
  });
