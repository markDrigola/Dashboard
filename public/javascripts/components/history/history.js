"use strict";

function history() {
    let directive = {
        restrict: 'E',
        scope: {},
        templateUrl: './javascripts/components/history/history.html',
        controller: historyController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}
const symbol = Symbol();

class historyController {
    constructor ($state,taskService,cfpLoadingBar) {
        this.taskService = taskService;
        this.historyLog = [];
        this.cfpLoadingBar = cfpLoadingBar;

        this.cfpLoadingBar.start();
        taskService.getTasks().then((data)=> {
            for(let i = 0; i < data.length; i++) {
                if(data[i].statusInd) {
                    this.historyLog.push(data[i]);
                }
            }

            this.cfpLoadingBar.complete();
            return this.historyLog;
        });
    }

    taskOpen() {
        let elemTrget = $(event.target);
        elemTrget.closest('.panel-heading').next().find('.all-task-list-item__info').slideToggle();
    }

    totalSumm(array) {
        let totalSumm = 0;

        for(let key in array) {
            totalSumm += Number(array[key].value * array[key].coefficient);
        }

        return totalSumm;
    }
}

historyController.$inject = ['$state','taskService','cfpLoadingBar'];

export {history};