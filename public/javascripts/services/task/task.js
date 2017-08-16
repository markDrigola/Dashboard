const symbol = Symbol();

class Task {
    constructor ($http) {
        this[symbol] = {$http};
        // this.coefficientService = coefficientService.positions;
        this.statisticsTask = [];
    }

    getTasks() {
        return this[symbol].$http.get('/notes').then((resp)=>{
            return resp.data;
        });
    }

    getTasksPrevDays() {
        return this[symbol].$http.get('/notes/prevDays').then((resp)=>{
            return resp.data;
        });
    }

    getTasksToDay() {
        return this[symbol].$http.get('/notes/toDay').then((resp)=>{
            return resp.data;
        });
    }

    saveNewTask(obj) {
        return this[symbol].$http.post('/notes', obj).then((resp)=> {
            return resp.data;
        });
    }

    refactoringTask(obj) {
        return this[symbol].$http.put('/notes/ref', obj).then((resp)=>{
            return resp.data;
        });
    }

    // deleteTask(index) {
    //     this.notesMoney.splice(index, 1);
    //
    //     return this.notesMoney;
    // }
    //
    // getTasksStatistics() {
    //     this.statisticsTask = [].concat(this.notesMoney).concat(this.taskHistory);
    //
    //     return this.statisticsTask;
    // }
    //
    // addHistory(index) {
    //     this.taskHistory = this.taskHistory.concat(this.notesMoney.splice(index, 1));
    //
    //     return this.taskHistory;
    // }
}

Task.$inject = ['$http'];

export {Task};