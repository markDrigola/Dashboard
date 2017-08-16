"use strict";
import {Modal_notes} from '../../controllers/modal_notes/modal_notes.js';

function allNotes() {
    let directive = {
        restrict: 'E',
        scope: {},
        templateUrl: './javascripts/components/allNotes/allNotes.html',
        controller: allNotesController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}
const symbol = Symbol();

class allNotesController {
    constructor ($state,taskService,$modal,$rootScope,cfpLoadingBar) {
        this[symbol] = {
            $rootScope,
            $modal
        };

        this.cfpLoadingBar = cfpLoadingBar;

        // this.prevActive = false;
        // this.allActive = false;
        // this.taskOpens = false;
        //
        // this.daysFlag = false;
        this.save = false;
        this.taskService = taskService;

        this.cfpLoadingBar.start();
        taskService.getTasksToDay().then((data)=> {
            this.allClients = data;

            this.cfpLoadingBar.complete();
        });

        // this.prevDays = false;
        // this.toDay = false;
        // this.allDays = false;
    }

    getToDayClients() {
        this.cfpLoadingBar.start();
        this.taskService.getTasksToDay().then((data)=> {
            this.allClients = data;

            this.cfpLoadingBar.complete();
        });
    }

    prevDaysFilter(index) {
        this.cfpLoadingBar.start();
        this.taskService.getTasksPrevDays().then((data)=> {
            this.allClients = data;

            this.cfpLoadingBar.complete();
        })
    }

    allTaskFilter() {
        this.cfpLoadingBar.start();
        this.taskService.getTasks().then((data) => {
            this.allClients = data;

            this.cfpLoadingBar.complete();
        })
    }

    taskOpen() {
        let elemTrget = $(event.target);
        elemTrget.closest('.panel-heading').next().find('.all-task-list-item__info').slideToggle();
    }

    opensModal(value) {
        let modalOptions = {
            controller: Modal_notes,
            controllerAs: 'modal',
            templateUrl: Modal_notes.templateUrl,
            show: false,
            backdrop: 'static',
            locals: {
                value
            }
        };

        let modal = this[symbol].$modal(modalOptions);

        Modal_notes.prototype.hide = ()=> {
            modal.hide()
        };
        modal.$promise.then(()=> {modal.show()});
    }

    totalSumm(array) {
        let totalSumm = 0;

        for(let key in array) {
            totalSumm += Number(array[key].value * array[key].coefficient);
        }

        return totalSumm;
    }

    saveText(elem) {
        this.toggleTextarea(elem)
    }

    openTextArea(elem) {
        this.toggleTextarea(elem)
    }

    closeTextArea(elem) {
        this.toggleTextarea(elem)
    }

    toggleTextarea(elem) {
        let textarea = $(elem.target).closest('.panel').next('.textarea-block');

        textarea.slideToggle();
    }

    refactoring(obj) {
        this.taskService.refactoringTask(obj);
    }

    refactorThisPosition() {
        console.log('Коеффициент изменен');
    }

    historyTask(event,index) {
        event.stopPropagation();
        let elSaveHistory = this.allClients[index];
        elSaveHistory.statusInd = true;

        this.taskService.refactoringTask(elSaveHistory);
    }

    deleteTask(event,index) {
        event.stopPropagation();
        let elSaveHistory = this.allClients[index];
        elSaveHistory.statusDelete = true;

        this.taskService.refactoringTask(elSaveHistory);
    }

    saveThisPosition() {

    }
}

allNotesController.$inject = ['$state','taskService','$modal','$rootScope','cfpLoadingBar'];

export {allNotes};