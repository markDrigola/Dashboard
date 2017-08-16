"use strict";

function settings() {
    let directive = {
        restrict: 'E',
        scope: {},
        templateUrl: './javascripts/components/settings/settings.html',
        controller: settingsController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}
const symbol = Symbol();

class settingsController {
    constructor ($state,settingsService,cfpLoadingBar) {
        this.settingsService = settingsService;
        this.cfpLoadingBar = cfpLoadingBar;

        this.cfpLoadingBar.start();
        settingsService.getSettingsAll().then((data)=> {
            this.settings = data;
            this.cfpLoadingBar.complete();
        });
    }

    refactoringCoefficient() {
        this.settingsService.refactoring(this.settings);
    }

    newPosition(newPositionName,newPositionValue) {
        console.log(newPositionValue);
        this.newPositions = {
            name: newPositionName,
            value: newPositionValue,
            idSearch: this.settings._id
        };

        this.cfpLoadingBar.start();
        this.settingsService.newCoefficient(this.newPositions).then((data)=> {
            this.settings = data;
            this.cfpLoadingBar.complete();
        })
    }

    deletePosition(index) {
        let objInfoDelete = {
            index: index,
            idSearch: this.settings._id
        };

        this.cfpLoadingBar.start();
        this.settingsService.deleteSettingsCoef(objInfoDelete).then((data)=> {
            this.settings = data;
            this.cfpLoadingBar.complete();
        })
        // this.settingsService.newCoefficient(this.settings);
    }
}

settingsController.$inject = ['$state','settingsService','cfpLoadingBar'];

export {settings};