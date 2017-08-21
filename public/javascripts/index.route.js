'use strict';

function appRoutes ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('/', {
            url : '/',
            template : '<g-home></g-home>'
        })
        .state('task', {
            url : '/task',
            template : '<g-task></g-task>'
        })
        .state('profile', {
            url : '/profile',
            template : '<g-profile></g-profile>'
        })

    $urlRouterProvider.otherwise('/task');
}

appRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export {appRoutes};
