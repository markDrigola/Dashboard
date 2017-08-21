"use strict";

let moment = window.moment;

function task() {
    let directive = {
        restrict: 'E',
        scope: {},
        templateUrl: './javascripts/components/task/task.html',
        controller: taskController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return directive;
}
const symbol = Symbol();

let mapg;
let marker;
let self;

class taskController {

    constructor ($state,$rootScope,locationService,NgMap,taskService, $scope) {
        self = this;
        this.locationService = locationService;
        this.taskService = taskService;
        this.activeMenu = false;
        this.setOptionEq = 1;
        this.setOptionActive = 1;
        this.$scope = $scope;
        this.editingIndicators = false;
        this.editingObj = {};
        this.moment = moment;

        //Map init
        NgMap.getMap().then(function(map) {
            mapg = map;
            marker = map.markers[0];
            mapg.setCenter(marker.getPosition());

            self.locationService.getNewLocation(marker.getPosition()).then((resp)=>{
                marker.setPosition(marker.getPosition());
                self.position = resp.formatted_address;
                self.newTaskObj.location = self.position;
            });
        });

        //Map event
        this.markerClick = (event) => {
            this.mapEvent(event)
        };

        this.markerDraggable = (event) => {
            this.mapEvent(event)
        };

        this.serviceOptions = [
            {
                imgName: 'icon-1.png',
                textService: 'Electician'
            },
            {
                imgName: 'icon-2.png',
                textService: 'Plumber'
            },
            {
                imgName: 'icon-3.png',
                textService: 'Gardener'
            },
            {
                imgName: 'icon-4.png',
                textService: 'Housekeeper'
            },
            {
                imgName: 'icon-5.png',
                textService: 'Cook'
            }
        ];

        this.taskOptions = [
            {
                title: 'electrical',
                text: [
                    'Unblock a toilet',
                    'Unblock a sink',
                    'Fix a water leak',
                    'Install a sink',
                    'Install a shower',
                    'Install a toilet'
                ]
            },
            {
                title: 'plumber',
                text: [
                    'Unblock a toilet',
                    'Unblock a sink',
                    'Fix a water leak',
                    'Install a sink',
                    'Install a shower',
                    'Install a toilet'
                ]
            },
            {
                title: 'gardener',
                text: [
                    'Unblock a toilet',
                    'Unblock a sink',
                    'Fix a water leak',
                    'Install a sink',
                    'Install a shower',
                    'Install a toilet'
                ]
            },
            {
                title: 'housekeeper',
                text: [
                    'Unblock a toilet',
                    'Unblock a sink',
                    'Fix a water leak',
                    'Install a sink',
                    'Install a shower',
                    'Install a toilet'
                ]
            },
            {
                title: 'cook',
                text: [
                    'Unblock a toilet',
                    'Unblock a sink',
                    'Fix a water leak',
                    'Install a sink',
                    'Install a shower',
                    'Install a toilet'
                ]
            }
        ];

        this.taskService.getTasks().then((data)=> {
            this.allTask = data;
        });

        this.newTaskObj = {
            serviceType: this.serviceOptions[0].textService,
            taskType: this.taskOptions[0].text[0],
            textUser: '',
            serviceTypeIndex: 1,
            taskTypeIndex: 1
        };

        this.setOptionEq = this.newTaskObj.serviceTypeIndex;
        this.setOptionActive = this.newTaskObj.taskTypeIndex;
    }

    mapEvent(event) {
        this.locationService.getNewLocation(event.latLng).then((resp)=>{
            marker.setPosition(event.latLng);
            self.position = resp.formatted_address;
            self.newTaskObj.location = self.position;
            self.$scope.$apply();
        });
        marker.setPosition(event.latLng);
    }

    openTaskMenu() {
        this.activeMenu = !this.activeMenu;
    }

    serviceOptionSelection(index) {
        this.setOptionEq = index;
        this.newTaskObj.serviceTypeIndex = index;
    }

    taskOptionActive(index) {
        this.setOptionActive = index;
        this.newTaskObj.taskTypeIndex = index;
    }

    isSet(tabNum) {
        return this.setOptionEq === tabNum;
    };

    serviceTypeSelect(textElement) {
        this.newTaskObj.serviceType = textElement;
    }

    taskTypeSelect(textElement) {
        this.newTaskObj.taskType = textElement;
    }

    addNewTask() {
        this.taskService.saveNewTask(this.newTaskObj).then((data)=> {
            this.allTask = data;

            this.dataReset();
        });
    }

    deleteTask(index) {
        this.taskService.delTask(this.allTask[index]).then((data)=> {
            if(data) {
                this.allTask = data;

                if(this.editingIndicators) {
                    this.dataReset();
                }
            }
        });
    }

    editingTask(index) {
        this.activeMenu = true;
        this.editingIndicators = true;
        this.newTaskObj = this.allTask[index];
        this.setOptionEq = this.newTaskObj.serviceTypeIndex;
        this.setOptionActive = this.newTaskObj.taskTypeIndex;
        angular.copy(this.newTaskObj ,this.editingObj);
        this.newTaskObj.indexEdit = index;
        this.allTask[index] = this.editingObj;
    }

    saveEdit() {
        this.taskService.refactoringTask(this.newTaskObj).then((data)=> {
            this.allTask = data;

            this.dataReset();
        });
    }

    dataReset() {
        this.editingObj = {};
        this.newTaskObj = {
            serviceType: this.serviceOptions[0].textService,
            taskType: this.taskOptions[0].text[0],
            textUser: ''
        };

        this.setOptionEq = 1;
        this.setOptionActive = 1;
        this.editingIndicators = false;
        this.activeMenu = false;
    }
}

taskController.$inject = ['$state','$rootScope','locationService','NgMap','taskService','$scope'];

export {task};
