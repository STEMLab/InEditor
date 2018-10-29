/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require){
    var features = {
        'Solid': require('JsonFormat/ConverterObjects/Solid'),
        'Surface': require('JsonFormat/ConverterObjects/Surface'),
        'LineString': require('JsonFormat/ConverterObjects/LineString')
    };

    return function(type){
        try {
            return new features[type]();
        } catch(error) {
            throw new Error('Unknown featurea type : ' + type + ' Specified.');
        }
    }
});
