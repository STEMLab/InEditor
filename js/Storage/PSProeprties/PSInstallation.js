/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require) {
  'use strict';

  function PSInstallation(_id) {

    require('Property').STATE.apply(this, arguments);
    this.featrueType = "";
    this.extend.attributes = {
      'legend': ''
    };
  }

  PSInstallation.prototype = Object.create(require('Property').STATE.prototype);

  PSInstallation.prototype.setType = function(type) {

    var list = require('ObjectType').PSPROPERTY_TYPE;
    if(Object.key(list).indexof(type) == -1) return;
    else this.featureType = type;

    switch (type) {
      case PUBLIC_SAFETY_ALARM:
        this.extend.attributes.legend = 'AlarmAndDetectors';
        break;
      case PUBLIC_SAFETY_TRANSFORMER:
        this.extend.attributes.legend = 'Preplan';
        break;
      case PUBLIC_SAFETY_DETECTOR:
        this.extend.attributes.legend = 'AlarmAndDetectors';
        break;
      case PUBLIC_SAFETY_FIREPUMP:
        this.extend.attributes.legend = 'FireSuppression';
        break;
      case PUBLIC_SAFETY_SHUTOFF:
        this.extend.attributes.legend = 'FeatureShutoff';
        break;
      case PUBLIC_SAFETY_MEDICAL:
        this.extend.attributes.legend = 'Preplan';
        break;
      case PUBLIC_SAFETY_GENERATOR:
        this.extend.attributes.legend = 'Preplan';
        break;
      case PUBLIC_SAFETY_SPRINKLER:
        this.extend.attributes.legend = 'FireSuppression';
        break;
      case PUBLIC_SAFETY_SAFETYKEYBOX:
        this.extend.attributes.legend = 'KeyOrKnowBox';
        break;
      case PUBLIC_SAFETY_MANUAL:
        this.extend.attributes.legend = 'Preplan';
        break;
      case PUBLIC_SAFETY_ESCALATOR:
        this.extend.attributes.legend = 'VerticalAccessFeature';
        break;
      default:
    }
  }

  PSInstallation.prototype.getInstallationType = function(){
    return ['PUBLIC_SAFETY_ALARM', 'PUBLIC_SAFETY_TRANSFORMER', 'PUBLIC_SAFETY_DETECTOR', 'PUBLIC_SAFETY_FIREPUMP', 'PUBLIC_SAFETY_SHUTOFF', 'PUBLIC_SAFETY_MEDICAL', 'PUBLIC_SAFETY_GENERATOR', 'PUBLIC_SAFETY_SPRINKLER', 'PUBLIC_SAFETY_SAFETYKEYBOX', 'PUBLIC_SAFETY_MANUAL', 'PUBLIC_SAFETY_ESCALATOR'];
  }
  return PSInstallation;
});
