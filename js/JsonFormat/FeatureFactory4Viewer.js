/**
 * @author suheeeee<lalune1120@hotmail.com>
 */

define(function(require){
    var features = {
        'CellSpace': require('JsonFormat/Format4Viewer/CellSpace'),
        'CellSpaceBoundary': require('JsonFormat/Format4Viewer/CellSpaceBoundary'),
        'State': require('JsonFormat/Format4Viewer/State'),
        'Transition': require('JsonFormat/Format4Viewer/Transition')
    };

    return function(type, conditions){
        try {
            return new features[type](conditions);
        } catch(error) {
            throw new Error('Unknown featurea type : ' + type + ' Specified.');
        }
    }
});
