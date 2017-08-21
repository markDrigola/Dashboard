const symbol = Symbol();

class Task {
    constructor ($http) {
        this[symbol] = {$http};
    }

    getTasks() {
        return this[symbol].$http.get('/task').then((resp)=>{
            return resp.data;
        });
    }

    saveNewTask(obj) {
        return this[symbol].$http.post('/task', obj).then((resp)=> {
            return resp.data;
        });
    }

    delTask(task) {
        return this[symbol].$http.delete('/task/'+ task._id).then((resp)=> {
            return resp.data;
        });
    }

    refactoringTask(obj) {
        return this[symbol].$http.put('/task', obj).then((resp)=>{
            return resp.data;
        });
    }
}

Task.$inject = ['$http'];

export {Task};