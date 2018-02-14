/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function() {
  'use strict';

  /**
  * @desc Message format for communicating in pub-sub model.
  * @class Message
  */
  function Message(_req, _reqObj){

    /**
    * @memberof Message
    */
    this.req = _req;

    /**
    * @memberof Message
    */
    this.reqObj = _reqObj;

  }


  return Message;

});
