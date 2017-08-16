"use strict";
function header() {
    let directive = {
        restrict: 'E',
        scope: {},
        templateUrl: './javascripts/components/header/header.html',
        controller: headerController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}
const symbol = Symbol();

class headerController {
    constructor ($state,$rootScope,navsService) {
        this.navsService = navsService;

        // this.active = '';
        $rootScope.$on('swipe', (swipeAction)=> {
            navsService.bla = !navsService.bla;
            console.log('on swipe action');
            console.log(navsService.bla);
        });
        this.disabled = true;
    }

    menuToggle(event) {
        event.stopPropagation();
        this.navsService.menuActive();
    }

}

headerController.$inject = ['$state','$rootScope','navsService'];

export {header};