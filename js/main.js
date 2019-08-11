require.config({
  waitSeconds: 1000,
  paths: {
    text: "../json/text",
    json: "../json/json" //alias to plugin
  },
  map: {
    "*": {
      'Property' : 'js/Storage/Properties/index.js',
      'CanvasObject' : 'js/Storage/Canvas/Object/index.js',
      'Geometry' : 'js/Storage/Geometries/index.js',
      'Subscriber' : 'js/PubSub/Subscriber.js',
      'Popup' : 'js/UI/Popup.js',
      'CodeList' : 'js/Storage/Properties/CodeList.js',
      'ObjectType': 'js/GlobalConst.js',
      'Storage' : 'js/Storage/Storage.js',
      'Message' : 'js/PubSub/Message.js',
      'FeatureFactory4Factory' : 'js/JsonFormat/FeatureFactory4Factory.js',
      'FeatureFactory4Viewer' : 'js/JsonFormat/FeatureFactory4Viewer.js',
      'Dot' : 'js/Storage/Dot/Dot.js',
      'DotMath' : 'js/Storage/Dot/DotMath.js',
      'History' :'js/History/History.js',
      'EventHandlers': 'js/EventHandler/index.js',
      'EventHandler': 'js/EventHandler/EventHandler.js',
      'Broker': 'js/PubSub/Broker.js',
      '@UI' : 'js/UI',
      'UI' : 'js/UI/UI.js',
      'Conditions': 'js/Conditions.js'
    }
  }
});


define(function(require) {
  'use strict';

  log.enableAll();

  var conditions = require('Conditions').getInstance();

  var ui = require('UI').getInstance();
  ui.propertyTab.setPropertyTab('project', null, require('Storage').getInstance());

  var storage = require('Storage').getInstance();
  conditions.saveName = storage.getPropertyContainer().projectProperty.name;

  var broker = require('Broker').getInstance();

  var eventHandler = require('EventHandler').getInstance();

  var myhistory = require('History').getInstance();

});
