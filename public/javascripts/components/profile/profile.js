"use strict";

function profile() {
    let directive = {
        restrict: 'E',
        scope: {},
        templateUrl: './javascripts/components/profile/profile.html',
        controller: profileController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}
const symbol = Symbol();

class profileController {
    constructor ($state,$rootScope,profileService) {

    }
}

profileController.$inject = ['$state','$rootScope','profileService'];

export {profile};