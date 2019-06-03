/**
* @author suheeeee<lalune1120@hotmail.com>
*/

define([
  "../Manager/GeometryManager.js",
  "../Manager/ProjectManager.js",
  "../Manager/PropertyManager.js",
  "../Manager/UIManager.js",
  "../Manager/ExportManager.js",
  "../UI/UIContainer.js",
  "../UI/Workspace.js"
], function(
  GeometryManager,
  ProjectManager,
  PropertyManager,
  UIManager,
  ExportManager,
  UIContainer,
  Workspace
) {

  /**
   * @class BrokerConnector
   */
  function BrokerConnector(_broker) {

    this.broker = _broker;
    this.fullConnect();

  }

  /**
   * @memberof BrokerConnector
   */
  BrokerConnector.prototype.fullConnect = function(){

    var managers = [
      new GeometryManager(),
      new ProjectManager(),
      new PropertyManager(),
      new UIManager(),
      new ExportManager()
    ];

    this.fullSubscribe(managers);
    this.connectFullUndoFun(managers);

  }

  /**
   * @memberof BrokerConnector
   */
  BrokerConnector.prototype.fullSubscribe = function(managers) {

    for(var key in managers){

      this.managerSubscribe(managers[key]);

    }

  }

  /**
   * @memberof BrokerConnector
   */
  BrokerConnector.prototype.managerSubscribe = function(manager) {

    var key = Object.keys(manager.callbackFunctions);

    for (var i = 0 ; i < key.length ; i++ ) {
      this.subscribe(key[i], manager);
    }

  }

  /**
   * @memberof BrokerConnector
   */
  BrokerConnector.prototype.subscribe = function(topic, obj) {

    this.broker.subscribe(topic, obj);

  }

  /**
   * @memberof BrokerConnector
   */
  BrokerConnector.prototype.connectFullUndoFun = function(managers){

    for(var key in managers){

      this.managerHistoryConnect(managers[key]);

    }

  }

  /**
   * @memberof BrokerConnector
   */
  BrokerConnector.prototype.managerHistoryConnect = function(manager){

    for (var key in manager.undo) {
      this.connectHistory(key, manager.undo[key]);
    }

  }

  /**
   * @memberof BrokerConnector
   */
  BrokerConnector.prototype.connectHistory = function(req, fun){

    this.broker.history.addCallBackFun(req, fun);

  }



  return BrokerConnector;

});
