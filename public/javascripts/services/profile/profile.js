const symbol = Symbol();

class Profile {
    constructor ($http) {
        this[symbol] = {$http};
    }

    getUser() {
        return this[symbol].$http.get('/user').then((resp)=>{
            return resp.data;
        });
    }
}

Profile.$inject = ['$http'];

export {Profile};