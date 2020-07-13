  /**
   * @author suheeeee<lalune1120@hotmail.com>
   */

  define(function(require) {
    function callPopUp() {
      let flag = true;

      let alerts = Array.from(document.getElementsByClassName('message'))
      alerts.some(alt => {
        let title = alt.children[2].children[0].innerHTML;
        let desc = alt.children[2].children[1].innerHTML;
        if((arguments[1] == undefined && title == "") || (arguments[1] == title)){
            if((arguments[2] == undefined && desc == "")||(arguments[2] == desc)){
                flag = false;
                return true;
            }
        }
      })

      if(flag)
        $.suiAlert({
          title: arguments[1] != undefined ? arguments[1] : "",
          description: arguments[2] != undefined ? arguments[2] : "",
          type: arguments[0],
          time: arguments[1] != undefined && arguments[1] == 'The dots are too close!' ? '2' : '4',
          position: arguments[0] == 'success' ? 'bottom-center' : 'top-right'
        });
    }
    return callPopUp;
  });
