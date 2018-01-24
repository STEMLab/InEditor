
define([], function() {
  'use strict';

  /**
  * @desc Message format for communicating in pub-sub model.
  */
  function Message(_req, _reqObj){

    this.req = _req;
    this.reqObj = _reqObj;

  }


  return Message;

});
