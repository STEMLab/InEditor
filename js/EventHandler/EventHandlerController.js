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

  function EventHandlerController() {

    this.handlers = [];
    this.handlerBinder = [];

    /**
     * Save previous runned message for controll request cycle.
     * For example, if 'start-test' runned before next message must be 'test' or 'end-test'.
     */
    this.previousMsg = null;

    this.init();
  }

  EventHandlerController.prototype.init = function(){

    this.add();
    this.setHandlerBinder();
    this.bind();

  }

  EventHandlerController.prototype.add = function(){
    this.handlers.push(new DrawEventHandler());
    this.handlers.push(new PropertyEventHandler());
    this.handlers.push(new ProjectEventHandler());
  }

  EventHandlerController.prototype.bind = function(){

   for(var key in this.handlerBinder){
     for(var subkey in this.handlerBinder[key]){
       if( subkey == 'contentClick'){ // event on canvas

         window.storage.canvasContainer.stages['test-floor'].stage.on(
           'contentClick',
           function(e){window.eventHandlerController.callHandler(e)});

       }else if( subkey == 'click' ){ // event on other html element

         document.getElementById(key).addEventListener('click', function(e){window.eventHandlerController.callHandler(e)});

       }
     }
   }
   
 }

 EventHandlerController.prototype.setHandlerBinder = function(){

   for(var key in this.handlers){
     this.handlers[key].setHandlerBinder(this.handlerBinder);
   }

 }

 EventHandlerController.prototype.callHandler = function(e){

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

   var result =  this.handlerBinder[target][type](window.managerController, window.eventHandlerController.previousMsg);

   if(result.result){ this.previousMsg = result.msg; }
   else{ console.log("error! " + result.msg); }

 }


  return EventHandlerController;
});
