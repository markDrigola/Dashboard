"use strict";
function maps() {
    let directive = {
        restrict: 'E',
        scope: {},
        templateUrl: './javascripts/components/maps/maps.html',
        controller: mapsController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}
const symbol = Symbol();

class mapsController {
    constructor ($state,NgMap) {
        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });
    }

}

mapsController.$inject = ['$state','NgMap'];

export {maps};