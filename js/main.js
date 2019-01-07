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
  "./js/PubSub/Broker.js",
  "./js/Conditions.js",
  "./js/History/History.js",
  "./js/Storage/test.js"
], function(
  UIContainer,
  Storage,
  EventHandler,
  Broker,
  Conditions,
  History,
  Test
) {
  'use strict';

  log.enableAll();

  var conditions = new Conditions();
  window.conditions = conditions;

  var uiContainer = new UIContainer();
  window.uiContainer = uiContainer;

  var storage = new Storage();
  window.storage = storage;

  var broker = new Broker(storage);
  window.broker = broker;

  uiContainer.sidebar.treeview.init();
  uiContainer.sidebar.property.setPropertyTab("project", null, storage);

  var eventHandler = new EventHandler(broker);
  window.eventHandler = eventHandler;

  var myhistory = new History();
  window.myhistory = myhistory;

  log.info(window.storage);

  var singletonTest = Test.getInstance();
  singletonTest.echo('hi');
  log.info(singletonTest);

});
