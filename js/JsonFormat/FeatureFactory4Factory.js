/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require){
    var features = {
        'CellSpace': require('JsonFormat/Format4Factory/CellSpace'),
        'CellSpaceBoundary': require('JsonFormat/Format4Factory/CellSpaceBoundary'),
        'State': require('JsonFormat/Format4Factory/State'),
        'Transition': require('JsonFormat/Format4Factory/Transition'),
        'InterlayerConnection' : require('JsonFormat/Format4Factory/InterLayerConnection'),
        'NavigableSpace': require('JsonFormat/Format4Factory/NavigableSpace')
    };

    return function(type, conditions){
        try {
            return new features[type](conditions);
        } catch(error) {
            throw new Error('Unknown featurea type : ' + type + ' Specified.');
        }
    }
});
