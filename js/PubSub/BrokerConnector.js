/**
 * @author suheeeee <lalune1120@hotmaile.com>
 */

define([
  "../Manager/GeometryManager.js",
  "../Manager/ProjectManager.js",
  "../Manager/PropertyManager.js",
  "../Manager/UIManager.js",
  "../UI/UIContainer.js",
  "../UI/Workspace.js"
], function(
  GeometryManager,
  ProjectManager,
  PropertyManager,
  UIManager,
  uiContainer,
  Workspace
) {

  /**
   * @exports BrokerConnector
   */
  function BrokerConnector(_broker) {

    this.broker = _broker;
    this.fullSubscribe();

  }

  BrokerConnector.prototype.fullSubscribe = function() {

    this.managerSubscribe(new GeometryManager());
    this.managerSubscribe(new ProjectManager());
    this.managerSubscribe(new PropertyManager());
    this.managerSubscribe(new UIManager());

    /********************************************************************************/
    /****************************** subscribe ui later ******************************/
    /********************************************************************************/

  }

  BrokerConnector.prototype.managerSubscribe = function(_manager) {

    for (var key in _manager.reqs) {
      this.subscribe(key, _manager);
    }

  }

  BrokerConnector.prototype.subscribe = function(_topic, _obj) {

    this.broker.subscribe(_topic, _obj);

  }

  return BrokerConnector;

});
