/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([], function(){
  'user strict';

  /**
  * @class RequestFunctions
  */
  function RequestFunctions(publish, makeHistoryObjData, undo){

    this.run = publish;

    this.createHistoryObjData = makeHistoryObjData;

    this.undo = undo;

  }

  return RequestFunctions;

});
