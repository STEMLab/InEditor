/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([], function(){
  'use strict';


  /**
  * @class Result
  */
  function Result(){

    this.msg = "";
    this.ignore = true;
    this.desc = "";

  }


  /**
  * @memberof Result
  */
  Result.prototype.setIgnore = function(state){

    if(state == "CYCLE-START"){


    } else if(state == "CYCLE"){


    } else if(state == "CYCLE-END"){


    } else if(state == "FAIL"){


    } else {

      log.error("invailid param for setIgnore function `" + state + "`.<br>This value must be one of [ CYCLE-START, CYCLE, CYCLE-END]")

    }


  }

  return Result;
});
