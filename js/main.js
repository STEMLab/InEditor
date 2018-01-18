require.config({
  waitSeconds: 1000,
  paths: {
    text: "../json/text",
    json: "../json/json" //alias to plugin
  }
});


require([
  "./js/UI/UI.js",
  "./js/Storage/Storage.js",
  "./js/EventHandler/EventHandlerController.js",
  "./js/Manager/ManagerController.js"
], function(
  UI,
  Storage,
  EventHandlerController,
  ManagerController
) {
  'use strict';

  console.log("main called");

  var ui = new UI();

  var storage = new Storage();
  window.storage = storage;

  var managerController = new ManagerController();
  window.managerController = managerController;

  var eventHandlerController = new EventHandlerController();
  window.eventHandlerController = eventHandlerController;

  console.log(window);
});
