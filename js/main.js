require.config({
  waitSeconds: 1000,
  paths: {
    text: "../json/text",
    json: "../json/json" //alias to plugin
  }
});


require([
  "./js/UI/UIContainer.js",
  "./js/Storage/Storage.js",
  "./js/EventHandler/EventHandler.js",
  "./js/Manager/ManagerController.js",
  "./js/PubSub/Broker.js",
  "./js/Conditions.js"
], function(
  UIContainer,
  Storage,
  EventHandler,
  ManagerController,
  Broker,
  Conditions
) {
  'use strict';

  console.log("main called");

  var conditions = new Conditions();
  window.conditions = conditions;

  var uiContainer = new UIContainer();
  window.uiContainer = uiContainer;

  var storage = new Storage();
  window.storage = storage;

  var broker = new Broker();
  window.broker = broker;

  var eventHandler = new EventHandler(broker);
  window.eventHandler = eventHandler;

  uiContainer.sidebar.treeview.init();
  uiContainer.sidebar.property.setPropertyTab("project", null, storage);

  console.log(window);

});
