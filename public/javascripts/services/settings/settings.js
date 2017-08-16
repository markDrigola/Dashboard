const symbol = Symbol();

class Settings {
    constructor ($http) {
        this[symbol] = {$http};
    }

    getSettingsAll() {
        return this[symbol].$http.get('/settings').then((resp)=>{
            return resp.data;
        });
    }

    newCoefficient(obj) {
        return this[symbol].$http.put('/settings/newSettingsCoefficient',obj).then((resp)=>{
            return resp.data;
        });
    }

    refactoring(obj) {
        return this[symbol].$http.put('/settings/refactoring',obj).then((resp)=>{
            return resp.data;
        });
    }

    deleteSettingsCoef(obj) {
        return this[symbol].$http.put('/settings/deleteSettingsCoef',obj).then((resp)=>{
            console.log(resp.data);
            return resp.data;
        });
    }

    // newCoefficient(obj) {
    //     return this[symbol].$http.put('/settings/',obj).then((resp)=>{
    //         console.log(resp.data);
    //         return resp.data;
    //     });
    // }
    // saveNewTask(obj) {
    //     return this[symbol].$http.post('/notes', obj).then((resp)=> {
    //         return resp.data;
    //     });
    // }
    //
    // refactoringTask(obj) {
    //     return this[symbol].$http.put('/notes/ref', obj).then((resp)=>{
    //         return resp.data;
    //     });
    // }

    // historyTask(obj) {
    //     return this[symbol].$http.put('/notes/ref', obj).then((resp)=>{
    //         return resp.data;
    //     });
    // }
}

Settings.$inject = ['$http'];

export {Settings};