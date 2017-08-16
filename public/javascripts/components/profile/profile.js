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
    constructor ($state,$rootScope,profileService,cfpLoadingBar) {
        this.cfpLoadingBar = cfpLoadingBar;

        this.cfpLoadingBar.start();
        profileService.getUser().then((data)=> {
            this.user = data;
            this.cfpLoadingBar.complete();
        })
    }
}

profileController.$inject = ['$state','$rootScope','profileService','cfpLoadingBar'];

export {profile};