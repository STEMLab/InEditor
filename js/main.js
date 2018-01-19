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
  "./js/EventHandler/EventHandlerController.js",
  "./js/Manager/ManagerController.js"
], function(
  UIContainer,
  Storage,
  EventHandlerController,
  ManagerController
) {
  'use strict';

  console.log("main called");

  var uiContainer = new UIContainer();
  window.uiContainer = uiContainer;

  var storage = new Storage();
  window.storage = storage;

  var managerController = new ManagerController();
  window.managerController = managerController;

  var eventHandlerController = new EventHandlerController();
  window.eventHandlerController = eventHandlerController;



  console.log(window);
});
