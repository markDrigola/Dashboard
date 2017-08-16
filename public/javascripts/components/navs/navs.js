"use strict";
function navs() {
    let directive = {
        restrict: 'E',
        scope: {},
        templateUrl: './javascripts/components/navs/navs.html',
        controller: navsController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}
const symbol = Symbol();

class navsController {
    constructor ($state,$rootScope,navsService) {

        this.actionService = navsService;

        this[symbol] = {
            $rootScope,
            swipeAction: false
        };
        // this[symbol].$rootScope.swipeAction = false;
    }

    swipeRulle() {
        this.actionService.menuActive();

        // this[symbol].$rootScope.swipeAction = !this[symbol].$rootScope.swipeAction;
        // this[symbol].swipeAction = !this[symbol].swipeAction;
        // this[symbol].$rootScope.$emit('swipe', this[symbol].swipeAction );
    }

    closeMenu(targ) {
        this.actionService.menuActive();
        console.log('ok')
    }

    menuAdaptiveClosed(el) {
        if($(window).width() < 1025) {
            this.actionService.menuActive();
        }
        if(el.tagName === 'a' || el.tagName === 'A' || el.tagName === 'I') {
            if( !(el.classList.contains('active')) ) {
                $('.main-menu-list').find('a').removeClass('active');
                el.classList.add('active');
            } else {
                return false;
            }
        }
    }

    toTop() {
        $(window).scrollTop(0);
    }
}



navsController.$inject = ['$state','$rootScope','navsService'];

export {navs};