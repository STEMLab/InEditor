/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([], function() {
  'use strict';

  /**
  * @desc Message format for communicating in pub-sub model.
  * @exports Message
  */
  function Message(_req, _reqObj){

    this.req = _req;
    this.reqObj = _reqObj;

  }


  return Message;

});
