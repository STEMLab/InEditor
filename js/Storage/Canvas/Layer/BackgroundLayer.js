/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define([], function() {
  'use strict';

  /**
   * @class BackgroundLayer
   */
  function BackgroundLayer(_width, _height) {

    this.layer = new Konva.Layer();

    this.floorplanDataURL = [];

    this.setGrid(_width, _height);

  }

  /**
   * @memberof BackgroundLayer
   */
  BackgroundLayer.prototype.setGrid = function(_width, _height) {

    this.layer.destroyChildren()

    var padding = 20;
    for (var i = 0; i < (_width / padding); i++) {
      this.layer.add(new Konva.Line({
        points: [Math.round(i * padding) + 0.5, 0,  Math.round(i * padding) + 0.5, _height],
        stroke: '#ddd',
        strokeWidth: 1,
      }));
    }

    for (var j = 0; j < _height / padding; j++) {
      this.layer.add(new Konva.Line({
        points: [0, Math.round(j * padding), _width, Math.round(j * padding)],
        stroke: '#ddd',
        strokeWidth: 0.5,
      }));
    }

  }

  BackgroundLayer.prototype.getLayer = function() {

    return this.layer;

  }

  /**
  * @memberof BackgroundLayer
  */
  BackgroundLayer.prototype.saveFloorplanDataURL = function(dataURL){

    if(dataURL != null && dataURL != undefined ) this.floorplanDataURL.push(dataURL);

  }

  /**
  * @memberof BackgroundLayer
  */
  BackgroundLayer.prototype.refresh = function(){

    if(this.floorplanDataURL.length == 0){
      this.setGrid(this.layer.width(), this.layer.height());
    } else{

      this.layer.destroyChildren();

      var imageObj = new Image(
        this.layer.width(),
        this.layer.height()
      );
      imageObj['layer'] = this.layer;

      imageObj.onload = function() {
        var floorplan = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj,
          width: this.width,
          height: this.height
        });

        // add the shape to the layer
        this.layer.add(floorplan);
        this.layer.draw();
      };

      // window.open(JSON.parse(xhr.response));
      imageObj.src = this.floorplanDataURL[0];

    }

  }

  /**
  * @memberof BackgroundLayer
  */
  BackgroundLayer.prototype.removeOldFloorplanDataURL = function(){

    if(this.floorplanDataURL.length == 0) return null;

    var tmp = this.floorplanDataURL[0];
    this.floorplanDataURL.splice(0,1);
    return tmp;

  }

  return BackgroundLayer;

});
