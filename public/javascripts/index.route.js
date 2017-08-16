'use strict';

function appRoutes ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('/', {
            url : '/',
            template : '<g-home></g-home>'
        })
        .state('home', {
            url : '/home',
            template : '<g-home></g-home>'
        })
        .state('task', {
            url : '/task',
            template : '<g-task></g-task>'
        })
        .state('notes', {
            url : '/notes',
            template : '<g-notes></g-notes>'
        })
        .state('allNotes', {
            url : '/allNotes',
            template : '<g-all-notes></g-all-notes>'
        })
        .state('history', {
            url : '/history',
            template : '<g-history></g-history>'
        })
        .state('settings', {
            url : '/settings',
            template : '<g-settings></g-settings>'
        })
        .state('statistics', {
            url : '/statistics',
            template : '<g-statistics></g-statistics>'
        })
        .state('profile', {
            url : '/profile',
            template : '<g-profile></g-profile>'
        })
        .state('maps', {
            url : '/maps',
            template : '<g-maps></g-maps>'
        })
        .state('client', {
            url : '/client',
            template : '<g-client></g-client>'
            // abstract: true
        });

    $urlRouterProvider.otherwise('/allNotes');
}

appRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export {appRoutes};
