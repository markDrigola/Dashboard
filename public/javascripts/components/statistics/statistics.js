"use strict";

function statistics() {
    let directive = {
        restrict: 'E',
        scope: {},
        templateUrl: './javascripts/components/statistics/statistics.html',
        controller: statisticsController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}
const symbol = Symbol();

class statisticsController {
    constructor ($state,taskService,cfpLoadingBar) {
        this.cfpLoadingBar = cfpLoadingBar;

        this.cfpLoadingBar.start();
        taskService.getTasksToDay().then((data)=> {
            this.statisticsTask = data;

            this.newArrRes = [];
            let maxLength = 0;

            for(let i = 0; i < this.statisticsTask.length; i++) {
                console.log();
                if(!this.statisticsTask[i].statusDelete) {
                    if(maxLength < this.statisticsTask[i].positions.length) {
                        maxLength = this.statisticsTask[i].positions.length;
                    }
                    this.newArrRes.push(this.statisticsTask[i].positions)
                }
            }

            this.newArrRes.push(maxLength);

            this.arrResult = [];

            for(let i = 0; i < this.newArrRes[this.newArrRes.length - 1]; i++) {
                let newObj = {
                    value: 0,
                    sumCost: 0
                };
                this.arrResult.push(newObj);
            }

            for(let i = 0; i < this.newArrRes.length; i++) {
                if(typeof this.newArrRes[i]  === 'object') {
                    for(let j = 0; j < this.newArrRes[i].length; j++) {
                        if(this.arrResult[j].name === undefined || this.arrResult[j] !== this.newArrRes[i][j].name) {
                            this.arrResult[j].name = this.newArrRes[i][j].name;
                        }
                        this.arrResult[j].value += this.newArrRes[i][j].value;
                        this.arrResult[j].sumCost += this.newArrRes[i][j].value * this.newArrRes[i][j].coefficient;
                    }
                }
            }

            this.totalSum = 0;
            for(let i = 0; i < this.arrResult.length; i++) {
                this.totalSum += this.arrResult[i].sumCost;
            }
            this.cfpLoadingBar.complete();
        });
    }

    getValue() {
        this.newArrRes;
    }
}

statisticsController.$inject = ['$state','taskService','cfpLoadingBar'];

export {statistics};