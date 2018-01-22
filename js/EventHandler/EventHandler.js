
/**
* @author suheeeee <lalune1120@hotmaile.com>
* @desc This module is a main event handler
*/

define([
  "./ProjectEventHandler.js",
  "./DrawEventHandler.js",
  "./PropertyEventHandler.js"
],function(
  ProjectEventHandler,
  DrawEventHandler,
  PropertyEventHandler
) {
  'use strict';

  function EventHandler() {

    this.handlers = [];
    this.handlerBinder = [];

    /**
     * Save previous runned message for controll request cycle.
     * For example, if 'start-test' runned before next message must be 'test' or 'end-test'.
     */
    this.previousMsg = null;

    this.init();
  }

  EventHandler.prototype.init = function(){

    this.add();
    this.setHandlerBinder();
    this.bind();

  }

  EventHandler.prototype.add = function(){
    this.handlers.push(new DrawEventHandler());
    this.handlers.push(new PropertyEventHandler());
    this.handlers.push(new ProjectEventHandler());
  }

  EventHandler.prototype.bind = function(){

   for(var key in this.handlerBinder){
     for(var subkey in this.handlerBinder[key]){
       if( subkey == 'contentClick'){ // event on canvas

         window.storage.canvasContainer.stages['test-floor'].stage.on(
           'contentClick',
           function(e){ window.eventHandler.callHandler(e) });

       }else if( subkey == 'click' ){ // event on other html element

         document.getElementById(key).addEventListener('click', function(e){window.eventHandler.callHandler(e)});

       }
     }
   }

 }

 EventHandler.prototype.setHandlerBinder = function(){

   for(var key in this.handlers){
     this.handlers[key].setHandlerBinder(this.handlerBinder);
   }

 }

 EventHandler.prototype.callHandler = function(e){

   var target;
   var type;
   var message;

   if( e.target != null ){

     target = e.target.id;
     type = e.type;

   }else if( e.currentTarget != null ){

     target = e.currentTarget.attrs.id;
     type = e.type;

   }

   var message = this.handlerBinder[target][type];

   var result =  this.handlerBinder[target][type](window.broker, window.eventHandler.previousMsg);

   if(result.result){ this.previousMsg = result.msg; }
   else{ console.log("error! " + result.msg); }

 }


  return EventHandler;
});
