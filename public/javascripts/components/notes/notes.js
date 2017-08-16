"use strict";

function notes() {
    let directive = {
        restrict: 'E',
        scope: {},
        templateUrl: './javascripts/components/notes/notes.html',
        controller: notesController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}
const symbol = Symbol();

class notesController {
    constructor ($state,$rootScope,$modal,settingsService,taskService,cfpLoadingBar) {
        this[symbol] = {
            $rootScope,
            $modal
        };

        this.cfpLoadingBar = cfpLoadingBar;

        this.cfpLoadingBar.start();
        settingsService.getSettingsAll().then((data)=> {
            this.coef = data.data;
            this.positionsArr = [];

            for(let i = 0; i < this.coef.length; i++) {
                let objCoef = {};

                objCoef.name = this.coef[i].name;
                objCoef.value = 0;
                objCoef.coefficient = this.coef[i].value;

                this.positionsArr.push(objCoef);
            }

            this.newNotes = {
                nameNotes: '',
                statusInd: false,
                statusDelete: false,
                positions: this.positionsArr
            };
        });

        this.taskService = taskService;
        this.emptyName = false;
        this.cfpLoadingBar.complete();
    }

    //Добавляем нового клиента и при успешном добавлении очищаем поля
    addNewNotes() {
        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        if(this.newNotes.nameNotes === '') {
            this.emptyName = true;
            return false;
        } else {
            this.emptyName = false;
        }
        if(!(isEmpty(this.newNotes))) {
            this.cfpLoadingBar.start();

            this.taskService.saveNewTask(this.newNotes).then((result)=> {
                if(result) {
                    for(let i = 0; i < this.positionsArr.length; i++) {
                        this.positionsArr[i].value = 0;
                    }
                    this.newNotes = {
                        nameNotes: '',
                        textNotes: '',
                        statusInd: false,
                        statusDelete: false,
                        positions: this.positionsArr
                    };
                    this.cfpLoadingBar.complete();
                }
            });
        } else {
            return false;
        }
    }

    saveThisPosition() {
        this.totalSumm();
    }

    openNewForm(event) {
        $(event.target).closest('.new-notes').find('.form-new-notes').slideDown();
    }

    closedNewForm(event) {
        $(event.target).closest('.new-notes').find('.form-new-notes').slideUp();
    }

    getNewCoef() {

    }
}

notesController.$inject = ['$state','$rootScope','$modal','settingsService','taskService','cfpLoadingBar'];

export {notes};